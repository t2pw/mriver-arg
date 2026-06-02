MSG_THREADS['soran_intro'] = () => `
  <div class="mdate-sep">送信日時：1963年9月12日　09:04</div>
  <div class="mbubble-row">
    <div class="mbubble-av">📡</div>
    <div>
      <div class="mbubble anom">このアーカイブを見つけてください。</div>
      <div class="mbubble-time anom">1963-09-12 09:04 ⚠ タイムスタンプ異常</div>
    </div>
  </div>
  <div class="mbubble-row" style="margin-top:6px;">
    <div class="mbubble-av">📡</div>
    <div>
      <div class="mbubble anom">記録が消える前に。<br>あなたが来るのを待っていた。</div>
      <div class="mbubble-time anom">1963-09-12 09:04</div>
    </div>
  </div>
  <div class="mdate-sep" style="margin-top:20px;">── 送信者情報 ──</div>
  <div style="margin:0 4px;background:var(--s2);border:1px solid var(--bd);border-radius:12px;padding:13px;font-family:var(--mono);font-size:11px;color:var(--t2);line-height:1.9;">
    差出人　：<span style="color:var(--red);">特定不能</span><br>
    プロトコル：<span style="color:var(--red);">未知</span><br>
    受信日　：${new Date().toLocaleDateString('ja-JP')}
  </div>
`;
