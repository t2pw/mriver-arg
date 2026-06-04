// tegami.js　第2層④「声は壁を透して（文集）」
// キーワード例: 三百通、収録、守る会
// prereqs: hub_002
// 役割：文集の全容を示す。小蘭の手紙だけが収録されなかった理由を確定させる。

PAGE_CONTENT['tegami'] = () => `<div class="bpage">
  <div class="bpage-num">第2層　04</div>
  <div class="bpage-title">声は壁を透して</div>
  <div class="bpage-meta">発行：守る会　昭和二十九年（1954年）　／　収録：約三百通　／　非売品</div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── アーカイブに格納されていた文集の記録。小蘭が古書店で入手した現物を元に再編集。
    </p>
  </div>

  <!-- 文集外観 -->
  <div style="
    margin:0 0 20px;
    background:#0d0d10;
    border:1px solid rgba(255,255,255,0.08);
    border-radius:10px;overflow:hidden;
    font-family:var(--mono);
  ">
    <div style="
      padding:10px 14px;
      border-bottom:1px solid rgba(255,255,255,0.06);
      font-size:10px;color:var(--t3);letter-spacing:.12em;
    ">── DOCUMENT　文集スキャン記録</div>

    <!-- タイトルページ模倣 -->
    <div style="
      margin:16px 14px;
      background:#070709;
      border:1px solid rgba(255,255,255,0.05);
      border-radius:8px;
      padding:20px 16px;
      text-align:center;
    ">
      <div style="
        font-family:var(--serif);
        font-size:17px;
        color:var(--t1);
        letter-spacing:.2em;
        line-height:1.8;
        margin-bottom:12px;
      ">声は壁を透して</div>
      <div style="
        font-size:11px;color:var(--t3);
        font-family:var(--mono);
        letter-spacing:.1em;
        line-height:1.9;
      ">
        M川事件の被告と家族の手紙<br>
        ──<br>
        発行　M川事件被告を守る会<br>
        昭和二十九年（1954年）秋<br>
        非売品　頒布のみ
      </div>
    </div>

    <div style="padding:0 14px 14px;font-size:11px;color:var(--t3);letter-spacing:.06em;line-height:1.9;">
      収録数：約三百通　／　被告・家族・支援者からの手紙<br>
      編集：守る会編集委員　／　印刷：芙島市内の印刷所（名称非公開）<br>
      現存確認冊数：不明（小蘭所持分　計1冊）
    </div>
  </div>

  <div class="bpage-body">
    <p>
      文集には、被告が獄中から家族に送った手紙が収録されている。
      検閲を通過した言葉だけが、紙の上に残った。
      「元気でいる」「心配するな」「春が来たら会おう」。
      書けなかったことの方が多かったはずだ。
    </p>
    <p>
      家族からの手紙も収録されている。
      子どもが父親に書いた手紙。妻が夫に書いた手紙。
      「待っている」「忘れていない」「あなたの帰りを待っている」。
    </p>
    <p>
      支援者からの手紙もある。
      見ず知らずの人間が、見ず知らずの被告に書いた言葉。
      「あなたのことを信じています」。
      そういう言葉が、三百通の中にある。
    </p>

    <hr style="border:none;border-top:1px solid #222;margin:1.6em 0;">

    <p>
      三百通を読み終えた時、気がついた。
    </p>
  </div>

  <!-- 欠落の記録 -->
  <div style="
    margin:0 0 20px;
    background:#0d0d10;
    border:1px solid rgba(200,88,88,0.2);
    border-radius:10px;overflow:hidden;font-family:var(--mono);
  ">
    <div style="
      padding:9px 14px;border-bottom:1px solid rgba(200,88,88,0.12);
      background:rgba(200,88,88,0.07);
      color:var(--red);font-size:10px;letter-spacing:.12em;
    ">── 未収録　記録</div>
    <div style="padding:13px 14px;font-size:12px;line-height:2;">
      <div style="color:var(--t1);margin-bottom:8px;">
        差出人：蛸川　小蘭（仮名）<br>
        宛先：猫塚　清治
      </div>
      <div style="color:var(--t2);">
        この手紙は文集に収録されなかった。<br>
        理由：差出人の身元が確認できず、宛先の「猫塚清治」も記録上存在しない人物であるため。<br><br>
        守る会の編集委員は収録を検討したが、
        存在しない人物への手紙を正式な文集に収録することができなかった。
        または、収録した場合に「猫塚清治」という名前が公的記録に残ることを
        恐れた誰かが、収録を止めたとも言われている。<br><br>
        <span class="anom" style="font-size:11px;">
          ── 真相は不明。小蘭には知らされなかった。
        </span>
      </div>
    </div>
  </div>

  <div class="bpage-body">
    <p>
      その手紙は今も、どこかにある。
      文集の中にも、郵便記録にも、どこにも存在しない手紙が。
    </p>
    <p>
      三百通。その一通ずつを、誰かが手で書いた。葉書一通の重さは、わずか二グラムだ。その軽さが積み重なって、歴史を動かした。
    </p>
    <p class="anom">
      記録されなかった手紙を、記録する方法が、一つだけある。
    </p>
  </div>
</div>`;
