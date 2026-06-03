// wiki_skip.js　結末③「架空wiki（スキップ）」
// prereqs: choice

PAGE_CONTENT['wiki_skip'] = () => {
  setTimeout(() => {
    const btnBack = document.getElementById('skip-btn-back');
    const btnSkip = document.getElementById('skip-btn-skip');
    if (!btnBack || !btnSkip) return;

    btnBack.addEventListener('click', () => Shell.bNavigate('wiki_add'));
    btnSkip.addEventListener('click', () => {
      try { localStorage.setItem('koe_fumi_note', ''); } catch {}
      Shell.bNavigate('epilogue');
    });
  }, 0);

  return `<div class="bpage">
  <div class="bpage-num">── 確認 ──</div>
  <div class="bpage-title">記録しない、ということ</div>
  <div class="bpage-meta" style="border-bottom:none;padding-bottom:0;color:var(--t3);">
    選択：記録しない
  </div>

  <div class="bpage-body" style="margin-top:24px;">
    <p>
      清治は被告名簿にいなかった。
      逮捕された二十名にも、無罪になった二十名にも、彼の名前はない。
      記録から除外されたことで、彼は存在しなかったことになった。
    </p>
    <p>
      小蘭も同じだ。
      戸籍がない。公式記録がない。
      清治がいなければ、小蘭はあの夜を越えられなかった。
      小蘭が記録しなければ、清治は消えたままになる。
    </p>

    <hr style="border:none;border-top:1px solid #222;margin:1.8em 0;">

    <p>
      あなたが記録しなければ、ふたりはここで終わる。
    </p>
    <p>
      それはあなたの選択だ。
      ただ一つだけ伝えておく。
    </p>

    <p class="anom" style="padding:14px;background:#0d0d10;border-radius:8px;border:1px solid rgba(200,88,88,0.15);line-height:2.1;">
      清治が存在しなければ、小蘭も存在しない。<br>
      小蘭が存在しなければ、清治も存在しない。<br>
      ふたりは、記録されて初めてここにいる。
    </p>
  </div>

  <div style="margin:24px 0 0;display:flex;flex-direction:column;gap:10px;">

    <div
      id="skip-btn-back"
      style="
        background:#0d0d10;
        border:1px solid rgba(200,169,110,0.3);
        border-radius:12px;
        padding:16px 18px;
        cursor:pointer;
        font-family:var(--mono);
        transition:background .15s;
      "
      onmouseenter="this.style.background='rgba(200,169,110,0.07)'"
      onmouseleave="this.style.background='#0d0d10'"
    >
      <div style="color:var(--gold);font-size:12px;letter-spacing:.1em;margin-bottom:4px;">
        ▸ やはり、記録する
      </div>
      <div style="color:var(--t3);font-size:11px;letter-spacing:.04em;">
        ふたりの存在を確定させる。
      </div>
    </div>

    <div
      id="skip-btn-skip"
      style="
        background:#0d0d10;
        border:1px solid rgba(255,255,255,0.06);
        border-radius:12px;
        padding:16px 18px;
        cursor:pointer;
        font-family:var(--mono);
        transition:background .15s;
      "
      onmouseenter="this.style.background='rgba(255,255,255,0.03)'"
      onmouseleave="this.style.background='#0d0d10'"
    >
      <div style="color:var(--t3);font-size:12px;letter-spacing:.1em;margin-bottom:4px;">
        ▸ それでも、記録しない
      </div>
      <div style="color:var(--t3);font-size:11px;letter-spacing:.04em;opacity:.6;">
        先へ進む。
      </div>
    </div>

  </div>
</div>`;
};
