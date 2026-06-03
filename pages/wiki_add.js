// wiki_add.js　結末②「架空wiki（追記）」
// prereqs: choice

PAGE_CONTENT['wiki_add'] = () => {

  setTimeout(() => {
    const btn = document.getElementById('wiki-confirm-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      try { localStorage.setItem('koe_fumi_note', '1'); } catch {}
      Shell.bNavigate('epilogue');
    });
  }, 0);

  return `<div class="bpage">
  <div class="bpage-num">架空wiki</div>
  <div class="bpage-title">猫塚清治</div>
  <div class="bpage-meta">
    出典：M川事件アーカイブ（蛸川小蘭編纂）　／　編集：このアーカイブの閲覧者
  </div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── 記録から除外された人物の項目。あなたが編集ボタンを押すことで、確定される。
    </p>
  </div>

  <div style="
    margin:0 0 16px;
    background:#0d0d10;
    border:1px solid rgba(255,255,255,0.07);
    border-radius:10px;
    overflow:hidden;
    font-family:var(--serif);
    font-size:13px;
    line-height:2.2;
    color:var(--t2);
  ">
    <div style="
      padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.05);
      font-family:var(--mono);font-size:10px;color:var(--t3);letter-spacing:.1em;
    ">── 人物</div>
    <div style="padding:14px 16px;">
      <strong style="color:var(--t1);">猫塚清治</strong>（ねこつか・きよはる）<br>
      T北本線M川駅付近の保線作業員。昭和二十四年八月十六日夜、事件現場に居合わせた。
    </div>

    <div style="
      padding:10px 14px;border-top:1px solid rgba(255,255,255,0.05);
      border-bottom:1px solid rgba(255,255,255,0.05);
      font-family:var(--mono);font-size:10px;color:var(--t3);letter-spacing:.1em;
    ">── M川事件との関係</div>
    <div style="padding:14px 16px;color:var(--t2);">
      逮捕された二十名の名簿には記載されていない。
      しかし事件後、消息を絶った。公式記録への記載は一切ない。
      当局にとって都合の悪い証言を持っていたとみられる。
      事件当夜に身元不明の人物を現場から逃がしたことが、拘束の一因とされる。
    </div>

    <div style="
      padding:10px 14px;border-top:1px solid rgba(255,255,255,0.05);
      border-bottom:1px solid rgba(255,255,255,0.05);
      font-family:var(--mono);font-size:10px;color:var(--red);letter-spacing:.1em;
    ">── 記録者</div>
    <div style="padding:14px 16px;color:var(--t2);">
      蛸川小蘭。14年間にわたり清治の存在を記録し続けた。
      戸籍を持たない人物であり、彼女自身も公式記録には存在しない。
      1963年9月12日を最後に、消息不明。
    </div>
  </div>

  <div class="bpage-body">
    <p style="font-size:12px;color:var(--t2);line-height:2;">
      清治が存在したから、小蘭はあの夜を生き延びた。<br>
      小蘭が記録したから、清治は存在したことになる。<br>
      <span style="color:var(--t1);">あなたが記録を確定することで、ふたりはここにいる。</span>
    </p>
  </div>

  <div
    id="wiki-confirm-btn"
    style="
      margin:0 0 16px;
      background:rgba(200,169,110,0.1);
      border:1px solid rgba(200,169,110,0.35);
      border-radius:12px;
      padding:18px;
      cursor:pointer;
      font-family:var(--mono);
      text-align:center;
      transition:background .15s;
    "
    onmouseenter="this.style.background='rgba(200,169,110,0.18)'"
    onmouseleave="this.style.background='rgba(200,169,110,0.1)'"
  >
    <div style="color:var(--gold);font-size:13px;letter-spacing:.12em;margin-bottom:4px;">
      ▸ 編集を確定する
    </div>
    <div style="color:var(--t3);font-size:10px;letter-spacing:.06em;">
      この記録を、アーカイブに残す。
    </div>
  </div>
</div>`;
};
