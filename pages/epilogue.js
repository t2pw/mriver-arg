// epilogue.js　共通の読了記録
// record/source を正解・不正解として序列化しない。

PAGE_CONTENT['epilogue'] = () => {
  const ending = (() => {
    try { return localStorage.getItem('koe_ending') || 'source'; } catch { return 'source'; }
  })();
  const note = (() => {
    try { return (localStorage.getItem('koe_fumi_note') || '').trim(); } catch { return ''; }
  })();
  const trueEnd = (() => {
    try { return ending === 'record' && localStorage.getItem('koe_true_end') === '1'; } catch { return false; }
  })();
  const esc = value => value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const today = new Date().toLocaleDateString('ja-JP');
  const googleUrl = 'https://www.google.com/search?q=' + encodeURIComponent('1949年 列車転覆 冤罪 事件');

  const result = ending === 'record' ? `
    <div style="background:#0c0b08;border:1px solid rgba(200,169,110,.28);border-radius:9px;padding:16px;font-family:var(--mono);font-size:11px;line-height:2;color:var(--t2);">
      <div style="color:var(--gold);letter-spacing:.1em;margin-bottom:5px;">RESULT / RECORD</div>
      M川事件資料wiki：1版更新<br>
      未収録資料：追記済み<br>
      ${note ? `<span style="color:var(--t1);">「${esc(note)}」</span>` : ''}
    </div>
    <div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:13px;font-family:var(--mono);font-size:10px;">
      <a href="m-kawa-wiki/?from=koe" style="padding:9px 12px;border:1px solid rgba(200,169,110,.25);border-radius:8px;color:var(--gold);text-decoration:none;">保存した版を見る</a>
      ${trueEnd ? `<button type="button" onclick="Shell.bNavigate('okaeri')" style="padding:9px 12px;border:1px solid rgba(200,169,110,.25);border-radius:8px;background:#0d0d10;color:var(--gold);font:inherit;cursor:pointer;">受信 1件</button>` : ''}
    </div>` : `
    <div style="background:#0d0d10;border:1px solid rgba(200,169,110,.28);border-radius:9px;padding:16px;font-family:var(--mono);font-size:11px;line-height:2;color:var(--t2);">
      <div style="color:var(--gold);letter-spacing:.1em;margin-bottom:5px;">RESULT / SOURCE</div>
      公開資料への照合：選択済み<br>
      内部記録：既読状態を保持<br>
      受信者名：未登録
    </div>
    <div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:13px;font-family:var(--mono);font-size:10px;">
      <a href="${googleUrl}" style="padding:9px 12px;border:1px solid rgba(200,169,110,.25);border-radius:8px;color:var(--gold);text-decoration:none;">検索結果へ戻る</a>
    </div>`;

  return `<div class="bpage">
    <div class="bpage-num">READ COMPLETE</div>
    <div class="bpage-title">読了記録</div>
    <div class="bpage-meta">${today}　／　閲覧者：現在の閲覧者</div>

    ${result}

    <div style="margin-top:22px;padding-top:14px;border-top:1px solid var(--bd);font-family:var(--mono);font-size:9px;color:var(--t3);line-height:1.9;">
      ARCHIVE STATUS：FIXED<br>
      RECEIVED FILES：15
    </div>
  </div>`;
};
