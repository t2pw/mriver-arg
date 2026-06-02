/**
 * os.js ── 「声は壁を透して」OS層
 * 進捗管理 / キーワード認証 / ページアンロック / アプリ間通信
 */

'use strict';

const KoeOS = (() => {

  /* ────────────────────────────────────────
     定数
  ──────────────────────────────────────── */

  const STORAGE_KEY   = 'koe_restored';      // 復元済みページIDのSet
  const KEYWORD_KEY   = 'koe_keywords_used'; // 使用済みキーワードのSet
  const NOTIF_KEY     = 'koe_notifications'; // 未読通知カウント
  const FIRST_KEY     = 'koe_first_launch';  // 初回起動フラグ

  /**
   * ページ定義テーブル
   * id         : 一意ID（ファイル名ベース）
   * app        : 所属アプリ ('messages' | 'browser' | 'files' | 'map' | 'board' | 'about')
   * title      : 表示タイトル
   * file       : 実際のHTMLファイルパス
   * locked     : 初期ロック状態
   * keywords   : このページを解放するキーワード（複数可、どれか1つで解放）
   * prereqs    : 解放の事前条件（IDの配列、全て復元済みで解放）
   * phase      : 1=第1層 2=第2層 3=第3層
   * spokeGroup : スポーク識別子（A=手記 B=写真 C=掲示板 D=地図 E=電文）
   */
  const PAGES = [
    // ── 入口 ──────────────────────────────
    { id:'index',          app:'about',    title:'最初のメッセージ',        file:'index.html',           locked:false, keywords:[], prereqs:[], phase:0 },
    { id:'archive_about',  app:'browser',  title:'このアーカイブについて',   file:'archive_about.html',   locked:false, keywords:[], prereqs:[], phase:1 },
    { id:'soran_profile',  app:'about',    title:'蛸川小蘭とは',            file:'soran_profile.html',   locked:false, keywords:[], prereqs:[], phase:1 },

    // ── スポークA：手記 ───────────────────
    { id:'kiroku_001', app:'files', title:'手記①　事件の夜',          file:'kiroku_001.html', locked:true, keywords:['昭和二十四年','8月16日','タコ'],          prereqs:[], phase:1, spokeGroup:'A' },
    { id:'kiroku_002', app:'files', title:'手記②　十湯温泉',          file:'kiroku_002.html', locked:true, keywords:['蛸川','偲山','十湯'],                     prereqs:['kiroku_001'], phase:1, spokeGroup:'A' },
    { id:'kiroku_003', app:'files', title:'手記③　猫塚清治のこと',    file:'kiroku_003.html', locked:true, keywords:['猫塚清治','不審人物','保線'],               prereqs:['kiroku_002'], phase:1, spokeGroup:'A' },
    { id:'kiroku_004', app:'files', title:'手記④　ふみの声',          file:'kiroku_004.html', locked:true, keywords:['ふみ','投函','記録されなかった'],            prereqs:['kiroku_003'], phase:1, spokeGroup:'A' },

    // ── スポークB：写真 ───────────────────
    { id:'photo_001', app:'files', title:'写真①　記録されなかった人物', file:'photo_001.html', locked:true, keywords:['ここにいた','裏面','写真'],                prereqs:[], phase:1, spokeGroup:'B' },
    { id:'photo_002', app:'files', title:'写真②　同じ場所・70年の隔たり', file:'photo_002.html', locked:true, keywords:['M川駅跡','同一地点','70年'],             prereqs:['photo_001'], phase:1, spokeGroup:'B' },
    { id:'photo_003', app:'files', title:'写真③　菜園と暖簾',          file:'photo_003.html', locked:true, keywords:['菜園','暖簾','後ろ姿'],                    prereqs:['photo_002'], phase:1, spokeGroup:'B' },

    // ── スポークC：掲示板 ─────────────────
    { id:'bbs_001', app:'board', title:'掲示板①　投書欄の声',         file:'bbs_001.html',   locked:true, keywords:['検閲','差し止め','投書'],                  prereqs:[], phase:1, spokeGroup:'C' },
    { id:'bbs_002', app:'board', title:'掲示板②　守る会のビラ',       file:'bbs_002.html',   locked:true, keywords:['一千三百','守る会','名簿'],                 prereqs:['bbs_001'], phase:1, spokeGroup:'C' },
    { id:'bbs_003', app:'board', title:'掲示板③　無罪確定まで',       file:'bbs_003.html',   locked:true, keywords:['猫塚清治は今日も存在しない','切り抜き'],     prereqs:['bbs_002'], phase:1, spokeGroup:'C' },

    // ── スポークD：地図 ───────────────────
    { id:'map_001', app:'map', title:'地図①　芙島市中心部',            file:'map_001.html',   locked:true, keywords:['座標','芙島市','埋め込み'],                 prereqs:[], phase:1, spokeGroup:'D' },
    { id:'map_002', app:'map', title:'地図②　桃見山',                  file:'map_002.html',   locked:true, keywords:['桃見山','三月','帰れる'],                   prereqs:['map_001'], phase:1, spokeGroup:'D' },
    { id:'map_003', app:'map', title:'地図③　蒼沼ブルーランドへ',      file:'map_003.html',   locked:true, keywords:['蒼沼','廃墟','最後'],                       prereqs:['map_002'], phase:1, spokeGroup:'D' },

    // ── スポークE：電文 ───────────────────
    { id:'telegram_001', app:'messages', title:'電文①　暗号データ',       file:'telegram_001.html', locked:true, keywords:['███','受信者','暗号'],               prereqs:[], phase:1, spokeGroup:'E' },
    { id:'telegram_002', app:'messages', title:'電文②　№0314の意味',      file:'telegram_002.html', locked:true, keywords:['0314','三月十四日','誕生日'],         prereqs:['telegram_001'], phase:1, spokeGroup:'E' },
    { id:'telegram_003', app:'messages', title:'電文③　声は壁を透して',   file:'telegram_003.html', locked:true, keywords:['声は壁を透して','未収録','文集'],      prereqs:['telegram_002'], phase:1, spokeGroup:'E' },

    // ── 第2層ハブ ─────────────────────────
    { id:'hub_002', app:'browser', title:'第2層が開く',                  file:'hub_002.html',       locked:true, keywords:[], prereqs:[], phase:2 },

    // ── 第2層：事件と運動 ─────────────────
    { id:'koaru_record',  app:'files',   title:'猫塚清治という人物',      file:'koaru_record.html',  locked:true, keywords:['34歳','菜園','清治'],               prereqs:['hub_002'], phase:2 },
    { id:'inochi',        app:'browser', title:'なぜ冤罪は生まれたか',    file:'inochi.html',        locked:true, keywords:['自白','証拠隠蔽','冤罪'],            prereqs:['hub_002'], phase:2 },
    { id:'voices',        app:'browser', title:'声を上げた人々',          file:'voices.html',        locked:true, keywords:['広瀬和郎','四面楚歌','書き続けた'],   prereqs:['hub_002'], phase:2 },
    { id:'tegami',        app:'files',   title:'声は壁を透して（文集）',   file:'tegami.html',        locked:true, keywords:['三百通','収録','守る会'],            prereqs:['hub_002'], phase:2 },
    { id:'sns',           app:'board',   title:'声の速さと重さ',          file:'sns.html',           locked:true, keywords:['葉書一通','重さ','現代'],            prereqs:['hub_002'], phase:2 },
    { id:'momo',          app:'map',     title:'芙島市の現在と桃見山',    file:'momo.html',          locked:true, keywords:['今年も','帰れなかった','桃の花'],     prereqs:['hub_002'], phase:2 },
    { id:'loop',          app:'browser', title:'ループの伏線回収',        file:'loop.html',          locked:true, keywords:['未来の誰か','データ送信','ループ'],   prereqs:['hub_002'], phase:2 },
    { id:'data_trace',    app:'files',   title:'小蘭のデータ痕跡の全容',  file:'data_trace.html',    locked:true, keywords:['バイナリ','穿孔','電文'],            prereqs:['hub_002'], phase:2 },

    // ── 第3層：真実 ──────────────────────
    { id:'hidden',        app:'browser', title:'隠しページ',              file:'hidden.html',        locked:true, keywords:[], prereqs:[], phase:3 },
    { id:'fumi_tegami',   app:'messages',title:'ふみの手紙',              file:'fumi_tegami.html',   locked:true, keywords:[], prereqs:['hidden'], phase:3 },

    // ── 結末 ─────────────────────────────
    { id:'choice',        app:'browser', title:'記録しますか',            file:'choice.html',        locked:true, keywords:[], prereqs:['fumi_tegami'], phase:3 },
    { id:'wiki_add',      app:'browser', title:'架空wiki（追記）',        file:'wiki_add.html',      locked:true, keywords:[], prereqs:['choice'], phase:3 },
    { id:'wiki_skip',     app:'browser', title:'架空wiki（スキップ）',     file:'wiki_skip.html',     locked:true, keywords:[], prereqs:['choice'], phase:3 },
    { id:'epilogue',      app:'browser', title:'エピローグ',              file:'epilogue.html',      locked:true, keywords:[], prereqs:[], phase:3 },
  ];

  /* ─── スポーク完了判定 ─────────────────
     A〜E の全スポークが完了したら hub_002 を解放する
  ────────────────────────────────────── */
  const SPOKES = ['A','B','C','D','E'];

  function getSpokePages(group) {
    return PAGES.filter(p => p.spokeGroup === group);
  }

  function isSpokeComplete(group) {
    return getSpokePages(group).every(p => isRestored(p.id));
  }

  function areAllSpokesComplete() {
    return SPOKES.every(g => isSpokeComplete(g));
  }


  /* ────────────────────────────────────────
     localStorage ラッパー
  ──────────────────────────────────────── */

  function loadSet(key) {
    try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); }
    catch { return new Set(); }
  }

  function saveSet(key, set) {
    localStorage.setItem(key, JSON.stringify([...set]));
  }

  function getRestored()  { return loadSet(STORAGE_KEY); }
  function getKeywords()  { return loadSet(KEYWORD_KEY); }

  function isRestored(id) { return getRestored().has(id); }

  function markRestored(id) {
    const s = getRestored();
    if (s.has(id)) return false;
    s.add(id);
    saveSet(STORAGE_KEY, s);
    return true;
  }

  function markKeywordUsed(kw) {
    const s = getKeywords();
    s.add(kw);
    saveSet(KEYWORD_KEY, s);
  }

  function getNotifCount(app) {
    try {
      const obj = JSON.parse(localStorage.getItem(NOTIF_KEY) || '{}');
      return obj[app] || 0;
    } catch { return 0; }
  }

  function addNotif(app, n = 1) {
    try {
      const obj = JSON.parse(localStorage.getItem(NOTIF_KEY) || '{}');
      obj[app] = (obj[app] || 0) + n;
      localStorage.setItem(NOTIF_KEY, JSON.stringify(obj));
    } catch {}
  }

  function clearNotif(app) {
    try {
      const obj = JSON.parse(localStorage.getItem(NOTIF_KEY) || '{}');
      delete obj[app];
      localStorage.setItem(NOTIF_KEY, JSON.stringify(obj));
    } catch {}
  }

  function isFirstLaunch() {
    return !localStorage.getItem(FIRST_KEY);
  }

  function markLaunched() {
    localStorage.setItem(FIRST_KEY, '1');
  }

  function resetAll() {
    [STORAGE_KEY, KEYWORD_KEY, NOTIF_KEY, FIRST_KEY].forEach(k => localStorage.removeItem(k));
  }


  /* ────────────────────────────────────────
     キーワード認証・アンロック処理
  ──────────────────────────────────────── */

  /**
   * @param {string} input ユーザーが入力した語句
   * @returns {{ success: boolean, unlocked: string[], alreadyUsed: boolean }}
   */
  function submitKeyword(input) {
    const normalized = input.trim().replace(/\s+/g, '');
    const usedSet = getKeywords();

    if (usedSet.has(normalized)) {
      return { success: false, unlocked: [], alreadyUsed: true };
    }

    const unlocked = [];

    for (const page of PAGES) {
      if (isRestored(page.id)) continue;
      if (!page.keywords || page.keywords.length === 0) continue;

      const matched = page.keywords.some(kw => {
        const normKw = kw.replace(/\s+/g, '');
        return normalized.includes(normKw) || normKw.includes(normalized);
      });

      if (matched) {
        // prereq チェック
        const prereqOk = page.prereqs.every(pid => isRestored(pid));
        if (prereqOk) {
          markRestored(page.id);
          unlocked.push(page.id);
          addNotif(page.app);
        }
      }
    }

    if (unlocked.length > 0) {
      markKeywordUsed(normalized);
      _checkHubUnlock();
    }

    return {
      success: unlocked.length > 0,
      unlocked,
      alreadyUsed: false
    };
  }

  /**
   * hub_002のアンロック：全スポーク完了時
   */
  function _checkHubUnlock() {
    if (!isRestored('hub_002') && areAllSpokesComplete()) {
      markRestored('hub_002');
      addNotif('browser', 1);
    }
  }

  /**
   * prereq のみで解放されるページのチェック（キーワード不要なもの）
   * スポーク内の連鎖解放に使用
   */
  function checkPrereqUnlocks() {
    let changed = true;
    const newlyUnlocked = [];
    while (changed) {
      changed = false;
      for (const page of PAGES) {
        if (isRestored(page.id)) continue;
        if (page.keywords && page.keywords.length > 0) continue; // キーワード必須なものはスキップ
        if (page.prereqs.length === 0) continue;
        const prereqOk = page.prereqs.every(pid => isRestored(pid));
        if (prereqOk) {
          markRestored(page.id);
          newlyUnlocked.push(page.id);
          addNotif(page.app);
          changed = true;
        }
      }
    }
    return newlyUnlocked;
  }


  /* ────────────────────────────────────────
     ページ一覧取得
  ──────────────────────────────────────── */

  function getPagesByApp(app) {
    return PAGES.filter(p => p.app === app);
  }

  function getPage(id) {
    return PAGES.find(p => p.id === id);
  }

  function getRestoredPages() {
    const r = getRestored();
    return PAGES.filter(p => r.has(p.id));
  }

  function getLockedPages() {
    const r = getRestored();
    return PAGES.filter(p => p.locked && !r.has(p.id));
  }

  /** 進捗パーセント（ロック対象ページのみ） */
  function getProgressPercent() {
    const locked  = PAGES.filter(p => p.locked);
    const done    = locked.filter(p => isRestored(p.id));
    return Math.round((done.length / locked.length) * 100);
  }

  /** スポーク進捗 */
  function getSpokeProgress() {
    return SPOKES.map(g => ({
      group: g,
      pages: getSpokePages(g),
      done: getSpokePages(g).filter(p => isRestored(p.id)).length,
      total: getSpokePages(g).length,
      complete: isSpokeComplete(g),
    }));
  }


  /* ────────────────────────────────────────
     Public API
  ──────────────────────────────────────── */
  return {
    PAGES,
    SPOKES,

    // 進捗
    isRestored,
    markRestored,
    getRestored,
    getProgressPercent,
    getSpokeProgress,
    getRestoredPages,
    getLockedPages,

    // キーワード
    submitKeyword,
    checkPrereqUnlocks,
    getKeywords,

    // 通知
    getNotifCount,
    clearNotif,
    addNotif,

    // ページ取得
    getPagesByApp,
    getPage,

    // ユーティリティ
    isFirstLaunch,
    markLaunched,
    resetAll,

    // スポーク
    isSpokeComplete,
    areAllSpokesComplete,
    getSpokePages,
  };

})();

// グローバルに公開
window.KoeOS = KoeOS;
