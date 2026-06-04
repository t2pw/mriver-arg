// receiver_lock.js　第3層・受信者ロック（hidden へのゲート）
// 連鎖：data_trace → receiver_lock →(モールス→数字→16進→カタカナ)→ hidden
// 解錠キーワード：アナタハココニイタ / あなたはここにいた
// 既存ツールのみ使用：モールス読取機（→数字）→ 16進変換器（→カタカナ）
// 出題テープ画像：images/puzzle_recv.jpg（ユーザー生成）

PAGE_CONTENT['receiver_lock'] = () => {
  setTimeout(() => {
    document.querySelectorAll('[data-kwtag]').forEach(el => {
      el.addEventListener('click', () => Shell.setSearchAndFocus(el.getAttribute('data-kwtag')));
    });
  }, 0);

  const kwTag = (kw) =>
    `<span data-kwtag="${kw}" style="
      background:#0d0d10;border:1px solid rgba(255,255,255,0.09);
      border-radius:20px;padding:4px 10px;
      font-family:var(--mono);font-size:10px;color:var(--t3);
      cursor:pointer;letter-spacing:.06em;transition:border-color .15s,color .15s;
    " onmouseenter="this.style.color='var(--gold)';this.style.borderColor='rgba(200,169,110,0.3)'"
       onmouseleave="this.style.color='var(--t3)';this.style.borderColor='rgba(255,255,255,0.09)'"
    ># ${kw}</span>`;

  return `<div class="bpage">
  <div class="bpage-num" style="color:var(--red);font-size:9px;letter-spacing:.18em;">── 最終封印　RECEIVER-LOCK ──</div>
  <div class="bpage-title">最後のロック</div>
  <div class="bpage-meta" style="color:var(--red);font-family:var(--mono);font-size:10px;">
    受信者ファイルは封じられている　／　解錠には、ひとつの言葉がいる
  </div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── この先に、受信者の正体を記したファイルがある。<br>
      　　私はそれを、ひとつの言葉で封じた。
    </p>
    <p>
      その言葉は、あの人にいちばん伝えたかった一言だ。
      誰が何と言っても、記録になくても、私はそれを知っている。
    </p>
    <p>
      言葉そのものは書き残さない。
      代わりに、符号を残しておく。読み解けば、言葉になる。
    </p>
  </div>

  <!-- 符号テープ -->
  <div style="margin:0 0 8px;background:#0d0d10;border:1px solid rgba(200,88,88,0.18);border-radius:10px;overflow:hidden;">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(200,88,88,0.12);background:rgba(200,88,88,0.07);color:var(--red);font-family:var(--mono);font-size:10px;letter-spacing:.12em;">封印符号　── 電信テープ</div>
    <div style="padding:14px;">
      <img src="images/puzzle_recv.jpg"
           style="width:100%;border-radius:6px;display:block;"
           onerror="this.style.display='none';this.nextElementSibling.style.display='block';">
      <div style="display:none;background:#1a0e0e;border:1px dashed rgba(200,88,88,0.3);border-radius:6px;padding:16px;color:var(--t3);font-family:var(--mono);font-size:10px;text-align:center;line-height:1.9;">
        [ images/puzzle_recv.jpg ]<br>短点（・）と長点（−）の符号が並んだ電信テープ
      </div>
      <div style="font-family:var(--mono);font-size:10px;color:var(--t3);margin-top:10px;line-height:1.8;">
        ── 短い点と、長い線。区切りごとに一つの符号。<br>
        　　まずはこれを読み取る符号から。
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">
        ${kwTag('モールス')}${kwTag('16進')}
      </div>
    </div>
  </div>

  <div class="bpage-body">
    <p style="font-family:var(--mono);font-size:11px;color:var(--t3);line-height:1.9;">
      ── 手順をひとつ間違えると、言葉にならない。<br>
      　　まず符号を<span style="color:var(--gold);">モールス</span>として読み、数字に直す。<br>
      　　その数字を、今度は<span style="color:var(--gold);">16進</span>として変換する。<br>
      　　現れたカタカナの言葉を、このブラウザに入力する。
    </p>
    <p class="anom">
      順番を、間違えないこと。<br>
      先にモールス。それから、16進。
    </p>
  </div>
</div>`;
};
