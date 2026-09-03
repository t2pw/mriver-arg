// soran_intro.js — 初回受信スレッド
// PAGE_CONTENTには登録しない。通知は機械の固定書式に限定する。

MSG_THREADS['soran_intro'] = () => `
  <div class="mdate-sep">1973-09-12 09:04</div>

  <div class="mbubble-row">
    <div class="mbubble-av">📡</div>
    <div>
      <div class="mbubble anom">ARCHIVE SIGNAL　受信</div>
      <div class="mbubble-time anom">時刻差：照合不能</div>
    </div>
  </div>

  <div class="mdate-sep" style="margin-top:20px;">RECEIVE STATUS</div>
  <div style="margin:0 4px;background:var(--s2);border:1px solid var(--bd);border-radius:12px;padding:13px;font-family:var(--mono);font-size:11px;color:var(--t2);line-height:1.9;">
    送信元　：<span style="color:var(--red);">繧ｿ◆縺薙％??</span><br>
    受信者　：<span style="color:var(--red);">███</span><br>
    読取状態：一部欠損<br>
    接続元　：照合できません
  </div>

  <div class="mbubble-row" style="margin-top:8px;">
    <div class="mbubble-av">📡</div>
    <div>
      <div class="mbubble anom">先頭記録を復元しました。</div>
      <div class="mbubble-time anom">固定処理：待機</div>
    </div>
  </div>

  <div style="margin:10px 4px 0;">
    <div
      onclick="Shell.open('browser');setTimeout(()=>Shell.bNavigate('archive_about'),80);"
      style="display:flex;align-items:center;gap:10px;background:var(--s2);border:1px solid rgba(100,160,255,0.2);border-radius:12px;padding:13px 14px;cursor:pointer;user-select:none;"
    >
      <span style="font-size:20px;">📁</span>
      <div style="font-family:var(--mono);font-size:11px;line-height:1.7;">
        <div style="color:var(--t1);letter-spacing:.04em;">このアーカイブについて</div>
        <div style="color:var(--t3);font-size:10px;letter-spacing:.06em;">復元アプリで開く</div>
      </div>
      <span style="margin-left:auto;color:var(--t3);font-size:13px;">›</span>
    </div>
  </div>
`;
