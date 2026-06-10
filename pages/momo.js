// momo.js　第2層⑥「芙島市の現在と桃見山」
// キーワード例: 今年も、帰れなかった、桜の花
// prereqs: hub_002
// 役割：小蘭が帰れなかった場所。実在の福島周辺情報を架空化して、現在との距離を見せる。

PAGE_CONTENT['momo'] = () => `<div class="bpage">
  <div class="bpage-num">第2層　06</div>
  <div class="bpage-title">芙島市の現在と桃見山</div>
  <div class="bpage-meta">記録時期：現在　／　照合：小蘭の観察記録　／　更新：毎年三月</div>

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
    ">── 芙島市　現在照合</div>

    <div style="padding:14px;display:grid;grid-template-columns:88px 1fr;gap:8px 12px;font-size:11px;line-height:1.9;">
      <span style="color:var(--t3);">桃見山</span>
      <span style="color:var(--t1);">花木の山として公開され、春だけ人の流れが増える</span>

      <span style="color:var(--t3);">M川駅</span>
      <span style="color:var(--t1);">T北本線の駅として残る。線路は今も町を切っている</span>

      <span style="color:var(--t3);">月湯温泉</span>
      <span style="color:var(--t1);">渓流沿いの温泉地として営業が続く。日帰りの湯もある</span>

      <span style="color:var(--t3);">事件資料</span>
      <span style="color:var(--t1);">大学の資料室で保存・整理・公開が続いている</span>

      <span style="color:var(--t3);">蒼沼跡</span>
      <span style="color:var(--t1);">遊園地の名だけが、地図と記憶の端に残る</span>

      <span style="color:var(--t3);">小蘭の消息</span>
      <span class="anom">不明</span>
    </div>
  </div>

  <div class="bpage-body">
    <p>
      桃見山には、今年も花が咲いた。
      そこは山というより、誰かが長い時間をかけて手入れした斜面だ。
      春になると、桃や桜や梅がいっせいに開き、
      町の外から来た人たちが坂道を歩く。
    </p>
    <p>
      小蘭が見ていた景色と、いま見える景色は同じではない。
      畑の使われ方も、道路も、案内板も変わった。
      それでも三月になると、花だけは同じ方向へ開く。
    </p>

    <hr style="border:none;border-top:1px solid #222;margin:1.6em 0;">

    <p>
      M川駅は残っている。
      線路も残っている。
      事件の名前を知っている人は減っても、
      列車は毎日、何も知らない顔で通過する。
    </p>
    <p>
      月湯温泉には、今も泊まれる宿がある。
      渓流の音、湯気、こけしの棚、日帰り入浴の案内。
      その中に、蛸川という女が二十四年いたことを示す札はない。
    </p>
    <p>
      事件の資料は、別の場所で保存されている。
      集められ、整理され、公開される。
      公式に残ったものは、そうやって次の人へ渡される。
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
      このページの最終更新日時は、他のページと違う。<br>
      他のページが 1973-09-12 で止まっているのに対し、<br>
      このページだけ、今日の日付に更新されている。
    </p>

    <p>
      誰が、今日もこのページを書き換えているのか。<br>
      そもそも小蘭は、この記録を誰のために残したのか。手記にはただ一言、「未来の誰か」へ、とある。
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
