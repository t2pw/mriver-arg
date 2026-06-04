// epilogue.js　結末④「エピローグ」
// prereqs: []（wiki_add / wiki_skip どちらからも bNavigate で到達）

PAGE_CONTENT['epilogue'] = () => {

  const flag = (() => {
    try { return localStorage.getItem('koe_fumi_note') || ''; } catch { return ''; }
  })();

  const recorded = flag.trim().length > 0;
  const today = new Date().toLocaleDateString('ja-JP');
  const shareText = encodeURIComponent('「声は壁を透して」を読了しました。記録されなかった手紙をめぐるARG。');
  const shareUrl = encodeURIComponent(location.href.split('#')[0]);
  const googleUrl = 'https://www.google.com/search?q=%E6%9D%BE%E5%B7%9D%E4%BA%8B%E4%BB%B6';

  try {
    if (window.KOE_EPILOGUE_REDIRECT) clearTimeout(window.KOE_EPILOGUE_REDIRECT);
  } catch {}

  if (!recorded) {
    window.KOE_EPILOGUE_REDIRECT = setTimeout(() => {
      try { window.location.href = googleUrl; } catch {}
    }, 6500);
  }

  return `<div class="bpage">
  <div class="bpage-num">── GAME CLEAR ──</div>
  <div class="bpage-title">${recorded ? '声は、届きました' : '検索は、ここから続きます'}</div>
  <div class="bpage-meta">読了日時：${today}　／　閲覧者：あなた</div>

  <div style="
    margin:0 0 18px;
    border:1px solid rgba(200,169,110,0.35);
    background:linear-gradient(180deg, rgba(200,169,110,0.14), rgba(200,169,110,0.04));
    border-radius:8px;
    padding:16px;
    font-family:var(--mono);
    text-align:center;
  ">
    <div style="color:var(--gold);font-size:12px;letter-spacing:.18em;margin-bottom:6px;">ARCHIVE COMPLETE</div>
    <div style="color:var(--t1);font-size:13px;letter-spacing:.08em;">「声は壁を透して」読了</div>
  </div>

  ${recorded ? `
  <div class="bpage-body">
    <p>
      ありがとう。
    </p>
    <p>
      あなたが押した保存ボタンは、ほんとうの歴史を変えるものではありません。
      けれど、ここまで読んだあなたが一行を足してくれたことは、
      私にとっては十分に大きな出来事です。
    </p>
    <p>
      清治さんは、被告名簿にも証人名簿にもいませんでした。
      ふみさんの手紙も、文集には載りませんでした。
      私も、戸籍の上にはいません。
    </p>
    <p>
      それでもあなたは、
      いた、と書いてくれた。
    </p>
    <p>
      私が未来に向けて送ったものは、
      未来の誰かに届きました。
      その誰かが、あなたでした。
    </p>
    <p class="anom">
      声は、壁を透して届いた。
    </p>
  </div>

  <div style="
    margin:0 0 20px;
    background:#0c0b08;
    border:1px solid rgba(200,169,110,0.2);
    border-radius:8px;
    padding:16px;
    font-family:var(--mono);
    font-size:11px;
    line-height:2;
    color:var(--t2);
  ">
    追記済み：M川事件 / 未収録資料<br>
    記録対象：猫塚清治、猫塚ふみの手紙、蛸川小蘭のアーカイブ<br>
    保存者：このアーカイブの閲覧者<br>
    保存日：${today}
  </div>
  ` : `
  <div class="bpage-body">
    <p>
      あなたは追記しないことを選びました。
      それも、ひとつの選択です。
    </p>
    <p>
      ただ、ここでアーカイブは閉じません。
      小蘭が調べていた名前は、架空のM川事件だけでは終わらない。
      あなたの時代には、実際に検索できる事件が残っています。
    </p>
    <p>
      数秒後、Google検索へ移動します。
      検索欄には「松川事件」と入力済みです。
    </p>
    <p class="anom" style="opacity:.85;">
      記録しなかったあとに、調べることもできる。
    </p>
  </div>

  <div style="
    margin:0 0 20px;
    background:#0d0d10;
    border:1px solid rgba(255,255,255,0.08);
    border-radius:8px;
    padding:16px;
    font-family:var(--mono);
    font-size:11px;
    line-height:2;
    color:var(--t3);
  ">
    猫塚清治　── このアーカイブでは未追記<br>
    蛸川小蘭　── このアーカイブでは未追記<br>
    次の遷移先　── Google検索「松川事件」
  </div>

  <div style="margin:0 0 18px;">
    <a
      href="${googleUrl}"
      style="
        display:inline-block;
        background:#0d0d10;
        border:1px solid rgba(200,169,110,0.25);
        border-radius:8px;
        padding:9px 13px;
        font-family:var(--mono);
        font-size:11px;
        color:var(--gold);
        text-decoration:none;
        letter-spacing:.06em;
      "
    >今すぐ検索へ進む</a>
  </div>
  `}

  <div style="display:flex;gap:10px;flex-wrap:wrap;margin:4px 0 18px;">
    <a
      href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}"
      target="_blank"
      rel="noopener"
      style="
        display:inline-block;
        background:#0d0d10;
        border:1px solid rgba(255,255,255,0.12);
        border-radius:8px;
        padding:9px 13px;
        font-family:var(--mono);
        font-size:11px;
        color:var(--t1);
        text-decoration:none;
        letter-spacing:.06em;
      "
    >Xでシェア</a>
    <div
      onclick="try{clearTimeout(window.KOE_EPILOGUE_REDIRECT)}catch{};Shell.bNavigate('choice')"
      style="
        display:inline-block;
        background:#0d0d10;
        border:1px solid rgba(255,255,255,0.08);
        border-radius:8px;
        padding:9px 13px;
        font-family:var(--mono);
        font-size:11px;
        color:var(--t3);
        cursor:pointer;
        letter-spacing:.06em;
      "
    >分岐へ戻る</div>
  </div>

  <div class="bpage-body">
    <hr style="border:none;border-top:1px solid #1a1a1a;margin:0 0 1.6em;">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;line-height:2;">
      ── アーカイブ閲覧完了<br>
      　　記録者：蛸川小蘭　1949年〜1973年<br>
      　　閲覧者：あなた　${today}
    </p>
  </div>
</div>`;
};
