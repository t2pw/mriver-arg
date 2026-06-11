// momo.js　第2層⑥「芙島市の現在と桃見山」 v2
// prereqs: hub_002（資料棚）
// 役割：小蘭が帰れなかった場所。現在との距離を見せる。
// v2（0611レビュー項目7）：「現在照合」表を廃止し、「定点記録」形式に全面リライト。
//   年が1950→…→今日まで積み上がり、最終行だけが今日の日付で更新されている、
//   という画で「誰かが今も更新している」を語らせる（説明文では言わない）。
//   現在時制の観測文の筆者は明示しない（声を聴き続けた機械が彼女の文体で書いている、は演出のみ）。

PAGE_CONTENT['momo'] = () => {
  const now = new Date();
  const todayFull = now.toLocaleDateString('ja-JP');   // 例 2026/6/11
  const thisYear  = now.getFullYear();

  // 定点記録の行（年＋観測一行）。最終行のみ今日の日付・赤。
  const obsRow = (year, text, anom) => `
    <div style="display:flex;align-items:baseline;gap:12px;padding:7px 2px;border-bottom:1px solid rgba(255,255,255,0.05);">
      <span style="color:${anom ? 'var(--red)' : 'var(--t3)'};font-size:10px;letter-spacing:.08em;flex-shrink:0;min-width:74px;">${year}</span>
      <span style="color:${anom ? 'var(--red)' : 'var(--t2)'};font-size:11px;line-height:1.9;">${text}</span>
    </div>`;

  return `<div class="bpage">
  <div class="bpage-num">第2層　06</div>
  <div class="bpage-title">芙島市の現在と桃見山</div>
  <div class="bpage-meta">記録分類：定点記録　／　対象：桃見山　三月　／　更新：継続中</div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── このページだけ、記述の時制が「現在」になっている。誰が更新しているかは不明。
    </p>
  </div>

  <div style="
    margin:0 0 20px;
    background:#0d0d10;
    border:1px solid rgba(255,255,255,0.08);
    border-radius:8px;overflow:hidden;font-family:var(--mono);
  ">
    <div style="
      padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.06);
      background:rgba(200,169,110,0.06);
      color:var(--gold);font-size:10px;letter-spacing:.12em;
    ">── 定点記録　桃見山</div>

    <div style="padding:10px 14px 12px;">
      ${obsRow('1950', '花の頃には帰れる、と記録者は書いている。')}
      ${obsRow('1957', '判決はまだ出ない。花は関係なく咲く、と記録者は書いている。')}
      ${obsRow('1963', '無罪、確定。記録者は、月湯に留まった。')}
      ${obsRow('1973', '記録者の入力が、この年で途絶えた。')}
      ${obsRow('1998', '花木の山として公開された。春だけ、人の流れが増える。')}
      ${obsRow('2019', '観測を継続。M川駅を、列車は今日も通過する。')}
      ${obsRow(todayFull, '観測を継続。花はまだ咲いていない。あるいは、もう散った。', true)}
    </div>
  </div>

  <div class="bpage-body">
    <p>
      桃見山には、今年も花が咲く。
      山というより、誰かが長い時間をかけて手入れした斜面だ。
      春になると桃や桜や梅がいっせいに開き、
      町の外から来た人たちが坂道を歩く。
    </p>
    <p>
      M川駅は残っている。線路も残っている。
      事件の名前を知っている人は減っても、
      列車は毎日、何も知らない顔で通過する。
    </p>
    <p>
      月湯温泉には、今も泊まれる宿がある。
      渓流の音、湯気、こけしの棚、日帰り入浴の案内。
      その中に、蛸川という女が二十四年いたことを示す札は、ない。
    </p>
    <p>
      残らなかったものは、誰かが見つけない限り、
      ずっと残らない。
    </p>

    <hr style="border:none;border-top:1px solid #222;margin:1.6em 0;">

    <p style="font-style:italic;font-size:12px;color:var(--t3);line-height:2;">
      「芙島市は変わった。<br>
      　道は広くなり、宿の看板は新しくなり、<br>
      　事件の資料はガラス越しに保管されるようになった。<br>
      　桃見山だけは、春になると私を置いて咲く。」<br>
      <span style="font-size:10px;">── 更新者不明　記述年：不明</span>
    </p>

    <p class="anom">
      他のページの最終更新は、すべて 1973-09-12 で止まっている。<br>
      このページの最終更新は、${todayFull}　${thisYear - 1973}年、更新が続いている。
    </p>

    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;line-height:1.9;">
      ── 誰が、今日もこのページを書き換えているのか。<br>
      　　小蘭はこの記録を、誰のために残したのか。<br>
      　　手記にはただ一言、「未来の誰か」へ、とある。
    </p>
  </div>

  <div style="margin:18px 0 4px;">
    <div onclick="Shell.bNavigate('hub_002')" style="display:flex;align-items:center;gap:10px;background:#0d0d10;border:1px solid rgba(200,169,110,0.22);border-radius:12px;padding:13px 14px;cursor:pointer;user-select:none;">
      <span style="font-size:18px;">🔓</span>
      <div style="font-family:var(--mono);font-size:11px;line-height:1.7;">
        <div style="color:var(--gold);letter-spacing:.04em;">棚を出る</div>
        <div style="color:var(--t3);font-size:10px;letter-spacing:.06em;">第2層の入口へ戻る</div>
      </div>
      <span style="margin-left:auto;color:var(--t3);font-size:13px;">›</span>
    </div>
  </div>
</div>`;
};
