// wiki_skip.js　結末③「架空wiki（スキップ）」
// prereqs: choice
// 役割：記録しない選択をしたプレイヤーへ。
//       「記録されなかったものは存在しなかったことになる」と告げ、もう一度問う。

PAGE_CONTENT['wiki_skip'] = () => {
  setTimeout(() => {
    const btnBack  = document.getElementById('skip-btn-back');
    const btnSkip  = document.getElementById('skip-btn-skip');
    if (!btnBack || !btnSkip) return;

    btnBack.addEventListener('click', () => Shell.bNavigate('wiki_add'));
    btnSkip.addEventListener('click', () => {
      // 記録しない選択を保存
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
      記録されなかったものは、存在しなかったことになる。
    </p>
    <p>
      猫塚清治がそうだった。
      記録から消えたことで、事件の証言台に立てなかった。
      無罪になった二十名の中に、彼はいなかった。
    </p>
    <p>
      ふみの手紙がそうだった。
      宛先が「記録上存在しない人物」だったために、
      文集に収録できなかった。
      三百通の声の中に、彼女の声はない。
    </p>

    <hr style="border:none;border-top:1px solid #222;margin:1.8em 0;">

    <p>
      あなたが記録しなければ、
      この手紙はここで終わる。
    </p>
    <p>
      それはあなたの選択だ。
      小蘭も、強制はしない。
      ふみも、強制はできない。
    </p>
    <p>
      ただ一つだけ伝えておく。
    </p>

    <p class="anom" style="padding:14px;background:#0d0d10;border-radius:8px;border:1px solid rgba(200,88,88,0.15);line-height:2.1;">
      小蘭がアーカイブを作ったのは、<br>
      記録されなかったものを、記録するためだった。<br>
      受信者欄に「あなた」と書いたのは、<br>
      あなたに記録してほしかったからかもしれない。
    </p>
  </div>

  <!-- もう一度問う -->
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
        一言だけ、残す。
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
