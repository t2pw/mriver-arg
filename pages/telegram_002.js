// telegram_002.js — 0816照合後の結果と外部索引

PAGE_CONTENT['telegram_002'] = () => {
  const required = ['pray-store', 'fushima-memo', 'fushima-book'];
  const updateExternalStatus = () => {
    let done = 0;
    for (const id of required) {
      const matched = KoeOS.hasExternalVisit(id);
      if (matched) done += 1;
      const el = document.querySelector(`[data-external-status="${id}"]`);
      if (el) {
        el.textContent = matched ? '照合済' : '未照合';
        el.style.color = matched ? '#7fc99d' : 'var(--t3)';
      }
    }
    const count = document.getElementById('external-required-count');
    if (count) count.textContent = `${done}/${required.length}`;
  };
  window.KOE_UPDATE_EXTERNAL_STATUS = updateExternalStatus;
  setTimeout(updateExternalStatus, 0);

  return `<div class="bpage">
  <div class="bpage-num">SIGNAL RESULT　02</div>
  <div class="bpage-title">N-0816</div>
  <div class="bpage-meta">暗号キー：受理　／　登録日：1950年8月26日</div>

  <div style="margin:0 0 18px;background:#09110d;border:1px solid rgba(100,190,140,0.22);border-radius:9px;overflow:hidden;font-family:var(--mono);">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);color:#7fc99d;font-size:10px;letter-spacing:.12em;">KEY ACCEPTED</div>
    <div style="padding:13px 14px;display:grid;grid-template-columns:96px 1fr;gap:6px 12px;font-size:11px;line-height:1.9;">
      <span style="color:var(--t3);">入力</span><span>0816</span>
      <span style="color:var(--t3);">形式</span><span>MMDD</span>
      <span style="color:var(--t3);">参照日</span><span>1949年8月16日</span>
      <span style="color:var(--t3);">参照記録</span><span>M川駅付近　接触記録</span>
    </div>
  </div>

  <div style="margin:0 0 18px;background:#0d0d10;border:1px solid rgba(255,255,255,0.08);border-radius:9px;overflow:hidden;font-family:var(--mono);">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);color:var(--t3);font-size:10px;letter-spacing:.12em;">EXTERNAL INDEX / 4 MATCHES</div>

    <a href="pray-store/developer.html?from=koe" target="_blank" rel="noopener"
       style="display:block;padding:12px 14px;border-bottom:1px solid rgba(255,255,255,0.05);color:var(--t1);text-decoration:none;line-height:1.8;">
      <span style="display:flex;justify-content:space-between;gap:10px;color:var(--gold);"><span>Pray ストア　開発者：蛸川小蘭 ↗</span><span data-external-status="pray-store" style="flex-shrink:0;color:var(--t3);font-size:9px;">未照合</span></span>
      <span style="font-size:10px;color:var(--t3);">符号読取・16進変換ツール</span>
    </a>

    <a href="fushima-archive/?from=koe#memo-record" target="_blank" rel="noopener"
       style="display:block;padding:12px 14px;border-bottom:1px solid rgba(255,255,255,0.05);color:var(--t1);text-decoration:none;line-height:1.8;">
      <span style="display:flex;justify-content:space-between;gap:10px;color:var(--gold);"><span>芙島市立図書館 郷土資料室　██メモ ↗</span><span data-external-status="fushima-memo" style="flex-shrink:0;color:var(--t3);font-size:9px;">未照合</span></span>
      <span style="font-size:10px;color:var(--t3);">押収から無罪確定までの記録</span>
    </a>

    <a href="fushima-archive/?from=koe#unrecorded-letter" target="_blank" rel="noopener"
       style="display:block;padding:12px 14px;border-bottom:1px solid rgba(255,255,255,0.05);color:var(--t1);text-decoration:none;line-height:1.8;">
      <span style="display:flex;justify-content:space-between;gap:10px;color:var(--gold);"><span>芙島市立図書館 郷土資料室　未収録資料1通 ↗</span><span data-external-status="fushima-book" style="flex-shrink:0;color:var(--t3);font-size:9px;">未照合</span></span>
      <span style="font-size:10px;color:var(--t3);">文集の受入記録・添え状控え</span>
    </a>

    <a href="m-kawa-wiki/?from=koe" target="_blank" rel="noopener"
       style="display:block;padding:12px 14px;color:var(--t1);text-decoration:none;line-height:1.8;">
      <span style="display:flex;justify-content:space-between;gap:10px;color:var(--gold);"><span>M川事件資料wiki　公開索引 ↗</span><span style="flex-shrink:0;color:var(--t3);font-size:9px;">任意</span></span>
      <span style="font-size:10px;color:var(--t3);">裁判経過・関連文書</span>
    </a>
  </div>

  <div style="font-family:var(--mono);font-size:10px;color:var(--t3);line-height:1.9;">
    必須照合：<span id="external-required-count">0/3</span>　／　外部文書は別タブで開きます。
  </div>
</div>`;
};
