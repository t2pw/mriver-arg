/**
 * koran-os.js — 小蘭OS 進行層 (Board: 第一幕ボード)
 *
 * 集める（断片・順序自由）と確定する（ボード検証）を分離する。
 * 断片は最初から全部開いている。進行は7つの検証スロットの固定で進む。
 * 状態キー koran_v3_*。外部閲覧印 koe_external_visits は読み取り専用で参照。
 * 汎用キーワード欄・モールス・16進・Prayストアは持たない。
 */
'use strict';

const KoranOS = (() => {
  const STATE_KEY = 'koran_v3_state';
  const LAUNCHED_KEY = 'koran_v3_launched';
  const LEGACY_KEYS = ['koran_v2_state', 'koran_v2_launched', 'koran_v1_state', 'koran_v1_launched'];

  // 八足。第一〜第六足が断片置き場。第七・第八足は第二幕以降。
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

  // 断片：集めるだけ。順序も読了も進行条件にしない。
  const FRAGS = [
    {
      id: 'frag_notice', arm: 'arm1', title: '受信通知／たこつぼについて', kind: '受信通知', view: 'text',
      body: [
        'RECEIVE LOG',
        '送信日時：1973-09-12 09:04',
        '記録者：蛸川小蘭',
        '受信者：███',
        '読取状態：一部欠損',
        '',
        'いつかこれを読む人へ。',
        '',
        '蛸川小蘭という名前で、月湯温泉の宿に勤めています。',
        '戸籍はありません。',
        '',
        '今日、この土地を離れます。',
        '集めたものは、年代と種類ごとに分けて、たこつぼへ入れました。',
      ].join('\n'),
    },
    {
      id: 'frag_note', arm: 'arm2', title: '事件翌朝のノート', kind: '手記 01', view: 'text',
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
        '向こうにいた頃なら、写真もメモも、どの端末からでも開ける████へ置くのが当たり前だった。',
        'ここでは濡れれば消え、燃えれば終わる。',
        '空の上なら、濡れても燃えても消えない。',
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
      id: 'frag_photo', arm: 'arm3', title: '昭和二十四年八月の写真', kind: '写真 01', view: 'photo',
      image: 'images/photo_koaru.jpg',
      body: [
        '撮影：行商の写真師',
        '',
        '宿の座敷。女が一人、正面を向いている。',
        '髪は結っていない。歯を見せて笑っている。',
        '壁に新聞が貼ってある。',
        '',
        '裏面　鉛筆書き',
        'この人はここにいた',
        '八月十六日の夜',
        '現場にいた',
        'でも記録にはいない',
      ].join('\n'),
    },
    {
      id: 'frag_ext', arm: 'arm4', title: '外部照合：郷土資料室', kind: '外部照合', view: 'external',
      external: {
        flag: 'fushima-archive',
        label: '芙島市立図書館 郷土資料室',
        detail: '新聞縮刷・事件概要・人物記述索引',
        check: '人物記述索引（MK-I02）',
        url: 'fushima-archive/?from=koe',
      },
      body: [
        'EXTERNAL MATCH REQUIRED',
        '参照先：芙島市立図書館 郷土資料室',
        '内容：新聞縮刷・事件概要・人物記述索引',
        '',
        'たこつぼの中だけでは、公的な記録と突き合わせられないよ。',
        '図書館の目録を開いて、事故と逮捕者と索引を確かめてね。――小蘭',
      ].join('\n'),
    },
    {
      id: 'frag_seiji', arm: 'arm5', title: '清治さんのこと', kind: '手記 02', view: 'text',
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
      id: 'frag_map', arm: 'arm6', title: '芙島市書込地図 1949–1973', kind: '地図 01', view: 'map',
      body: [
        '原図：芙島市街図　／　書入れ：蛸川小蘭　／　筆記具二種',
        '',
        '同じ地図に、三月の日付が二十三年分書き込まれている。',
        'ほとんどは桃見山の周辺に集まっている。',
        '',
        '1973年の書入れ：「今年は北の沼へ」',
      ].join('\n'),
    },
  ];

  // 検証スロット：確定する。順序自由。needsExternal は閲覧印が要る。
  const SLOTS = [
    {
      id: 'slot_when', q: '欠損：時刻', type: 'choice',
      options: ['8月16日の夜', '8月17日の朝', '8月18日'], answer: 0,
      hint1: '手記の最初を読むこと。', hint2: '十六日の夜、線路脇。',
    },
    {
      id: 'slot_where', q: '欠損：場所', type: 'choice',
      options: ['M川駅近く', '月湯温泉', '桃見山'], answer: 0,
      hint1: '手記の最初を読むこと。', hint2: 'T北本線のM川駅近く。',
    },
    {
      id: 'slot_who', q: '欠損：人物', type: 'choice',
      options: ['猫塚清治', '宿の主人', '行商の写真師'], answer: 0,
      hint1: '別れる前に訊いた名前。', hint2: '手記の中ほど。名簿にはない名前。',
    },
    {
      id: 'slot_record', q: '欠損：記録', type: 'choice', needsExternal: true,
      options: ['ある', 'ない'], answer: 1,
      hint1: '人物記述索引（MK-I02）を読むこと。', hint2: '該当する記載を確認できず。',
    },
    {
      id: 'slot_date', q: '欠損：日付', type: 'choice',
      options: ['8月16日', '8月18日', '8月20日'], answer: 1,
      hint1: '写真の壁面を拡大すること。', hint2: '芙島民報、十八日。',
    },
    {
      id: 'slot_route', q: '欠損：経路', type: 'choice',
      options: ['蒼沼', '桃見山', '芙島駅'], answer: 0,
      hint1: '印を一つずつ開くこと。', hint2: '1973年の書入れ。',
    },
    {
      id: 'slot_word', q: '欠損：語句', type: 'free', answers: ['クラウド'],
      hint1: '前後の文を読むこと。―― どこからでも開けて、濡れても燃えても消えない場所。',
      hint2: '四文字。クから始まる、向こうの言葉。',
    },
  ];

  function defaultState() {
    return { read: {}, fixed: {}, misses: {} };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (!raw) return defaultState();
      const s = JSON.parse(raw);
      if (!s || typeof s.read !== 'object' || !s.read || typeof s.fixed !== 'object' || !s.fixed) return defaultState();
      if (!s.misses || typeof s.misses !== 'object') s.misses = {};
      return s;
    } catch {
      return defaultState();
    }
  }

  function save(s) {
    try { localStorage.setItem(STATE_KEY, JSON.stringify(s)); } catch {}
  }

  function getFrag(id) {
    return FRAGS.find(f => f.id === id) || null;
  }
  function getSlot(id) {
    return SLOTS.find(s => s.id === id) || null;
  }

  function isRead(id) {
    return Boolean(load().read[id]);
  }
  function readAt(id) {
    return load().read[id] || null;
  }
  function markRead(id) {
    const s = load();
    if (!getFrag(id) || s.read[id]) return false;
    s.read[id] = new Date().toISOString();
    save(s);
    return true;
  }

  function isFixed(id) {
    return Object.prototype.hasOwnProperty.call(load().fixed, id);
  }

  function slotLocked(slot) {
    return Boolean(slot.needsExternal) && !hasExternalFlag('fushima-archive');
  }

  function normalizeAnswer(value) {
    return String(value).trim().replace(/[\s　]+/g, '').replace(/[ぁ-ん]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60));
  }

  /**
   * スロット判定。{ ok, locked } を返す。不正解はミス回数を数える（ペナルティなし）。
   */
  function trySlot(id, value) {
    const slot = getSlot(id);
    if (!slot || isFixed(id)) return { ok: false, locked: false, done: true };
    if (slotLocked(slot)) return { ok: false, locked: true };
    let correct = false;
    if (slot.type === 'free') {
      const v = normalizeAnswer(value);
      correct = (slot.answers || []).some(a => normalizeAnswer(a) === v);
    } else {
      correct = Number(value) === slot.answer;
    }
    const s = load();
    if (correct) {
      s.fixed[id] = slot.type === 'free' ? normalizeAnswer(value) : Number(value);
      save(s);
      return { ok: true, locked: false };
    }
    s.misses[id] = (s.misses[id] || 0) + 1;
    save(s);
    return { ok: false, locked: false, misses: s.misses[id] };
  }

  function slotHint(id) {
    const slot = getSlot(id);
    if (!slot) return '';
    const m = load().misses[id] || 0;
    if (m >= 4) return slot.hint2;
    if (m >= 2) return slot.hint1;
    return '';
  }

  function boardComplete() {
    const s = load();
    return SLOTS.every(slot => Object.prototype.hasOwnProperty.call(s.fixed, slot.id));
  }

  function unreadCount() {
    const s = load();
    return FRAGS.filter(f => !s.read[f.id]).length;
  }
  function fixedCount() {
    const s = load();
    return SLOTS.filter(slot => Object.prototype.hasOwnProperty.call(s.fixed, slot.id)).length;
  }
  function progress() {
    return {
      read: FRAGS.length - unreadCount(), fragTotal: FRAGS.length,
      fixed: fixedCount(), slotTotal: SLOTS.length,
      unread: unreadCount(), open: SLOTS.length - fixedCount(),
      done: fixedCount(), viewed: FRAGS.length - unreadCount(), total: SLOTS.length,
    };
  }

  // 後方互換（旧画面コード用）。ボードでは未使用。
  const nextTask = () => SLOTS.find(s => !isFixed(s.id)) || null;
  const nextRestoration = nextTask;
  const openCount = () => SLOTS.length - fixedCount();
  const isRestored = () => true;
  const completeDoc = () => false;

  function armState(armId) {
    const frags = FRAGS.filter(f => f.arm === armId);
    if (!frags.length) return 'undiscovered';
    const s = load();
    return frags.every(f => s.read[f.id]) ? 'read' : 'has-unread';
  }
  function armDocs(armId) {
    return FRAGS.filter(f => f.arm === armId);
  }
  // 旧名エイリアス
  const getDoc = getFrag;
  const isDone = isRead;
  const doneAt = readAt;

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
    ARMS, FRAGS, SLOTS, STATE_KEY,
    load, getFrag, getSlot, getDoc,
    isRead, readAt, markRead, isDone, doneAt,
    isFixed, slotLocked, trySlot, slotHint, boardComplete,
    nextTask, nextRestoration, openCount, unreadCount, progress,
    isRestored, completeDoc,
    armState, armDocs, getExternalVisits, hasExternalFlag,
    isLaunched, markLaunched, resetForTest,
  };
})();

window.KoranOS = KoranOS;
