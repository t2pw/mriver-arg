// wiki_add.js　結末②「架空wiki編集画面」
// prereqs: choice

PAGE_CONTENT['wiki_add'] = () => {

  setTimeout(() => {
    const btn = document.getElementById('wiki-save-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      try { localStorage.setItem('koe_fumi_note', '1'); } catch {}
      Shell.bNavigate('epilogue');
    });
  }, 0);

  return `<div class="bpage">
  <div class="bpage-num">架空wiki　編集</div>
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

  <div class="bpage-body">
    <p style="font-size:12px;color:var(--t2);line-height:2;">
      保存ボタンを押すと、追記はこのアーカイブに残ります。<br>
      実在の百科事典は編集されません。
    </p>
  </div>
</div>`;
};
