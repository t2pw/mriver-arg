/**
 * os.js ── 「声は壁を透して」OS層 v3.1
 * 進捗管理 / キーワード認証 / アンロック / 履歴管理 / 解析アプリのインストール管理
 * v3.1: freesoft（ツール配布サイト）をページ登録（A案・構造的順序保証）
 */
'use strict';

const KoeOS = (() => {

  const STORAGE_KEY  = 'koe_restored';
  const KEYWORD_KEY  = 'koe_keywords';
  const HISTORY_KEY  = 'koe_history';   // 閲覧履歴
  const NOTIF_KEY    = 'koe_notif';
  const LAUNCHED_KEY = 'koe_launched';
  const INSTALLED_KEY= 'koe_installed_apps';  // ★v3 解析アプリのインストール状態

  /* ──────────────────────────────────────
     ページ定義テーブル
  ────────────────────────────────────── */
  const PAGES = [
    // 最初から読める
    { id:'archive_about', title:'このアーカイブについて', locked:false, keywords:['蛸川小蘭','小蘭','蛸川'], prereqs:[], phase:0, spokeGroup:null, icon:'📁' },

    // スポークA 手記
    // kiroku_001: soran_profile に「月湯温泉に逃げ込み」とある
    { id:'kiroku_001', title:'手記①　事件の夜',        locked:true, keywords:['月湯温泉','土湯温泉'],        prereqs:[],             phase:1, spokeGroup:'A', icon:'📓' },
    // kiroku_002: kiroku_001 末尾「月湯温泉に着いた頃には」
    { id:'kiroku_002', title:'手記②　月湯温泉',        locked:true, keywords:['月湯温泉'], prereqs:['kiroku_001'], phase:1, spokeGroup:'A', icon:'📓' },
    // kiroku_003: kiroku_002 末尾「次に書くべきは、彼のこと──猫塚清治」
    { id:'kiroku_003', title:'手記③　清治さんのこと',  locked:true, keywords:['猫塚清治','清治'], prereqs:['kiroku_002'], phase:1, spokeGroup:'A', icon:'📓' },
    // kiroku_004: kiroku_003 末尾「封筒に宛名を書けない／書けない手紙が始まった」
    { id:'kiroku_004', title:'手記④　書けない手紙',    locked:true, keywords:['封筒','書けない手紙'], prereqs:['kiroku_003'], phase:1, spokeGroup:'A', icon:'📓' },

    // スポークB 写真
    // photo_001: soran_profile「記録されなかった人物が草むらすれすれから写されている」
    { id:'photo_001', title:'写真①　記録されなかった人物',    locked:true, keywords:['脱線','脱線事故'],           prereqs:[],            phase:1, spokeGroup:'B', icon:'📷' },
    // photo_002: photo_001 末尾「昭和二十四年八月の一枚」
    { id:'photo_002', title:'写真②　同じ場所・70年の隔たり', locked:true, keywords:['昭和24年','昭和二十四年','昭和24年8月16日','昭和二十四年八月十六日','1949年8月16日'], prereqs:['photo_001'], phase:1, spokeGroup:'B', icon:'📷' },
    // photo_003: photo_002 末尾「M川駅そばの家、暖簾のそばに」
    { id:'photo_003', title:'写真③　菜園のある家',           locked:true, keywords:['M川駅','松川駅'], prereqs:['photo_002'], phase:1, spokeGroup:'B', icon:'📷' },

    // スポークC 掲示板
    // bbs_001: soran_profile「M川事件」（松川事件は実在語フック）
    { id:'bbs_001', title:'掲示板①　投書欄の声',     locked:true, keywords:['M川事件','松川事件'],    prereqs:[],           phase:1, spokeGroup:'C', icon:'📋' },
    // bbs_002: bbs_001「M川事件を守る会が結成された」
    { id:'bbs_002', title:'掲示板②　守る会のビラ',   locked:true, keywords:['M川事件を守る会'], prereqs:['bbs_001'],  phase:1, spokeGroup:'C', icon:'📋' },
    // bbs_003: bbs_002「冤罪を晴らすために」
    { id:'bbs_003', title:'掲示板③　無罪確定まで',   locked:true, keywords:['冤罪','自白強要','冤罪事件'], prereqs:['bbs_002'],  phase:1, spokeGroup:'C', icon:'📋' },

    // スポークD 地図（謎解きスポーク）
    // map_001: soran_intro メッセージ「芙島市の地図がある」
    { id:'map_001', title:'地図①　芙島市中心部',         locked:true, keywords:['芙島市'], prereqs:[],           phase:1, spokeGroup:'D', icon:'🗺' },
    // map_002: map_001 謎解き答え ── 異常マーカーのpopup「桃見山、花見山」
    { id:'map_002', title:'地図②　桃見山',               locked:true, keywords:['桃見山','花見山'],           prereqs:['map_001'],  phase:1, spokeGroup:'D', icon:'🗺' },
    // map_003: map_002 謎解き答え ── 1963年3月マーカー／本文「蒼沼ブルーランド」が透けて見える
    { id:'map_003', title:'地図③　蒼沼ブルーランドへ',   locked:true, keywords:['蒼沼ブルーランド','蒼沼'], prereqs:['map_002'],  phase:1, spokeGroup:'D', icon:'🗺' },

    // スポークE 電文（謎解きスポーク）
    // telegram_001: soran_intro 添付ファイルに「復号キー：N-0816」
    { id:'telegram_001', title:'電文①　暗号データ',     locked:true, keywords:['復号キー','暗号キー','復号'],   prereqs:[],                phase:1, spokeGroup:'E', icon:'📡' },
    // telegram_002: telegram_001 謎解き答え ── hexconv＋モールス両方の解答「0816」
    { id:'telegram_002', title:'電文②　N-0816の意味',   locked:true, keywords:['0816','N-0816'], prereqs:['telegram_001'], phase:1, spokeGroup:'E', icon:'📡' },
    // telegram_003: telegram_002 末尾「一冊の文集の名前──『声は壁を透して』」
    { id:'telegram_003', title:'電文③　声は壁を透して', locked:true, keywords:['声は壁を透して','文集','未収録'], prereqs:['telegram_002'],  phase:1, spokeGroup:'E', icon:'📡' },

    // ツール配布サイト（スポーク進捗には数えない / telegram_001 の kwTag クリックで検索）
    { id:'freesoft', title:"T.Watanabe's Tools Page", locked:true,
      keywords:['バイナリ','モールス','16進','穿孔','解析ツール','フリーソフト'],
      prereqs:['telegram_001'], phase:1, spokeGroup:null, icon:'💾' },

    // 第2層ハブ（全スポーク完了で自動解放）
    { id:'hub_002', title:'第2層が開く', locked:true, keywords:[], prereqs:[], phase:2, spokeGroup:null, icon:'🔓' },

    // 第2層は連鎖：hub_002 →(なぜ冤罪は生まれたか)→ inochi →prereq→ voices →prereq→ tegami
    //   →prereq→ sns →prereq→ momo →prereq→ loop →prereq→ data_trace →prereq→ hidden
    //   inochi のみキーワード解放、それ以降は prereq 自動解放
    { id:'inochi',       title:'なぜ冤罪は生まれたか',  locked:true, keywords:['なぜ冤罪は生まれたか'], prereqs:['hub_002'], phase:2, spokeGroup:null, icon:'📄' },
    { id:'voices',       title:'声を上げた人々',        locked:true, keywords:[], prereqs:['inochi'],    phase:2, spokeGroup:null, icon:'📄' },
    { id:'tegami',       title:'声は壁を透して（文集）', locked:true, keywords:[], prereqs:['voices'],    phase:2, spokeGroup:null, icon:'📖' },
    { id:'sns',          title:'声の速さと重さ',        locked:true, keywords:[], prereqs:['tegami'],    phase:2, spokeGroup:null, icon:'📄' },
    { id:'momo',         title:'芙島市の現在と桃見山',  locked:true, keywords:[], prereqs:['sns'],       phase:2, spokeGroup:null, icon:'🌸' },
    { id:'loop',         title:'記録の行方',            locked:true, keywords:[], prereqs:['momo'],      phase:2, spokeGroup:null, icon:'🔄' },
    { id:'data_trace',   title:'小蘭のデータ痕跡の全容', locked:true, keywords:[], prereqs:['loop'],     phase:2, spokeGroup:null, icon:'💾' },

    // 第3層
    { id:'hidden',      title:'隠しページ',             locked:true, keywords:[], prereqs:['data_trace'], phase:3, spokeGroup:null, icon:'🔮' },
    { id:'fumi_tegami', title:'蛸川小蘭の手紙',         locked:true, keywords:[], prereqs:['hidden'],     phase:3, spokeGroup:null, icon:'✉️' },
    { id:'choice',      title:'この手紙を、記録しますか', locked:true, keywords:[], prereqs:['fumi_tegami'], phase:3, spokeGroup:null, icon:'❓' },
    { id:'wiki_add',    title:'架空wiki（追記）',       locked:true, keywords:[], prereqs:['choice'],     phase:3, spokeGroup:null, icon:'📝' },
    { id:'wiki_skip',   title:'架空wiki（スキップ）',   locked:true, keywords:[], prereqs:['choice'],     phase:3, spokeGroup:null, icon:'📝' },
    { id:'epilogue',    title:'エピローグ',             locked:true, keywords:[], prereqs:['choice'],     phase:3, spokeGroup:null, icon:'🌸' },
  ];

  const SPOKES = ['A','B','C','D','E'];

  /* ──────────────────────────────────────
     ★v3 解析アプリ定義テーブル
  ────────────────────────────────────── */
  const TOOL_APPS = [
    { id:'hexconv', name:'16進変換器',     icon:'🔢', spoke:'E', desc:'16進数をカタカナに変換する解析ツール。' },
    { id:'morse',   name:'モールス読取機', icon:'📻', spoke:'E', desc:'穿孔パターンをモールス符号として数字に変換する。' },
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

  const addHistory = (id) => {
    const page = PAGES.find(p => p.id === id);
    if (!page) return;
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

  /* ── キーワード認証 ── */
  const submitKeyword = input => {
    const norm = input.trim().replace(/\s+/g,'');
    const used = getKeywords();
    if (used.has(norm)) return { success:false, unlocked:[], alreadyUsed:true };

    const unlocked = [];
    for (const p of PAGES) {
      if (isRestored(p.id) || !p.keywords?.length) continue;
      const hit = p.keywords.some(kw => {
        const nk = kw.replace(/\s+/g,'');
        return norm === nk;
      });
      if (hit && p.prereqs.every(pid => isRestored(pid))) {
        markRestored(p.id); unlocked.push(p.id);
      }
    }
    if (unlocked.length) { used.add(norm); ls.saveSet(KEYWORD_KEY,used); const hub=_checkHub(); if(hub) unlocked.push(hub); }
    return { success: unlocked.length>0, unlocked, alreadyUsed:false };
  };

  /* prereqのみで解放されるページの連鎖チェック */
  const checkPrereqUnlocks = () => {
    const newlyUnlocked = [];
    let changed=true;
    while(changed){
      changed=false;
      for(const p of PAGES){
        if(isRestored(p.id)||p.keywords?.length) continue;
        if(p.prereqs.length && p.prereqs.every(pid=>isRestored(pid))){
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
  const resetAll = () => [STORAGE_KEY,KEYWORD_KEY,HISTORY_KEY,NOTIF_KEY,LAUNCHED_KEY,INSTALLED_KEY]
    .forEach(k=>localStorage.removeItem(k));

  return {
    PAGES, SPOKES, TOOL_APPS,
    isRestored, markRestored, getRestored,
    getProgressPercent, getSpokeProgress,
    submitKeyword, checkPrereqUnlocks, getKeywords,
    getNotif, addNotif, clearNotif,
    getHistory, addHistory, clearHistory,
    isFirstLaunch, markLaunched, resetAll,
    isSpokeComplete, areAllSpokesComplete, getSpokePages,
    getInstalled, isInstalled, installApp, uninstallApp, getToolApp,
    getPage: id => PAGES.find(p=>p.id===id),
  };
})();

window.KoeOS = KoeOS;
