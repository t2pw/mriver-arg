// pages/telegram_001.js v5
// 暗号ページ。生データ画像＋キーワードタグのみ。
// ツール入手導線は持たない（配布サイトは検索で偶然たどり着く設計）。
// キーワードタグ（バイナリ/モールス/16進/穿孔）を検索 → freesoft へ遷移。

PAGE_CONTENT['telegram_001'] = () => {
  setTimeout(() => {
    document.querySelectorAll('[data-kwtag]').forEach(el => {
      el.addEventListener('click', () => Shell.setSearchAndFocus(el.getAttribute('data-kwtag')));
    });
  }, 0);

  const kwTag = (kw) =>
    `<span data-kwtag="${kw}" style="
      background:#0d0d10;border:1px solid rgba(255,255,255,0.09);
      border-radius:20px;padding:4px 10px;
      font-family:var(--mono);font-size:10px;color:var(--t3);
      cursor:pointer;letter-spacing:.06em;transition:border-color .15s,color .15s;
    " onmouseenter="this.style.color='var(--gold)';this.style.borderColor='rgba(200,169,110,0.3)'"
       onmouseleave="this.style.color='var(--t3)';this.style.borderColor='rgba(255,255,255,0.09)'"
    ># ${kw}</span>`;

  return `<div class="bpage">
  <div class="bpage-num">電文　01</div>
  <div class="bpage-title">暗号データ</div>
  <div class="bpage-meta">受信者欄：███　／　暗号キー：N-████　／　復号レベル：部分</div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── このファイルは二重に暗号化されている。<br>
      　　ヘッダは16進。添付された図は別の符号だ。
    </p>
    <p>
      小蘭が残した電文の中で、これだけが構造が違う。
      受信者識別子の部分だけが、別の方式で保護されている。
      何の符号なのか分かれば、調べようがあるはずだ。
    </p>
  </div>

  <!-- 第1段：16進 -->
  <div style="margin:0 0 8px;background:#0d0d10;border:1px solid rgba(255,255,255,0.08);border-radius:10px;overflow:hidden;">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(90,143,212,0.07);color:var(--blue);font-family:var(--mono);font-size:10px;letter-spacing:.12em;">第1段　電文ヘッダ</div>
    <div style="padding:14px;">
      <img src="images/puzzle_e_hex.jpg"
           style="width:100%;border-radius:6px;display:block;"
           onerror="this.outerHTML='<div style=\'background:#1a1610;border:1px dashed rgba(200,169,110,0.25);border-radius:6px;height:130px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;color:var(--t3);font-family:var(--mono);font-size:10px;text-align:center;line-height:1.7;\'>[ images/puzzle_e_hex.jpg ]<br><span style=\'color:var(--gold);font-size:16px;letter-spacing:.2em;\'>53　55　4A</span><br><span style=\'font-size:9px;\'>画像をここに配置</span></div>'" >
      <div style="font-family:var(--mono);font-size:10px;color:var(--t3);margin-top:10px;line-height:1.8;">
        ── 数字の羅列に見える。2桁ずつ区切られている。<br>
        　　これが何の符号なのか、調べてみる価値がある。
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">
        ${kwTag('16進')}${kwTag('バイナリ')}
      </div>
    </div>
  </div>

  <!-- 第2段：障子モールス -->
  <div style="margin:0 0 8px;background:#0d0d10;border:1px solid rgba(255,255,255,0.08);border-radius:10px;overflow:hidden;">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(90,143,212,0.07);color:var(--blue);font-family:var(--mono);font-size:10px;letter-spacing:.12em;">第2段　添付図</div>
    <div style="padding:14px;">
      <img src="images/puzzle_e_shoji.jpg"
           style="width:100%;border-radius:6px;display:block;"
           onerror="this.outerHTML='<div style=\'background:#1a1610;border:1px dashed rgba(200,169,110,0.25);border-radius:6px;height:160px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:6px;color:var(--t3);font-family:var(--mono);font-size:10px;text-align:center;line-height:1.7;\'>[ images/puzzle_e_shoji.jpg ]<br><span style=\'font-size:9px;\'>障子の穿孔図をここに配置</span></div>'">
      <div style="font-family:var(--mono);font-size:10px;color:var(--t3);margin-top:10px;line-height:1.8;">
        ── 障子に開いた穴の列。短い点と、長い線のように見える。<br>
        　　これも何かの符号だ。読み方を調べる必要がある。
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">
        ${kwTag('モールス')}${kwTag('穿孔')}
      </div>
    </div>
  </div>

  <div class="bpage-body">
    <p style="font-family:var(--mono);font-size:11px;color:var(--t3);line-height:1.9;">
      ── 符号の名前で検索すれば、読み解く手がかりが見つかるかもしれない。<br>
      　　解読して得た4桁の数字を、最後にこのブラウザで検索する。
    </p>
    <p class="anom">受信者欄「███」は、その4桁が揃ったとき初めて意味を持つ。</p>
  </div>
</div>`;
};
