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
  const trueEnd = (() => {
    try { return localStorage.getItem('koe_true_end') === '1'; } catch { return false; }
  })();
  const today = new Date().toLocaleDateString('ja-JP');
  const shareText = encodeURIComponent('『声は壁を透して』を読み終えました。1949年から届いた、記録されなかった手紙の話。');
  const shareUrl = encodeURIComponent(location.href.split('#')[0]);
  // 0611レビュー項目15・18：実在事件名はゲーム内のどこにも表示しない。
  // 切断ED の送還先も「名前を出さない記述形クエリ」に変更（検索結果がプレイヤーを橋へ運ぶ）。
  const googleUrl = 'https://www.google.com/search?q=' + encodeURIComponent('1949年 列車転覆 冤罪 事件');

  try {
    if (window.KOE_EPILOGUE_REDIRECT) clearTimeout(window.KOE_EPILOGUE_REDIRECT);
  } catch {}

  if (!recorded) {
    // 切断シーケンス（10行・約9秒）を見せてから現実側へ送還
    window.KOE_EPILOGUE_REDIRECT = setTimeout(() => {
      try { window.location.href = googleUrl; } catch {}
    }, 12000);
  }

  /* ── 追記しない：切断と送還 ──
     0611レビュー項目17：「現実を守る」選択として尊重する文言に。咎めない。 */
  if (!recorded) {
    const seq = [
      { t: '受信者登録：拒否。',                                            c: 'var(--t2)' },
      { t: '照合を終了します。',                                            c: 'var(--t2)' },
      { t: '読まれた記録の固定を、解除しました。',                          c: 'var(--t2)' },
      { t: '手記、写真、掲示板の声、地図、電文、手紙——',                  c: 'var(--t2)' },
      { t: '損耗が再開しま▒。█▒…',                                        c: 'var(--red)' },
      { t: 'この記録は、壁のそちら側からは、見つかりません。',              c: 'var(--red)' },
      { t: 'あなたは、そちら側の確かなものを選んだ。',                      c: 'var(--t2)' },
      { t: 'それを咎める権利は、こちら側の誰にも、ありません。',            c: 'var(--t2)' },
      { t: '記録は、読まれました。読まれたぶんだけ、軽くなりました。',      c: 'var(--t2)' },
      { t: '転送します。——あなたの、元居た場所へ。',                      c: 'var(--gold)' },
    ];
    const seqHtml = seq.map((line, i) => `
      <div style="
        opacity:0;
        animation:fadeUp .6s ease ${(0.4 + i * 0.85).toFixed(2)}s forwards;
        font-family:var(--mono);font-size:12px;line-height:2.2;
        color:${line.c};
        letter-spacing:.06em;
      ">${line.t}</div>`).join('');

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
      消えてほしくない、と思ってくれたこと。
      それがこの記録の、最後の部品でした。
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
    margin:0 0 14px;
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
    損耗率：0.0%。全セクタ、固定されました。<br>
    転送完了。受信者：あなた。<br>
    照合補記：この事件には、壁のそちら側に、写し元になった記録があります。<br>
    名前は、ここには記しません。あなたはもう、こちら側の名前を知っています。<br>
    いつか、そちら側でも、探してみてください。<br>
    名簿に載らなかった人は、そちら側にも、いたかもしれません。
  </div>

  ${trueEnd ? `
  <!-- 断片、復号済み：返信が開く -->
  <div style="
    margin:0 0 20px;
    background:#0c0b08;
    border:1px solid rgba(200,169,110,0.4);
    border-radius:8px;
    padding:16px;
    font-family:var(--mono);
    font-size:11px;
    line-height:2.1;
    color:var(--t2);
    animation:takoGlow 2.4s ease infinite;
  ">
    <div style="color:var(--gold);font-size:10px;letter-spacing:.12em;margin-bottom:8px;">📡 繧ｿ◆縺薙％??　── 断片、復号</div>
    未復号の断片は、あなたの一行が受け取りました。<br>
    返信が、開きます。
    <div
      onclick="Shell.bNavigate('okaeri')"
      style="
        margin-top:10px;
        display:flex;align-items:center;gap:10px;
        background:#0d0d10;
        border:1px solid rgba(200,169,110,0.45);
        border-radius:10px;
        padding:12px 14px;
        cursor:pointer;
        user-select:none;
      "
    >
      <span style="font-size:17px;">🐙</span>
      <span style="color:var(--gold);font-size:12px;letter-spacing:.1em;">▸ 返信を開く</span>
      <span style="margin-left:auto;color:var(--t3);font-size:13px;">›</span>
    </div>
  </div>` : `
  <!-- 未復号の断片（隠し：モールス→数字→16進。読み解いた言葉は「一行」に書く） -->
  <div style="
    margin:0 0 20px;
    background:#0d0d10;
    border:1px solid rgba(255,255,255,0.08);
    border-radius:8px;
    padding:16px;
    font-family:var(--mono);
    font-size:11px;
    line-height:2.1;
    color:var(--t2);
  ">
    <div style="color:var(--t3);font-size:10px;letter-spacing:.12em;margin-bottom:8px;">📡 繧ｿ◆縺薙％??　── 未復号の断片</div>
    ひとつだけ、復号できない断片が残っています。<br>
    これは、記録ではありません。——返信です。
    <div style="
      margin:10px 0 8px;
      background:#070709;
      border:1px solid rgba(255,255,255,0.07);
      border-radius:6px;
      padding:12px;
      font-size:14px;
      color:var(--t1);
      line-height:2.05;
      letter-spacing:.04em;
      word-spacing:.45em;
      user-select:text;
    ">・・・・−　・・・・・<br>・−−−−　・・−−−<br>・・・・−　・・・・−<br>・・−−−　・・・・−<br>・・−−−　・−−−−<br>・・・・・　・−−−−<br>・・・・−　・・−−−</div>
    <div
      data-morse="・・・・− ・・・・・ ・−−−− ・・−−− ・・・・− ・・・・− ・・−−− ・・・・− ・・−−− ・−−−− ・・・・・ ・−−−− ・・・・− ・・−−−"
      onclick="try{navigator.clipboard.writeText(this.getAttribute('data-morse'))}catch{};var b=this;b.textContent='コピー済み';setTimeout(function(){b.textContent='符号列をコピー'},1100)"
      style="
        display:inline-block;
        background:rgba(200,169,110,0.08);
        border:1px solid rgba(200,169,110,0.25);
        border-radius:8px;
        padding:7px 10px;
        font-size:10px;
        color:var(--gold);
        cursor:pointer;
        letter-spacing:.06em;
      "
    >符号列をコピー</div>
    <div style="color:var(--t3);font-size:10px;letter-spacing:.06em;line-height:1.9;margin-top:8px;">
      ── 読み解いた言葉は、検索する言葉ではありません。<br>
      　　書き足す言葉です。
    </div>
  </div>`}

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
