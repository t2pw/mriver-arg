// pages/freesoft.js
// 2013年当時のAndroidアプリストア（Google Play）風レイアウト。
// ブラウザ内特殊ページとして archive://freesoft で開く。
// 両ツール（hexconv / morse）をここからインストールする。

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

  const hexDone   = typeof KoeOS !== 'undefined' && KoeOS.isInstalled('hexconv');
  const morseDone = typeof KoeOS !== 'undefined' && KoeOS.isInstalled('morse');

  const installBtn = (id, done) => done
    ? `<div style="
        display:inline-block;
        background:#e8f5e9;border:1px solid #a5d6a7;border-radius:4px;
        padding:6px 16px;font-size:12px;color:#388e3c;
        font-family:'Roboto',sans-serif;letter-spacing:.03em;
      ">✓ インストール済み</div>`
    : `<div data-install="${id}" style="
        display:inline-block;cursor:pointer;
        background:#fff;border:1px solid #dadce0;border-radius:4px;
        padding:6px 16px;font-size:12px;color:#1a73e8;
        font-family:'Roboto',sans-serif;letter-spacing:.03em;
      ">インストール</div>`;

  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5-n);

  return `
<style>
  #fs-wrap {
    background:#f2f2f2;
    font-family:'Roboto','Noto Sans JP',sans-serif;
    font-size:13px;
    min-height:100%;
    color:#202124;
  }
  #fs-topbar {
    background:#1a73e8;
    padding:10px 14px;
    display:flex;align-items:center;gap:10px;
  }
  #fs-topbar-logo {
    font-size:15px;font-weight:700;color:#fff;letter-spacing:.03em;
  }
  #fs-topbar-sub {
    font-size:11px;color:rgba(255,255,255,.75);margin-top:1px;
  }
  #fs-tabs {
    background:#fff;
    border-bottom:1px solid #e0e0e0;
    display:flex;
    font-size:12px;color:#5f6368;
    padding:0 14px;
  }
  .fs-tab {
    padding:10px 12px;letter-spacing:.04em;cursor:default;
  }
  .fs-tab.active {
    color:#1a73e8;border-bottom:2px solid #1a73e8;font-weight:700;
  }
  #fs-body { padding:10px 12px; }
  .fs-section-label {
    font-size:11px;color:#5f6368;letter-spacing:.08em;
    margin:14px 0 8px;padding-left:2px;
  }
  .fs-card {
    background:#fff;
    border-radius:8px;
    box-shadow:0 1px 2px rgba(0,0,0,.12);
    margin-bottom:10px;
    overflow:hidden;
  }
  .fs-card-main {
    display:flex;align-items:flex-start;gap:12px;
    padding:14px;
  }
  .fs-icon {
    width:52px;height:52px;border-radius:10px;
    display:flex;align-items:center;justify-content:center;
    font-size:26px;flex-shrink:0;
  }
  .fs-info { flex:1;min-width:0; }
  .fs-app-name {
    font-size:14px;font-weight:700;color:#202124;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  .fs-developer { font-size:11px;color:#1a73e8;margin:2px 0 4px; }
  .fs-rating-row { display:flex;align-items:center;gap:6px;font-size:11px;color:#5f6368; }
  .fs-stars { color:#f9ab00;font-size:12px;letter-spacing:1px; }
  .fs-card-desc {
    font-size:12px;color:#3c4043;line-height:1.7;
    padding:0 14px 14px;
  }
  .fs-card-footer {
    border-top:1px solid #f1f3f4;
    padding:10px 14px;
    display:flex;align-items:center;justify-content:space-between;
    font-size:11px;color:#5f6368;
  }
  .fs-badge {
    display:inline-block;
    background:#f1f3f4;border-radius:4px;
    padding:2px 7px;font-size:10px;color:#5f6368;
    margin-right:4px;
  }
  #fs-footer {
    padding:16px 14px;
    font-size:10px;color:#9aa0a6;
    text-align:center;line-height:2;
    border-top:1px solid #e0e0e0;
    background:#fff;
    margin-top:8px;
  }
</style>

<div id="fs-wrap">

  <div id="fs-topbar">
    <div>
      <div id="fs-topbar-logo">▶ Pray ストア</div>
      <div id="fs-topbar-sub">T.Watanabe Tools Collection</div>
    </div>
  </div>

  <div id="fs-tabs">
    <div class="fs-tab active">ツール</div>
    <div class="fs-tab">通信</div>
    <div class="fs-tab">デベロッパー</div>
  </div>

  <div id="fs-body">

    <div class="fs-section-label">▼ おすすめ解析ツール</div>

    <!-- HexConv -->
    <div class="fs-card">
      <div class="fs-card-main">
        <div class="fs-icon" style="background:#1565c0;">🔢</div>
        <div class="fs-info">
          <div class="fs-app-name">HexConv — 16進変換器</div>
          <div class="fs-developer">T.Watanabe</div>
          <div class="fs-rating-row">
            <span class="fs-stars">${stars(4)}</span>
            <span>4.1</span>
            <span>・</span>
            <span>1,000+ ダウンロード</span>
          </div>
        </div>
      </div>
      <div class="fs-card-desc">
        16進数（Hex）を日本語カタカナに変換します。
        スペース区切りで複数の値を一度に処理できます。
        ファイル解析・暗号文の解読にご利用ください。
      </div>
      <div class="fs-card-footer">
        <div>
          <span class="fs-badge">無料</span>
          <span class="fs-badge">全年齢</span>
          <span class="fs-badge">v1.2.0</span>
        </div>
        ${installBtn('hexconv', hexDone)}
      </div>
    </div>

    <!-- MorseReader -->
    <div class="fs-card">
      <div class="fs-card-main">
        <div class="fs-icon" style="background:#1b5e20;">📻</div>
        <div class="fs-info">
          <div class="fs-app-name">MorseReader — モールス読取機</div>
          <div class="fs-developer">T.Watanabe</div>
          <div class="fs-rating-row">
            <span class="fs-stars">${stars(4)}</span>
            <span>3.8</span>
            <span>・</span>
            <span>500+ ダウンロード</span>
          </div>
        </div>
      </div>
      <div class="fs-card-desc">
        穿孔パターン（・と−）を数字・アルファベットに変換します。
        升ごとに改行して入力することで複数文字を一度に読み取れます。
        ※ベータ版。動作が不安定な場合があります。
      </div>
      <div class="fs-card-footer">
        <div>
          <span class="fs-badge">無料</span>
          <span class="fs-badge">全年齢</span>
          <span class="fs-badge">v0.9.4 β</span>
        </div>
        ${installBtn('morse', morseDone)}
      </div>
    </div>

  </div><!-- /fs-body -->

  <div id="fs-footer">
    © 2013 T.Watanabe ・ プライバシーポリシー ・ 利用規約<br>
    バージョン 4.3.10（2013年7月）
  </div>

</div>`;
};
