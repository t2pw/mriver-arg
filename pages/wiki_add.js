// wiki_add.js　結末②「架空wiki（追記）」
// prereqs: choice
// 役割：プレイヤーが架空文集の未収録欄に一言追記する。
//       50字以内。localStorageに保存。→ epilogueで読み出して表示。

PAGE_CONTENT['wiki_add'] = () => {

  // 過去に記録済みかチェック
  const saved = (() => {
    try { return localStorage.getItem('koe_fumi_note') || ''; } catch { return ''; }
  })();

  setTimeout(() => {
    const textarea = document.getElementById('fumi-note-input');
    const counter  = document.getElementById('fumi-note-count');
    const btn      = document.getElementById('fumi-note-submit');
    if (!textarea) return;

    // 既存の記録があれば表示
    if (saved) textarea.value = saved;

    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      counter.textContent = len + ' / 50';
      counter.style.color = len > 50 ? 'var(--red)' : 'var(--t3)';
      btn.disabled = len === 0 || len > 50;
      btn.style.opacity = (len === 0 || len > 50) ? '.4' : '1';
    });

    // 初期状態
    counter.textContent = (saved.length || 0) + ' / 50';
    btn.disabled = saved.length === 0;
    btn.style.opacity = saved.length === 0 ? '.4' : '1';

    btn.addEventListener('click', () => {
      const val = textarea.value.trim();
      if (!val || val.length > 50) return;
      try { localStorage.setItem('koe_fumi_note', val); } catch {}
      Shell.bNavigate('epilogue');
    });
  }, 0);

  return `<div class="bpage">
  <div class="bpage-num">架空wiki</div>
  <div class="bpage-title">声は壁を透して</div>
  <div class="bpage-meta">
    出典：M川事件被告を守る会（1954年）　／　編集：このアーカイブの閲覧者
  </div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── 架空文集「声は壁を透して」の項目。
    </p>
  </div>

  <!-- wiki本文 -->
  <div style="
    margin:0 0 16px;
    background:#0d0d10;
    border:1px solid rgba(255,255,255,0.07);
    border-radius:10px;
    overflow:hidden;
    font-family:var(--serif);
    font-size:13px;
    line-height:2.2;
    color:var(--t2);
  ">
    <div style="
      padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.05);
      font-family:var(--mono);font-size:10px;color:var(--t3);letter-spacing:.1em;
    ">── 文集概要</div>
    <div style="padding:14px 16px;">
      昭和二十九年（1954年）秋、M川事件被告を守る会が発行した非売品の文集。
      被告・家族・支援者からの手紙約三百通を収録。
      「声は壁を透して届く」という言葉から題名が付けられた。
    </div>

    <div style="
      padding:10px 14px;border-top:1px solid rgba(255,255,255,0.05);
      border-bottom:1px solid rgba(255,255,255,0.05);
      font-family:var(--mono);font-size:10px;color:var(--t3);letter-spacing:.1em;
    ">── 収録内容</div>
    <div style="padding:14px 16px;color:var(--t2);">
      被告二十名の獄中書簡。家族からの返書。支援者・市民からの手紙。
      弁護団への書簡。子どもたちが父親に宛てた手紙。
    </div>

    <div style="
      padding:10px 14px;border-top:1px solid rgba(255,255,255,0.05);
      border-bottom:1px solid rgba(255,255,255,0.05);
      font-family:var(--mono);font-size:10px;color:var(--red);letter-spacing:.1em;
    ">── 未収録の手紙（猫塚ふみ）</div>
    <div style="padding:14px 16px;">
      <p style="color:var(--t2);margin-bottom:1em;">
        差出人：猫塚ふみ　／　宛先：猫塚清治<br>
        収録されなかった理由：宛先の人物が記録上存在しないため。
      </p>
      <p style="color:var(--t3);font-family:var(--mono);font-size:11px;margin-bottom:.6em;">
        ── この手紙について、記録しておくべきことを一言残してください。
      </p>

      <!-- 入力欄 -->
      <textarea
        id="fumi-note-input"
        maxlength="50"
        placeholder="50字以内"
        style="
          width:100%;box-sizing:border-box;
          background:#070709;
          border:1px solid rgba(255,255,255,0.12);
          border-radius:8px;
          padding:10px 12px;
          font-family:var(--serif);
          font-size:13px;
          color:var(--t1);
          line-height:1.9;
          letter-spacing:.05em;
          resize:none;
          height:80px;
          outline:none;
        "
      >${saved}</textarea>

      <div style="
        display:flex;align-items:center;justify-content:space-between;
        margin-top:8px;
      ">
        <span id="fumi-note-count" style="
          font-family:var(--mono);font-size:10px;color:var(--t3);
        ">${saved.length} / 50</span>
        <div
          id="fumi-note-submit"
          style="
            background:rgba(200,169,110,0.14);
            border:1px solid rgba(200,169,110,0.3);
            border-radius:7px;
            padding:7px 16px;
            font-family:var(--mono);
            font-size:11px;
            color:var(--gold);
            cursor:pointer;
            letter-spacing:.08em;
            opacity:${saved.length > 0 ? '1' : '.4'};
          "
        >記録する　▸</div>
      </div>
    </div>
  </div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;line-height:1.9;">
      ── あなたが書いた言葉は、このアーカイブに残ります。<br>
      　　エピローグで確認できます。
    </p>
  </div>
</div>`;
};
