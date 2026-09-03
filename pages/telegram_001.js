// telegram_001.js — 資料8「接触記録ログ」
// 機械の自動保存だけで構成する。任意の16進伏線と必須のモールス0816を維持。

PAGE_CONTENT['telegram_001'] = () => {
  const row = (no, date, code, trials) => `
    <div style="display:grid;grid-template-columns:22px 48px 1fr auto;align-items:baseline;gap:8px;padding:8px 2px;border-bottom:1px solid rgba(255,255,255,0.05);">
      <span style="color:var(--t3);font-size:9px;">${no}</span>
      <span style="color:var(--t3);font-size:9px;">${date}</span>
      <span style="color:var(--t1);font-size:15px;letter-spacing:.18em;">${code}</span>
      <span style="color:var(--t3);font-size:9px;">${trials}</span>
    </div>`;

  return `<div class="bpage">
  <div class="bpage-num">SIGNAL LOG　01</div>
  <div class="bpage-title">接触記録ログ</div>
  <div class="bpage-meta">自動保存　／　入力主体：不明　／　1950年8月</div>

  <div style="margin:0 0 12px;background:#09090c;border:1px solid rgba(255,255,255,0.08);border-radius:9px;overflow:hidden;font-family:var(--mono);">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);color:var(--t3);font-size:10px;letter-spacing:.12em;">PAYLOAD / ENCRYPTED</div>
    <div style="padding:13px 14px;">
      <div style="color:rgba(226,224,218,0.22);font-size:11px;letter-spacing:.14em;line-height:2;">
        ▒█▒▒ ████ ▒▒█ ███▒ ▒▒▒█ █▒██ ▒███ ██▒▒<br>
        ███▒ ▒█▒▒ ▒▒██ █▒▒▒ ████ ▒██▒ █▒▒█ ▒▒▒▒<br>
        ▒▒█▒ ███▒ █▒▒▒ ▒███ ▒█▒█ ████ ▒▒█▒ ███▒
      </div>
      <div style="font-size:9px;color:var(--t3);letter-spacing:.1em;margin-top:8px;">以下714行　読取不能</div>
      <div style="border-top:1px solid rgba(255,255,255,0.07);margin-top:9px;padding-top:10px;">
        <div style="font-size:9px;color:var(--t3);letter-spacing:.1em;margin-bottom:6px;">末尾付記　／　FORMAT: HEX　／　照合対象外</div>
        <div style="color:var(--t1);font-size:15px;letter-spacing:.16em;">45　12　44　24　10　23　5E</div>
      </div>
    </div>
  </div>

  <div style="margin:0 0 12px;background:#09090c;border:1px solid rgba(90,143,212,0.2);border-radius:9px;overflow:hidden;font-family:var(--mono);">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);color:var(--blue);font-size:10px;letter-spacing:.12em;">INPUT DETECTION / OUTER SHELL</div>
    <div style="padding:13px 14px;">
      <div style="font-size:9px;color:var(--t3);letter-spacing:.08em;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.06);">
        短い接触＝・　長い接触＝−　／　数字符号との一致を検出
      </div>
      ${row('01','08-16','−−−−−','41回')}
      ${row('02','08-19','−−−・・','58回')}
      ${row('03','08-23','・−−−−','9回')}
      ${row('04','08-26','−・・・・','26回')}
      <div style="font-size:9px;color:var(--t3);line-height:1.9;padding-top:9px;">
        08-26 04:12　入力終了<br>
        KEY TYPE：NUMERIC / 4 DIGITS<br>
        KEY STATUS：照合待機
      </div>
    </div>
  </div>

  <div style="margin:0 0 16px;background:#0d0d10;border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:13px 14px;">
    <div style="font-family:var(--mono);font-size:9px;color:var(--t3);letter-spacing:.1em;margin-bottom:7px;">AUDIO TRANSCRIPT / 08-26 04:12</div>
    <div style="font-family:var(--serif);font-size:12px;color:var(--t2);line-height:2;">「……忘れようのない数字なら、なくさないから。……ね。覚えた？」</div>
  </div>

  <div style="font-family:var(--mono);font-size:10px;color:var(--t3);line-height:1.9;">
    必須入力：4桁の暗号キー<br>
    入力先：復元アプリ照合欄
  </div>
</div>`;
};
