// sns.js　第2層⑤「声の速さと重さ」
// 役割：不明送信元が照合のために挿入した現代の声の資料。
//        M川事件が現代ネットで一瞬話題になった痕跡と、
//        地元年配者の遅い声を対比させて見せる。
// prereqs: hub_002

PAGE_CONTENT['sns'] = () => `<div class="bpage">
  <style>
    .sns-fade-post {
      opacity: 1;
      animation: snsFade 1.8s ease forwards;
    }
    @keyframes snsFade {
      0%   { opacity: 0; transform: translateY(6px); }
      30%  { opacity: 1; transform: translateY(0); }
      100% { opacity: 0.25; transform: translateY(0); }
    }
    .sns-post {
      background: #0a0a0d;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 10px;
      padding: 12px 14px;
      margin-bottom: 8px;
    }
    .sns-post-header {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 6px;
    }
    .sns-handle {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--t2);
      letter-spacing: .04em;
    }
    .sns-time {
      font-family: var(--mono);
      font-size: 10px;
      color: var(--t3);
      letter-spacing: .04em;
    }
    .sns-text {
      font-family: var(--serif);
      font-size: 13px;
      color: var(--t1);
      line-height: 1.85;
      letter-spacing: .04em;
    }
    .sns-meta {
      font-family: var(--mono);
      font-size: 10px;
      color: var(--t3);
      margin-top: 7px;
      letter-spacing: .04em;
    }
    .sns-post-slow {
      background: #0a0a0d;
      border: 1px solid rgba(200,169,110,0.32);
      border-radius: 10px;
      padding: 14px 16px;
      margin-bottom: 8px;
    }
  </style>

  <div class="bpage-num">第2層　05</div>
  <div class="bpage-title">声の速さと重さ</div>
  <div class="bpage-meta">出所：アーカイブ外　／　挿入：不明送信元　／　採取時期：現代</div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── この資料は、記録者によるものではありません。照合のため、挿入されました。
    </p>
  </div>

  <!-- SNSタイムライン：速い声 -->
  <div style="margin:0 0 20px;">

    <!-- 投稿1 -->
    <div class="sns-post sns-fade-post" style="animation-delay:0.1s;">
      <div class="sns-post-header">
        <span class="sns-handle">@kinoko_tabetai</span>
        <span class="sns-time">14:03</span>
      </div>
      <div class="sns-text">M川事件ってなんか昔の冤罪のやつ？　ちょっと流れてきたけど詳細わからん</div>
      <div class="sns-meta">返信 3　引用 12　♡ 47</div>
    </div>

    <!-- 投稿2 -->
    <div class="sns-post sns-fade-post" style="animation-delay:0.6s;">
      <div class="sns-post-header">
        <span class="sns-handle">@neko_log_99</span>
        <span class="sns-time">14:07</span>
      </div>
      <div class="sns-text">M川事件、結局真相不明らしいじゃん。怖いね</div>
      <div class="sns-meta">返信 1　引用 4　♡ 31</div>
    </div>

    <!-- 投稿3 -->
    <div class="sns-post sns-fade-post" style="animation-delay:1.1s;">
      <div class="sns-post-header">
        <span class="sns-handle">@umi8823</span>
        <span class="sns-time">14:09</span>
      </div>
      <div class="sns-text">こういうの調べてもタイムライン的にすぐ流れてくよな　10分後には誰も見てない</div>
      <div class="sns-meta">返信 0　引用 8　♡ 114</div>
    </div>

    <!-- 投稿4 -->
    <div class="sns-post sns-fade-post" style="animation-delay:1.6s;">
      <div class="sns-post-header">
        <span class="sns-handle">@marurun_st</span>
        <span class="sns-time">14:12</span>
      </div>
      <div class="sns-text">うちの地域の話らしくて少しだけ知ってる　でも詳しくはわからない　親も知らないって言ってた</div>
      <div class="sns-meta">返信 2　引用 0　♡ 19</div>
    </div>

    <!-- 投稿5 -->
    <div class="sns-post sns-fade-post" style="animation-delay:2.1s;">
      <div class="sns-post-header">
        <span class="sns-handle">@ttt_tsurumi</span>
        <span class="sns-time">14:19</span>
      </div>
      <div class="sns-text">M川事件もうトレンド落ちてる笑　はや</div>
      <div class="sns-meta">返信 0　引用 2　♡ 88</div>
    </div>

    <!-- 投稿6：遅い声 -->
    <div class="sns-post-slow">
      <div class="sns-post-header">
        <span class="sns-handle" style="color:var(--gold);">@fushima_obachan_1932</span>
        <span class="sns-time">23:51</span>
      </div>
      <div class="sns-text">
        M川事件がネットで話題になっているというのを孫に教えてもらい、初めてこういうところに書きます。
        私は事件のあった年、近くの集落に住んでいました。
        逮捕は間違いだと言って、署名を集めに来た人が何人も家に来たのを、いまでも覚えています。
        守る会の文集が公民館にまだ残っているはずです。
        誰かが調べてくれるなら、そちらに連絡してみてください。うれしいです。
      </div>
      <div class="sns-meta" style="color:var(--t2);">返信 6　引用 0　♡ 3</div>
    </div>

  </div>

  <div class="bpage-body">
    <p class="anom">
      速い声は、流れて消える。遅い声だけが、壁を透る。
    </p>
  </div>

  <div style="margin:18px 0 4px;">
    <div onclick="Shell.bNavigate('momo')" style="display:flex;align-items:center;gap:10px;background:#0d0d10;border:1px solid rgba(200,169,110,0.22);border-radius:12px;padding:13px 14px;cursor:pointer;user-select:none;">
      <span style="font-size:18px;">🌸</span>
      <div style="font-family:var(--mono);font-size:11px;line-height:1.7;">
        <div style="color:var(--gold);letter-spacing:.04em;">資料棚：次の資料</div>
        <div style="color:var(--t3);font-size:10px;letter-spacing:.06em;">芙島市の現在と桃見山</div>
      </div>
      <span style="margin-left:auto;color:var(--t3);font-size:13px;">›</span>
    </div>
  </div>
</div>`;
