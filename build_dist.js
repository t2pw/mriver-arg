// build_dist.js ── 公開用ビルド（2026-06-11）
// ゲームの動作に必要なファイルだけを dist/ にコピーする。
// docs／scenario_text.txt／引き継ぎメモ／検証スクリプト等（ネタバレ・開発資料）は含めない。
// 使い方:  node build_dist.js  →  dist/ を無料ホスティングにアップロード
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname);
const DIST = path.join(ROOT, 'dist');

// 公開物以外を消さないため、削除先を作業ディレクトリ直下の dist に固定する。
if (path.dirname(DIST) !== ROOT || path.basename(DIST) !== 'dist') {
  throw new Error(`安全でない出力先です: ${DIST}`);
}

// 同梱するもの（ホワイトリスト方式）
const FILES = [
  'index.html',
  'remote.html',
  'phone_shell.html',
  'koran-os.js',
  'os.js',
  'robots.txt',
  'sitemap.xml',
  'CREDITS.md',   // CC BY-SA 素材の出典管理（同梱しておくのが安全）
];
const PAGE_FILES = [
  'archive_about.js',
  'soran_intro.js',
  'kiroku_001.js',
  'photo_001.js',
  'kiroku_003.js',
  'map_001.js',
  'telegram_001.js',
  'telegram_002.js',
  'data_trace.js',
  'receiver_lock.js',
  'hidden.js',
  'fumi_tegami.js',
  'choice.js',
  'wiki_skip.js',
  'epilogue.js',
  'okaeri.js',
];
const IMAGE_FILES = [
  'ogp.jpg',
  'photo_takkope.jpg',
  'photo_koaru.jpg',
  'map_fushima.jpg',
  'photo_tsanuma_1960.jpg',
  'photo_tsanuma_now.jpg',
  'photo_mkawa_1949.jpg',
  'photo_mkawa_now.jpg',
];
const DIRS = [
  'tools',
  'blue-land', 'fushima-archive', 'pray-store', 'm-kawa-wiki',
];

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

for (const f of FILES) {
  fs.copyFileSync(path.join(__dirname, f), path.join(DIST, f));
}
fs.mkdirSync(path.join(DIST, 'pages'), { recursive: true });
for (const f of PAGE_FILES) {
  fs.copyFileSync(path.join(__dirname, 'pages', f), path.join(DIST, 'pages', f));
}
fs.mkdirSync(path.join(DIST, 'images'), { recursive: true });
for (const f of IMAGE_FILES) {
  fs.copyFileSync(path.join(__dirname, 'images', f), path.join(DIST, 'images', f));
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
console.log('同梱: ' + FILES.join(', ') + ' / pages（公開中の16資料のみ） / images（使用中のみ） / ' + DIRS.map(d => d + '/').join(' '));
console.log('アップロード方法は docs/公開手順_v1.md を参照。');
