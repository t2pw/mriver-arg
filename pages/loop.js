// loop.js　第2層⑦「記録の行方」
// キーワード: 未来の誰か、タコに刻んだ、記録の行方
// prereqs: inochi（背骨2番目）。次の data_trace は施錠＝照合語は tegami の添え状断片（バックアップ）
// 役割：小蘭が「未来の誰か」に向けて記録していたことが明かされる。
//       hidden.jsの「███ = あなた」への橋渡し。
//       タコ＝声を運んだ器。archive_about（発見者）と接続。

PAGE_CONTENT['loop'] = () => `<div class="bpage">
  <div class="bpage-num">第2層　07</div>
  <div class="bpage-title">記録の行方</div>
  <div class="bpage-meta">ファイル識別子：TRACE-ANALYSIS　／　復号：N-0816　／　作成：1973年</div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── アーカイブの最深部に格納されていたメタファイル。<br>
      　　小蘭の記述を、端末が時系列に並べ直したもの。
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
        text: '月湯温泉に潜伏。記録を始める。「いつかこれを読む人へ」という一文を最初に書いた。この時点ではまだ、読む相手が誰かを知らなかった。',
      },
      {
        year: '記録の方法',
        color: 'var(--t2)',
        text: '確実に未来へ届ける手段はなかった。だから小蘭は、すべてをタコへ託した。タコは綿の奥に小さな機械を抱えている。鍵のような大事なものは、撫でる、握る、と触れることで一文字ずつ教えた。帳面の罫線に紛れさせた小さな印は、その控えだ。だが、それだけでは足りなかった。機械は、声を聴いていた。小蘭が夜ごと、書いたものを読み上げる。失われた光景を、言葉で描写する。機械はそれを写し取り、描写からは像を起こした。アーカイブの長い記述と「復元画像」は、そうして残った。機械は時折ひとりでに、どこかへ繋がろうとした。その線の先がいつの時代なのかは、分からなかった。',
      },
      {
        year: '1954年頃',
        color: 'var(--t2)',
        text: '文集「声は壁を透して」を古書店で入手。あの夜の自分の手紙が収録されていないことに気づく。記録の目的が、少し変わった。',
      },
      {
        year: '1963年9月12日',
        color: 'var(--gold)',
        text: 'M川事件、無罪確定。被告二十名が解放された。だが清治さんの名前は、最後まで記録に戻らなかった。小蘭はなお、月湯に留まり続けた。',
      },
      {
        year: '1973年',
        color: 'var(--red)',
        text: '蒼沼ブルーランドが開いた年。小蘭は、人で賑わうその遊園地に紛れて、タコに刻んだ記録を埋めた。受け取る相手の名は分からないまま、宛先の欄に「███」とだけ刻んで。この年を最後に、小蘭の消息は途絶えた。タコがその後どこへ渡ったのかは、記録にない。',
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
      1949年から24年間かけて記録を作り、タコに納めた。
      確かに届くという保証はなかった。
      ただ、残すことと、託すことだけはできた。
    </p>
    <p>
      残したものは、確かに届いた。
    </p>

    <p class="anom">
      受信者欄に刻まれた「███」は、まだ解読されていない。<br>
      小蘭は、受信者を知らないまま刻んだ。<br>
      その空欄を、端末だけが覚えている。
    </p>

    <p>
      この記録には、技術では説明のつかない痕跡がいくつも残っている。データの異常ではない。存在の異常だ。その全容は、最後のファイルに記されている。
    </p>
  </div>

  <div style="margin:18px 0 4px;">
    <div style="background:#0d0009;border:1px solid rgba(200,88,88,0.25);border-radius:12px;overflow:hidden;font-family:var(--mono);">
      <div style="padding:9px 14px;border-bottom:1px solid rgba(200,88,88,0.15);font-size:10px;color:var(--red);letter-spacing:.12em;">── 最後のファイル　施錠</div>
      <div style="padding:13px 14px;color:var(--t2);font-size:12px;line-height:2;">
        最後のファイルには、私が自分で鍵をかけた。<br>
        消されないため、ではない。読む人に、先に文集を開いてほしかったからだ。<br>
        鍵にした言葉は、文集に挟まれた断片の中にある。<br>
        この時代の誰にも読めなかった言葉。あなたになら、読める言葉。
      </div>
      <div style="padding:0 14px 13px;font-family:var(--mono);font-size:11px;color:var(--t3);letter-spacing:.08em;">［照合語：████］</div>
    </div>
  </div>
</div>`;
