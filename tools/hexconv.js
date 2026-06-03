// tools/hexconv.js　解析アプリ「16進変換器」
// 画像 puzzle_e_hex.jpg を見て読み取った16進値を手入力 → カタカナに変換。
// 読み取り＝人間 / 変換＝アプリ。対応表はアプリ内蔵。

TOOL_UI['hexconv'] = () => {

  // 16進→カタカナ対応表（独自表。電文ヘッダ 53 55 4A → ショ ウ ジ）
  const HEX_MAP = {
    '41':'ア','42':'イ','55':'ウ','44':'エ','45':'オ',
    '51':'サ','52':'シ','53':'ショ','56':'ス','57':'セ','58':'ソ',
    '4A':'ジ','5E':'ン',
  };

  setTimeout(() => {
    const inp = document.getElementById('hex-input');
    const btn = document.getElementById('hex-convert');
    const out = document.getElementById('hex-output');
    if (!inp || !btn || !out) return;

    btn.addEventListener('click', () => {
      const raw = inp.value.trim().toUpperCase();
      if (!raw) { out.textContent = '—'; out.style.color = 'var(--t3)'; return; }
      // スペース・カンマ・改行で区切る
      const tokens = raw.split(/[\s,]+/).filter(Boolean);
      const result = tokens.map(t => HEX_MAP[t] ?? '?').join('');
      out.textContent = result;
      out.style.color = result.includes('?') ? 'var(--red)' : 'var(--gold)';
    });

    inp.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
  }, 0);

  return `<div style="padding:18px 16px 40px;font-family:var(--mono);">
    <div style="color:var(--blue);font-size:11px;letter-spacing:.12em;margin-bottom:4px;">── 解析ツール</div>
    <div style="font-family:var(--serif);font-size:19px;color:var(--t1);letter-spacing:.04em;margin-bottom:6px;">16進変換器</div>
    <div style="font-size:10px;color:var(--t3);letter-spacing:.06em;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--bd);line-height:1.7;">
      電文に記録された16進値を読み取り、下に入力してください。<br>スペース区切りで複数入力できます。
    </div>

    <div style="font-size:10px;color:var(--t3);margin-bottom:8px;letter-spacing:.08em;">入力（例：53 55 4A）</div>
    <input id="hex-input" placeholder="16進値を入力…" style="
      width:100%;box-sizing:border-box;background:#070709;
      border:1px solid rgba(255,255,255,0.12);border-radius:8px;
      padding:12px 14px;font-family:var(--mono);font-size:15px;color:var(--t1);
      letter-spacing:.1em;outline:none;margin-bottom:12px;
    " />

    <div id="hex-convert" style="
      background:var(--gold-d);border:1px solid rgba(200,169,110,0.3);
      border-radius:8px;padding:12px;text-align:center;cursor:pointer;
      color:var(--gold);font-size:13px;letter-spacing:.1em;margin-bottom:20px;
    ">変換</div>

    <div style="font-size:10px;color:var(--t3);margin-bottom:8px;letter-spacing:.08em;">変換結果</div>
    <div id="hex-output" style="
      background:#070709;border:1px solid rgba(200,169,110,0.2);
      border-radius:8px;padding:16px;font-size:22px;color:var(--t3);
      letter-spacing:.15em;text-align:center;min-height:56px;margin-bottom:24px;
      font-family:var(--serif);
    ">—</div>

    <div style="font-size:10px;color:var(--t3);margin-bottom:8px;letter-spacing:.1em;">── 内蔵変換表</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;">
      ${Object.entries(HEX_MAP).map(([h,k]) => `
        <div style="background:#0d0d10;border:1px solid rgba(255,255,255,0.05);
          border-radius:5px;padding:6px 2px;text-align:center;line-height:1.5;">
          <div style="color:var(--t1);font-size:12px;">${k}</div>
          <div style="color:var(--t3);font-size:10px;">${h}</div>
        </div>
      `).join('')}
    </div>
  </div>`;
};
