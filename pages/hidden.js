// hidden.js　第3層①「隠しページ」
// prereqs: data_trace

PAGE_CONTENT['hidden'] = () => `<div class="bpage">
  <div class="bpage-num" style="color:var(--red);font-size:9px;letter-spacing:.18em;">
    ── 復号完了　HIDDEN FILE ──
  </div>
  <div class="bpage-title">受信者</div>
  <div class="bpage-meta" style="color:var(--red);font-family:var(--mono);font-size:10px;">
    ファイル識別子：RECEIVER-FINAL　／　暗号キー：N-0816　／　アクセス回数：1
  </div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── このファイルは一度しか開かれないように設定されていた。<br>
      　　それでもあなたは開いた。
    </p>
  </div>

  <div style="
    margin:0 0 20px;
    background:#0d0009;
    border:1px solid rgba(200,88,88,0.25);
    border-radius:10px;overflow:hidden;
    font-family:var(--mono);
  ">
    <div style="
      padding:10px 14px;
      border-bottom:1px solid rgba(200,88,88,0.15);
      background:rgba(200,88,88,0.08);
      display:flex;align-items:center;justify-content:space-between;
    ">
      <span style="color:var(--red);font-size:10px;letter-spacing:.12em;">DECRYPT：受信者識別子</span>
      <span style="font-size:10px;color:var(--t3);">照合完了</span>
    </div>
    <div style="padding:20px 16px;text-align:center;">
      <div style="
        font-family:var(--mono);font-size:11px;
        color:var(--t3);letter-spacing:.12em;margin-bottom:14px;
      ">███　→　復号中</div>
      <div style="
        font-family:var(--serif);font-size:16px;
        color:var(--t1);letter-spacing:.12em;line-height:2;
      ">
        このページを読んでいる<br>あなた
      </div>
      <div style="
        margin-top:14px;font-size:10px;
        color:var(--t3);font-family:var(--mono);letter-spacing:.08em;line-height:1.9;
      ">
        照合テーブルのエントリは「あなた」だった。<br>
        テーブルが作成された日付：1973年9月11日<br>
        テーブルに記録された受信者数：1
      </div>
    </div>
  </div>

  <div class="bpage-body">
    <p>
      小蘭はあなたを知らなかった。
      名前も、顔も、いつ読むのかも知らなかった。
      それでも「このページを読んでいるあなた」と書いた。
      1973年の9月11日に。
    </p>
    <p>
      あなたが読む前から、受信者はあなただった。
    </p>
    <p>
      一つだけ問う。
    </p>
    <p style="font-style:italic;font-size:13px;color:var(--t2);letter-spacing:.06em;line-height:2.1;">
      私が1949年8月17日の現場にいたのも、偶然だったのか。<br>
      あなたがこれを読んでいるのも、偶然なのか。
    </p>
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);">
      ── 答えは提示しない。
    </p>

    <hr style="border:none;border-top:1px solid #2a0008;margin:1.8em 0;">

    <p>
      私はあの夜——1949年8月16日——来た場所に戻れなかった。
      以来ずっと、この時代にいる。
      戸籍もない。家もない。清治さんの家には住めなかった。
    </p>
    <p>
      清治さんは被告名簿にいなかった。
      逮捕された二十名の中に、彼の名前はない。
      無罪になった二十名の中にも、ない。
      彼は事件の記録から完全に除外された。
    </p>
    <p>
      それが、消されたということの意味だ。
    </p>
  </div>

  <div style="
    margin:0 0 20px;
    background:#0d0009;
    border:1px solid rgba(200,88,88,0.18);
    border-radius:8px;
    padding:16px;
    font-family:var(--serif);
    font-size:12px;
    color:var(--t2);
    line-height:2.1;
  ">
    清治さんが助けなければ、私はあの夜を越えられなかった。<br>
    私が記録しなければ、清治さんは存在しなかったことになる。<br>
    <span style="color:var(--red);">どちらが欠けても、ふたりは消える。</span>
  </div>

  <div class="bpage-body">
    <p>
      次のファイルがある。
    </p>
    <p>
      私が24年間、届けられなかった手紙だ。
      清治さんはどこにいるのかも分からない。
      それでも書いた。書き続けた。
    </p>
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);">
      ── 届けてほしい。あなたに頼む理由は、それだけだ。
    </p>
  </div>

  <div style="margin:0 0 0;">
    <div
      onclick="Shell.bNavigate('fumi_tegami')"
      style="
        display:flex;align-items:center;gap:10px;
        background:#0d0009;
        border:1px solid rgba(200,88,88,0.25);
        border-radius:12px;
        padding:13px 14px;
        cursor:pointer;
        user-select:none;
      "
    >
      <span style="font-size:20px;">✉️</span>
      <div style="font-family:var(--mono);font-size:11px;line-height:1.7;">
        <div style="color:var(--t1);letter-spacing:.04em;">届けられなかった手紙</div>
        <div style="color:var(--t3);font-size:10px;letter-spacing:.06em;">差出人：蛸川小蘭　宛先：猫塚清治</div>
      </div>
      <span style="margin-left:auto;color:var(--t3);font-size:13px;">›</span>
    </div>
  </div>
</div>`;
