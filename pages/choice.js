// choice.js　終幕の分岐
// 追記側は独立した資料wikiへ、非追記側は現実の検索へ進む。

PAGE_CONTENT['choice'] = () => `<div class="bpage">
  <div class="bpage-num">RECEIVER / ACTION</div>
  <div class="bpage-title">この記録を、どこへ置くか</div>
  <div class="bpage-meta">未収録資料：1　／　受信者：現在の閲覧者</div>

  <div class="bpage-body">
    <p>
      M川事件資料wikiには、この手紙も、宛先の名前も載っていない。
      回収端末を出典として、一行を補うことができる。
    </p>
  </div>

  <div style="margin:10px 0 0;display:grid;gap:10px;">
    <a
      href="m-kawa-wiki/edit/?from=koe"
      style="display:block;background:#0d0d10;border:1px solid rgba(200,169,110,.28);border-radius:12px;padding:17px 18px;text-decoration:none;font-family:var(--mono);"
    >
      <div style="color:var(--t1);font-size:12px;letter-spacing:.08em;margin-bottom:5px;">この記録に一行を残す</div>
      <div style="color:var(--t3);font-size:10px;line-height:1.8;">M川事件資料wikiの編集画面を開く</div>
    </a>

    <button
      type="button"
      onclick="try{localStorage.setItem('koe_ending','source')}catch{};Shell.bNavigate('wiki_skip')"
      style="appearance:none;width:100%;background:#0d0d10;border:1px solid rgba(200,169,110,.28);border-radius:12px;padding:17px 18px;cursor:pointer;font-family:var(--mono);text-align:left;"
    >
      <div style="color:var(--t1);font-size:12px;letter-spacing:.08em;margin-bottom:5px;">追記せず、記録の外を確かめる</div>
      <div style="color:var(--t3);font-size:10px;line-height:1.8;">写し元に近い、現実の検索結果へ移る</div>
    </button>
  </div>

  <div style="margin-top:18px;font-family:var(--mono);font-size:9px;color:var(--t3);line-height:1.8;letter-spacing:.05em;">
    どちらの操作も読了として、このブラウザに保存されます。
  </div>
</div>`;
