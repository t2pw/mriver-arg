// check_progression.js ── 進行検証リンタ（読み取り専用）
// node check_progression.js で実行。os.js の実ロジックを Node 上で動かし、
// 仮想プレイヤーに通しプレイをさせて以下を検査する：
//   A. 全ページ到達可否（完走できるか）と解放順
//   B. キーワード衝突（同じキーワードが複数ページに設定されている）
//   C. 1回の検索で複数ページが同時解放される（順番飛ばし）
//   D. 到達時点の可視テキストに存在しないキーワード（謎解き答え扱いを除く）
//   E. 先回りキーワード（prereq未達の時点で本文に出現済み＝検索しても無反応の罠）
//   F. prereq連鎖の一括解放（第2層フラッド）
//   G. 使用済みキーワードの再利用不可による詰み
// ゲーム本体のファイルは変更しない。
//
// v2（2026-06-10 改善計画反映）:
//   - os.js v3.2 の「閲覧済み（addHistory）基準の連鎖」を模倣：仮想プレイヤーは
//     解放されたページを1枚ずつ「読み」、その都度 checkPrereqUnlocks を回す。
//   - manual:true ページ（wiki_add / wiki_skip / epilogue）は choice 等のページ内
//     ボタン（bNavigate → markRestored）で解放されるため、MANUAL_NAV で模倣する。
//   - E は submitKeyword の prereqBlocked 応答（前提不足の明示）で緩和済みのため情報扱い。

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;

/* ── 謎解きの「答え」キーワード（本文に書かれていないのが正しいもの） ── */
const PUZZLE_ANSWERS = {
  kiroku_002:   { kw: 'クラウド',      how: 'kiroku_001 赤い黒塗り（現代語）の文脈推定' },
  map_002:      { kw: '桃見山',        how: 'map_001 黒塗り地名の推理' },
  map_003:      { kw: '蒼沼ブルーランド', how: 'map_002 の謎解き' },
  telegram_002: { kw: '0816',          how: 'hexconv＋モールス解読' },
  hidden:       { kw: 'あなたはここにいた', how: 'receiver_lock モールス→16進→カタカナ' },
  data_trace:   { kw: 'バックアップ',   how: 'tegami 添え状断片・赤い黒塗り（現代語）の文脈推定' },
};

/* ── os.js をスタブ環境で実行して実物の KoeOS を得る ── */
function memStorage() {
  const d = {};
  return {
    getItem: k => (k in d ? d[k] : null),
    setItem: (k, v) => { d[k] = String(v); },
    removeItem: k => { delete d[k]; },
    clear: () => { for (const k of Object.keys(d)) delete d[k]; },
  };
}
function loadKoeOS() {
  const src = fs.readFileSync(path.join(ROOT, 'os.js'), 'utf8');
  const ctx = { window: {}, localStorage: memStorage(), console };
  vm.createContext(ctx);
  vm.runInContext(src, ctx, { filename: 'os.js' });
  return ctx.window.KoeOS;
}

/* ── テキスト抽出（extract_scenario.js と同方式） ── */
function stripHtml(str) {
  return str
    .replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n').replace(/<\/li>/gi, '\n')
    .replace(/<\/div>/gi, '\n').replace(/<hr[^>]*>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
    .replace(/\$\{[^}]*\}/g, '')
    .trim();
}
function pageText(id) {
  const fpath = path.join(ROOT, 'pages', id + '.js');
  if (!fs.existsSync(fpath)) return null;
  const src = fs.readFileSync(fpath, 'utf8');
  const tmplRe = /`([\s\S]+?)`/g;
  let all = '', m;
  while ((m = tmplRe.exec(src)) !== null) {
    if (m[1].includes('<div') || m[1].includes('<p') || m[1].includes('<span')) all += m[1] + '\n';
  }
  return stripHtml(all);
}
function introText() {
  const fpath = path.join(ROOT, 'index.html');
  if (!fs.existsSync(fpath)) return '';
  const src = fs.readFileSync(fpath, 'utf8');
  const a = src.indexOf('<article'), b = src.indexOf('</article>');
  if (a < 0 || b < 0) return '';
  return stripHtml(src.slice(src.indexOf('>', a) + 1, b));
}
/* phone_shell.html の STORY_MSGS（gate付きメッセージ）を抽出 */
function storyMsgs() {
  const fpath = path.join(ROOT, 'phone_shell.html');
  const src = fs.readFileSync(fpath, 'utf8');
  const start = src.indexOf('const STORY_MSGS');
  if (start < 0) return [];
  const end = src.indexOf('\n  ];', start);
  const block = src.slice(start, end > 0 ? end : src.length);
  const parts = block.split(/\{\s*id:'/).slice(1);
  return parts.map(p => {
    const id   = (p.match(/^(\w+)'/) || [])[1] || '';
    const gate = (p.match(/gate:'([^']*)'/) || [])[1] || null;
    const lines = [];
    const lineRe = /_bub\('((?:[^'\\]|\\.)*)'/g;
    let m;
    while ((m = lineRe.exec(p)) !== null) lines.push(m[1]);
    return { id, gate, text: stripHtml(lines.join('\n')) };
  });
}

const norm = s => String(s).replace(/\s+/g, '');

/* 意図的な一括解放（資料棚。hub_002 閲覧で4冊同時に開くのは仕様） */
const INTENDED_BULK = { hub_002: new Set(['voices', 'tegami', 'sns', 'momo']) };

/* ── ページ内ボタンによる解放（os.js の prereq 連鎖外）──
   phone_shell.html の bNavigate → _loadPage(markRestored) を模倣する。 */
const MANUAL_NAV = {
  choice:    ['wiki_add', 'wiki_skip'],
  wiki_add:  ['epilogue'],
  wiki_skip: ['epilogue'],
};

/* PAGES 外で正しいファイル（メッセージスレッド等） */
const NON_PAGE_SCRIPTS = new Set(['soran_intro']);

/* 仮想プレイヤーの「読む」動作：未読の復元済みページを読み尽くす。
   読むたびに addHistory（閲覧フラグ）→ checkPrereqUnlocks（連鎖）→
   ページ内ボタンの解放（MANUAL_NAV）を回す。
   onCascade(viewedId, cascadeIds) で1回の閲覧あたりの連鎖数を観測できる。 */
function viewAllNew(K, viewed, onCascade) {
  let changed = true;
  while (changed) {
    changed = false;
    for (const p of K.PAGES) {
      if (!K.isRestored(p.id) || viewed.has(p.id)) continue;
      viewed.add(p.id);
      K.addHistory(p.id);
      const cascade = K.checkPrereqUnlocks();
      if (onCascade && cascade.length) onCascade(p.id, cascade);
      for (const t of (MANUAL_NAV[p.id] || [])) K.markRestored(t);
      changed = true;
    }
  }
}

/* ════════════════════════════════════════════════ */
const KoeOS = loadKoeOS();
const PAGES = KoeOS.PAGES;
const MSGS = storyMsgs();
const INTRO = introText();

const findings = { A: [], B: [], C: [], D: [], E: [], F: [], G: [], MISC: [] };

/* ── B. キーワード衝突（静的） ── */
{
  const kwMap = new Map();
  for (const p of PAGES) for (const kw of (p.keywords || [])) {
    const k = norm(kw);
    if (!kwMap.has(k)) kwMap.set(k, []);
    kwMap.get(k).push(p.id);
  }
  for (const [k, ids] of kwMap) if (ids.length > 1)
    findings.B.push(`「${k}」が ${ids.join(', ')} の ${ids.length}ページに設定`);
}

/* ── ページ本文の存在チェック ── */
const TEXT = {};
for (const p of PAGES) {
  const t = pageText(p.id);
  if (t === null) findings.MISC.push(`pages/${p.id}.js が存在しない`);
  TEXT[p.id] = t || '';
}
// PAGES 外だが pages/ にあるファイル（メッセージスレッド等の正当なものは除く）
for (const f of fs.readdirSync(path.join(ROOT, 'pages')).filter(f => f.endsWith('.js'))) {
  const id = f.replace(/\.js$/, '');
  if (NON_PAGE_SCRIPTS.has(id)) continue;
  if (!PAGES.some(p => p.id === id)) findings.MISC.push(`pages/${f} は PAGES テーブル未登録（_loadPage では開けない）`);
}

/* ── 仮想プレイヤーの通しプレイ ── */
function visibleTextNow() {
  let t = INTRO + '\n';
  for (const p of PAGES) if (p.locked === false || KoeOS.isRestored(p.id)) t += TEXT[p.id] + '\n';
  for (const m of MSGS) if (!m.gate || KoeOS.isRestored(m.gate)) t += m.text + '\n';
  return norm(t);
}

const steps = [];
const viewedMain = new Set();
const onCascadeF = (vid, cas) => {
  if (cas.length > 1) {
    const bulk = INTENDED_BULK[vid];
    if (bulk && cas.every(id => bulk.has(id)))
      findings.F.push(`(情報)「${vid}」閲覧で資料棚を一括解放: ${cas.join(', ')}（仕様）`);
    else
      findings.F.push(`「${vid}」閲覧時に prereq連鎖が一括解放: ${cas.join(' → ')}（${cas.length}ページ）`);
  }
};
// 常時公開ページを開いた状態からスタート
for (const p of PAGES) if (p.locked === false) KoeOS.markRestored(p.id);
viewAllNew(KoeOS, viewedMain, onCascadeF);

let guard = 0;
while (guard++ < 200) {
  const vis = visibleTextNow();
  const cands = PAGES.filter(p =>
    !KoeOS.isRestored(p.id) && p.locked && (p.keywords || []).length &&
    p.prereqs.every(id => KoeOS.isRestored(id)));
  let move = null;
  // 1) 可視テキストに書かれているキーワード
  for (const p of cands) {
    for (const kw of p.keywords) {
      if (vis.includes(norm(kw))) { move = { p, kw, via: 'text' }; break; }
    }
    if (move) break;
  }
  // 2) 謎解き答え（ツール・推理由来）
  if (!move) {
    for (const p of cands) {
      const ans = PUZZLE_ANSWERS[p.id];
      if (ans) { move = { p, kw: ans.kw, via: `puzzle（${ans.how}）` }; break; }
    }
  }
  if (!move) break;

  const res = KoeOS.submitKeyword(move.kw);
  steps.push({ kw: move.kw, via: move.via, target: move.p.id, res });

  if (!res.success) {
    findings.G.push(`「${move.kw}」（${move.p.id} 狙い）が失敗: ${res.alreadyUsed ? '使用済み扱い' : '解放対象なし'}`);
    break;
  }
  if (res.unlocked.filter(id => id !== 'hub_002').length > 1)
    findings.C.push(`検索「${move.kw}」1回で同時解放: ${res.unlocked.join(', ')}`);

  // 解放されたページを1枚ずつ読む（os.js v3.2 の閲覧連鎖＋ページ内ボタンを模倣）
  viewAllNew(KoeOS, viewedMain, onCascadeF);
}

/* ── A. 到達できなかったページ ── */
const unreached = PAGES.filter(p => p.locked && !KoeOS.isRestored(p.id));
for (const p of unreached) findings.A.push(`${p.id}（${p.title}）に到達できない`);

/* ── D. 解放手段の検査：到達時点の可視テキストにキーワードが無い ── */
// steps を再生して、各ページ解放直前の可視状態でキーワードが見えていたか確認
{
  const K2 = loadKoeOS();
  const viewed2 = new Set();
  for (const p of K2.PAGES) if (p.locked === false) K2.markRestored(p.id);
  viewAllNew(K2, viewed2);
  const visAt = () => {
    let t = INTRO + '\n';
    for (const p of PAGES) if (p.locked === false || K2.isRestored(p.id)) t += TEXT[p.id] + '\n';
    for (const m of MSGS) if (!m.gate || K2.isRestored(m.gate)) t += m.text + '\n';
    return norm(t);
  };
  for (const s of steps) {
    const vis = visAt();
    const pg = PAGES.find(p => p.id === s.target);
    const anyVisible = pg.keywords.some(kw => vis.includes(norm(kw)));
    const isPuzzle = !!PUZZLE_ANSWERS[s.target];
    if (!anyVisible && !isPuzzle)
      findings.D.push(`${s.target}: キーワード ${pg.keywords.join('/')} が解放時点の可視テキストに無い`);
    if (!anyVisible && isPuzzle) {
      // 謎解きページ：謎の素材（導線）が可視テキストにあるかは人間が確認
      findings.D.push(`(情報) ${s.target}: 謎解き答え「${PUZZLE_ANSWERS[s.target].kw}」で解放（導線の有無は手動確認）`);
    }
    K2.submitKeyword(s.kw); viewAllNew(K2, viewed2);
  }
}

/* ── E. 先回りキーワード：prereq未達の段階で本文に出現済み ── */
{
  const K3 = loadKoeOS();
  const viewed3 = new Set();
  for (const p of K3.PAGES) if (p.locked === false) K3.markRestored(p.id);
  viewAllNew(K3, viewed3);
  const visAt = () => {
    let t = INTRO + '\n';
    for (const p of PAGES) if (p.locked === false || K3.isRestored(p.id)) t += TEXT[p.id] + '\n';
    for (const m of MSGS) if (!m.gate || K3.isRestored(m.gate)) t += m.text + '\n';
    return norm(t);
  };
  const reported = new Set();
  for (const s of steps) {
    const vis = visAt();
    for (const p of PAGES) {
      if (K3.isRestored(p.id) || !p.locked || !(p.keywords || []).length) continue;
      if (p.prereqs.every(id => K3.isRestored(id))) continue; // 解放可能なら罠ではない
      for (const kw of p.keywords) {
        const key = p.id + ':' + kw;
        if (reported.has(key)) continue;
        if (vis.includes(norm(kw))) {
          reported.add(key);
          findings.E.push(`(情報)「${kw}」（${p.id}用）が prereq 未達の時点で可視テキストに出現（v3.2で「照合一致・前提不足」応答が返る）`);
        }
      }
    }
    K3.submitKeyword(s.kw); viewAllNew(K3, viewed3);
  }
}

/* ── レポート ── */
const order = steps.map((s, i) =>
  `${String(i + 1).padStart(2)}. 検索「${s.kw}」(${s.via}) → ${s.res.unlocked.join(', ') || '失敗'}`);

console.log('═'.repeat(64));
console.log('進行検証レポート');
console.log('═'.repeat(64));
console.log('\n【解放順シミュレーション】');
console.log(order.join('\n') || '（1ページも解放できない）');
console.log(`\n復元率: ${KoeOS.getProgressPercent()}%　未到達: ${unreached.length}ページ`);

const SECTIONS = [
  ['A. 到達不能ページ', findings.A],
  ['B. キーワード衝突', findings.B],
  ['C. 1検索で複数ページ同時解放（順番飛ばし）', findings.C],
  ['D. キーワード発見手段の問題', findings.D],
  ['E. 先回りキーワード（前提不足応答で緩和済み・情報）', findings.E],
  ['F. 1閲覧あたりの一括連鎖解放（ペーシング破壊）', findings.F],
  ['G. キーワード使用済みによる詰み', findings.G],
  ['その他', findings.MISC],
];
for (const [title, list] of SECTIONS) {
  console.log('\n── ' + title + ' ──');
  console.log(list.length ? list.map(s => '  ✗ ' + s).join('\n') : '  ✓ 問題なし');
}
