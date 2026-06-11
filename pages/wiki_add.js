// wiki_add.js　結末②「wiki編集画面」
// prereqs: choice

PAGE_CONTENT['wiki_add'] = () => {

  const articleBody = `1954年に刊行された文集『声は壁を透して』には、M川事件の被告、家族、支援者による手紙が収録された。

未収録資料として、蛸川小蘭が猫塚清治に宛てた手紙一通が確認されている。宛先の猫塚清治は公式記録上に存在しない人物であったため、当時の文集には収録されなかった。

蛸川小蘭のアーカイブには、猫塚清治が事件当夜に身元不明の人物を逃がしたこと、蛸川小蘭がその後二十四年間にわたり清治の痕跡を記録したことが残されている。

この手紙は、記録されなかった人物が存在したことを示す資料である。`;

  const escHtml = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

  const attachSaveBtn = () => {
    const btn = document.getElementById('wiki-save-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const ta = document.getElementById('wiki-user-line');
      const line = ((ta && ta.value) || '').trim() || '猫塚清治と蛸川小蘭は、ここにいた。';
      try { localStorage.setItem('koe_fumi_note', line); } catch {}
      // 隠し：未復号の断片（エピローグ補記）を解読した言葉が一行に含まれていれば、返信が開く
      try {
        if (/おかえり|オカエリ|お帰り/.test(line)) localStorage.setItem('koe_true_end', '1');
        else localStorage.removeItem('koe_true_end');
      } catch {}

      const container = document.getElementById('wiki-edit-container');
      if (!container) { Shell.bNavigate('epilogue'); return; }

      container.innerHTML = `
        <div style="
          padding:10px 14px;
          background:#d5fdf6;
          border-bottom:1px solid #a3d3a3;
          font-family:Arial,'Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif;
          font-size:12px;
          color:#14866d;
        ">あなたの編集は保存されました。</div>

        <div style="
          padding:10px 12px;
          border-bottom:1px solid #a2a9b1;
          display:flex;
          align-items:center;
          gap:10px;
          background:#fff;
        ">
          <span style="font-size:20px;font-weight:400;">M川事件</span>
          <span style="margin-left:auto;font-size:12px;color:#54595d;">閲覧　編集　<span style="color:#14866d;">履歴表示 (1&nbsp;版)</span></span>
        </div>

        <div style="padding:12px 14px;">
          <label style="display:block;font-size:12px;color:#202122;margin-bottom:6px;">== 未収録資料 ==</label>
          <div style="
            min-height:156px;
            border:1px solid #a2a9b1;
            background:#fff;
            padding:10px;
            font-family:Consolas,'Courier New',monospace;
            font-size:12px;
            color:#202122;
            white-space:pre-wrap;
          ">${escHtml(articleBody)}

<span style="background:#d8ecff;padding:0 2px;">${escHtml(line)}</span></div>
        </div>

        <div style="
          padding:10px 14px 14px;
          border-top:1px solid #eaecf0;
          background:#fff;
        ">
          <button
            id="wiki-close-btn"
            style="
              appearance:none;
              border:1px solid #36c;
              background:#36c;
              color:#fff;
              border-radius:2px;
              padding:8px 12px;
              font-weight:700;
              font-size:13px;
              cursor:pointer;
            "
          >▸ 記録を閉じる</button>
        </div>
      `;

      const closeBtn = document.getElementById('wiki-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => { Shell.bNavigate('epilogue'); });
      }
    });
  };

  setTimeout(attachSaveBtn, 0);

  return `<div class="bpage">
  <div class="bpage-num">wiki　編集</div>
  <div class="bpage-title">M川事件</div>
  <div class="bpage-meta">
    編集対象：未収録資料・記録外人物　／　利用者：このアーカイブの閲覧者
  </div>

  <div style="
    margin:0 0 16px;
    background:#f8f9fa;
    color:#202122;
    border:1px solid #a2a9b1;
    border-radius:4px;
    overflow:hidden;
    font-family:Arial,'Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif;
    line-height:1.65;
  ">
    <div id="wiki-edit-container">
      <div style="
        padding:10px 12px;
        border-bottom:1px solid #a2a9b1;
        display:flex;
        align-items:center;
        gap:10px;
        background:#fff;
      ">
        <span style="font-size:20px;font-weight:400;">M川事件</span>
        <span style="margin-left:auto;font-size:12px;color:#54595d;">閲覧　編集　履歴表示</span>
      </div>

      <div style="padding:12px 14px 4px;font-size:12px;color:#54595d;">
        出典を追加してください。存命人物に関する記述ではありませんが、検証可能性が必要です。
      </div>

      <div style="padding:12px 14px;">
        <label style="display:block;font-size:12px;color:#202122;margin-bottom:6px;">== 未収録資料 ==</label>
        <div style="
          min-height:156px;
          border:1px solid #a2a9b1;
          background:#fff;
          padding:10px;
          font-family:Consolas,'Courier New',monospace;
          font-size:12px;
          color:#202122;
          white-space:pre-wrap;
        ">1954年に刊行された文集『声は壁を透して』には、M川事件の被告、家族、支援者による手紙が収録された。

未収録資料として、蛸川小蘭が猫塚清治に宛てた手紙一通が確認されている。宛先の猫塚清治は公式記録上に存在しない人物であったため、当時の文集には収録されなかった。

蛸川小蘭のアーカイブには、猫塚清治が事件当夜に身元不明の人物を逃がしたこと、蛸川小蘭がその後二十四年間にわたり清治の痕跡を記録したことが残されている。

この手紙は、記録されなかった人物が存在したことを示す資料である。</div>
      </div>

      <div style="padding:0 14px 14px;">
        <label style="display:block;font-size:12px;color:#202122;margin-bottom:6px;">あなたの一行（ふたりが、ここにいたと分かる一行を）</label>
        <textarea
          id="wiki-user-line"
          rows="2"
          placeholder="例：一九四九年八月十六日の夜、猫塚清治はM川駅の近くにいた。"
          style="
            width:100%;
            box-sizing:border-box;
            border:1px solid #a2a9b1;
            background:#fff;
            padding:8px 10px;
            font-family:Consolas,'Courier New',monospace;
            font-size:12px;
            color:#202122;
            resize:none;
          "
        ></textarea>
      </div>

      <div style="padding:0 14px 14px;">
        <label style="display:block;font-size:12px;color:#202122;margin-bottom:6px;">編集内容の要約</label>
        <div style="
          border:1px solid #a2a9b1;
          background:#fff;
          padding:8px 10px;
          font-size:12px;
          color:#202122;
        ">未収録の手紙、猫塚清治、蛸川小蘭に関する記述を追加</div>
      </div>

      <div style="
        padding:10px 14px 14px;
        display:flex;
        gap:8px;
        flex-wrap:wrap;
        border-top:1px solid #eaecf0;
        background:#fff;
      ">
        <button
          id="wiki-save-btn"
          style="
            appearance:none;
            border:1px solid #36c;
            background:#36c;
            color:#fff;
            border-radius:2px;
            padding:8px 12px;
            font-weight:700;
            font-size:13px;
            cursor:pointer;
          "
        >編集を保存</button>
        <button
          type="button"
          onclick="Shell.bNavigate('choice')"
          style="
            appearance:none;
            border:1px solid #a2a9b1;
            background:#f8f9fa;
            color:#202122;
            border-radius:2px;
            padding:8px 12px;
            font-size:13px;
            cursor:pointer;
          "
        >キャンセル</button>
      </div>
    </div>
  </div>

  <div class="bpage-body">
    <p style="font-size:12px;color:var(--t2);line-height:2;">
      保存ボタンを押すと、追記はこのアーカイブに残ります。<br>
      実在の百科事典は編集されません。
    </p>
  </div>
</div>`;
};
