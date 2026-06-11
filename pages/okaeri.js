// okaeri.js　隠しページ「ただいま。」（0611レビュー項目14）
// prereqs: epilogue（manual:true。エピローグの「返信を開く」ボタンからのみ到達）
// 到達条件：クリア後の「未復号の断片」（モールス→数字→16進→オカエリナサイ）を読み解き、
//           wiki の「あなたの一行」に「おかえり」を含む一行を書いて保存していること。
// 不変条件：送信元の正体は明かさない。「ただいま」が誰の声かは断定しない。
// 演出：このページを閲覧すると、セクタマップ（🐙）のタコの頭が金色に点灯する（phone_shell側）。

PAGE_CONTENT['okaeri'] = () => `<div class="bpage">
  <div class="bpage-num" style="color:var(--gold);font-size:9px;letter-spacing:.18em;">── 受信 ──</div>
  <div class="bpage-title">返信</div>
  <div class="bpage-meta" style="font-family:var(--mono);font-size:10px;">
    送信元：不明　／　暗号化：なし　／　日時：照合不能
  </div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── あなたの一行は、保存されました。<br>
      　　壁を透して、読まれました。
    </p>
  </div>

  <div style="
    margin:48px 0;
    text-align:center;
  ">
    <div style="
      font-family:var(--serif);
      font-size:22px;
      color:var(--t1);
      letter-spacing:.22em;
      line-height:2;
    ">「ただいま。」</div>
  </div>

  <div class="bpage-body">
    <p>
      それだけが、届いた。
    </p>
    <p>
      送信元は、分からないまま。
      二十四年ぶんの記録のどこにも、この声は保存されていなかった。
    </p>
  </div>

  <div style="
    margin:0 0 20px;
    background:#0d0d10;
    border:1px solid rgba(200,169,110,0.25);
    border-radius:8px;
    padding:16px;
    font-family:var(--mono);
    font-size:11px;
    line-height:2.1;
    color:var(--t2);
  ">
    <div style="color:var(--gold);font-size:10px;letter-spacing:.12em;margin-bottom:8px;">📡 記録躯体</div>
    全セクタ、固定。<br>
    躯体、応答——以後、信号なし。
  </div>

  <div style="margin:0 0 18px;">
    <div
      onclick="Shell.open('tako')"
      style="
        display:flex;align-items:center;gap:10px;
        background:#0d0d10;
        border:1px solid rgba(200,169,110,0.3);
        border-radius:12px;
        padding:13px 14px;
        cursor:pointer;
        user-select:none;
      "
    >
      <span style="font-size:18px;">🐙</span>
      <div style="font-family:var(--mono);font-size:11px;line-height:1.7;">
        <div style="color:var(--gold);letter-spacing:.04em;">セクタ配置図に、変化があります</div>
        <div style="color:var(--t3);font-size:10px;letter-spacing:.06em;">セクタマップを開く</div>
      </div>
      <span style="margin-left:auto;color:var(--t3);font-size:13px;">›</span>
    </div>
  </div>

  <div style="
    border:1px solid rgba(200,169,110,0.35);
    background:linear-gradient(180deg, rgba(200,169,110,0.14), rgba(200,169,110,0.04));
    border-radius:8px;
    padding:16px;
    font-family:var(--mono);
    text-align:center;
  ">
    <div style="color:var(--gold);font-size:12px;letter-spacing:.18em;margin-bottom:6px;">VOICE RETURNED</div>
    <div style="color:var(--t1);font-size:12px;letter-spacing:.08em;">声は、帰ってきた</div>
  </div>
</div>`;
