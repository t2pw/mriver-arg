// hub_002.js　第2層ハブ「第2層が開く」
// 全スポーク完了で自動解放。キーワード不要。
// 役割：第1層の総括 → 第2層への接続。物語の重心が変わる節目。

PAGE_CONTENT['hub_002'] = () => `<div class="bpage">
  <div class="bpage-num">── 第2層　解放 ──</div>
  <div class="bpage-title">あなたはすべてを読んだ</div>
  <div class="bpage-meta">自動復元　／　解放条件：全スポーク完了　／　1973-09-12</div>

  <div class="bpage-body">
    <p>
      手記を読んだ。写真を見た。掲示板の声を読んだ。地図の記録を辿った。電文を復号した。
    </p>
    <p>
      小蘭が24年間かけて記録したものの、輪郭が見えてきた。
    </p>
  </div>

  <!-- スポーク完了サマリー -->
  <div style="
    margin:0 0 20px;
    background:#0d0d10;
    border:1px solid rgba(255,255,255,0.07);
    border-radius:10px;
    overflow:hidden;
    font-family:var(--mono);
    font-size:11px;
  ">
    <div style="
      padding:10px 14px;
      border-bottom:1px solid rgba(255,255,255,0.06);
      color:var(--t3);letter-spacing:.1em;
    ">── ARCHIVE RESTORE COMPLETE</div>

    ${['A　手記　────　事件の夜から、書けない手紙まで',
       'B　写真　────　記録されなかった人物の顔',
       'C　掲示板　──　市民の声と、差し止められた投書',
       'D　地図　────　24年間が刻まれた芙島市の地図',
       'E　電文　────　N-0816と、未収録の手紙の予告',
    ].map(line => `
      <div style="
        display:flex;align-items:center;gap:10px;
        padding:9px 14px;
        border-bottom:1px solid rgba(255,255,255,0.04);
        color:var(--t1);letter-spacing:.04em;
      ">
        <span style="color:var(--gold);font-size:10px;">✓</span>
        <span>${line}</span>
      </div>
    `).join('')}

    <div style="
      padding:12px 14px;
      color:var(--gold);
      letter-spacing:.08em;
      font-size:11px;
    ">
      UNLOCK：第2層　8ファイル（背骨 3 ＋ 資料棚 5）
    </div>
  </div>

  <div class="bpage-body">
    <p>
      ここまでは、記録の「外側」だった。
      事件の夜。潜伏。市民運動。地図。暗号。
      小蘭の目を通して見えたものが積み重なった。
    </p>
    <p>
      第2層は「内側」に入る。
    </p>
    <p>
      清治さんとはどんな人物だったか。
      なぜ冤罪は生まれたのか。
      声を上げた人々は何と戦っていたのか。
      そして、文集に収録されなかった手紙は、なぜ収録できなかったのか。
    </p>

    <p class="anom">
      ここから先、背骨になる記録は三つ。<br>
      一つ読めば、次が見えてくる。<br>
      残りの五つは資料棚に置いた。読む順番は、あなたが決めていい。
    </p>

    <p style="font-style:italic;font-size:12px;color:var(--t3);line-height:2;margin-top:2em;">
      「いつかこれを読む人へ。<br>
      　ここまで来てくれた。<br>
      　もう少しだけ、続きがある。」<br>
      <span style="font-size:10px;">── 蛸川小蘭　1973年9月11日</span>
    </p>
  </div>

  <!-- 第2層への入口（連鎖の最初の一語） -->
  <div style="
    margin:0 0 0;
    background:#0d0009;
    border:1px solid rgba(200,88,88,0.18);
    border-radius:10px;
    overflow:hidden;
    font-family:var(--mono);
  ">
    <div style="
      padding:9px 14px;
      border-bottom:1px solid rgba(200,88,88,0.12);
      font-size:10px;color:var(--red);letter-spacing:.12em;
    ">── 第2層　最初のファイル</div>
    <div style="padding:14px;font-size:12px;color:var(--t2);line-height:2.1;letter-spacing:.04em;">
      まず、私が問い続けた問いから始める。<br>
      無実の人間が、なぜ有罪にされるのか。<br>
      記録の中に、その答えを残した——<span style="color:var(--red);">なぜ冤罪は生まれたか</span>、と。
    </div>
    <div style="padding:0 14px 14px;font-size:10px;color:var(--t3);letter-spacing:.06em;line-height:1.8;">
      ── この語を検索することから、第2層は始まる。<br>
      　　資料棚の五冊は、このページを閉じた時には、もう並んでいる。
    </div>
  </div>
</div>`;
