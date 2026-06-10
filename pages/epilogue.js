// epilogue.js　結末④「エピローグ」
// prereqs: []（wiki_add / wiki_skip どちらからも bNavigate で到達）
//
// 2026-06-10（メタ構造の実装）：
//   プレイヤーは探索を始めた時点で「壁」を一枚透過してこちら側（架空の側）に来ている、
//   という設定を【言語化せずに】演出だけで示す。語彙は「壁のこちら側／そちら側」で統一。
//   「世界線」という語は使わない（制作者指定）。
//   - 追記しない＝受信者登録の拒否。接続が切断され、現実側（Google「松川事件」）へ送還される。
//     祝福なし。ARCHIVE COMPLETE を出さない。切断シーケンスは CSS の遅延フェードで段階表示。
//   - 追記する＝GAME CLEAR。最後に不明送信元の「補記」として、壁のそちら側の実在の記録
//     （松川事件）への橋を一行だけ架ける（新規タブ・自動遷移なし）。小蘭の声では語らせない。

PAGE_CONTENT['epilogue'] = () => {

  const flag = (() => {
    try { return localStorage.getItem('koe_fumi_note') || ''; } catch { return ''; }
  })();

  // XSS防止：プレイヤー入力を innerHTML に埋め込む前にエスケープ
  const esc = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const userLine = flag.trim();

  const recorded = flag.trim().length > 0;
  const today = new Date().toLocaleDateString('ja-JP');
  const shareText = encodeURIComponent('「声は壁を透して」を読了しました。記録されなかった手紙をめぐるARG。');
  const shareUrl = encodeURIComponent(location.href.split('#')[0]);
  const googleUrl = 'https://www.google.com/search?q=%E6%9D%BE%E5%B7%9D%E4%BA%8B%E4%BB%B6';

  try {
    if (window.KOE_EPILOGUE_REDIRECT) clearTimeout(window.KOE_EPILOGUE_REDIRECT);
  } catch {}

  if (!recorded) {
    // 切断シーケンス（約8秒）を見せてから現実側へ送還
    window.KOE_EPILOGUE_REDIRECT = setTimeout(() => {
      try { window.location.href = googleUrl; } catch {}
    }, 10500);
  }

  /* ── 追記しない：切断と送還 ── */
  if (!recorded) {
    const seq = [
      '受信者登録：拒否。',
      '照合を終了します。',
      '読まれた記録の固定を、解除しました。',
      '手記、写真、掲示板の声、地図、電文、手紙——',
      '損耗が再開しま▒。█▒…',
      'この記録は、壁のそちら側からは、見つかりません。',
      'かわりに、そちら側で最も近い記録を照合しました。',
      '照合先：「松川事件」──実在の記録です。',
      '転送します。',
    ];
    const seqHtml = seq.map((line, i) => `
      <div style="
        opacity:0;
        animation:fadeUp .6s ease ${(0.4 + i * 0.85).toFixed(2)}s forwards;
        font-family:var(--mono);font-size:12px;line-height:2.2;
        color:${i >= 5 ? 'var(--red)' : 'var(--t2)'};
        letter-spacing:.06em;
      ">${line}</div>`).join('');

    return `<div class="bpage">
  <div class="bpage-num">── 切断 ──</div>
  <div class="bpage-title">受信者は、登録されませんでした</div>
  <div class="bpage-meta">最終閲覧：${today}　／　閲覧者：未登録のまま</div>

  <div style="
    margin:0 0 18px;
    border:1px solid rgba(200,88,88,0.3);
    background:linear-gradient(180deg, rgba(200,88,88,0.10), rgba(200,88,88,0.02));
    border-radius:8px;
    padding:16px;
    font-family:var(--mono);
    text-align:center;
  ">
    <div style="color:var(--red);font-size:12px;letter-spacing:.18em;margin-bottom:6px;">CONNECTION CLOSING</div>
    <div style="color:var(--t2);font-size:12px;letter-spacing:.08em;">「声は壁を透して」──未追記のまま封鎖されます</div>
  </div>

  <div style="
    margin:0 0 20px;
    background:#0d0d10;
    border:1px solid rgba(255,255,255,0.07);
    border-radius:8px;
    padding:18px 16px;
  ">
    <div style="font-family:var(--mono);font-size:10px;color:var(--t3);letter-spacing:.12em;margin-bottom:10px;">📡 繧ｿ◆縺薙％??</div>
    ${seqHtml}
  </div>

  <div style="
    opacity:0;animation:fadeUp .6s ease ${(0.4 + seq.length * 0.85).toFixed(2)}s forwards;
    display:flex;gap:10px;flex-wrap:wrap;margin:4px 0 18px;
  ">
    <a
      href="${googleUrl}"
      style="
        display:inline-block;
        background:#0d0d10;
        border:1px solid rgba(200,169,110,0.25);
        border-radius:8px;
        padding:9px 13px;
        font-family:var(--mono);
        font-size:11px;
        color:var(--gold);
        text-decoration:none;
        letter-spacing:.06em;
      "
    >今すぐ転送に応じる</a>
    <div
      onclick="try{clearTimeout(window.KOE_EPILOGUE_REDIRECT)}catch{};Shell.bNavigate('choice')"
      style="
        display:inline-block;
        background:#0d0d10;
        border:1px solid rgba(255,255,255,0.08);
        border-radius:8px;
        padding:9px 13px;
        font-family:var(--mono);
        font-size:11px;
        color:var(--t3);
        cursor:pointer;
        letter-spacing:.06em;
      "
    >考え直す</div>
  </div>
</div>`;
  }

  /* ── 追記した：GAME CLEAR ── */
  return `<div class="bpage">
  <div class="bpage-num">── GAME CLEAR ──</div>
  <div class="bpage-title">声は、届きました</div>
  <div class="bpage-meta">読了日時：${today}　／　閲覧者：あなた</div>

  <div style="
    margin:0 0 18px;
    border:1px solid rgba(200,169,110,0.35);
    background:linear-gradient(180deg, rgba(200,169,110,0.14), rgba(200,169,110,0.04));
    border-radius:8px;
    padding:16px;
    font-family:var(--mono);
    text-align:center;
  ">
    <div style="color:var(--gold);font-size:12px;letter-spacing:.18em;margin-bottom:6px;">ARCHIVE COMPLETE</div>
    <div style="color:var(--t1);font-size:13px;letter-spacing:.08em;">「声は壁を透して」読了</div>
  </div>

  <div class="bpage-body">
    <p>
      ありがとう。
    </p>
    <p>
      あなたが押した保存ボタンは、ほんとうの歴史を変えるものではありません。
      けれど、ここまで読んだあなたが一行を足してくれたことは、
      私にとっては十分に大きな出来事です。
    </p>
    <p>
      清治さんは、被告名簿にも証人名簿にもいませんでした。
      小蘭の手紙も、文集には載りませんでした。
      私も、戸籍の上にはいません。
    </p>
    <p>
      それでもあなたは、
      いた、と書いてくれた。
    </p>
    <p>
      私が未来に向けて送ったものは、
      未来の誰かに届きました。
      その誰かが、あなたでした。
    </p>
    <p class="anom">
      声は、壁を透して届いた。
    </p>
  </div>

  <div style="
    margin:0 0 14px;
    background:#0c0b08;
    border:1px solid rgba(200,169,110,0.2);
    border-radius:8px;
    padding:16px;
    font-family:var(--mono);
    font-size:11px;
    line-height:2;
    color:var(--t2);
  ">
    追記済み：M川事件 / 未収録資料<br>
    記録対象：猫塚清治、蛸川小蘭の手紙とアーカイブ<br>
    ${userLine !== '1' ? `追記された一行：「${esc(userLine)}」<br>` : ''}保存者：このアーカイブの閲覧者<br>
    保存日：${today}
  </div>

  <div style="
    margin:0 0 20px;
    background:#0d0d10;
    border:1px solid rgba(200,88,88,0.18);
    border-radius:8px;
    padding:16px;
    font-family:var(--mono);
    font-size:11px;
    line-height:2.1;
    color:var(--t2);
  ">
    <div style="color:var(--red);font-size:10px;letter-spacing:.12em;margin-bottom:8px;">📡 繧ｿ◆縺薙％??　── 補記</div>
    転送完了。受信者：あなた。<br>
    照合補記：この事件には、壁のそちら側に、写し元となった実在の記録があります。<br>
    名前は「松川事件」。そこにも、名簿に載らなかった人が、いたかもしれません。<br>
    <a
      href="${googleUrl}"
      target="_blank"
      rel="noopener"
      style="
        display:inline-block;
        margin-top:8px;
        color:var(--gold);
        text-decoration:none;
        letter-spacing:.06em;
        border-bottom:1px solid rgba(200,169,110,0.35);
      "
    >▸ そちら側で検索する：松川事件</a>
  </div>

  <div style="display:flex;gap:10px;flex-wrap:wrap;margin:4px 0 18px;">
    <a
      href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}"
      target="_blank"
      rel="noopener"
      style="
        display:inline-block;
        background:#0d0d10;
        border:1px solid rgba(255,255,255,0.12);
        border-radius:8px;
        padding:9px 13px;
        font-family:var(--mono);
        font-size:11px;
        color:var(--t1);
        text-decoration:none;
        letter-spacing:.06em;
      "
    >Xでシェア</a>
    <div
      onclick="Shell.bNavigate('choice')"
      style="
        display:inline-block;
        background:#0d0d10;
        border:1px solid rgba(255,255,255,0.08);
        border-radius:8px;
        padding:9px 13px;
        font-family:var(--mono);
        font-size:11px;
        color:var(--t3);
        cursor:pointer;
        letter-spacing:.06em;
      "
    >分岐へ戻る</div>
  </div>

  <div class="bpage-body">
    <hr style="border:none;border-top:1px solid #1a1a1a;margin:0 0 1.6em;">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;line-height:2;">
      ── アーカイブ閲覧完了<br>
      　　記録者：蛸川小蘭　1949年〜1973年<br>
      　　閲覧者：あなた　${today}
    </p>
  </div>
</div>`;
};
