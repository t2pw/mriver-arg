/**
 * koran-os.js — 小蘭OS 進行層 (Phase B: 第一幕)
 *
 * 第一記録群6資料。読了・写真観察・外部照合・地点特定で進む。
 * 現行 os.js / koe_restored とは別キー (koran_v2_*) を使う。
 * 外部サイトの閲覧印 koe_external_visits は読み取り専用で参照する。
 * 汎用キーワード欄・モールス・16進・Prayストアは持たない。
 */
'use strict';

const KoranOS = (() => {
  const STATE_KEY = 'koran_v2_state';
  const LAUNCHED_KEY = 'koran_v2_launched';
  const LEGACY_KEYS = ['koran_v1_state', 'koran_v1_launched'];

  // 八肢。第一〜第六肢が第一記録群。第七・第八肢は第二幕以降（試作範囲外）。
  const ARMS = [
    { id: 'arm1', label: '第一足', sub: '受信記録' },
    { id: 'arm2', label: '第二足', sub: '現場記録' },
    { id: 'arm3', label: '第三足', sub: '画像記録' },
    { id: 'arm4', label: '第四足', sub: '外部照合' },
    { id: 'arm5', label: '第五足', sub: '人物記録' },
    { id: 'arm6', label: '第六足', sub: '書込地図' },
    { id: 'arm7', label: '第七足', sub: '未検出' },
    { id: 'arm8', label: '第八足', sub: '未検出' },
  ];

  const DOCS = [
    {
      id: 'act1_notice',
      arm: 'arm1',
      title: '受信通知／たこつぼについて',
      kind: '受信通知',
      task: 'read',
      prereqs: [],
      action: '読む',
      body: [
        'RECEIVE LOG',
        '送信日時：1973-09-12 09:04',
        '記録者：蛸川小蘭',
        '受信者：███',
        '読取状態：一部欠損',
        '固定処理：閲覧時に実行',
        '',
        'いつかこれを読む人へ。',
        '',
        '蛸川小蘭という名前で、月湯温泉の宿に勤めています。',
        '戸籍はありません。ここへ来る前の身元を証明する物もありません。',
        '',
        '今日、この土地を離れます。',
        '集めたものは、年代と種類ごとに分けて、たこつぼへ入れました。',
        '最初のノートは、事件翌朝に書いたものです。',
      ].join('\n'),
    },
    {
      id: 'act1_note',
      arm: 'arm2',
      title: '事件翌朝のノート',
      kind: '手記 01',
      task: 'read',
      prereqs: ['act1_notice'],
      action: '読む',
      body: [
        '昭和24年8月17日',
        '',
        '月湯温泉の宿で書いている。押し入れの中には布団が三組あり、黴と樟脳の匂いがする。',
        '昨夜どこから来たのかも話せない女が、灯りをつけて紙に向かっているところを見られたくなかった。',
        '戸を閉めれば、鉛筆の音までは廊下に届かない。',
        '',
        '八月十六日の夜、私はT北本線のM川駅近くで目を覚ました。',
        '線路脇の砂利に頬をつけていた。持っていたのは、タコのぬいぐるみだけだった。',
        'なぜあそこにいたのかは、覚えていない。',
        '',
        '懐中電灯の光が何本も地面を動き、誰かが怒鳴っていた。',
        '草むらへ入ったところで手首をつかまれた。',
        '作業着の男が指を唇に当て、私を畦道まで連れ出した。',
        '',
        '「何をしていた」',
        '「分かりません」',
        '',
        '私がそう答えると、男はタコを一度見た。',
        '西へ行け、駅は使うな、川沿いに上れば温泉がある、と言った。',
        '',
        '別れる前に名前だけ訊いた。猫塚清治と答えた。',
        '',
        '教えられた道を歩き、夜明け前にこの宿へ着いた。',
        '帳場で名前を訊かれ、手の中のぬいぐるみを見ながら「蛸川」と答えた。',
        '主人は聞き返さず、宿帳に書いた。',
        '',
        '事件のことは、朝の話し声で知った。列車が落ち、死者が出たという。',
        '清治さんがあの場所にいたことは、宿の人にも話していない。',
        '',
        '紙に書いたものは、この紙の上にしかない。',
        '向こうにいた頃なら、どの端末からでも開ける████へ置き、控えを取れた。',
        'ここでは濡れれば消え、燃えれば終わる。',
        '主人から便箋を余分にもらい、同じことを二度書くことにした。',
        '',
        '八月二十日　追記',
        '',
        '朝、警察官が二人来た。私は二階の柱の陰から帳場を見ていた。',
        '主人は宿帳を閉じ、首を横に振った。',
        '二人が帰ったあと、いつもの時間に朝食が来た。私の分もあった。',
        '',
        '山の宿に新聞が届いたのは二日遅れだった。',
        '逮捕者の欄に、清治さんの名前はなかった。',
        '',
        '礼は言えなかった。',
      ].join('\n'),
    },
    {
      id: 'act1_photo',
      arm: 'arm3',
      title: '昭和二十四年八月の写真',
      kind: '写真 01',
      task: 'photo',
      prereqs: ['act1_note'],
      action: '観察する',
      image: 'images/photo_koaru.jpg',
      body: [
        '撮影者：行商の写真師　／　撮影日：壁面の新聞から推定　／　裏面に書入れ',
        '',
        '宿の座敷で、一人の女性が正面を向いている。',
        '女性の名前は書かれていない。',
        '髪は結われていない。正面を向き、歯を見せて笑っている。',
        '',
        '壁には脱線事故を報じる新聞が貼られている。',
        '違和感のある箇所を選ぶこと。',
        '',
        '裏面　鉛筆書き',
        'この人はここにいた',
        '八月十六日の夜',
        '現場にいた',
        'でも記録にはいない',
      ].join('\n'),
    },
    {
      id: 'act1_external',
      arm: 'arm4',
      title: '外部照合：郷土資料室',
      kind: '外部照合',
      task: 'external',
      prereqs: ['act1_note'],
      action: '照合する',
      external: {
        flag: 'fushima-archive',
        label: '芙島市立図書館 郷土資料室',
        detail: '新聞縮刷・事件概要・署名名簿',
        url: 'fushima-archive/?from=koe',
      },
      body: [
        'EXTERNAL MATCH REQUIRED',
        '参照先：芙島市立図書館 郷土資料室',
        '内容：新聞縮刷・事件概要・署名名簿',
        '確認：人物記述索引（MK-I02）',
        '状態：未取得',
        '',
        'たこつぼの中だけでは、公的な記録と突き合わせられないよ。',
        '図書館の目録を開いて、事故と逮捕者の記録を確かめてね。――小蘭',
      ].join('\n'),
    },
    {
      id: 'act1_seiji',
      arm: 'arm5',
      title: '清治さんのこと',
      kind: '手記 02',
      task: 'read',
      prereqs: ['act1_note', 'act1_photo', 'act1_external'],
      action: '読む',
      body: [
        '昭和24年9月–11月',
        '',
        '新聞と名簿を調べた。事件の夜に私を逃がした清治さんは、被告にも証人にも入っていない。',
        'K鉄の保線作業員名簿にも、同じ名前は見つからなかった。写真もない。',
        '',
        '芙島市郊外に、猫塚という表札の家がある。',
        '前に菜園があり、軒には、あの夜と同じ形の作業着が掛かっていた。',
        '道の向こうから何度か見たが、門を開けることはできなかった。',
        '',
        '八月の終わり、新聞に「不審人物を引き続き捜索中」という小さな記事が出た。',
        '年齢も人相も曖昧で、誰を指すのか分からない。',
        '私が訪ねたことで、あの家に警察を連れていくかもしれなかった。',
        '',
        '十一月二日　夜',
        '',
        '主人が寝てから、便箋を一枚出した。',
        '清治さんへ礼を書くつもりだった。',
        '',
        '封筒に「猫塚清治」と書き、すぐ線を引いた。',
        '名簿にない名前を私が外へ出してよいのか、判断できなかった。',
        '便箋と封筒は引き出しへ戻した。',
        '',
        '翌晩、新しい封筒を出した。宛名のところで、また止まった。',
      ].join('\n'),
    },
    {
      id: 'act1_map',
      arm: 'arm6',
      title: '芙島市書込地図 1949–1973',
      kind: '地図 01',
      task: 'map',
      prereqs: ['act1_seiji'],
      action: '探す',
      body: [
        '原図：芙島市街図　／　書入れ：蛸川小蘭　／　筆記具二種',
        '',
        '同じ地図に、三月の日付が二十三年分書き込まれている。',
        'ほとんどは桃見山の周辺に集まり、最後の一つだけ北へ離れている。',
        '',
        '1973年の書入れ：「今年は北の沼へ」',
        '印を一つずつ開き、1973年の書入れを探すこと。',
      ].join('\n'),
    },
  ];

  function defaultState() {
    return { restored: ['act1_notice'], done: {} };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (!raw) return defaultState();
      const s = JSON.parse(raw);
      if (!s || !Array.isArray(s.restored) || typeof s.done !== 'object' || !s.done) return defaultState();
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

  function isDone(id) {
    return Boolean(load().done[id]);
  }

  function doneAt(id) {
    return load().done[id] || null;
  }

  function prereqsMet(doc) {
    const s = load();
    return (doc.prereqs || []).every(id => s.done[id]);
  }

  /** 完了にする。完了で依存資料が1件ずつ復元される。 */
  function completeDoc(id) {
    const s = load();
    if (!s.restored.includes(id) || s.done[id]) return false;
    s.done[id] = new Date().toISOString();
    for (const d of DOCS) {
      if (s.restored.includes(d.id)) continue;
      if ((d.prereqs || []).every(p => s.done[p])) s.restored.push(d.id);
    }
    save(s);
    return true;
  }

  /** 常設の「次の復元」1件。復元済み・未完了の先頭。 */
  function nextTask() {
    const s = load();
    return DOCS.find(d => s.restored.includes(d.id) && !s.done[d.id]) || null;
  }

  // 後方互換エイリアス（Phase Aの画面コード用）
  const nextRestoration = nextTask;

  function openCount() {
    const s = load();
    return DOCS.filter(d => s.restored.includes(d.id) && !s.done[d.id]).length;
  }
  const unreadCount = openCount;

  function progress() {
    const s = load();
    const done = DOCS.filter(d => s.done[d.id]).length;
    return { viewed: done, done, total: DOCS.length, unread: openCount(), open: openCount(), restored: s.restored.length };
  }

  /**
   * 肢の状態:
   * undiscovered（輪郭のみ）/ has-unread（新規あり・脈動）/
   * external-wait（開いた端子＋必要な外部資料名）/ read（読了・安定点灯）
   */
  function armState(armId) {
    const docs = DOCS.filter(d => d.arm === armId);
    if (!docs.length) return 'undiscovered';
    const s = load();
    const restored = docs.filter(d => s.restored.includes(d.id));
    if (!restored.length) return 'undiscovered';
    const open = restored.filter(d => !s.done[d.id]);
    if (!open.length) return 'read';
    if (open.some(d => d.task === 'external')) return 'external-wait';
    return 'has-unread';
  }

  function armDocs(armId) {
    return DOCS.filter(d => d.arm === armId);
  }

  /** 外部サイトの閲覧印（読み取り専用）。同一オリジンで共有される。 */
  function getExternalVisits() {
    try {
      const v = JSON.parse(localStorage.getItem('koe_external_visits') || '[]');
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  }
  function hasExternalFlag(flag) {
    return getExternalVisits().includes(flag);
  }

  function isLaunched() {
    try { return Boolean(localStorage.getItem(LAUNCHED_KEY)); } catch { return false; }
  }
  function markLaunched() {
    try { localStorage.setItem(LAUNCHED_KEY, '1'); } catch {}
  }

  function resetForTest() {
    try {
      localStorage.removeItem(STATE_KEY);
      localStorage.removeItem(LAUNCHED_KEY);
      LEGACY_KEYS.forEach(k => localStorage.removeItem(k));
    } catch {}
  }

  return {
    ARMS, DOCS, STATE_KEY,
    load, getDoc, isRestored, isDone, doneAt,
    completeDoc, nextTask, nextRestoration, openCount, unreadCount, progress,
    armState, armDocs, getExternalVisits, hasExternalFlag,
    isLaunched, markLaunched, resetForTest,
  };
})();

window.KoranOS = KoranOS;
