// extract_scenario.js
// node extract_scenario.js で実行 → scenario_text.txt を生成
const fs = require('fs');
const path = require('path');

function stripHtml(str) {
  return str
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/\sonclick="[^"]*"/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<hr[^>]*>/gi, '\n─────\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ')
    .replace(/\$\{[^}]*\}/g, '[…]')
    .replace(/[ \t]+/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/(?:\r?\n[ \t]*){3,}/g, '\n\n')
    .trim();
}

// index.html（発見者の導入ページ）本文を抽出
function extractIntro() {
  const fpath = path.join(__dirname, 'index.html');
  if (!fs.existsSync(fpath)) return '';
  const src = fs.readFileSync(fpath, 'utf8');
  const a = src.indexOf('<article');
  const b = src.indexOf('</article>');
  if (a < 0 || b < 0) return '';
  const body = src.slice(src.indexOf('>', a) + 1, b);
  let out = '═'.repeat(60) + '\n';
  out += '【導入】index.html　発見者ページ\n';
  out += '═'.repeat(60) + '\n\n';
  out += stripHtml(body) + '\n\n';
  return out;
}

// phone_shell.html の STORY_MSGS（不明送信元からの復元通知）を抽出
function extractPhoneMessages() {
  const fpath = path.join(__dirname, 'phone_shell.html');
  if (!fs.existsSync(fpath)) return '';
  const src = fs.readFileSync(fpath, 'utf8');
  const start = src.indexOf('const STORY_MSGS');
  if (start < 0) return '';
  const end = src.indexOf('\n  ];', start);
  const block = src.slice(start, end > 0 ? end : src.length);

  const parts = block.split(/\{\s*id:'/).slice(1);
  let out = '═'.repeat(60) + '\n';
  out += '【メッセージ】不明送信元からの復元通知（phone_shell.html / STORY_MSGS）\n';
  out += '※ 各メッセージは gate 指定ページの復元時に届く物語ビート\n';
  out += '═'.repeat(60) + '\n\n';

  for (const p of parts) {
    const id      = (p.match(/^(\w+)'/) || [])[1] || '';
    const name    = (p.match(/name:'([^']*)'/) || [])[1] || '';
    const date    = (p.match(/date:'([^']*)'/) || [])[1] || '';
    const gate    = (p.match(/gate:'([^']*)'/) || [])[1] || '';
    const preview = (p.match(/preview:'([^']*)'/) || [])[1] || '';

    const lines = [];
    const lineRe = /mdate-sep[^>]*>([^<]*)<|_bub\('((?:[^'\\]|\\.)*)'/g;
    let m;
    while ((m = lineRe.exec(p)) !== null) {
      if (m[1] !== undefined) lines.push('── ' + m[1].trim());
      else if (m[2] !== undefined) lines.push(m[2].replace(/<br\s*\/?>/gi, '\n').trim());
    }

    out += '─'.repeat(50) + '\n';
    out += `［${name}］　${date}${gate ? `　（gate: ${gate}）` : ''}　id:${id}\n`;
    if (preview) out += `通知：${preview}\n`;
    out += '\n' + lines.join('\n') + '\n\n';
  }
  return out;
}

// v4: 公開進行に含まれる統合済みページだけを抽出する。
// 退役した旧ページは比較用に残すが、現行シナリオには混ぜない。
const ORDER = [
  'archive_about','soran_intro',
  'kiroku_001','photo_001','kiroku_003','map_001',
  'telegram_001','telegram_002','data_trace',
  'receiver_lock','hidden','fumi_tegami','choice','wiki_skip','epilogue','okaeri',
];

const EXTERNAL_PAGES = [
  ['蒼沼ブルーランド資料保存室', 'blue-land/index.html'],
  ['芙島市立図書館 郷土資料室 デジタル目録', 'fushima-archive/index.html'],
  ['Pray ストア', 'pray-store/index.html'],
  ['Pray ストア 開発者ページ', 'pray-store/developer.html'],
  ['M川事件資料wiki', 'm-kawa-wiki/index.html'],
  ['M川事件資料wiki 編集画面', 'm-kawa-wiki/edit/index.html'],
];

function extractExternalPages() {
  let section = '';
  for (const [label, relativePath] of EXTERNAL_PAGES) {
    const fpath = path.join(__dirname, ...relativePath.split('/'));
    if (!fs.existsSync(fpath)) continue;
    const src = fs.readFileSync(fpath, 'utf8');
    const main = src.match(/<main(?:\s[^>]*)?>([\s\S]*?)<\/main>/i);
    const body = main ? main[1] : src;
    section += '═'.repeat(60) + '\n';
    section += `【外部サイト】${label}　${relativePath}\n`;
    section += '═'.repeat(60) + '\n\n';
    section += stripHtml(body) + '\n\n';
  }
  return section;
}

let out = '# 「声は壁を透して」シナリオテキスト\n';
out += '# 生成日時: ' + new Date().toLocaleString('ja-JP') + '\n\n';

out += extractIntro();

for (const id of ORDER) {
  const fpath = path.join(__dirname, 'pages', id + '.js');
  if (!fs.existsSync(fpath)) { out += `【${id}】ファイルなし\n\n`; continue; }

  const src = fs.readFileSync(fpath, 'utf8');

  // テンプレートリテラルをすべて抽出して結合
  const tmplRe = /`([\s\S]+?)`/g;
  let tmplAll = '';
  let m;
  while ((m = tmplRe.exec(src)) !== null) {
    if (m[1].includes('<div') || m[1].includes('<p') || m[1].includes('<span')) {
      tmplAll += m[1] + '\n';
    }
  }

  const title  = (tmplAll.match(/bpage-title[^>]*>([^<$]{1,60})/) || [])[1] || id;
  const num    = (tmplAll.match(/bpage-num[^"'>]*>([^<$─\-]{1,30})/) || [])[1] || '';

  out += '═'.repeat(60) + '\n';
  out += `${num.trim()}　${title.trim()}\n`;
  out += '═'.repeat(60) + '\n\n';
  out += stripHtml(tmplAll) + '\n\n';
}

out += extractExternalPages();
out += extractPhoneMessages();
out = out.replace(/(?:\r?\n[ \t]*){3,}/g, '\n\n');

fs.writeFileSync(path.join(__dirname, 'scenario_text.txt'), out, 'utf8');
console.log('生成完了: scenario_text.txt');
