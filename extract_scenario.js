// extract_scenario.js
// node extract_scenario.js で実行 → scenario_text.txt を生成
const fs = require('fs');
const path = require('path');

function stripHtml(str) {
  return str
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<hr[^>]*>/gi, '\n─────\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ')
    .replace(/\$\{[^}]*\}/g, '[…]')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const ORDER = [
  'archive_about','soran_profile','soran_intro',
  'kiroku_001','kiroku_002','kiroku_003','kiroku_004',
  'photo_001','photo_002','photo_003',
  'bbs_001','bbs_002','bbs_003',
  'map_001','map_002','map_003',
  'telegram_001','telegram_002','telegram_003',
  'freesoft',
  'hub_002',
  'koaru_record','inochi','voices','tegami','sns','momo','loop','data_trace',
  'hidden','fumi_tegami','choice','wiki_add','wiki_skip','epilogue',
];

let out = '# 「声は壁を透して」シナリオテキスト\n';
out += '# 生成日時: ' + new Date().toLocaleString('ja-JP') + '\n\n';

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

fs.writeFileSync(path.join(__dirname, 'scenario_text.txt'), out, 'utf8');
console.log('生成完了: scenario_text.txt');
