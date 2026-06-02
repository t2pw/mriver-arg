// loop.js　第2層⑦「ループの構造」
// キーワード例: 未来の誰か、データ送信、ループ
// prereqs: hub_002
// 役割：小蘭が「未来の誰か」に向けて記録していたことが明かされる。
//       hidden.jsの「███ = あなた」への橋渡し。
//       【v2改修】送信概念を廃し「刻む→持ち続ける→現代で繋がれる」へ。
//       タコ＝声を運んだ器。archive_about（発見者の弾）と接続。

PAGE_CONTENT['loop'] = () => `<div class="bpage">
  <div class="bpage-num">第2層　07</div>
  <div class="bpage-title">ループの構造</div>
  <div class="bpage-meta">ファイル識別子：LOOP-ANALYSIS　／　復号：N-0314　／　作成：1963年</div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── アーカイブの最深部に格納されていたメタファイル。小蘭が自分自身の状況を分析した記録。
    </p>
    <p>
      私はいつから「未来の誰か」に向けて書いていたのだろう。
    </p>
    <p>
      気がついたのは、ずっと後のことだ。
    </p>
  </div>

  <!-- タイムライン -->
  <div style="margin:0 0 20px;font-family:var(--mono);position:relative;">

    <!-- 縦線 -->
    <div style="
      position:absolute;left:20px;top:8px;bottom:8px;
      width:1px;background:rgba(255,255,255,0.08);
    "></div>

    ${[
      {
        year: '現代（出発前）',
        color: 'var(--blue)',
        text: '小蘭は現代の芙島市にいる。ITエンジニア。M川事件を調べている。「声は壁を透して」の未収録の手紙の存在を知る。',
      },
      {
        year: '1949年8月16日',
        color: 'var(--gold)',
        text: 'M川駅付近に現れる。なぜかは分からない。手の中には、タコのぬいぐるみだけがあった。',
      },
      {
        year: '1949年〜',
        color: 'var(--t2)',
        text: '十湯温泉に潜伏。記録を始める。「いつかこれを読む人へ」という一文を最初に書いた。この時点ではまだ、読む相手が誰かを知らなかった。',
      },
      {
        year: '記録の方法',
        color: 'var(--t2)',
        text: 'この時代に、未来へ何かを送る手段はない。だから小蘭は「送る」ことを諦めた。代わりに、すべてをタコの中へ刻み込むことにした。帳面の罫線に、障子の穴に、廃墟に埋めた小さな部品に──ローテクな手段でしか入力できない。一文字ごとに、何日もかかった。',
      },
      {
        year: '1954年頃',
        color: 'var(--t2)',
        text: '文集「声は壁を透して」を古書店で入手。ふみの手紙が収録されていないことに気づく。記録の目的が、少し変わった。',
      },
      {
        year: '1963年9月11日',
        color: 'var(--gold)',
        text: '蒼沼ブルーランドの廃墟に、最後の記録を収めた。タコは、肌身離さず持ち続けた。受け取る相手の名は分からないまま、宛先の欄に「███」とだけ刻んだ。',
      },
      {
        year: '1963年9月12日',
        color: 'var(--red)',
        text: '無罪確定。小蘭の消息が、この日を最後に途絶えた。タコがその後どこへ渡ったのかは、記録にない。',
      },
      {
        year: '2026年',
        color: 'var(--blue)',
        text: '蒼沼ブルーランド跡で、タコの中の記録媒体が見つかった。誰かがそれをネットワークに繋いだ。六十年以上、一度も送られなかった声が、初めて回線を通った。',
      },
      {
        year: '現在',
        color: 'var(--blue)',
        text: 'あなたがアーカイブを受信した。読んでいる。',
      },
    ].map(item => `
      <div style="
        display:flex;align-items:flex-start;gap:12px;
        padding:8px 0;position:relative;
      ">
        <div style="
          width:9px;height:9px;border-radius:50%;
          background:${item.color};border:2px solid #1a1a1f;
          flex-shrink:0;margin-top:4px;margin-left:16px;
          box-shadow:0 0 6px ${item.color};
          position:relative;z-index:1;
        "></div>
        <div style="flex:1;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.04);">
          <div style="font-size:10px;color:${item.color};letter-spacing:.08em;margin-bottom:4px;">${item.year}</div>
          <div style="font-size:11px;color:var(--t2);line-height:1.8;">${item.text}</div>
        </div>
      </div>
    `).join('')}
  </div>

  <div class="bpage-body">
    <p>
      小蘭は1949年に現れた。
      現代の芙島市でM川事件を調べていた人物が、1949年に引き寄せられた。
    </p>
    <p>
      そして記録を作り、タコに刻み、現代まで持ち越した。
    </p>
    <p>
      つまり、M川事件を調べていた人物が、
      M川事件の記録を作った人物でもあった。
    </p>
    <p>
      どちらが先か。
      小蘭が記録を作ったから、現代に記録が届いた。
      現代に記録が届いたから、誰かが調べ始めた。
      誰かが調べ始めたから、小蘭は1949年に引き寄せられた。
    </p>

    <hr style="border:none;border-top:1px solid #222;margin:1.8em 0;">

    <p>
      一つ、分からないことがある。
    </p>
    <p>
      2026年、廃墟でタコを見つけ、回線に繋いだのは誰なのか。
      アーカイブには「撮影の関係者だったとも、廃墟を見に来た者だったとも言われている」とだけある。
      その人物が誰だったのか、今どこにいるのかは、どこにも書かれていない。
    </p>
    <p>
      現代でM川事件を調べ始めた人物がいた。
      その人物は、1949年に引き寄せられた。
    </p>
    <p>
      では、2026年にタコを繋いだ人物は──
    </p>

    <p class="anom">
      受信者欄に刻まれた「███」は、まだ解読されていない。<br>
      でも小蘭は、受信者を知っていたと思う。<br>
      知っていて、黙って刻んだ。
    </p>
  </div>
</div>`;
