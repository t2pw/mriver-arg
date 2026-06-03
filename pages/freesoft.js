// pages/freesoft.js
// 平成初期の個人フリーウェア配布サイト風ページ。
// ブラウザ内特殊ページとして archive://freesoft で開く。
// 両ツール（hexconv / morse）をここからダウンロード（インストール）する。
// 作者：T.Watanabe。正体については触れない。

PAGE_CONTENT['freesoft'] = () => {

  setTimeout(() => {
    document.querySelectorAll('[data-install]').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-install');
        if (KoeOS.isInstalled(id)) return;
        Shell.installTool(id);
      });
    });
  }, 0);

  const hexDone  = typeof KoeOS !== 'undefined' && KoeOS.isInstalled('hexconv');
  const morseDone = typeof KoeOS !== 'undefined' && KoeOS.isInstalled('morse');

  const dlBtn = (id, done) => done
    ? `<span style="font-family:var(--retro);font-size:12px;color:#008000;">✔ インストール済み</span>`
    : `<span data-install="${id}" style="
        display:inline-block;cursor:pointer;
        font-family:var(--retro);font-size:12px;
        background:#000080;color:#fff;
        padding:3px 10px;border:2px outset #c0c0c0;
        letter-spacing:.04em;
      ">📥 ダウンロード</span>`;

  return `
<style>
  :root {
    --retro: 'MS Gothic', 'ＭＳ ゴシック', 'Osaka-Mono', monospace;
  }
  #freesoft-wrap {
    background: #fff;
    color: #000;
    font-family: var(--retro);
    font-size: 13px;
    line-height: 1.8;
    padding: 0 0 40px;
    min-height: 100%;
  }
  /* ヘッダ帯 */
  #fs-header {
    background: #000080;
    color: #fff;
    padding: 10px 14px 8px;
    font-size: 15px;
    letter-spacing: .06em;
    border-bottom: 3px solid #c0c0c0;
  }
  #fs-header small {
    display: block;
    font-size: 10px;
    color: #acd;
    margin-top: 2px;
    letter-spacing: .04em;
  }
  /* ナビ帯 */
  #fs-nav {
    background: #c0c0c0;
    border-bottom: 2px solid #808080;
    padding: 4px 14px;
    font-size: 11px;
    color: #000;
    letter-spacing: .04em;
  }
  #fs-nav a { color: #000080; text-decoration: underline; cursor: default; }
  /* 本文 */
  #fs-body { padding: 14px 16px; }
  .fs-hr {
    border: none;
    border-top: 2px solid #808080;
    margin: 14px 0;
  }
  .fs-hr-rainbow {
    height: 4px;
    background: linear-gradient(90deg,
      #f00 0%,#f80 14%,#ff0 28%,#0c0 42%,#00f 57%,#80f 71%,#f08 85%,#f00 100%
    );
    margin: 14px 0;
    border: none;
  }
  /* ソフトカード */
  .fs-card {
    border: 2px inset #c0c0c0;
    background: #f4f4f4;
    margin-bottom: 16px;
    padding: 12px 14px;
  }
  .fs-card-title {
    font-size: 14px;
    font-weight: bold;
    color: #000080;
    border-bottom: 1px solid #808080;
    padding-bottom: 4px;
    margin-bottom: 10px;
  }
  .fs-meta {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 2px 8px;
    font-size: 11px;
    margin-bottom: 10px;
  }
  .fs-meta .k { color: #555; }
  .fs-meta .v { color: #000; }
  .fs-desc {
    font-size: 12px;
    color: #333;
    line-height: 1.7;
    margin-bottom: 10px;
    border-left: 3px solid #c0c0c0;
    padding-left: 10px;
  }
  /* カウンター・定番小物 */
  #fs-footer {
    padding: 10px 16px;
    font-size: 11px;
    color: #555;
    border-top: 2px solid #808080;
    background: #e8e8e8;
    text-align: center;
    line-height: 2;
  }
  .fs-counter {
    display: inline-block;
    background: #000;
    color: #0f0;
    font-family: var(--retro);
    font-size: 13px;
    padding: 1px 6px;
    letter-spacing: .08em;
    border: 1px inset #808080;
  }
  .fs-blink {
    animation: fsblink 1s step-end infinite;
  }
  @keyframes fsblink { 50% { opacity: 0; } }
</style>

<div id="freesoft-wrap">

  <div id="fs-header">
    T.Watanabe's Tools Page
    <small>フリーウェア配布ページ　／　Last Update : 2002.11.03</small>
  </div>

  <div id="fs-nav">
    <a>TOP</a> ｜ <a>ダウンロード</a> ｜ <a>更新履歴</a> ｜ <a>リンク</a> ｜ <a>掲示板</a>
  </div>

  <div id="fs-body">

    <p style="font-size:12px;color:#555;margin-bottom:4px;">
      ★ここで配布しているソフトウェアはすべてフリーウェアです。<br>
      　使用・改変・再配布は自由ですが、作者への連絡は不要です。
    </p>

    <hr class="fs-hr-rainbow">

    <p style="font-size:13px;font-weight:bold;margin-bottom:10px;">■ ダウンロード</p>

    <!-- 16進変換器 -->
    <div class="fs-card">
      <div class="fs-card-title">🔢 HexConv for Windows / 16進変換器</div>
      <div class="fs-meta">
        <span class="k">バージョン</span><span class="v">1.2.0</span>
        <span class="k">更新日</span><span class="v">2002.08.17</span>
        <span class="k">対応OS</span><span class="v">Windows 95/98/Me/2000/XP</span>
        <span class="k">動作確認</span><span class="v">IE 5.5 / Netscape 4.7</span>
        <span class="k">ファイル</span><span class="v">hexconv_v120.zip (約18KB)</span>
        <span class="k">種別</span><span class="v">フリーウェア</span>
      </div>
      <div class="fs-desc">
        16進数（Hex）を日本語・カタカナに変換するツールです。<br>
        ファイル解析や暗号文の解読などにご使用ください。<br>
        スペース区切りで複数の値を一度に変換できます。
      </div>
      ${dlBtn('hexconv', hexDone)}
    </div>

    <!-- モールス読取機 -->
    <div class="fs-card">
      <div class="fs-card-title">📻 MorseReader / モールス読取機</div>
      <div class="fs-meta">
        <span class="k">バージョン</span><span class="v">0.9.4</span>
        <span class="k">更新日</span><span class="v">2001.03.14</span>
        <span class="k">対応OS</span><span class="v">Windows 95/98/Me/2000</span>
        <span class="k">動作確認</span><span class="v">IE 5.0</span>
        <span class="k">ファイル</span><span class="v">morse_reader_094.zip (約11KB)</span>
        <span class="k">種別</span><span class="v">フリーウェア</span>
      </div>
      <div class="fs-desc">
        モールス符号（・と−）を入力すると数字・アルファベットに変換します。<br>
        升ごとに改行して入力することで複数文字を一度に読み取れます。<br>
        ※ベータ版のため動作が不安定な場合があります。
      </div>
      ${dlBtn('morse', morseDone)}
    </div>

    <hr class="fs-hr">

    <p style="font-size:12px;font-weight:bold;margin-bottom:6px;">■ 更新履歴</p>
    <table style="font-size:11px;border-collapse:collapse;width:100%;margin-bottom:14px;">
      <tr style="background:#000080;color:#fff;"><td style="padding:3px 8px;">日付</td><td style="padding:3px 8px;">内容</td></tr>
      <tr style="background:#f4f4f4;"><td style="padding:3px 8px;white-space:nowrap;">2002.11.03</td><td style="padding:3px 8px;">HexConv 1.2.0 公開。変換精度を改善。</td></tr>
      <tr><td style="padding:3px 8px;white-space:nowrap;">2002.08.17</td><td style="padding:3px 8px;">HexConv 1.1.2 公開。</td></tr>
      <tr style="background:#f4f4f4;"><td style="padding:3px 8px;white-space:nowrap;">2001.03.14</td><td style="padding:3px 8px;">MorseReader 0.9.4 公開。</td></tr>
      <tr><td style="padding:3px 8px;white-space:nowrap;">2000.09.12</td><td style="padding:3px 8px;">サイト開設。</td></tr>
    </table>

    <hr class="fs-hr">

    <p style="font-size:11px;color:#555;line-height:1.9;">
      ■ お断り<br>
      これらのツールは個人的な用途で作成したものです。<br>
      当サイトは現在更新を停止しています。<br>
      掲示板への書き込みには対応できない場合があります。<br>
    </p>

  </div><!-- /fs-body -->

  <div id="fs-footer">
    当サイトはリンクフリーです。バナーはありません。<br>
    <span class="fs-blink">●</span>
    アクセスカウンター：<span class="fs-counter">0000314</span>
    <span class="fs-blink">●</span>
    <br>
    <span style="font-size:10px;color:#888;">
      Recommended : Internet Explorer 5.5 以上 / 800×600以上<br>
      Copyright © 2000-2002 T.Watanabe. All rights reserved.
    </span>
  </div>

</div>`;
};
