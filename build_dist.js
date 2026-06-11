// build_dist.js ── 公開用ビルド（2026-06-11）
// ゲームの動作に必要なファイルだけを dist/ にコピーする。
// docs／scenario_text.txt／引き継ぎメモ／検証スクリプト等（ネタバレ・開発資料）は含めない。
// 使い方:  node build_dist.js  →  dist/ を無料ホスティングにアップロード
'use strict';

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');

// 同梱するもの（ホワイトリスト方式）
const FILES = [
  'index.html',
  'phone_shell.html',
  'os.js',
  'CREDITS.md',   // CC BY-SA 素材の出典管理（同梱しておくのが安全）
];
const DIRS = ['pages', 'tools', 'images'];

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

for (const f of FILES) {
  fs.copyFileSync(path.join(__dirname, f), path.join(DIST, f));
}
for (const d of DIRS) {
  fs.cpSync(path.join(__dirname, d), path.join(DIST, d), { recursive: true });
}

// 簡易検査：dist に開発資料が紛れていないこと
const banned = ['docs', 'scenario_text.txt', 'check_progression.js', 'extract_scenario.js', 'CLAUDE.md'];
for (const b of banned) {
  if (fs.existsSync(path.join(DIST, b))) {
    console.error('✗ 開発資料が混入: ' + b);
    process.exit(1);
  }
}

const count = (dir) => fs.readdirSync(dir, { withFileTypes: true })
  .reduce((n, e) => n + (e.isDirectory() ? count(path.join(dir, e.name)) : 1), 0);

console.log(`生成完了: dist/（${count(DIST)} ファイル）`);
console.log('同梱: ' + FILES.join(', ') + ' / ' + DIRS.map(d => d + '/').join(' '));
console.log('アップロード方法は docs/公開手順_v1.md を参照。');
