// hub_002.js　第2層ハブ「第2層が開く」
// 全スポーク完了で自動解放。キーワード不要。
// 役割：第1層の総括 → 第2層への接続。物語の重心が変わる節目。

PAGE_CONTENT['hub_002'] = () => `<div class="bpage">
  <div class="bpage-num">── 第2層　解放 ──</div>
  <div class="bpage-title">あなたはすべてを読んだ</div>
  <div class="bpage-meta">自動復元　／　解放条件：全スポーク完了　／　1963-09-12</div>

  <div class="bpage-body">
    <p>
      手記を読んだ。写真を見た。掲示板の声を読んだ。地図の座標を辿った。電文を復号した。
    </p>
    <p>
      小蘭が14年間かけて記録したものの、輪郭が見えてきた。
    </p>
  </div>

  <!-- スポーク完了サマリー -->
  <div style="
    margin:0 0 20px;
    background:#0d0d10;
    border:1px solid rgba(255,255,255,0.07);
    border-radius:10px;
    overflow:hidden;
    font-family:var(--mono);
    font-size:11px;
  ">
    <div style="
      padding:10px 14px;
      border-bottom:1px solid rgba(255,255,255,0.06);
      color:var(--t3);letter-spacing:.1em;
    ">── ARCHIVE RESTORE COMPLETE</div>

    ${['A　手記　────　事件の夜から、ふみの声まで',
       'B　写真　────　記録されなかった人物の顔',
       'C　掲示板　──　市民の声と、差し止められた投書',
       'D　地図　────　14年間が刻まれた芙島市の地図',
       'E　電文　────　N-0314と、未収録の手紙の予告',
    ].map(line => `
      <div style="
        display:flex;align-items:center;gap:10px;
        padding:9px 14px;
        border-bottom:1px solid rgba(255,255,255,0.04);
        color:var(--t1);letter-spacing:.04em;
      ">
        <span style="color:var(--gold);font-size:10px;">✓</span>
        <span>${line}</span>
      </div>
    `).join('')}

    <div style="
      padding:12px 14px;
      color:var(--gold);
      letter-spacing:.08em;
      font-size:11px;
    ">
      UNLOCK：第2層　8ファイル
    </div>
  </div>

  <div class="bpage-body">
    <p>
      ここまでは、記録の「外側」だった。
      事件の夜。潜伏。市民運動。地図。暗号。
      小蘭の目を通して見えたものが積み重なった。
    </p>
    <p>
      第2層は「内側」に入る。
    </p>
    <p>
      猫塚清治とはどんな人物だったか。
      なぜ冤罪は生まれたのか。
      声を上げた人々は何と戦っていたのか。
      そして、文集に収録されなかった手紙は、なぜ収録できなかったのか。
    </p>

    <p class="anom">
      新しいキーワードで、8つのファイルが復元できる。
    </p>

    <p style="font-style:italic;font-size:12px;color:var(--t3);line-height:2;margin-top:2em;">
      「いつかこれを読む人へ。<br>
      　ここまで来てくれた。<br>
      　もう少しだけ、続きがある。」<br>
      <span style="font-size:10px;">── 蛸川小蘭　1963年9月11日</span>
    </p>
  </div>

  <!-- 第2層キーワードヒント -->
  <div style="
    margin:0 0 0;
    background:#0d0d10;
    border:1px solid rgba(255,255,255,0.06);
    border-radius:10px;
    overflow:hidden;
    font-family:var(--mono);
  ">
    <div style="
      padding:9px 14px;
      border-bottom:1px solid rgba(255,255,255,0.05);
      font-size:10px;color:var(--t3);letter-spacing:.12em;
    ">── 第2層　復元キーワード</div>
    <div style="padding:12px 14px;display:flex;flex-direction:column;gap:7px;font-size:11px;line-height:1.8;">
      ${[
        ['猫塚清治という人物', '34歳　／　菜園　／　清治'],
        ['なぜ冤罪は生まれたか', '自白　／　証拠隠蔽　／　冤罪'],
        ['声を上げた人々', '広瀬和郎　／　四面楚歌　／　書き続けた'],
        ['声は壁を透して（文集）', '三百通　／　収録　／　守る会'],
        ['声の速さと重さ', '葉書一通　／　重さ　／　現代'],
        ['芙島市の現在と桃見山', '今年も　／　帰れなかった　／　桃の花'],
        ['ループの伏線回収', '未来の誰か　／　データ送信　／　ループ'],
        ['小蘭のデータ痕跡の全容', 'バイナリ　／　穿孔　／　電文'],
      ].map(([title, kw]) => `
        <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:4px 12px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.03);">
          <span style="color:var(--t2);">${title}</span>
          <span style="color:var(--gold);font-size:10px;letter-spacing:.04em;">${kw}</span>
        </div>
      `).join('')}
    </div>
    <div style="padding:8px 14px 12px;font-size:10px;color:var(--t3);letter-spacing:.06em;">
      ── いずれか一語を入力すると復元できます。
    </div>
  </div>
</div>`;
