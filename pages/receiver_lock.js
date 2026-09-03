// receiver_lock.js — 受信者欄の復号入力

PAGE_CONTENT['receiver_lock'] = () => {
  const signals = [
    '・・・・−', '・−−−−', '・・−−−', '・−−−−', '・−−−−', '−・・・・',
    '・・−−−', '−・・・・', '・−−−−', '−−−−−', '・−−−−', '−−−−−',
    '・・−−−', '・・−−−', '・・・・−', '・・−−−', '・−−−−', '−・・・・'
  ];

  return `<div class="bpage">
  <div class="bpage-num">RECEIVER-LOCK</div>
  <div class="bpage-title">受信者欄</div>
  <div class="bpage-meta">入力形式：未確定　／　自動復号：失敗</div>

  <div style="margin:0 0 14px;background:#09090c;border:1px solid rgba(255,255,255,0.08);border-radius:9px;overflow:hidden;">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);font-family:var(--mono);color:var(--t3);font-size:10px;letter-spacing:.12em;">RECEIVER FIELD</div>
    <div style="padding:12px 14px;font-family:var(--mono);font-size:10px;line-height:1.9;">
      <div><span style="color:var(--t3);">SOURCE</span>　████████</div>
      <div><span style="color:var(--t3);">AUTO DECODE</span>　FAILED</div>
      <div><span style="color:var(--t3);">INPUT SUPPORT</span>　AVAILABLE</div>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin:0 0 14px;">
    ${signals.map((signal, index) => `
      <div style="background:#0d0d10;border:1px solid rgba(255,255,255,0.07);border-radius:6px;padding:8px 5px;text-align:center;font-family:var(--mono);font-size:11px;white-space:nowrap;">
        <span style="display:block;color:var(--t3);font-size:8px;margin-bottom:4px;">${String(index + 1).padStart(2, '0')}</span>${signal}
      </div>`).join('')}
  </div>

  <div style="margin:0 0 14px;background:#09090c;border:1px solid rgba(255,255,255,0.08);border-radius:9px;padding:12px 14px;font-family:var(--mono);font-size:10px;line-height:1.9;">
    <div><span style="color:var(--t3);">STAGE 1</span>　MORSE / NUMERIC</div>
    <div><span style="color:var(--t3);">STAGE 2</span>　HEX / KATAKANA</div>
    <div><span style="color:var(--t3);">GROUP</span>　2 DIGITS</div>
  </div>

  <p style="font-size:11px;color:var(--t3);font-family:var(--mono);line-height:1.9;">
    復号結果を「ページを開く」に入力してください。
  </p>
</div>`;
};
