/**
 * os.js — 「声は壁を透して」進行層 v4
 *
 * 15の必読資料、独立サイトの閲覧印、二つの暗号鍵を管理する。
 * 一般検索語による章送りは廃止し、内部資料は読了と外部照合で開く。
 */
'use strict';

const KoeOS = (() => {
  const STORAGE_KEY = 'koe_restored';
  const VIEWED_KEY = 'koe_viewed';
  const EXTERNAL_VISITS_KEY = 'koe_external_visits';
  const KEYWORD_KEY = 'koe_keywords';
  const HISTORY_KEY = 'koe_history';
  const NOTIF_KEY = 'koe_notif';
  const LAUNCHED_KEY = 'koe_launched';
  const INSTALLED_KEY = 'koe_installed_apps';
  const MISS_KEY = 'koe_miss_streak';

  const PAGES = [
    {
      id: 'archive_about',
      title: 'このアーカイブについて',
      locked: false,
      keywords: [],
      prereqs: [],
      phase: 1,
      spokeGroup: 'archive',
      icon: '📁',
    },
    {
      id: 'kiroku_001',
      title: '事件翌朝のノート',
      locked: true,
      keywords: [],
      prereqs: ['archive_about'],
      phase: 1,
      spokeGroup: 'archive',
      icon: '📜',
    },
    {
      id: 'photo_001',
      title: '昭和二十四年八月の写真',
      locked: true,
      keywords: [],
      prereqs: ['kiroku_001'],
      phase: 2,
      spokeGroup: 'evidence',
      icon: '📷',
    },
    {
      id: 'kiroku_003',
      title: '清治さんのこと／書けなかった宛名',
      locked: true,
      keywords: [],
      prereqs: ['photo_001'],
      externalPrereqs: ['fushima-archive'],
      phase: 2,
      spokeGroup: 'evidence',
      icon: '📜',
    },
    {
      id: 'map_001',
      title: '芙島市書込地図 1949–1973',
      locked: true,
      keywords: [],
      prereqs: ['kiroku_003'],
      phase: 2,
      spokeGroup: 'evidence',
      icon: '🗺️',
    },
    {
      id: 'telegram_001',
      title: '接触記録ログ',
      locked: true,
      keywords: [],
      prereqs: ['map_001'],
      externalPrereqs: ['blue-land'],
      phase: 3,
      spokeGroup: 'signal',
      icon: '📡',
    },
    {
      id: 'telegram_002',
      title: 'N-0816 解錠',
      locked: true,
      keywords: ['0816'],
      prereqs: ['telegram_001'],
      phase: 3,
      spokeGroup: 'signal',
      icon: '📡',
    },
    {
      id: 'data_trace',
      title: '記録躯体／送信痕跡',
      locked: true,
      keywords: [],
      prereqs: ['telegram_002'],
      externalPrereqs: ['pray-store', 'fushima-memo', 'fushima-book'],
      phase: 4,
      spokeGroup: 'trace',
      icon: '⌁',
    },
    {
      id: 'receiver_lock',
      title: 'RECEIVER-LOCK',
      locked: true,
      keywords: [],
      prereqs: ['data_trace'],
      phase: 5,
      spokeGroup: 'core',
      icon: '🔒',
    },
    {
      id: 'hidden',
      title: '受信者',
      locked: true,
      keywords: ['あなたはここにいた', 'アナタハココニイタ'],
      prereqs: ['receiver_lock'],
      phase: 5,
      spokeGroup: 'core',
      icon: '◉',
    },
    {
      id: 'fumi_tegami',
      title: '蛸川小蘭の手紙',
      locked: true,
      keywords: [],
      prereqs: ['hidden'],
      phase: 6,
      spokeGroup: 'letter',
      icon: '✉',
    },
    {
      id: 'choice',
      title: '記録の扱い',
      locked: true,
      keywords: [],
      prereqs: ['fumi_tegami'],
      phase: 6,
      spokeGroup: 'letter',
      icon: '◇',
    },
    {
      id: 'wiki_skip',
      title: '記録の外を確かめる',
      locked: true,
      keywords: [],
      prereqs: ['choice'],
      manual: true,
      progress: false,
      phase: 7,
      spokeGroup: null,
      icon: '◇',
    },
    {
      id: 'epilogue',
      title: '読了記録',
      locked: true,
      keywords: [],
      prereqs: ['choice'],
      manual: true,
      phase: 7,
      spokeGroup: 'ending',
      icon: '◌',
    },
    {
      id: 'okaeri',
      title: '返信',
      locked: true,
      keywords: [],
      prereqs: ['epilogue'],
      manual: true,
      progress: false,
      phase: 8,
      spokeGroup: null,
      icon: '⌂',
    },
  ];

  const SPOKES = ['archive', 'evidence', 'signal', 'trace', 'core', 'letter', 'ending'];

  // 八本の肢は物理的な保存群。資料数とは一対一にしない。
  const TAKO_LEGS = [
    {
      id: 'archive', label: '受信記録',
      pages: ['archive_about', 'archive_about', 'kiroku_001', 'kiroku_001'],
      sectorTitles: ['受信ヘッダ', '記録者申告', '事件翌朝', '八月二十日追記'],
    },
    {
      id: 'evidence', label: '写真・人物',
      pages: ['photo_001', 'photo_001', 'photo_001', 'kiroku_003'],
      sectorTitles: ['写真像', '壁面新聞', '裏面書入れ', '清治さんの記録'],
    },
    {
      id: 'map', label: '書込地図',
      pages: ['map_001', 'map_001', 'map_001'],
      sectorTitles: ['1949年書入れ', '1954年書入れ', '1973年書入れ'],
    },
    {
      id: 'signal', label: '接触信号',
      pages: ['telegram_001', 'telegram_001', 'telegram_001', 'telegram_002'],
      sectorTitles: ['破損データ', '接触列', '末尾付記', 'N-0816解錠'],
    },
    {
      id: 'trace', label: '送信痕跡',
      pages: ['data_trace', 'data_trace', 'data_trace', 'data_trace'],
      sectorTitles: ['躯体仕様', '保存履歴', '外部接続', '外部一致'],
    },
    {
      id: 'core', label: '受信者',
      pages: ['receiver_lock', 'receiver_lock', 'receiver_lock', 'hidden'],
      sectorTitles: ['受信者欄', '数字復号', '文字復号', '受信者識別子'],
    },
    {
      id: 'letter', label: '手紙',
      pages: ['fumi_tegami', 'fumi_tegami', 'fumi_tegami', 'choice'],
      sectorTitles: ['宛先', '未投函稿', '手紙本文', '記録の扱い'],
    },
    {
      id: 'ending', label: '読了',
      pages: ['epilogue', 'epilogue', 'epilogue'],
      sectorTitles: ['読了状態', '外部記録', '固定状態'],
    },
  ];

  const TOOL_APPS = [
    {
      id: 'hexconv',
      name: '16進変換器',
      icon: '🔢',
      spoke: 'signal',
      desc: '16進数をカタカナに変換する。',
    },
    {
      id: 'morse',
      name: 'モールス読取機',
      icon: '📻',
      spoke: 'signal',
      desc: '点と線の数字符号を読み取る。',
    },
  ];

  const ls = {
    getSet(key) {
      try {
        const value = JSON.parse(localStorage.getItem(key) || '[]');
        return new Set(Array.isArray(value) ? value : []);
      } catch {
        return new Set();
      }
    },
    saveSet(key, value) {
      localStorage.setItem(key, JSON.stringify([...value]));
    },
    getObj(key) {
      try {
        const value = JSON.parse(localStorage.getItem(key) || '{}');
        return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
      } catch {
        return {};
      }
    },
    saveObj(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  };

  const getRestored = () => ls.getSet(STORAGE_KEY);
  const isRestored = id => getRestored().has(id);
  const markRestored = id => {
    const restored = getRestored();
    if (restored.has(id)) return false;
    restored.add(id);
    ls.saveSet(STORAGE_KEY, restored);
    return true;
  };

  const getExternalVisits = () => ls.getSet(EXTERNAL_VISITS_KEY);
  const hasExternalVisit = id => getExternalVisits().has(id);
  const markExternalVisit = id => {
    const visits = getExternalVisits();
    if (visits.has(id)) return false;
    visits.add(id);
    ls.saveSet(EXTERNAL_VISITS_KEY, visits);
    return true;
  };

  const getInstalled = () => ls.getSet(INSTALLED_KEY);
  const isInstalled = id => getInstalled().has(id);
  const installApp = id => {
    const installed = getInstalled();
    if (installed.has(id)) return false;
    installed.add(id);
    ls.saveSet(INSTALLED_KEY, installed);
    return true;
  };
  const uninstallApp = id => {
    const installed = getInstalled();
    if (!installed.has(id)) return false;
    installed.delete(id);
    ls.saveSet(INSTALLED_KEY, installed);
    return true;
  };
  const getToolApp = id => TOOL_APPS.find(app => app.id === id);

  const isViewed = id => ls.getSet(VIEWED_KEY).has(id);
  const markViewed = id => {
    const viewed = ls.getSet(VIEWED_KEY);
    if (viewed.has(id)) return false;
    viewed.add(id);
    ls.saveSet(VIEWED_KEY, viewed);
    return true;
  };

  const getHistory = () => {
    try {
      const value = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  };
  const addHistory = id => {
    const page = PAGES.find(item => item.id === id);
    if (!page) return;
    markViewed(id);
    const history = getHistory().filter(item => item.id !== id);
    history.unshift({ id, title: page.title, icon: page.icon, ts: Date.now() });
    if (history.length > 50) history.length = 50;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  };
  const clearHistory = () => localStorage.removeItem(HISTORY_KEY);

  const getNotif = app => ls.getObj(NOTIF_KEY)[app] || 0;
  const addNotif = (app, count = 1) => {
    const notifs = ls.getObj(NOTIF_KEY);
    notifs[app] = (notifs[app] || 0) + count;
    ls.saveObj(NOTIF_KEY, notifs);
  };
  const clearNotif = app => {
    const notifs = ls.getObj(NOTIF_KEY);
    delete notifs[app];
    ls.saveObj(NOTIF_KEY, notifs);
  };

  const getKeywords = () => ls.getSet(KEYWORD_KEY);
  const getMissStreak = () => {
    const value = Number.parseInt(localStorage.getItem(MISS_KEY) || '0', 10);
    return Number.isFinite(value) ? value : 0;
  };
  const setMissStreak = value => localStorage.setItem(MISS_KEY, String(value));

  const normalize = value => String(value).trim().replace(/[\s　]+/g, '');
  const prereqsReady = page =>
    (page.prereqs || []).every(isViewed) &&
    (page.externalPrereqs || []).every(hasExternalVisit);

  const submitKeyword = input => {
    const normalized = normalize(input);
    const used = getKeywords();
    if (used.has(normalized)) {
      return {
        success: false,
        unlocked: [],
        alreadyUsed: true,
        prereqBlocked: false,
        missStreak: getMissStreak(),
      };
    }

    const unlocked = [];
    let blocked = false;
    for (const page of PAGES) {
      if (isRestored(page.id) || !(page.keywords || []).length) continue;
      const hit = page.keywords.some(keyword => normalize(keyword) === normalized);
      if (!hit) continue;
      if (prereqsReady(page)) {
        markRestored(page.id);
        unlocked.push(page.id);
      } else {
        blocked = true;
      }
    }

    if (unlocked.length) {
      used.add(normalized);
      ls.saveSet(KEYWORD_KEY, used);
      setMissStreak(0);
    } else if (!blocked) {
      setMissStreak(getMissStreak() + 1);
    }

    return {
      success: unlocked.length > 0,
      unlocked,
      alreadyUsed: false,
      prereqBlocked: !unlocked.length && blocked,
      missStreak: getMissStreak(),
    };
  };

  const checkPrereqUnlocks = () => {
    const unlocked = [];
    for (const page of PAGES) {
      if (!page.locked || page.manual || (page.keywords || []).length || isRestored(page.id)) continue;
      if (!prereqsReady(page)) continue;
      markRestored(page.id);
      unlocked.push(page.id);
    }
    return unlocked;
  };

  const progressPages = () => TAKO_LEGS.flatMap(leg => leg.pages);
  const getProgressPercent = () => {
    const pageIds = progressPages();
    return pageIds.length
      ? Math.round((pageIds.filter(isRestored).length / pageIds.length) * 100)
      : 100;
  };
  const getFixedPercent = () => {
    const pageIds = progressPages();
    return pageIds.length
      ? Math.round((pageIds.filter(isViewed).length / pageIds.length) * 100)
      : 100;
  };

  const getSpokePages = group =>
    PAGES.filter(page => page.spokeGroup === group && page.progress !== false);
  const isSpokeComplete = group =>
    getSpokePages(group).every(page => isRestored(page.id));
  const areAllSpokesComplete = () => SPOKES.every(isSpokeComplete);
  const getSpokeProgress = () => SPOKES.map(group => {
    const pages = getSpokePages(group);
    const done = pages.filter(page => isRestored(page.id)).length;
    return { group, done, total: pages.length, complete: done === pages.length };
  });

  const getLegProgress = () => TAKO_LEGS.map(leg => {
    const sectors = leg.pages.map((id, index) => {
      const page = PAGES.find(item => item.id === id);
      return {
        id,
        title: leg.sectorTitles?.[index] || (page ? page.title : id),
        restored: isRestored(id),
        viewed: isViewed(id),
      };
    });
    return {
      id: leg.id,
      label: leg.label,
      sectors,
      revealed: sectors.some(sector => sector.restored),
      fixed: sectors.filter(sector => sector.viewed).length,
      total: sectors.length,
      complete: sectors.every(sector => sector.viewed),
    };
  });

  const isFirstLaunch = () => !localStorage.getItem(LAUNCHED_KEY);
  const markLaunched = () => localStorage.setItem(LAUNCHED_KEY, '1');

  const resetAll = () => [
    STORAGE_KEY,
    VIEWED_KEY,
    EXTERNAL_VISITS_KEY,
    KEYWORD_KEY,
    HISTORY_KEY,
    NOTIF_KEY,
    LAUNCHED_KEY,
    INSTALLED_KEY,
    MISS_KEY,
    'koe_msgs_delivered',
    'koe_msgs_read',
    'koe_notif_log',
    'koe_fumi_note',
    'koe_ending',
    'koe_end_choice',
    'koe_true_end',
  ].forEach(key => localStorage.removeItem(key));

  return {
    PAGES,
    SPOKES,
    TAKO_LEGS,
    TOOL_APPS,
    getPage: id => PAGES.find(page => page.id === id),
    getRestored,
    isRestored,
    markRestored,
    isViewed,
    markViewed,
    getExternalVisits,
    hasExternalVisit,
    markExternalVisit,
    getKeywords,
    submitKeyword,
    getMissStreak,
    checkPrereqUnlocks,
    getProgressPercent,
    getFixedPercent,
    getSpokePages,
    isSpokeComplete,
    areAllSpokesComplete,
    getSpokeProgress,
    getLegProgress,
    getNotif,
    addNotif,
    clearNotif,
    getHistory,
    addHistory,
    clearHistory,
    getInstalled,
    isInstalled,
    installApp,
    uninstallApp,
    getToolApp,
    isFirstLaunch,
    markLaunched,
    resetAll,
  };
})();

window.KoeOS = KoeOS;
