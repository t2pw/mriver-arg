// sns.js　第2層⑤「声の速さと重さ」
// キーワード例: 葉書一通、重さ、現代
// prereqs: hub_002
// 役割：1950年代の「声」の重さを、現代と対比して示す。

PAGE_CONTENT['sns'] = () => `<div class="bpage">
  <div class="bpage-num">第2層　05</div>
  <div class="bpage-title">声の速さと重さ</div>
  <div class="bpage-meta">記録者：蛸川小蘭　／　記述時期：1960年代初頭（推定）</div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── 小蘭の手記の断片。現代語と当時の語彙が混在している。
    </p>
    <p>
      1949年から1963年の間、私はずっとここにいた。
      この時代に、この場所に。
    </p>
    <p>
      声が届くまでに、時間がかかった。
    </p>
  </div>

  <!-- 対比パネル -->
  <div style="margin:0 0 20px;display:flex;flex-direction:column;gap:1px;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">

    <!-- ヘッダー -->
    <div style="
      display:grid;grid-template-columns:1fr 1fr;
      background:#0d0d10;font-family:var(--mono);font-size:10px;
    ">
      <div style="padding:9px 14px;color:var(--t3);letter-spacing:.1em;border-right:1px solid rgba(255,255,255,0.06);">
        1950年代　の声
      </div>
      <div style="padding:9px 14px;color:var(--t3);letter-spacing:.1em;">
        現代　の声
      </div>
    </div>

    ${[
      ['葉書一通を書く', '文字を入力する'],
      ['切手を貼って、郵便箱に入れる', '送信ボタンを押す'],
      ['3日後に届く', '0.3秒後に届く'],
      ['一通が、次の一通を呼ぶ', 'リポストが、次のリポストを呼ぶ'],
      ['1,300通が集まるのに、数年かかった', '1,300いいねが集まるのに、数時間かかる'],
      ['書いた人の名前が残る', '書いた人の名前は残らないこともある'],
      ['紙は残る', 'サーバーは消える'],
    ].map(([a, b]) => `
      <div style="
        display:grid;grid-template-columns:1fr 1fr;
        background:#0a0a0d;font-family:var(--mono);font-size:11px;
        border-top:1px solid rgba(255,255,255,0.04);
      ">
        <div style="padding:10px 14px;color:var(--t1);line-height:1.7;border-right:1px solid rgba(255,255,255,0.04);">${a}</div>
        <div style="padding:10px 14px;color:var(--t2);line-height:1.7;">${b}</div>
      </div>
    `).join('')}
  </div>

  <div class="bpage-body">
    <p>
      葉書一通の重さは、2グラムだ。
      書いた人の体温が少し残っている。
      切手を貼る時に、舌が触れている。
      郵便箱に入れる時、少し躊躇した人もいたかもしれない。
    </p>
    <p>
      その2グラムが、1300枚積み重なって、1300人の名前になった。
      名前が東京まで届いた。
    </p>
    <p>
      速くなかった。軽くなかった。
      だから残った。
    </p>

    <hr style="border:none;border-top:1px solid #222;margin:1.6em 0;">

    <p style="font-style:italic;font-size:12px;color:var(--t3);line-height:2;">
      「私は現代から来た。
      速い声の時代を知っている。
      でもここで14年間過ごして、
      遅い声の方が遠くまで届くことがある、
      と思うようになった。」<br>
      <span style="font-size:10px;">── 小蘭の手記断片　年代不明</span>
    </p>

    <p class="anom">
      ふみの手紙は、一度も投函されなかった。<br>
      だから今もどこかに存在している。<br>
      投函されなかった声は、まだ届いていない。
    </p>
  </div>
</div>`;
