// memo.js　第2層・資料棚 別冊「一冊の大学ノート」（2026-06-11 追加）
// prereqs: hub_002（資料棚・一括解放）
// モチーフ：実在の松川事件における「諏訪メモ」（会社側事務係の団交記録が被告のアリバイを
//   証明し、検察による秘匿→新聞スクープ→最高裁差戻し→全員無罪の決定打となった）。
// 固有名は黒塗り規約：記録者の姓は ██（実在側の固有名は壁を越えない）。検察・記者も無記名。
// 役割：「記録が人を救った」先例＝小蘭がアーカイブを作った動機の実物。
//   inochi「02 証拠の非対称」の伏線回収。kiroku_001「二つの場所に置く性分」と響き合う。

PAGE_CONTENT['memo'] = () => `<div class="bpage">
  <div class="bpage-num">第2層　別冊</div>
  <div class="bpage-title">一冊の大学ノート</div>
  <div class="bpage-meta">資料出典：裁判記録・新聞縮刷・守る会文書　／　記録者：蛸川小蘭</div>

  <div class="bpage-body">
    <p>
      二十人を救ったのは、雄弁な弁論でも、新しい目撃者でもなかった。
      一冊の大学ノートだった。
    </p>
  </div>

  <!-- ██メモとは -->
  <div style="
    margin:0 0 10px;
    background:#0d0d10;
    border:1px solid rgba(255,255,255,0.08);
    border-radius:10px;overflow:hidden;font-family:var(--mono);
  ">
    <div style="
      padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);
      background:rgba(200,169,110,0.07);
      color:var(--gold);font-size:10px;letter-spacing:.12em;
    ">── ██メモ</div>
    <div style="padding:13px 14px;font-size:12px;color:var(--t2);line-height:2;">
      会社側の庶務係が、労使交渉の席でつけていた事務の記録。
      日付。出席者。発言の要点。
      几帳面な、ただそれだけのノート。
      記録した係の姓から、後に「██メモ」と呼ばれた。<br><br>
      検察の筋書きでは、被告たちはその時刻、別の場所で「謀議」をしていたことになっていた。
      だがノートの出席者の欄には、死刑判決を受けた被告の名前が、その時刻のまま残っていた。
      謀議の席にいたはずの人間が、交渉の席で発言までしている。<br><br>
      ノートが本物なら、筋書きの方が崩れる。
    </div>
  </div>

  <!-- 押収と沈黙 -->
  <div style="
    margin:0 0 10px;
    background:#0d0d10;
    border:1px solid rgba(200,88,88,0.18);
    border-radius:10px;overflow:hidden;font-family:var(--mono);
  ">
    <div style="
      padding:9px 14px;border-bottom:1px solid rgba(200,88,88,0.12);
      background:rgba(200,88,88,0.06);
      color:var(--red);font-size:10px;letter-spacing:.12em;
    ">── 押収、それから沈黙</div>
    <div style="padding:13px 14px;font-size:12px;color:var(--t2);line-height:2;">
      ノートは事件の直後、捜査資料として押収された。
      そして、法廷には出てこなかった。
      証拠の一覧にも載らなかった。<br><br>
      弁護団が開示を求めるたび、「捜査上の理由」が壁になった。
      被告のアリバイを記した帳面は、八年間、
      検察の机の引き出しの中を移り続けた。
    </div>
  </div>

  <!-- 紙面（スクープ） -->
  <div style="
    margin:0 0 10px;
    background:#e8e4d8;
    border:1px solid #b8ad92;
    border-radius:4px;
    padding:14px 16px;
    font-family:var(--serif);
    color:#26221a;
  ">
    <div style="font-size:9px;letter-spacing:.2em;color:#6a6354;border-bottom:1px solid #b8ad92;padding-bottom:6px;margin-bottom:10px;">
      全国紙朝刊　社会面　── 1958年（縮刷より転記）
    </div>
    <div style="font-size:17px;font-weight:bold;letter-spacing:.08em;line-height:1.6;margin-bottom:8px;">
      被告のアリバイ記す帳面、地検に存在
    </div>
    <div style="font-size:11px;line-height:1.9;letter-spacing:.02em;">
      M川事件の被告らのアリバイを裏づける記録が、押収されたまま開示されていないことが分かった。
      記者が地検に存在を質したところ、検事正はこれを認めた。
      弁護団は即日、証拠としての提出を求めた。
    </div>
  </div>

  <!-- 年表 -->
  <div style="
    margin:0 0 20px;
    background:#0d0d10;
    border:1px solid rgba(255,255,255,0.08);
    border-radius:10px;overflow:hidden;font-family:var(--mono);
  ">
    <div style="
      padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);
      color:var(--t3);font-size:10px;letter-spacing:.12em;
    ">── ノートが表に出てから</div>
    <div style="padding:12px 14px;display:grid;grid-template-columns:96px 1fr;gap:6px 12px;font-size:11px;line-height:1.9;">
      <span style="color:var(--t3);">1958</span>
      <span style="color:var(--t1);">新聞報道。ノートの存在が世間に知られる</span>
      <span style="color:var(--t3);">1959</span>
      <span style="color:var(--t1);">最高裁、有罪判決を破棄。審理のやり直しを命じる</span>
      <span style="color:var(--t3);">1963-09-12</span>
      <span style="color:var(--gold);">無罪確定。二十名、解放</span>
    </div>
  </div>

  <div class="bpage-body">
    <p>
      ノートをつけた係は、何かを暴くつもりで書いたのではない。
      仕事だから書いた。その日のうちに、決まった形式で。
      誰に読ませるつもりもなく。
    </p>
    <p>
      それが八年の沈黙を越えて、二十人の首を繋いだ。
    </p>
    <p>
      人を救うのは、声の大きさではないのかもしれない。
      書きとめて、取っておくこと。
      同じものが、どこかにもう一冊あること。
      私が二十四年やってきたのは、結局、それだけのことだ。
    </p>
    <p class="anom">
      清治さんの名前は、どの帳面にもなかった。<br>
      出席者の欄にも、名簿にも、ノートにも。<br>
      だから私が、ノートになることにした。
    </p>
  </div>

  <div style="margin:18px 0 4px;">
    <div onclick="Shell.bNavigate('tegami')" style="display:flex;align-items:center;gap:10px;background:#0d0d10;border:1px solid rgba(200,169,110,0.22);border-radius:12px;padding:13px 14px;cursor:pointer;user-select:none;">
      <span style="font-size:18px;">📖</span>
      <div style="font-family:var(--mono);font-size:11px;line-height:1.7;">
        <div style="color:var(--gold);letter-spacing:.04em;">資料棚：次の資料</div>
        <div style="color:var(--t3);font-size:10px;letter-spacing:.06em;">声は壁を透して（文集）</div>
      </div>
      <span style="margin-left:auto;color:var(--t3);font-size:13px;">›</span>
    </div>
  </div>
</div>`;
