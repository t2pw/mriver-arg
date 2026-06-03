// tools/morse.js　解析アプリ「モールス読取機」
// 画像 puzzle_e_shoji.jpg の障子の穴を読み取り、・と−で手入力 → 数字に変換。
// 読み取り＝人間 / 変換＝アプリ。対応表はアプリ内蔵。

TOOL_UI['morse'] = () => {

  // モールス→数字（升ごと）
  const MORSE_MAP = {
    '−−−−−':'0','・−−−−':'1','・・−−−':'2','・・・−−':'3','・・・・−':'4',
    '・・・・・':'5','−・・・・':'6','−−・・・':'7','−−−・・':'8','−−−−・':'9',
  };

  // 入力正規化：. → ・ / - _ — → − / 全角半角ゆらぎ吸収
  const normalize = s => s
    .replace(/[.\u00b7]/g,'・')     // . や中黒類 → ・
    .replace(/[-_–—ー]/g,'−')        // ハイフン各種・長音 → −
    .trim();

  setTimeout(() => {
    const inp = document.getElementById('morse-input');
    const btn = document.getElementById('morse-convert');
    const out = document.getElementById('morse-output');
    if (!inp || !btn || !out) return;

    btn.addEventListener('click', () => {
      const raw = inp.value;
      if (!raw.trim()) { out.textContent = '—'; out.style.color = 'var(--t3)'; return; }
      // 升ごとの区切り＝改行 or スペース
      const units = raw.split(/[\s\n]+/).map(normalize).filter(Boolean);
      const result = units.map(u => MORSE_MAP[u] ?? '?').join('');
      out.textContent = result;
      out.style.color = result.includes('?') ? 'var(--red)' : 'var(--gold)';
    });
  }, 0);

  return `<div style="padding:18px 16px 40px;font-family:var(--mono);">
    <div style="color:var(--blue);font-size:11px;letter-spacing:.12em;margin-bottom:4px;">── 解析ツール</div>
    <div style="font-family:var(--serif);font-size:19px;color:var(--t1);letter-spacing:.04em;margin-bottom:6px;">モールス読取機</div>
    <div style="font-size:10px;color:var(--t3);letter-spacing:.06em;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--bd);line-height:1.7;">
      障子の穴を読み取り、短点（・）と長点（−）で入力してください。<br>升ごとに改行またはスペースで区切ります。
    </div>

    <div style="font-size:10px;color:var(--t3);margin-bottom:8px;letter-spacing:.08em;">入力（・＝短　−＝長）</div>
    <textarea id="morse-input" placeholder="例：&#10;−−−−−&#10;・・・−−" style="
      width:100%;box-sizing:border-box;background:#070709;
      border:1px solid rgba(255,255,255,0.12);border-radius:8px;
      padding:12px 14px;font-family:var(--mono);font-size:15px;color:var(--t1);
      letter-spacing:.1em;outline:none;margin-bottom:12px;height:96px;resize:none;line-height:1.8;
    "></textarea>

    <div id="morse-convert" style="
      background:var(--gold-d);border:1px solid rgba(200,169,110,0.3);
      border-radius:8px;padding:12px;text-align:center;cursor:pointer;
      color:var(--gold);font-size:13px;letter-spacing:.1em;margin-bottom:20px;
    ">変換</div>

    <div style="font-size:10px;color:var(--t3);margin-bottom:8px;letter-spacing:.08em;">変換結果</div>
    <div id="morse-output" style="
      background:#070709;border:1px solid rgba(200,169,110,0.2);
      border-radius:8px;padding:16px;font-size:24px;color:var(--t3);
      letter-spacing:.25em;text-align:center;min-height:56px;margin-bottom:24px;
    ">—</div>

    <div style="font-size:10px;color:var(--t3);margin-bottom:8px;letter-spacing:.1em;">── 内蔵モールス数字表</div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px;">
      ${Object.entries(MORSE_MAP).map(([m,d]) => `
        <div style="background:#0d0d10;border:1px solid rgba(255,255,255,0.05);
          border-radius:5px;padding:6px 2px;text-align:center;line-height:1.6;">
          <div style="color:var(--t1);font-size:12px;">${d}</div>
          <div style="color:var(--t3);font-size:9px;letter-spacing:-1px;">${m}</div>
        </div>
      `).join('')}
    </div>
  </div>`;
};
