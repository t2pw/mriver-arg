/**
 * koran-os.js — 小蘭OS 最小プロトタイプ (Phase A)
 *
 * 目的: 記録核・八肢・未発見/未読/読了の三状態と「次の復元」だけを動かす。
 * 現行 os.js / koe_* とは別キー (koran_v1_*) を使い、既存セーブに触れない。
 * ダミー資料3件のみ。汎用キーワード欄・モールス・16進・Prayストアは持たない。
 */
'use strict';

const KoranOS = (() => {
  const STATE_KEY = 'koran_v1_state';

  // 八肢。各肢が資料群へつながる。Phase Aは3件だけ実資料、残りは未発見。
  const ARMS = [
    { id: 'arm1', label: '第一肢', sub: '受信記録' },
    { id: 'arm2', label: '第二肢', sub: '現場記録' },
    { id: 'arm3', label: '第三肢', sub: '画像記録' },
    { id: 'arm4', label: '第四肢', sub: '未検出' },
    { id: 'arm5', label: '第五肢', sub: '未検出' },
    { id: 'arm6', label: '第六肢', sub: '未検出' },
    { id: 'arm7', label: '第七肢', sub: '未検出' },
    { id: 'arm8', label: '第八肢', sub: '未検出' },
  ];

  // ダミー3件。短い循環: 次の復元を見る→未読を開く→読了→次が復元される。
  const DOCS = [
    {
      id: 'koran_a01',
      arm: 'arm1',
      title: '受信通知／この記録について',
      kind: '通知',
      prereq: null,
      body: [
        'この端末には、欠けた記録が残されています。',
        '新しく復元された資料を読み、外部の記録と照らし合わせ、受信先を復元してください。',
        '',
        '【基本操作】',
        '・新着資料を読む',
        '・資料同士を比べる（※本プロトタイプでは読了のみ）',
        '・必要な外部記録を開く（※本プロトタイプでは省略）',
        '',
        'まずは下の「次の復元」にある一件を開いてください。',
      ].join('\n'),
    },
    {
      id: 'koran_a02',
      arm: 'arm2',
      title: '事件翌朝の断片（試作）',
      kind: '手記断片',
      prereq: 'koran_a01',
      body: [
        '八月十七日、朝。宿の主人は帳面から目を上げなかった。',
        '外では蝉が鳴いていた。昨夜のことは誰も口にしない。',
        '',
        '（※Phase A用の短い断片。本文は全編移植時に差し替える）',
      ].join('\n'),
    },
    {
      id: 'koran_a03',
      arm: 'arm3',
      title: '昭和二十四年八月の写真（断片）',
      kind: '画像断片',
      prereq: 'koran_a02',
      body: [
        '壁に貼られた新聞の日付だけが読める。人物については断定しない。',
        '写り方の違和感を覚えておくこと。',
        '',
        '（※Phase A用の短い断片。観察パズルはPhase Cで実装）',
      ].join('\n'),
    },
  ];

  function defaultState() {
    return { restored: ['koran_a01'], viewed: {} };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (!raw) return defaultState();
      const s = JSON.parse(raw);
      if (!s || !Array.isArray(s.restored) || typeof s.viewed !== 'object') return defaultState();
      return s;
    } catch {
      return defaultState();
    }
  }

  function save(s) {
    try { localStorage.setItem(STATE_KEY, JSON.stringify(s)); } catch {}
  }

  function getDoc(id) {
    return DOCS.find(d => d.id === id) || null;
  }

  function isRestored(id) {
    return load().restored.includes(id);
  }

  function isViewed(id) {
    return Boolean(load().viewed[id]);
  }

  function viewedAt(id) {
    return load().viewed[id] || null;
  }

  /** 読了にする。読了で次の資料が1件復元される（短い循環）。 */
  function markViewed(id) {
    const s = load();
    if (!s.restored.includes(id)) return false;
    const first = !s.viewed[id];
    if (first) {
      s.viewed[id] = new Date().toISOString();
      const doc = getDoc(id);
      // 次の資料を1件だけ復元する
      const next = DOCS.find(d => d.prereq === id && !s.restored.includes(d.id));
      if (next) s.restored.push(next.id);
      save(s);
    }
    return first;
  }

  /** 常設の「次の復元」1件。未読の復元済みを優先し、なければなし。 */
  function nextRestoration() {
    const s = load();
    const unread = DOCS.find(d => s.restored.includes(d.id) && !s.viewed[d.id]);
    return unread || null;
  }

  function unreadCount() {
    const s = load();
    return DOCS.filter(d => s.restored.includes(d.id) && !s.viewed[d.id]).length;
  }

  function progress() {
    const s = load();
    const viewed = DOCS.filter(d => s.viewed[d.id]).length;
    return { viewed, total: DOCS.length, unread: unreadCount(), restored: s.restored.length };
  }

  /** 肢の状態: undiscovered / has-unread / has-restored-read / partial */
  function armState(armId) {
    const docs = DOCS.filter(d => d.arm === armId);
    if (!docs.length) return 'undiscovered';
    const s = load();
    const restored = docs.filter(d => s.restored.includes(d.id));
    if (!restored.length) return 'undiscovered';
    if (restored.some(d => !s.viewed[d.id])) return 'has-unread';
    return 'read';
  }

  function armDocs(armId) {
    return DOCS.filter(d => d.arm === armId);
  }

  function resetForTest() {
    try { localStorage.removeItem(STATE_KEY); } catch {}
  }

  return {
    ARMS, DOCS, STATE_KEY,
    load, getDoc, isRestored, isViewed, viewedAt,
    markViewed, nextRestoration, unreadCount, progress,
    armState, armDocs, resetForTest,
  };
})();

window.KoranOS = KoranOS;
