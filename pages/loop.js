// loop.js　第2層⑦「ループの伏線回収」
// キーワード例: 未来の誰か、データ送信、ループ
// prereqs: hub_002
// 役割：小蘭が「未来の誰か」に向けて記録していたことが明かされる。
//       hidden.jsの「███ = あなた」への橋渡し。

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
        text: 'M川駅付近に現れる。なぜかは分からない。タコのぬいぐるみだけを持っていた。',
      },
      {
        year: '1949年〜',
        color: 'var(--t2)',
        text: '十湯温泉に潜伏。記録を始める。「いつかこれを読む人へ」という一文を最初に書いた。この時点ではまだ、読む相手が誰かを知らなかった。',
      },
      {
        year: '1954年頃',
        color: 'var(--t2)',
        text: '文集「声は壁を透して」を古書店で入手。ふみの手紙が収録されていないことに気づく。記録の目的が、少し変わった。',
      },
      {
        year: '1963年9月11日',
        color: 'var(--gold)',
        text: '蒼沼ブルーランドにデータを隠す。送信予約を設定する。「無罪確定を検知したら、送れ」。受信者欄に「███」と入力した。',
      },
      {
        year: '1963年9月12日',
        color: 'var(--red)',
        text: '無罪確定。アーカイブが自動送信された。小蘭の消息が途絶えた。',
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
      そしてアーカイブを作り、未来に送った。
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

    <p class="anom">
      受信者欄の「███」は、まだ解読されていない。<br>
      でも小蘭は、受信者を知っていたと思う。<br>
      知っていて、黙って送った。
    </p>
  </div>
</div>`;
