// choice.js　結末①「この手紙を、記録しますか」
// prereqs: fumi_tegami
// 役割：分岐点。wiki_add か wiki_skip かを選ぶ。
//       ただし wiki_skip も最終的にもう一度問う設計なので、どちらも epilogue に繋がる。

PAGE_CONTENT['choice'] = () => `<div class="bpage">
  <div class="bpage-num">── 問い ──</div>
  <div class="bpage-title">この手紙を、記録しますか</div>
  <div class="bpage-meta" style="border-bottom:none;padding-bottom:0;">
    架空文集「声は壁を透して」　未収録欄
  </div>

  <div class="bpage-body" style="margin-top:24px;">
    <p>
      猫塚ふみの手紙は、どこにも記録されていない。
    </p>
    <p>
      文集に収録されなかった。
      郵便記録にもない。
      歴史の中に、存在しない。
    </p>
    <p>
      小蘭はその手紙を書いた。
      ふみの代わりに。
      14年間かけて。
    </p>
    <p>
      そしてあなたに届けた。
    </p>
    <p>
      あなたが、最後の記録者だ。
    </p>
  </div>

  <!-- 選択 -->
  <div style="margin:8px 0 0;display:flex;flex-direction:column;gap:10px;">

    <div
      onclick="Shell.bNavigate('wiki_add')"
      style="
        background:#0d0d10;
        border:1px solid rgba(200,169,110,0.3);
        border-radius:12px;
        padding:18px 18px;
        cursor:pointer;
        font-family:var(--mono);
        transition:background .15s;
      "
      onmouseenter="this.style.background='rgba(200,169,110,0.07)'"
      onmouseleave="this.style.background='#0d0d10'"
    >
      <div style="color:var(--gold);font-size:12px;letter-spacing:.1em;margin-bottom:6px;">
        ▸ 記録する
      </div>
      <div style="color:var(--t2);font-size:11px;line-height:1.8;letter-spacing:.04em;">
        架空文集「声は壁を透して」の<br>
        未収録の手紙（猫塚ふみ）欄に、一言を残す。
      </div>
    </div>

    <div
      onclick="Shell.bNavigate('wiki_skip')"
      style="
        background:#0d0d10;
        border:1px solid rgba(255,255,255,0.07);
        border-radius:12px;
        padding:18px 18px;
        cursor:pointer;
        font-family:var(--mono);
        transition:background .15s;
      "
      onmouseenter="this.style.background='rgba(255,255,255,0.03)'"
      onmouseleave="this.style.background='#0d0d10'"
    >
      <div style="color:var(--t2);font-size:12px;letter-spacing:.1em;margin-bottom:6px;">
        ▸ 記録しない
      </div>
      <div style="color:var(--t3);font-size:11px;line-height:1.8;letter-spacing:.04em;">
        このまま先へ進む。
      </div>
    </div>

  </div>

  <div class="bpage-body" style="margin-top:20px;">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;line-height:1.9;">
      ── どちらを選んでも、物語は続く。<br>
      　　でも記録されたかどうかは、残る。
    </p>
  </div>
</div>`;
