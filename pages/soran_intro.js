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

  <div class="mdate-sep" style="margin-top:20px;">── 添付ファイル ──</div>
  <div style="margin:0 4px;">
    <div style="
      background:var(--s2);
      border:1px solid rgba(200,88,88,0.22);
      border-radius:12px;
      padding:13px 14px;
      font-family:var(--mono);
      font-size:11px;
      color:var(--t2);
      line-height:1.9;
    ">
      <div style="color:var(--red);letter-spacing:.08em;margin-bottom:6px;">
        ⚠ 添付　1件
      </div>
      <div style="color:var(--t3);font-size:10px;margin-bottom:10px;letter-spacing:.06em;">
        ファイル名：RECEIVER-FINAL<br>
        暗号化：N-0314　／　サイズ：不明<br>
        タイムスタンプ：1963-09-12 09:04
      </div>
      <div
        onclick="Shell.open('browser'); setTimeout(() => Shell.bNavigate('hidden'), 80);"
        style="
          display:inline-block;
          background:rgba(200,88,88,0.12);
          border:1px solid rgba(200,88,88,0.3);
          border-radius:7px;
          padding:7px 14px;
          color:var(--red);
          font-size:11px;
          letter-spacing:.08em;
          cursor:pointer;
          user-select:none;
        "
      >▸ ファイルを開く</div>
    </div>
  </div>
`;
