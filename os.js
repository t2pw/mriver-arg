/**
 * os.js ── 「声は壁を透して」OS層 v3.2
 * 進捗管理 / キーワード認証 / アンロック / 履歴管理 / 解析アプリのインストール管理
 * v3.1: freesoft（ツール配布サイト）をページ登録（A案・構造的順序保証）
 * v3.2: prereq連鎖を「閲覧済み」基準に変更（一括解放の防止）／
 *       「一致したが前提不足」応答（prereqBlocked）／検索失敗カウンタ（missStreak）／
 *       choice内ボタン解放ページ（manual:true）を連鎖対象外に
 * v3.3: 第2層を背骨＋資料棚に再構成。data_trace は黒塗り復元謎（バックアップ）の検索解放
 * v3.4: セクタマップ（タコ躯体図）用の getLegProgress を追加
 * v3.5: 隠しページ okaeri（TRUE END・manual）／telegram_001 に「電文」、freesoft に
 *       「モールス符号・電信符号」キーワード追加（0611テストプレイレビュー対応）
 */
'use strict';

const KoeOS = (() => {

  const STORAGE_KEY  = 'koe_restored';
  const KEYWORD_KEY  = 'koe_keywords';
  const HISTORY_KEY  = 'koe_history';   // 閲覧履歴
  const NOTIF_KEY    = 'koe_notif';
  const LAUNCHED_KEY = 'koe_launched';
  const INSTALLED_KEY= 'koe_installed_apps';  // ★v3 解析アプリのインストール状態
  const MISS_KEY     = 'koe_miss_streak';     // ★v3.2 解放なし検索の連続回数（ヒント用）

  /* ──────────────────────────────────────
     ページ定義テーブル
  ────────────────────────────────────── */
  const PAGES = [
    // 最初から読める
    // archive_about は locked:false（常時公開）のため解錠キーワード不要。旧keywordsは bbs_003 の名簿照合と衝突するため撤去
    { id:'archive_about', title:'このアーカイブについて', locked:false, keywords:[], prereqs:[], phase:0, spokeGroup:null, icon:'📁' },

    // スポークA 手記
    // kiroku_001: archive_about に「月湯温泉に逃げ込みました」とある
    { id:'kiroku_001', title:'手記①　事件の夜',        locked:true, keywords:['月湯温泉','土湯温泉'],        prereqs:[],             phase:1, spokeGroup:'A', icon:'📓' },
    // kiroku_002: 黒塗り復元パズル ── kiroku_001 の赤い黒塗り（████＝現代語）を
    //   文脈（「消えない場所」「どこからでも取り出せる」）から推定して検索する
    { id:'kiroku_002', title:'手記②　月湯温泉',        locked:true, keywords:['クラウド','クラウドストレージ'], prereqs:['kiroku_001'], phase:1, spokeGroup:'A', icon:'📓' },
    // kiroku_003: kiroku_002 末尾「次に書くべきは、彼のこと──猫塚清治」
    { id:'kiroku_003', title:'手記③　清治さんのこと',  locked:true, keywords:['猫塚清治','清治'], prereqs:['kiroku_002'], phase:1, spokeGroup:'A', icon:'📓' },
    // kiroku_004: kiroku_003 末尾「封筒に宛名を書けない／書けない手紙が始まった」
    { id:'kiroku_004', title:'手記④　書けない手紙',    locked:true, keywords:['封筒','書けない手紙'], prereqs:['kiroku_003'], phase:1, spokeGroup:'A', icon:'📓' },

    // スポークB 写真
    // photo_001: archive_about「脱線事故が起きた夜です」
    { id:'photo_001', title:'写真①　記録されなかった人物',    locked:true, keywords:['脱線','脱線事故'],           prereqs:[],            phase:1, spokeGroup:'B', icon:'📷' },
    // photo_002: photo_001 末尾「昭和二十四年八月の一枚」
    { id:'photo_002', title:'写真②　同じ場所・70年の隔たり', locked:true, keywords:['昭和24年','昭和二十四年','昭和24年8月16日','昭和二十四年八月十六日','1949年8月16日','昭和24年8月18日','昭和二十四年八月十八日','1949年8月18日'], prereqs:['photo_001'], phase:1, spokeGroup:'B', icon:'📷' },
    // photo_003: photo_002 末尾「M川駅そばの家、暖簾のそばに」
    { id:'photo_003', title:'写真③　菜園のある家',           locked:true, keywords:['M川駅','松川駅','MKAWA'], prereqs:['photo_002'], phase:1, spokeGroup:'B', icon:'📷' },

    // スポークC 掲示板
    // bbs_001: archive_about「新聞はそれをM川事件と呼びました」（松川事件は実在語フック）
    { id:'bbs_001', title:'掲示板①　投書欄の声',     locked:true, keywords:['M川事件','松川事件'],    prereqs:[],           phase:1, spokeGroup:'C', icon:'📋' },
    // bbs_002: bbs_001「M川事件を守る会が結成された」
    { id:'bbs_002', title:'掲示板②　守る会のビラ',   locked:true, keywords:['M川事件を守る会'], prereqs:['bbs_001'],  phase:1, spokeGroup:'C', icon:'📋' },
    // bbs_003: 名簿照合パズル ── bbs_002 ビラの賛同者名簿「蛸川 ██」の塗り潰しを、記録者の名前と照合する
    { id:'bbs_003', title:'掲示板③　無罪確定まで',   locked:true, keywords:['蛸川小蘭','小蘭'], prereqs:['bbs_002'],  phase:1, spokeGroup:'C', icon:'📋' },

    // スポークD 地図（謎解きスポーク）
    // map_001: soran_intro メッセージ「芙島市の地図がある」
    { id:'map_001', title:'地図①　芙島市中心部',         locked:true, keywords:['芙島市'], prereqs:[],           phase:1, spokeGroup:'D', icon:'🗺' },
    // map_002: map_001 謎解き答え ── 地図上の黒塗り地名「桃見山、花見山」
    { id:'map_002', title:'地図②　桃見山',               locked:true, keywords:['桃見山','花見山'],           prereqs:['map_001'],  phase:1, spokeGroup:'D', icon:'🗺' },
    // map_003: map_002 謎解き答え ── 1973年3月の記録／本文「蒼沼ブルーランド」が透けて見える
    { id:'map_003', title:'地図③　蒼沼ブルーランドへ',   locked:true, keywords:['蒼沼ブルーランド','蒼沼'], prereqs:['map_002'],  phase:1, spokeGroup:'D', icon:'🗺' },

    // スポークE 電文（謎解きスポーク）
    // telegram_001: soran_intro 添付ファイルに「復号キー：N-0816」
    { id:'telegram_001', title:'電文①　暗号データ',     locked:true, keywords:['復号キー','暗号キー','復号','電文'],   prereqs:[],                phase:1, spokeGroup:'E', icon:'📡' },
    // telegram_002: telegram_001 謎解き答え ── hexconv＋モールス両方の解答「0816」
    { id:'telegram_002', title:'電文②　N-0816の意味',   locked:true, keywords:['0816','N-0816'], prereqs:['telegram_001'], phase:1, spokeGroup:'E', icon:'📡' },
    // telegram_003: telegram_002 末尾「一冊の文集の名前──『声は壁を透して』」
    { id:'telegram_003', title:'電文③　声は壁を透して', locked:true, keywords:['声は壁を透して','文集','未収録'], prereqs:['telegram_002'],  phase:1, spokeGroup:'E', icon:'📡' },

    // ★v3.6 freesoft（ツール配布サイトページ）は廃止。解析ツールはホームの
    //   ストアアプリ（phone_shell renderStore・開発者＝蛸川小蘭）から入手する。
    //   ツール関連語（モールス・16進等）の照合は doSearch がストアへ橋渡しする。

    // 第2層ハブ（全スポーク完了で自動解放）
    { id:'hub_002', title:'第2層が開く', locked:true, keywords:[], prereqs:[], phase:2, spokeGroup:null, icon:'🔓' },

    // 第2層（★v3.3 背骨＋資料棚）：
    //   背骨：hub_002 →(検索:なぜ冤罪は生まれたか)→ inochi →閲覧→ loop →(検索:バックアップ)→ data_trace →閲覧→ receiver_lock
    //   資料棚：voices / tegami / sns / momo は hub_002 閲覧で一括解放（任意閲覧。読破は進行条件にしない）。
    //   prereq連鎖は「閲覧済み」基準（★v3.2。一括解放を防ぐ）。
    //   data_trace は検索解放（中間謎：tegami 添え状断片の赤い黒塗り＝バックアップ）。receiver_lock の条件は data_trace のみ。
    { id:'inochi',       title:'なぜ冤罪は生まれたか',  locked:true, keywords:['なぜ冤罪は生まれたか'], prereqs:['hub_002'], phase:2, spokeGroup:null, icon:'📄' },
    { id:'voices',       title:'声を上げた人々',        locked:true, keywords:[], prereqs:['hub_002'],   phase:2, spokeGroup:null, icon:'📄' },
    { id:'tegami',       title:'声は壁を透して（文集）', locked:true, keywords:[], prereqs:['hub_002'],  phase:2, spokeGroup:null, icon:'📖' },
    { id:'sns',          title:'声の速さと重さ',        locked:true, keywords:[], prereqs:['hub_002'],   phase:2, spokeGroup:null, icon:'📄' },
    { id:'momo',         title:'芙島市の現在と桃見山',  locked:true, keywords:[], prereqs:['hub_002'],   phase:2, spokeGroup:null, icon:'🌸' },
    { id:'memo',         title:'一冊の大学ノート',      locked:true, keywords:[], prereqs:['hub_002'],   phase:2, spokeGroup:null, icon:'📓' },
    { id:'loop',         title:'記録の行方',            locked:true, keywords:[], prereqs:['inochi'],    phase:2, spokeGroup:null, icon:'🔄' },
    { id:'data_trace',   title:'小蘭のデータ痕跡の全容', locked:true, keywords:['バックアップ','データのバックアップ'], prereqs:['loop'], phase:2, spokeGroup:null, icon:'💾' },

    // 第3層
    // receiver_lock: data_trace読了で自動解放 → 不明送信元のモールス → 数字 → 16進 → カタカナ → hidden
    { id:'receiver_lock', title:'最後のロック', locked:true, keywords:[], prereqs:['data_trace'], phase:3, spokeGroup:null, icon:'🔒' },
    { id:'hidden',      title:'隠しページ',             locked:true, keywords:['あなたはここにいた','アナタハココニイタ'], prereqs:['receiver_lock'], phase:3, spokeGroup:null, icon:'🔮' },
    { id:'fumi_tegami', title:'蛸川小蘭の手紙',         locked:true, keywords:[], prereqs:['hidden'],     phase:3, spokeGroup:null, icon:'✉️' },
    { id:'choice',      title:'この手紙を、追記してください', locked:true, keywords:[], prereqs:['fumi_tegami'], phase:3, spokeGroup:null, icon:'❓' },
    // ★v3.2 以下3ページは prereq 連鎖から除外（manual:true）。
    //   choice ページ内の選択ボタン（bNavigate → _loadPage の markRestored）で解放される。
    //   選択を提示する前に「追記しない選択」「エピローグ」が一覧・通知に並ぶのを防ぐ。
    { id:'wiki_add',    title:'M川事件（編集）',        locked:true, keywords:[], prereqs:['choice'],     manual:true, phase:3, spokeGroup:null, icon:'📝' },
    { id:'wiki_skip',   title:'追記しない選択',         locked:true, keywords:[], prereqs:['choice'],     manual:true, phase:3, spokeGroup:null, icon:'📝' },
    { id:'epilogue',    title:'エピローグ',             locked:true, keywords:[], prereqs:['choice'],     manual:true, phase:3, spokeGroup:null, icon:'🌸' },
    // ★v3.5 隠し（TRUE END）：クリア後の未復号断片（モールス→数字→16進）を解読し、
    //   wiki の「あなたの一行」に書いて保存すると、エピローグの「返信を開く」ボタン
    //   （bNavigate → markRestored）で解放される。検索キーワードでは開かない。
    { id:'okaeri',      title:'返信',                   locked:true, keywords:[], prereqs:['epilogue'],   manual:true, phase:3, spokeGroup:null, icon:'🐙' },
  ];

  const SPOKES = ['A','B','C','D','E'];

  /* ── ★v3.4 セクタマップ（タコ躯体図）：8本の足＝記録グループ ── */
  const TAKO_LEGS = [
    { id:'A',     label:'手記',     pages:['kiroku_001','kiroku_002','kiroku_003','kiroku_004'] },
    { id:'B',     label:'写真',     pages:['photo_001','photo_002','photo_003'] },
    { id:'C',     label:'掲示板',   pages:['bbs_001','bbs_002','bbs_003'] },
    { id:'D',     label:'地図',     pages:['map_001','map_002','map_003'] },
    { id:'E',     label:'電文',     pages:['telegram_001','telegram_002','telegram_003'] },
    { id:'spine', label:'深層記録', pages:['hub_002','inochi','loop','data_trace'] },
    { id:'shelf', label:'資料棚',   pages:['voices','memo','tegami','sns','momo'] },
    { id:'core',  label:'最深部',   pages:['receiver_lock','hidden','fumi_tegami','choice','epilogue'] },
  ];
  // wiki_add/wiki_skip（choice の分岐演出）と okaeri（TRUE END）は躯体図に含めない
  const getLegProgress = () => TAKO_LEGS.map(leg => {
    const sectors = leg.pages.map(pid => {
      const p = PAGES.find(pg => pg.id === pid);
      return { id: pid, title: p ? p.title : pid, restored: isRestored(pid), viewed: isViewed(pid) };
    });
    return {
      id: leg.id, label: leg.label, sectors,
      revealed: sectors.some(s => s.restored),
      fixed: sectors.filter(s => s.viewed).length,
      total: sectors.length,
      complete: sectors.every(s => s.viewed),
    };
  });

  /* ──────────────────────────────────────
     ★v3 解析アプリ定義テーブル
  ────────────────────────────────────── */
  const TOOL_APPS = [
    { id:'hexconv', name:'16進変換器',     icon:'🔢', spoke:'E', desc:'16進数をカタカナに変換する解析ツール。' },
    { id:'morse',   name:'モールス読取機', icon:'📻', spoke:'E', desc:'記録された符号列（・と−）をモールス符号として数字に変換する。' },
    // 今後：binary（C）、coord（D）など
  ];

  /* ── localStorage ── */
  const ls = {
    getSet:  k => { try { return new Set(JSON.parse(localStorage.getItem(k)||'[]')); } catch { return new Set(); } },
    saveSet: (k,s) => localStorage.setItem(k, JSON.stringify([...s])),
    getObj:  k => { try { return JSON.parse(localStorage.getItem(k)||'{}'); } catch { return {}; } },
    saveObj: (k,o) => localStorage.setItem(k, JSON.stringify(o)),
  };

  const getRestored = () => ls.getSet(STORAGE_KEY);
  const getKeywords = () => ls.getSet(KEYWORD_KEY);

  const isRestored = id => getRestored().has(id);

  const markRestored = id => {
    const s = getRestored();
    if (s.has(id)) return false;
    s.add(id); ls.saveSet(STORAGE_KEY, s); return true;
  };

  /* ── ★v3 インストール管理 ── */
  const getInstalled = () => ls.getSet(INSTALLED_KEY);
  const isInstalled  = id => getInstalled().has(id);
  const installApp   = id => {
    const s = getInstalled();
    if (s.has(id)) return false;
    s.add(id); ls.saveSet(INSTALLED_KEY, s); return true;
  };
  const uninstallApp = id => {   // ★v3.1 デバッグ用：アンインストール
    const s = getInstalled();
    if (!s.has(id)) return false;
    s.delete(id); ls.saveSet(INSTALLED_KEY, s); return true;
  };
  const getToolApp   = id => TOOL_APPS.find(a => a.id === id);

  /* ── 履歴 ── */
  const getHistory = () => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)||'[]'); } catch { return []; }
  };

  // ★v3.2 閲覧済み判定（prereq連鎖の基準）。
  //   解放と同時に閲覧扱いにしないため、markRestored ではなく履歴を見る。
  //   連鎖解放はページを開いた瞬間（_loadPage の addHistory 後）に判定されるので、
  //   履歴の50件上限やクリアで取り逃すことはない。
  const VIEWED_KEY = 'koe_viewed';
  const isViewed = id => ls.getSet(VIEWED_KEY).has(id);
  const markViewed = id => {
    const s = ls.getSet(VIEWED_KEY);
    if (s.has(id)) return false;
    s.add(id); ls.saveSet(VIEWED_KEY, s); return true;
  };

  // ★ セクタ固定率：閲覧済み（＝損耗から固定された）ページの割合。ブラウザのホームに表示する
  const getFixedPercent = () => {
    const v = ls.getSet(VIEWED_KEY);
    const locked = PAGES.filter(p => p.locked);
    return Math.round(locked.filter(p => v.has(p.id)).length / locked.length * 100);
  };

  const addHistory = (id) => {
    const page = PAGES.find(p => p.id === id);
    if (!page) return;
    markViewed(id);  // ★v3.2 prereq連鎖用の閲覧フラグ（履歴クリアの影響を受けない）
    const h = getHistory().filter(e => e.id !== id); // 重複除去（最新を先頭に）
    h.unshift({ id, title: page.title, icon: page.icon, ts: Date.now() });
    if (h.length > 50) h.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
  };

  const clearHistory = () => localStorage.removeItem(HISTORY_KEY);

  /* ── 通知 ── */
  const getNotif = app => (ls.getObj(NOTIF_KEY)[app] || 0);
  const addNotif = (app, n=1) => {
    const o = ls.getObj(NOTIF_KEY); o[app]=(o[app]||0)+n; ls.saveObj(NOTIF_KEY,o);
  };
  const clearNotif = app => {
    const o = ls.getObj(NOTIF_KEY); delete o[app]; ls.saveObj(NOTIF_KEY,o);
  };

  /* ── スポーク ── */
  const getSpokePages    = g => PAGES.filter(p => p.spokeGroup === g);
  const isSpokeComplete  = g => getSpokePages(g).every(p => isRestored(p.id));
  const areAllSpokesComplete = () => SPOKES.every(g => isSpokeComplete(g));

  const _checkHub = () => {
    if (!isRestored('hub_002') && areAllSpokesComplete()) {
      markRestored('hub_002');
      return 'hub_002';
    }
    return null;
  };

  /* ── ★v3.2 検索失敗カウンタ（解放なし検索の連続回数。ヒント表示用） ── */
  const getMissStreak = () => {
    const n = parseInt(localStorage.getItem(MISS_KEY) || '0', 10);
    return Number.isFinite(n) ? n : 0;
  };
  const _setMissStreak = n => localStorage.setItem(MISS_KEY, String(n));

  /* ── キーワード認証 ──
     ★v3.2 戻り値に prereqBlocked（一致したが前提となる記録が未復元）と
     missStreak（連続失敗回数）を追加。prereqBlocked のときはキーワードを
     使用済みにしない（前提を満たした後に再検索できる）。完全一致仕様は維持。 */
  const submitKeyword = input => {
    const norm = input.trim().replace(/\s+/g,'');
    const used = getKeywords();
    if (used.has(norm)) return { success:false, unlocked:[], alreadyUsed:true, prereqBlocked:false, missStreak:getMissStreak() };

    const unlocked = [];
    let blocked = false;
    for (const p of PAGES) {
      if (isRestored(p.id) || !p.keywords?.length) continue;
      const hit = p.keywords.some(kw => {
        const nk = kw.replace(/\s+/g,'');
        return norm === nk;
      });
      if (!hit) continue;
      if (p.prereqs.every(pid => isRestored(pid))) {
        markRestored(p.id); unlocked.push(p.id);
      } else {
        blocked = true;
      }
    }
    if (unlocked.length) {
      used.add(norm); ls.saveSet(KEYWORD_KEY,used);
      const hub=_checkHub(); if(hub) unlocked.push(hub);
      _setMissStreak(0);
    } else if (!blocked) {
      _setMissStreak(getMissStreak() + 1);  // 完全なハズレのみカウント
    }
    return {
      success: unlocked.length>0, unlocked, alreadyUsed:false,
      prereqBlocked: !unlocked.length && blocked,
      missStreak: getMissStreak(),
    };
  };

  /* prereqのみで解放されるページの連鎖チェック
     ★v3.2 「prereqが解放済み」ではなく「prereqが閲覧済み」で連鎖する。
     1ページ読むごとに次の1ページだけが開き、第2層の一括解放を防ぐ。
     manual:true（choice内ボタンで解放）のページは連鎖対象外。 */
  const checkPrereqUnlocks = () => {
    const newlyUnlocked = [];
    let changed=true;
    while(changed){
      changed=false;
      for(const p of PAGES){
        if(isRestored(p.id)||p.keywords?.length||p.manual) continue;
        if(p.prereqs.length && p.prereqs.every(pid=>isViewed(pid))){
          markRestored(p.id); newlyUnlocked.push(p.id); changed=true;
        }
      }
    }
    return newlyUnlocked;
  };

  /* ── 進捗 ── */
  const getProgressPercent = () => {
    const locked = PAGES.filter(p=>p.locked);
    return Math.round(locked.filter(p=>isRestored(p.id)).length / locked.length * 100);
  };

  const getSpokeProgress = () => SPOKES.map(g => ({
    group:g, done:getSpokePages(g).filter(p=>isRestored(p.id)).length,
    total:getSpokePages(g).length, complete:isSpokeComplete(g),
  }));

  /* ── 起動済みフラグ ── */
  const isFirstLaunch = () => !localStorage.getItem(LAUNCHED_KEY);
  const markLaunched  = () => localStorage.setItem(LAUNCHED_KEY,'1');
  const resetAll = () => [STORAGE_KEY,KEYWORD_KEY,HISTORY_KEY,NOTIF_KEY,LAUNCHED_KEY,INSTALLED_KEY,
    VIEWED_KEY,MISS_KEY,
    'koe_msgs_delivered',  // phone_shell.html の物語メッセージ配信済みフラグ
    'koe_msgs_read',       // メッセージ既読フラグ
    'koe_fumi_note',       // wiki_add/wiki_skip の選択記録
  ].forEach(k=>localStorage.removeItem(k));

  return {
    PAGES, SPOKES, TOOL_APPS,
    isRestored, markRestored, getRestored,
    isViewed, markViewed,
    getFixedPercent,
    getProgressPercent, getSpokeProgress,
    submitKeyword, checkPrereqUnlocks, getKeywords, getMissStreak,
    getNotif, addNotif, clearNotif,
    getHistory, addHistory, clearHistory,
    isFirstLaunch, markLaunched, resetAll,
    isSpokeComplete, areAllSpokesComplete, getSpokePages,
    getInstalled, isInstalled, installApp, uninstallApp, getToolApp,
    getPage: id => PAGES.find(p=>p.id===id),
    TAKO_LEGS, getLegProgress,
  };
})();

window.KoeOS = KoeOS;
