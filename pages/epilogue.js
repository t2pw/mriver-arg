// epilogue.js　結末④「エピローグ」
// prereqs: []（wiki_add / wiki_skip どちらからも bNavigate で到達）

PAGE_CONTENT['epilogue'] = () => {

  const flag = (() => {
    try { return localStorage.getItem('koe_fumi_note') || ''; } catch { return ''; }
  })();

  const recorded = flag.trim().length > 0;

  return `<div class="bpage">
  <div class="bpage-num">── エピローグ ──</div>
  <div class="bpage-title">芙島市に、桜の花が咲いている</div>
  <div class="bpage-meta">記録日時：${new Date().toLocaleDateString('ja-JP')}　／　閲覧者：あなた</div>

  <div class="bpage-body">
    <p>
      芙島市に、桜の花が咲いている。
    </p>
    <p>
      小蘭が14年間、三月のたびに眺めた山だ。
      清治と来たかった場所かどうかは、分からない。
      来られなかった。
    </p>
    <p>
      小蘭は1963年9月12日の後、消えた。
      戸籍もない。記録もない。
      どこへ行ったのかも、なぜ消えたのかも、分からない。
    </p>
  </div>

  <hr style="border:none;border-top:1px solid #222;margin:0 0 1.6em;">

  ${recorded ? `
  <div style="
    margin:0 0 20px;
    background:#0c0b08;
    border:1px solid rgba(200,169,110,0.2);
    border-radius:10px;
    overflow:hidden;
  ">
    <div style="
      padding:10px 14px;
      border-bottom:1px solid rgba(200,169,110,0.1);
      font-family:var(--mono);font-size:10px;
      color:var(--gold);letter-spacing:.12em;
    ">── 記録確定　猫塚清治・蛸川小蘭</div>
    <div style="
      padding:18px 18px;
      font-family:var(--serif);
      font-size:13px;
      color:var(--t1);
      line-height:2.3;
      letter-spacing:.05em;
    ">
      清治が存在したから、小蘭はあの夜を生き延びた。<br>
      小蘭が記録したから、清治は存在したことになる。<br>
      あなたが記録したから、ふたりはここにいる。
    </div>
    <div style="
      padding:8px 14px 12px;
      font-family:var(--mono);font-size:10px;
      color:var(--t3);letter-spacing:.08em;
    ">記録者：このアーカイブの閲覧者　／　${new Date().toLocaleDateString('ja-JP')}</div>
  </div>

  <div class="bpage-body">
    <p>
      記録は届いた。あなたのところに。
    </p>
    <p>
      清治の名前が、ここに残った。
      小蘭の14年間が、ここに残った。
      ふたりは記録されて、存在する。
    </p>
    <p style="font-style:italic;font-size:12px;color:var(--t3);line-height:2;">
      「いつかこれを読む人へ。<br>
      　あなたが来るのを待っていた。」<br>
      <span style="font-size:10px;">── 蛸川小蘭　1963年9月11日</span>
    </p>
    <p class="anom">
      声は、壁を透して届いた。
    </p>
  </div>
  ` : `
  <div style="
    margin:0 0 20px;
    background:#0d0d10;
    border:1px solid rgba(255,255,255,0.06);
    border-radius:10px;
    padding:18px 18px;
    font-family:var(--mono);font-size:11px;
    color:var(--t3);line-height:2;letter-spacing:.06em;
  ">
    猫塚清治　── 記録なし<br>
    蛸川小蘭　── 記録なし
  </div>

  <div class="bpage-body">
    <p>
      清治の名前は、どこにも残らない。
    </p>
    <p>
      清治がいなければ、あの夜の小蘭もいなかった。
      小蘭がいなければ、この記録もなかった。
      ふたりの14年間は、どこにも残らない。
    </p>
    <p>
      それでも桜の花は咲く。
      記録されなくても、咲く。
    </p>
    <p style="font-style:italic;font-size:12px;color:var(--t3);line-height:2;">
      「記録されなかったものは、<br>
      　存在しなかったことになる。<br>
      　それが歴史というものだ。<br>
      　私はそれが嫌だった。だから書いた。」<br>
      <span style="font-size:10px;">── 蛸川小蘭　1963年9月11日</span>
    </p>
    <p class="anom" style="opacity:.7;">
      あなたはいつでも戻って、記録できる。
    </p>
    <div
      onclick="Shell.bNavigate('wiki_add')"
      style="
        display:inline-block;margin-top:4px;
        background:#0d0d10;border:1px solid rgba(200,169,110,0.2);
        border-radius:8px;padding:8px 14px;
        font-family:var(--mono);font-size:11px;
        color:var(--gold);cursor:pointer;letter-spacing:.08em;
      "
    >▸ 記録する</div>
  </div>
  `}

  <div class="bpage-body" style="margin-top:${recorded ? '0' : '8px'};">
    <hr style="border:none;border-top:1px solid #1a1a1a;margin:0 0 1.6em;">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;line-height:2;">
      ── アーカイブ閲覧完了<br>
      　　記録者：蛸川小蘭　1949年〜1963年<br>
      　　閲覧者：あなた　${new Date().toLocaleDateString('ja-JP')}
    </p>
  </div>
</div>`;
};
