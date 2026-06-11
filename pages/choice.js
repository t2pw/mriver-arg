// choice.js　結末①「追記の依頼」
// prereqs: fumi_tegami
// 役割：分岐点。アーカイブ本文上で、架空のM川事件wikiへの追記を依頼する。

PAGE_CONTENT['choice'] = () => `<div class="bpage">
  <div class="bpage-num">── 依頼 ──</div>
  <div class="bpage-title">この手紙があったことを、追記してください</div>
  <div class="bpage-meta" style="border-bottom:none;padding-bottom:0;">
    M川事件wiki　編集依頼：蛸川小蘭
  </div>

  <div class="bpage-body" style="margin-top:24px;">
    <p>
      小蘭の手紙は、文集に収録されませんでした。
      宛先が「猫塚清治」だったからです。
      記録の上にいない人へ書かれた手紙は、記録の中に置けなかった。
    </p>
    <p>
      でも、あなたはここまで読んでくれました。
      清治さんがいたことも、小蘭が書いたことも、
      私がそれを持ち出したことも、もう知っています。
    </p>
    <p>
      私は、あなたの時代に百科事典のような場所があることを知っています。
      誰かが調べ、誰かが直し、誰かが一行を足していく場所。
      そこなら、消された名前の余白を少しだけ広げられるかもしれない。
    </p>
    <p>
      そこに、
      この手紙があったことと、清治さんと私のことを追記してください。
      長い文章でなくていい。
    </p>
    <p>
      ふたりが、ここにいたと分かる一行を。
    </p>
  </div>

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
        ▸ M川事件wikiを編集する
      </div>
      <div style="color:var(--t2);font-size:11px;line-height:1.8;letter-spacing:.04em;">
        未収録の手紙と、猫塚清治・蛸川小蘭の記録を追記する。
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
        ▸ 追記しない
      </div>
      <div style="color:var(--t3);font-size:11px;line-height:1.8;letter-spacing:.04em;">
        アーカイブを閉じる。
      </div>
    </div>

  </div>

  <div class="bpage-body" style="margin-top:20px;">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;line-height:1.9;">
      ── 選択は記録されます。<br>
      　　追記したかどうかだけが、最後のページに残ります。
    </p>
  </div>
</div>`;
