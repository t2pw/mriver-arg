// tools/hexconv.js　解析アプリ「16進変換器」
// telegram_001 の電文ヘッダ等から読み取った16進値を手入力 → カタカナに変換。
// 読み取り＝人間 / 変換＝アプリ。対応表はアプリ内蔵。

TOOL_UI['hexconv'] = () => {

  // 16進→カタカナ対応表（独自表。電文ヘッダ 16 10 → タ コ）
  const HEX_MAP = {
    '41':'ア','42':'イ','55':'ウ','44':'エ','45':'オ',
    '51':'サ','52':'シ','53':'ショ','56':'ス','57':'セ','58':'ソ',
    '4A':'ジ','5E':'ン',
    '10':'コ','16':'タ','21':'ナ','22':'ニ','26':'ハ',
    '12':'カ','24':'リ','23':'ラ', // 追補（非表示）
  };

  setTimeout(() => {
    const inp = document.getElementById('hex-input');
    const btn = document.getElementById('hex-convert');
    const out = document.getElementById('hex-output');
    if (!inp || !btn || !out) return;

    btn.addEventListener('click', () => {
      const raw = inp.value.trim().toUpperCase();
      if (!raw) { out.textContent = '—'; out.style.color = 'var(--t3)'; return; }
      // スペース・カンマ・改行で区切り、連続した16進文字列は2桁ずつ自動分割
      const tokens = raw.split(/[\s,]+/).filter(Boolean).flatMap(t =>
        (t.length > 2 && t.length % 2 === 0 && /^[0-9A-F]+$/.test(t))
          ? t.match(/../g) : [t]
      );
      const result = tokens.map(t => HEX_MAP[t] ?? '?').join('');
      out.textContent = result;
      out.style.color = result.includes('?') ? 'var(--red)' : 'var(--gold)';
      // 躯体の自動付記（45 12 44 24 10 23 5E＝オカエリコラン）を解読した瞬間に応答を返す。
      // 機械が声を聴いて覚えた未送信の一行＝任意返信への早期導線（2026-06-11 制作者発案）。
      const note = document.getElementById('hex-ident-note');
      if (note) note.style.display = (result === 'オカエリコラン') ? 'block' : 'none';
    });

    inp.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
  }, 0);

  return `<div style="padding:18px 16px 40px;font-family:var(--mono);">
    <div style="color:var(--blue);font-size:11px;letter-spacing:.12em;margin-bottom:4px;">── 解析ツール</div>
    <div style="font-family:var(--serif);font-size:19px;color:var(--t1);letter-spacing:.04em;margin-bottom:6px;">16進変換器</div>
    <div style="font-size:10px;color:var(--t3);letter-spacing:.06em;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--bd);line-height:1.7;">
      電文に記録された16進値を読み取り、下に入力してください。<br>スペースがなくても、2桁ずつ自動で区切ります。
    </div>

    <div style="font-size:10px;color:var(--t3);margin-bottom:8px;letter-spacing:.08em;">入力（例：16 10）</div>
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
      letter-spacing:.15em;text-align:center;min-height:56px;margin-bottom:10px;
      font-family:var(--serif);
    ">—</div>
    <div id="hex-ident-note" style="
      display:none;
      background:rgba(200,169,110,0.06);border:1px solid rgba(200,169,110,0.25);
      border-radius:8px;padding:10px 12px;margin-bottom:14px;
      font-size:10px;color:var(--gold);letter-spacing:.06em;line-height:1.9;
    ">── 躯体の自動付記と一致。<br>宛先：記録者。送信：未完了。</div>

    <div style="font-size:9px;color:var(--t3);margin-bottom:6px;">無料版のため、広告が表示されます。</div>
    <div style="
      width:100%;box-sizing:border-box;height:60px;
      background:#efe9d8;border:1px solid #b8ad92;border-radius:4px;
      display:flex;flex-direction:column;justify-content:center;
      padding:0 12px;cursor:default;user-select:none;
    ">
      <div style="font-family:var(--serif);color:#4a4234;line-height:1.5;">
        <span style="font-size:9px;background:#b8ad92;color:#4a4234;padding:0 3px;border-radius:2px;margin-right:6px;vertical-align:middle;">広告</span><span style="font-size:15px;letter-spacing:.06em;">月湯温泉旅館組合</span>
      </div>
      <div style="font-family:var(--serif);font-size:10px;color:#4a4234;letter-spacing:.04em;">渓流の音と、こけしの宿。──日帰り入浴、受付中</div>
    </div>
  </div>`;
};
