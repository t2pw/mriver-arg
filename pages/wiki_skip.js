// wiki_skip.js　非追記側の出口
// 読了状態を保ったまま、現実の検索結果へ遷移する。

PAGE_CONTENT['wiki_skip'] = () => {
  const googleUrl = 'https://www.google.com/search?q=' + encodeURIComponent('1949年 列車転覆 冤罪 事件');

  setTimeout(() => {
    try {
      localStorage.setItem('koe_ending', 'source');
      KoeOS.markRestored('epilogue');
      KoeOS.markViewed('epilogue');
      if (window.KOE_SOURCE_REDIRECT) clearTimeout(window.KOE_SOURCE_REDIRECT);
      if (window.KOE_SOURCE_COUNTDOWN) clearInterval(window.KOE_SOURCE_COUNTDOWN);
    } catch {}

    let rest = 6;
    const counter = document.getElementById('source-countdown');
    const tick = () => { if (counter) counter.textContent = String(rest); };
    tick();
    window.KOE_SOURCE_COUNTDOWN = setInterval(() => { rest -= 1; tick(); }, 1000);
    window.KOE_SOURCE_REDIRECT = setTimeout(() => { window.location.href = googleUrl; }, 6500);

    const cancel = document.getElementById('source-cancel');
    if (cancel) cancel.addEventListener('click', () => {
      clearTimeout(window.KOE_SOURCE_REDIRECT);
      clearInterval(window.KOE_SOURCE_COUNTDOWN);
      const status = document.getElementById('source-status');
      if (status) status.innerHTML = '転送を中止しました。読了記録はこのブラウザに残っています。';
      cancel.style.display = 'none';
      const record = document.getElementById('source-record');
      if (record) record.style.display = 'inline-block';
    });
  }, 0);

  return `<div class="bpage">
    <div class="bpage-num">EXTERNAL LOOKUP</div>
    <div class="bpage-title">記録の外を確かめる</div>
    <div class="bpage-meta">検索先：Google　／　検索語：1949年 列車転覆 冤罪 事件</div>

    <div style="background:#0d0d10;border:1px solid rgba(200,169,110,.25);border-radius:10px;padding:16px;font-family:var(--mono);font-size:11px;line-height:2;color:var(--t2);">
      <div style="color:var(--gold);letter-spacing:.1em;margin-bottom:6px;">EXTERNAL CONNECTION</div>
      <div id="source-status">検索語を送信します。<br><span id="source-countdown">6</span>秒後に、Googleの検索結果へ移動します。</div>
    </div>

    <div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:14px;font-family:var(--mono);font-size:10px;">
      <a href="${googleUrl}" style="padding:9px 12px;border:1px solid rgba(200,169,110,.28);border-radius:8px;color:var(--gold);text-decoration:none;">今すぐ移動</a>
      <button id="source-cancel" type="button" style="padding:9px 12px;border:1px solid rgba(255,255,255,.1);border-radius:8px;background:#0d0d10;color:var(--t2);font:inherit;cursor:pointer;">転送を中止</button>
      <button id="source-record" type="button" onclick="Shell.bNavigate('epilogue')" style="display:none;padding:9px 12px;border:1px solid rgba(255,255,255,.1);border-radius:8px;background:#0d0d10;color:var(--t2);font:inherit;cursor:pointer;">読了記録を見る</button>
      <button type="button" onclick="try{clearTimeout(window.KOE_SOURCE_REDIRECT);clearInterval(window.KOE_SOURCE_COUNTDOWN)}catch{};Shell.bNavigate('choice')" style="padding:9px 12px;border:1px solid rgba(255,255,255,.1);border-radius:8px;background:#0d0d10;color:var(--t2);font:inherit;cursor:pointer;">選択へ戻る</button>
    </div>
  </div>`;
};
