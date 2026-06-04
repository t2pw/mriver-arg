// receiver_lock.js　第3層・受信者ロック（hidden へのゲート）
// 連鎖：data_trace → receiver_lock →(モールス→数字→16進→カタカナ)→ hidden
// 解錠キーワード：アナタハココニイタ / あなたはここにいた
// 既存ツールのみ使用：モールス読取機（→数字）→ 16進変換器（→カタカナ）
// 出題：不明送信元から届くモールス列。送信元の正体は明かさない。

PAGE_CONTENT['receiver_lock'] = () => {
  setTimeout(() => {
    document.querySelectorAll('[data-kwtag]').forEach(el => {
      el.addEventListener('click', () => Shell.setSearchAndFocus(el.getAttribute('data-kwtag')));
    });
    const copy = document.getElementById('recv-copy-morse');
    if (copy) {
      copy.addEventListener('click', () => {
        const text = copy.getAttribute('data-morse') || '';
        try { navigator.clipboard.writeText(text); } catch {}
        copy.textContent = 'コピー済み';
        setTimeout(() => { copy.textContent = 'モールス列をコピー'; }, 1100);
      });
    }
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

  const morse = [
    '・・・・−','・−−−−','・・−−−','・−−−−','・−−−−','−・・・・',
    '・・−−−','−・・・・','・−−−−','−−−−−','・−−−−','−−−−−',
    '・・−−−','・・−−−','・・・・−','・・−−−','・−−−−','−・・・・'
  ];

  return `<div class="bpage">
  <div class="bpage-num" style="color:var(--red);font-size:9px;letter-spacing:.18em;">── 最終封印　RECEIVER-LOCK ──</div>
  <div class="bpage-title">最後のロック</div>
  <div class="bpage-meta" style="color:var(--red);font-family:var(--mono);font-size:10px;">
    受信者ファイルは封じられている　／　解錠には、ひとつの言葉がいる
  </div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── この先に、受信者の正体を記したファイルがある。<br>
      　　ロックを開く直前、端末のメッセージ欄に割り込みが入った。
    </p>
    <p>
      送信元名は読めない。
      文字化けした識別子だけが、古い通知の奥で点滅している。
      小蘭の名前ではない。
    </p>
    <p>
      届いたのは、言葉ではなく符号だった。
      短い点と長い線が、一定の間隔で並んでいる。
      まるで端末そのものが、最後の鍵だけを吐き出したように。
    </p>
  </div>

  <div style="margin:0 0 8px;background:#09090c;border:1px solid rgba(200,88,88,0.2);border-radius:10px;overflow:hidden;">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(200,88,88,0.14);background:rgba(200,88,88,0.08);color:var(--red);font-family:var(--mono);font-size:10px;letter-spacing:.12em;">
      受信割込　── 蜿怜ｯｾ荳肴・ / ID: 7A-??-T
    </div>
    <div style="padding:14px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="width:34px;height:34px;border-radius:10px;background:#141016;border:1px solid rgba(200,88,88,0.25);display:grid;place-items:center;color:var(--red);font-family:var(--mono);font-size:16px;">�</div>
        <div style="font-family:var(--mono);line-height:1.6;">
          <div style="color:var(--t1);font-size:11px;letter-spacing:.08em;">送信元：繧ｿ◆縺薙％??</div>
          <div style="color:var(--t3);font-size:10px;letter-spacing:.06em;">状態：自動復号不能 / 入力支援のみ有効</div>
        </div>
      </div>

      <div id="recv-morse-seq" style="
        background:#050507;
        border:1px solid rgba(255,255,255,0.08);
        border-radius:8px;
        padding:14px 12px;
        font-family:var(--mono);
        font-size:15px;
        color:var(--t1);
        line-height:2.05;
        letter-spacing:.04em;
        word-spacing:.45em;
        user-select:text;
      ">${morse.map((m,i) => `${m}${(i+1)%2===0 ? '<br>' : '　'}`).join('')}</div>

      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:10px;">
        <div id="recv-copy-morse" data-morse="${morse.join(' ')}" style="
          background:rgba(200,169,110,0.08);
          border:1px solid rgba(200,169,110,0.25);
          border-radius:8px;
          padding:7px 10px;
          font-family:var(--mono);
          font-size:10px;
          color:var(--gold);
          cursor:pointer;
          letter-spacing:.06em;
        ">モールス列をコピー</div>
        ${kwTag('モールス')}${kwTag('16進')}
      </div>
    </div>
  </div>

  <div class="bpage-body">
    <p style="font-family:var(--mono);font-size:11px;color:var(--t3);line-height:1.9;">
      ── 手順をひとつ間違えると、言葉にならない。<br>
      　　まず符号を<span style="color:var(--gold);">モールス</span>として読み、数字に直す。<br>
      　　その数字を、今度は<span style="color:var(--gold);">16進</span>として2桁ずつ区切って変換する。<br>
      　　現れたカタカナの言葉を、このブラウザに入力する。
    </p>
    <p class="anom">
      順番を、間違えないこと。<br>
      先にモールス。それから、16進。
    </p>
  </div>
</div>`;
};
