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
    { id:'archive_about', title:'このアーカイブについて', locked:false, keywords:[], prereqs:[], phase:0, spokeGroup:null, icon:'📁' },
    { id:'soran_profile', title:'蛸川小蘭とは',          locked:false, keywords:[], prereqs:[], phase:0, spokeGroup:null, icon:'👤' },

    // スポークA 手記
    { id:'kiroku_001', title:'手記①　事件の夜',        locked:true, keywords:['昭和二十四年','8月16日','タコ'],           prereqs:[],             phase:1, spokeGroup:'A', icon:'📓' },
    { id:'kiroku_002', title:'手記②　十湯温泉',        locked:true, keywords:['蛸川','偲山','十湯'],                      prereqs:['kiroku_001'], phase:1, spokeGroup:'A', icon:'📓' },
    { id:'kiroku_003', title:'手記③　猫塚清治のこと',  locked:true, keywords:['猫塚清治','不審人物','保線'],              prereqs:['kiroku_002'], phase:1, spokeGroup:'A', icon:'📓' },
    { id:'kiroku_004', title:'手記④　ふみの声',        locked:true, keywords:['ふみ','投函','記録されなかった'],          prereqs:['kiroku_003'], phase:1, spokeGroup:'A', icon:'📓' },

    // スポークB 写真
    { id:'photo_001', title:'写真①　記録されなかった人物',    locked:true, keywords:['ここにいた','裏面','写真'],         prereqs:[],            phase:1, spokeGroup:'B', icon:'📷' },
    { id:'photo_002', title:'写真②　同じ場所・70年の隔たり', locked:true, keywords:['M川駅跡','同一地点','70年'],        prereqs:['photo_001'], phase:1, spokeGroup:'B', icon:'📷' },
    { id:'photo_003', title:'写真③　菜園と暖簾',             locked:true, keywords:['菜園','暖簾','後ろ姿'],             prereqs:['photo_002'], phase:1, spokeGroup:'B', icon:'📷' },

    // スポークC 掲示板
    { id:'bbs_001', title:'掲示板①　投書欄の声',     locked:true, keywords:['検閲','差し止め','投書'],           prereqs:[],           phase:1, spokeGroup:'C', icon:'📋' },
    { id:'bbs_002', title:'掲示板②　守る会のビラ',   locked:true, keywords:['一千三百','守る会','名簿'],          prereqs:['bbs_001'],  phase:1, spokeGroup:'C', icon:'📋' },
    { id:'bbs_003', title:'掲示板③　無罪確定まで',   locked:true, keywords:['猫塚清治は今日も存在しない','切り抜き'], prereqs:['bbs_002'], phase:1, spokeGroup:'C', icon:'📋' },

    // スポークD 地図
    { id:'map_001', title:'地図①　芙島市中心部',         locked:true, keywords:['座標','芙島市','埋め込み'],      prereqs:[],           phase:1, spokeGroup:'D', icon:'🗺' },
    { id:'map_002', title:'地図②　桃見山',               locked:true, keywords:['桃見山','三月','帰れる'],        prereqs:['map_001'],  phase:1, spokeGroup:'D', icon:'🗺' },
    { id:'map_003', title:'地図③　蒼沼ブルーランドへ',   locked:true, keywords:['蒼沼','廃墟','最後'],            prereqs:['map_002'],  phase:1, spokeGroup:'D', icon:'🗺' },

    // スポークE 電文
    { id:'telegram_001', title:'電文①　暗号データ',        locked:true, keywords:['███','受信者','暗号'],              prereqs:[],                phase:1, spokeGroup:'E', icon:'📡' },
    { id:'telegram_002', title:'電文②　№0314の意味',       locked:true, keywords:['0314','N-0314','三月十四日','さんがつじゅうよっか'],  prereqs:['telegram_001'],  phase:1, spokeGroup:'E', icon:'📡' },
    { id:'telegram_003', title:'電文③　声は壁を透して',    locked:true, keywords:['声は壁を透して','未収録','文集'],    prereqs:['telegram_002'],  phase:1, spokeGroup:'E', icon:'📡' },

    // ★v3.1 ツール配布サイト（スポーク進捗には数えない / 暗号ページ閲覧後に検索で到達）
    { id:'freesoft', title:"T.Watanabe's Tools Page", locked:true,
      keywords:['バイナリ','モールス','16進','穿孔','解析ツール','フリーソフト'],
      prereqs:['telegram_001'], phase:1, spokeGroup:null, icon:'💾' },

    // 第2層ハブ（全スポーク完了で自動解放）
    { id:'hub_002', title:'第2層が開く', locked:true, keywords:[], prereqs:[], phase:2, spokeGroup:null, icon:'🔓' },

    // 第2層
    { id:'koaru_record', title:'猫塚清治という人物',    locked:true, keywords:['34歳','菜園','清治'],              prereqs:['hub_002'], phase:2, spokeGroup:null, icon:'👤' },
    { id:'inochi',       title:'なぜ冤罪は生まれたか',  locked:true, keywords:['自白','証拠隠蔽','冤罪'],          prereqs:['hub_002'], phase:2, spokeGroup:null, icon:'📄' },
    { id:'voices',       title:'声を上げた人々',        locked:true, keywords:['広瀬和郎','四面楚歌','書き続けた'], prereqs:['hub_002'], phase:2, spokeGroup:null, icon:'📄' },
    { id:'tegami',       title:'声は壁を透して（文集）', locked:true, keywords:['三百通','収録','守る会'],          prereqs:['hub_002'], phase:2, spokeGroup:null, icon:'📖' },
    { id:'sns',          title:'声の速さと重さ',        locked:true, keywords:['葉書一通','重さ','現代'],          prereqs:['hub_002'], phase:2, spokeGroup:null, icon:'📄' },
    { id:'momo',         title:'芙島市の現在と桃見山',  locked:true, keywords:['今年も','帰れなかった','桃の花'],   prereqs:['hub_002'], phase:2, spokeGroup:null, icon:'🌸' },
    { id:'loop',         title:'ループの伏線回収',      locked:true, keywords:['未来の誰か','データ送信','ループ'], prereqs:['hub_002'], phase:2, spokeGroup:null, icon:'🔄' },
    { id:'data_trace',   title:'小蘭のデータ痕跡の全容', locked:true, keywords:['バイナリ','穿孔','電文'],         prereqs:['hub_002'], phase:2, spokeGroup:null, icon:'💾' },

    // 第3層
    { id:'hidden',      title:'隠しページ',            locked:true, keywords:[], prereqs:['data_trace'], phase:3, spokeGroup:null, icon:'🔮' },
    { id:'fumi_tegami', title:'猫塚ふみの手紙',        locked:true, keywords:[], prereqs:['hidden'],     phase:3, spokeGroup:null, icon:'✉️' },
    { id:'choice',      title:'この手紙を、記録しますか', locked:true, keywords:[], prereqs:['fumi_tegami'], phase:3, spokeGroup:null, icon:'❓' },
    { id:'wiki_add',    title:'架空wiki（追記）',      locked:true, keywords:[], prereqs:['choice'],     phase:3, spokeGroup:null, icon:'📝' },
    { id:'wiki_skip',   title:'架空wiki（スキップ）',  locked:true, keywords:[], prereqs:['choice'],     phase:3, spokeGroup:null, icon:'📝' },
    { id:'epilogue',    title:'エピローグ',            locked:true, keywords:[], prereqs:['choice'],     phase:3, spokeGroup:null, icon:'🌸' },
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
      markRestored('hub_002'); addNotif('messages', 1);
    }
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
        return norm.includes(nk) || nk.includes(norm);
      });
      if (hit && p.prereqs.every(pid => isRestored(pid))) {
        markRestored(p.id); unlocked.push(p.id); addNotif('messages',1);
      }
    }
    if (unlocked.length) { used.add(norm); ls.saveSet(KEYWORD_KEY,used); _checkHub(); }
    return { success: unlocked.length>0, unlocked, alreadyUsed:false };
  };

  /* prereqのみで解放されるページの連鎖チェック */
  const checkPrereqUnlocks = () => {
    let changed=true;
    while(changed){
      changed=false;
      for(const p of PAGES){
        if(isRestored(p.id)||p.keywords?.length) continue;
        if(p.prereqs.length && p.prereqs.every(pid=>isRestored(pid))){
          markRestored(p.id); addNotif('messages',1); changed=true;
        }
      }
    }
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
