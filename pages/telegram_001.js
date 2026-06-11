// pages/telegram_001.js v7
// 暗号ページ。0611テストプレイレビュー項目5により機械ログ路線でゼロベース再設計。
// 体裁：アーカイブ中で唯一「小蘭が書かなかった」ファイル。本体は暗号のまま読めず、
//       読めるのは機械（タコ内部）が自動保存した「鍵登録ログ」の付録だけ。
// 物語は装飾でなくログの数字で語る（日付の間隔・試行回数＝ひとつの数字に何晩もかけた）。
// 謎は v6 と同一：第1段 16進ヘッダ 16 10（→タコ）／第2段 接触記録モールス4行（→0816）。
// 照合語チップ（kwTag）は廃止。検索語はログの文中に裸で置く（モールス・符号・16進）。
// 小蘭の声は「併録音声の自動文字起こし」一行のみ（機械は声を聴いていた、の伏線）。

PAGE_CONTENT['telegram_001'] = () => {

  // ログ行（日付＋符号列＋所要）。符号はモールス読取機にそのまま入力できる字で表示する。
  const logRow = (no, date, code, note) => `
    <div style="display:flex;align-items:baseline;gap:10px;padding:8px 2px;border-bottom:1px solid rgba(255,255,255,0.05);">
      <span style="color:var(--t3);font-size:9px;flex-shrink:0;">${no}</span>
      <span style="color:var(--t3);font-size:10px;letter-spacing:.06em;flex-shrink:0;">${date}</span>
      <span style="color:var(--t1);font-size:15px;letter-spacing:.18em;">${code}</span>
      <span style="color:var(--t3);font-size:9px;letter-spacing:.04em;margin-left:auto;flex-shrink:0;">${note}</span>
    </div>`;

  // 暗号化された本体の見え方（装飾。解読対象ではない）
  const garble = [
    '▒█▒▒ ████ ▒▒█ ███▒ ▒▒▒█ █▒██ ▒███ ██▒▒',
    '███▒ ▒█▒▒ ▒▒██ █▒▒▒ ████ ▒██▒ █▒▒█ ▒▒▒▒',
    '▒▒█▒ ███▒ █▒▒▒ ▒███ ▒█▒█ ████ ▒▒█▒ ███▒',
  ].map(l => `<div style="color:rgba(226,224,218,0.22);font-size:11px;letter-spacing:.14em;line-height:2;">${l}</div>`).join('');

  return `<div class="bpage">
  <div class="bpage-num">電文　01</div>
  <div class="bpage-title">暗号データ</div>
  <div class="bpage-meta">ファイル構成：本体（暗号化）＋付録（生ログ・自動保存）　／　復号レベル：部分</div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── アーカイブの中で唯一、小蘭の書いたものが読めないファイル。<br>
      　　本体は暗号のまま。読めるのは、機械がひとりでに書き残した付録だけだ。
    </p>
  </div>

  <!-- 本体：暗号化データ＋16進ヘッダ -->
  <div style="margin:0 0 8px;background:#0d0d10;border:1px solid rgba(255,255,255,0.08);border-radius:10px;overflow:hidden;font-family:var(--mono);">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(90,143,212,0.07);color:var(--blue);font-size:10px;letter-spacing:.12em;">本体　── 暗号化データ</div>
    <div style="padding:14px;">
      <div style="background:#070709;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:12px 14px;">
        <div style="color:var(--t3);font-size:9px;letter-spacing:.12em;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.07);margin-bottom:8px;">
          HDR　記録元識別子（部分復号）：<span style="color:var(--t1);font-size:14px;letter-spacing:.14em;">16　10</span><span style="color:rgba(226,224,218,0.3);font-size:14px;letter-spacing:.14em;">　██　██</span><br>
          形式：16進　／　自動復号：失敗
        </div>
        ${garble}
        <div style="color:var(--t3);font-size:9px;letter-spacing:.1em;padding-top:8px;">以下 ７１４ 行、同様。</div>
      </div>
      <div style="font-size:10px;color:var(--t3);margin-top:10px;line-height:1.8;">
        ── ヘッダの2桁の値を読み解けば、この記録が「何に」刻まれたのかが分かる。<br>
        　　数字の読み方が分からなければ、形式の名前でこのブラウザを検索する。
      </div>
    </div>
  </div>

  <!-- 付録：鍵登録ログ（機械の自動保存） -->
  <div style="margin:0 0 8px;background:#0d0d10;border:1px solid rgba(255,255,255,0.08);border-radius:10px;overflow:hidden;font-family:var(--mono);">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(90,143,212,0.07);color:var(--blue);font-size:10px;letter-spacing:.12em;">付録　── 鍵登録ログ（自動保存）</div>
    <div style="padding:14px;">
      <div style="background:#070709;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:12px 14px;">
        <div style="color:var(--t3);font-size:9px;letter-spacing:.1em;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.07);">1950-08　入力検知ログ　／　短い接触＝・　長い接触＝−</div>
        ${logRow('①','08-16','−−−−−','確定まで、三晩。試行 41回')}
        ${logRow('②','08-19','−−−・・','確定まで、四晩。試行 58回')}
        ${logRow('③','08-23','・−−−−','確定まで、三晩。試行 9回')}
        ${logRow('④','08-26','−・・・・','確定。試行 26回')}
        <div style="color:var(--t3);font-size:9px;letter-spacing:.1em;padding-top:8px;line-height:1.9;">
          08-26　入力終了。以後、この列を照合キーとして登録。<br>
          入力主体：不明（外装への接触）　／　符号系統：モールス符号（数字）に一致
        </div>
      </div>
      <div style="font-size:10px;color:var(--t3);margin-top:10px;line-height:1.8;">
        ── 一行が、ひとつの数字。短い点と長い線。これも符号だ。<br>
        　　符号の名前で検索すれば、読む道具が見つかるかもしれない。
      </div>
    </div>
  </div>

  <!-- 併録音声（機械は声を聴いていた） -->
  <div style="margin:0 0 8px;background:#0d0d10;border:1px solid rgba(255,255,255,0.08);border-radius:10px;overflow:hidden;font-family:var(--mono);">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);color:var(--t3);font-size:10px;letter-spacing:.12em;">併録音声（断片）　── 自動文字起こし</div>
    <div style="padding:13px 14px;">
      <div style="font-family:var(--serif);font-size:12px;color:var(--t2);line-height:2;letter-spacing:.04em;">
        「……忘れようのない数字なら、なくさないから。……ね。覚えた？」
      </div>
      <div style="font-size:9px;color:var(--t3);letter-spacing:.08em;margin-top:6px;">1950-08-26　04:12　入力終了の直後に録音</div>
    </div>
  </div>

  <div class="bpage-body">
    <p style="font-family:var(--mono);font-size:11px;color:var(--t3);line-height:1.9;">
      ── 四つの行は、四つの数字。<br>
      　　読み解いた4桁を、最後にこのブラウザで検索する。
    </p>
    <p class="anom">
      鍵そのものは、アーカイブのどこにも書かれていない。<br>
      書かれているのは、鍵を教えたときの——指の動きだけだ。
    </p>
  </div>
</div>`;
};
