// soran_intro.js ── 初回メッセージスレッド（不明送信元）
// 注意：PAGES には登録しない。ブラウザページではなく MSG_THREADS として動作しており、
// phone_shell.html の ALWAYS_LOAD から常時読み込まれる。
MSG_THREADS['soran_intro'] = () => `
  <div class="mdate-sep">送信日時：1973年9月12日　09:04</div>
  <div class="mbubble-row">
    <div class="mbubble-av">📡</div>
    <div>
      <div class="mbubble anom">このアーカイブを見つけてください。</div>
      <div class="mbubble-time anom">1973-09-12 09:04 ⚠ タイムスタンプ異常</div>
    </div>
  </div>
  <div class="mbubble-row" style="margin-top:6px;">
    <div class="mbubble-av">📡</div>
    <div>
      <div class="mbubble anom">記録が消える前に。<br>受信者欄を照合しています。</div>
      <div class="mbubble-time anom">1973-09-12 09:04</div>
    </div>
  </div>
  <div class="mdate-sep" style="margin-top:20px;">── 送信者情報 ──</div>
  <div style="margin:0 4px;background:var(--s2);border:1px solid var(--bd);border-radius:12px;padding:13px;font-family:var(--mono);font-size:11px;color:var(--t2);line-height:1.9;">
    差出人　：<span style="color:var(--red);">繧ｿ◆縺薙％??</span><br>
    プロトコル：<span style="color:var(--red);">未知</span><br>
    受信日　：${new Date().toLocaleDateString('ja-JP')}
  </div>

  <div class="mbubble-row" style="margin-top:6px;">
    <div class="mbubble-av">📡</div>
    <div>
      <div class="mbubble anom">まず、このアーカイブの内容を確認してください。<br>復元アプリからアクセスできます。</div>
      <div class="mbubble-time anom">1973-09-12 09:04</div>
    </div>
  </div>

  <div style="margin:10px 4px 0;">
    <div
      onclick="Shell.open('browser'); setTimeout(()=>Shell.bNavigate('archive_about'), 80);"
      style="
        display:flex;align-items:center;gap:10px;
        background:var(--s2);
        border:1px solid rgba(100,160,255,0.2);
        border-radius:12px;
        padding:13px 14px;
        cursor:pointer;
        user-select:none;
      "
    >
      <span style="font-size:20px;">📁</span>
      <div style="font-family:var(--mono);font-size:11px;line-height:1.7;">
        <div style="color:var(--t1);letter-spacing:.04em;">このアーカイブについて</div>
        <div style="color:var(--t3);font-size:10px;letter-spacing:.06em;">復元アプリで開く</div>
      </div>
      <span style="margin-left:auto;color:var(--t3);font-size:13px;">›</span>
    </div>
  </div>

  <div class="mbubble-row" style="margin-top:6px;">
    <div class="mbubble-av">📡</div>
    <div>
      <div class="mbubble anom">芙島市の地図データを検出。<br>地名の一部が欠落しています。</div>
      <div class="mbubble-time anom">1973-09-12 09:04</div>
    </div>
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
        暗号化：N-0816　／　サイズ：不明<br>
        タイムスタンプ：1973-09-12 09:04
      </div>
      <div
        onclick="Shell.open('browser'); setTimeout(() => { const v=document.getElementById('bview'); if(v) v.innerHTML='<div style=\"padding:60px 20px;text-align:center;font-family:var(--mono);line-height:2.2;\"><div style=\"font-size:13px;color:var(--red);letter-spacing:.1em;\">⚠ アクセス拒否</div><div style=\"font-size:10px;color:var(--t3);margin-top:8px;letter-spacing:.08em;\">ファイルは暗号化されています<br>復号キー：N-0816<br>解読のために別の手がかりが必要です</div></div>'; }, 80);"
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
