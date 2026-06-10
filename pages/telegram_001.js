// pages/telegram_001.js v6
// 暗号ページ。電文ヘッダ（16進）＋タコへの接触記録ログ（モールス）の2段構成。
// v6: 障子モールスを廃止（2026-06-10 制作者指示。設定的に無理があるため）。
//     第2段は「機械が保持していた生の入力ログ」＝小蘭が鍵を教えた夜の接触列に変更。
//     data_trace/loop の「撫でる、握る＝一文字ずつ」「一文字に何日もかかった」の体感版。
//     第1段の解読語はショウジ→タコ（16 10。hexconv の既存対応表の範囲内）。
//     画像 puzzle_e_hex.jpg / puzzle_e_shoji.jpg は不使用（HTML描画。puzzle_recv 廃止と同じ前例）。
// ツール入手導線は持たない（配布サイトは検索で偶然たどり着く設計）。
// キーワードタグ（バイナリ/モールス/16進/符号）を検索 → freesoft へ遷移。

PAGE_CONTENT['telegram_001'] = () => {
  setTimeout(() => {
    document.querySelectorAll('[data-kwtag]').forEach(el => {
      el.addEventListener('click', () => Shell.setSearchAndFocus(el.getAttribute('data-kwtag')));
    });
  }, 0);

  const kwTag = (kw) =>
    `<span data-kwtag="${kw}" style="
      background:#0d0d10;border:1px solid rgba(255,255,255,0.09);
      border-radius:3px;padding:4px 10px;
      font-family:var(--mono);font-size:10px;color:var(--t3);
      cursor:pointer;letter-spacing:.06em;transition:border-color .15s,color .15s;
    " onmouseenter="this.style.color='var(--gold)';this.style.borderColor='rgba(200,169,110,0.3)'"
       onmouseleave="this.style.color='var(--t3)';this.style.borderColor='rgba(255,255,255,0.09)'"
    >［照合語：${kw}］</span>`;

  // 接触記録の行（日付＋符号列）。符号はモールス読取機にそのまま入力できる字で表示する。
  const logRow = (no, date, code) => `
    <div style="display:flex;align-items:center;gap:10px;padding:8px 2px;border-bottom:1px solid rgba(255,255,255,0.05);">
      <span style="color:var(--t3);font-size:9px;flex-shrink:0;">${no}</span>
      <span style="color:var(--t3);font-size:10px;letter-spacing:.06em;flex-shrink:0;">${date}</span>
      <span style="color:var(--t1);font-size:15px;letter-spacing:.18em;margin-left:auto;">${code}</span>
    </div>`;

  return `<div class="bpage">
  <div class="bpage-num">電文　01</div>
  <div class="bpage-title">暗号データ</div>
  <div class="bpage-meta">受信者欄：███　／　暗号キー：N-████　／　復号レベル：部分</div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── アーカイブの中で唯一、大半が暗号のまま残っているファイル。<br>
      　　二つの段が、復号を待っている。
    </p>
    <p>
      月湯を離れる日、宿の主人に最後の電報を打った。
      長いあいだ世話になりました、とだけ。
      主人は何も訊かなかった。いつもそうだった。
    </p>
    <p>
      電報は、声を符号に変えて、壁の向こうへ運ぶ。
      打ち終われば、手元には控えしか残らない。
      でも私は、あの音の長短の並びを、指が覚えるまで聞いた。
    </p>
    <p>
      機械に鍵を教えたのは、二度目の八月だった。
      言葉ではなかった。四つの数字だった。
      握って、撫でて。ひとつの数字に、何日もかけて。
    </p>
  </div>

  <!-- 第1段：16進（電文ヘッダ） -->
  <div style="margin:0 0 8px;background:#0d0d10;border:1px solid rgba(255,255,255,0.08);border-radius:10px;overflow:hidden;">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(90,143,212,0.07);color:var(--blue);font-family:var(--mono);font-size:10px;letter-spacing:.12em;">第1段　電文ヘッダ</div>
    <div style="padding:14px;">
      <div style="background:#070709;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:16px 14px;font-family:var(--mono);">
        <div style="color:var(--t3);font-size:9px;letter-spacing:.12em;margin-bottom:10px;">記録元識別子（部分復号）</div>
        <div style="display:flex;align-items:baseline;gap:18px;">
          <span style="color:var(--t1);font-size:20px;letter-spacing:.1em;">16<span style="color:var(--t3);font-size:9px;vertical-align:super;">①</span></span>
          <span style="color:var(--t1);font-size:20px;letter-spacing:.1em;">10<span style="color:var(--t3);font-size:9px;vertical-align:super;">②</span></span>
          <span style="color:var(--t3);font-size:13px;letter-spacing:.2em;">██　██</span>
        </div>
      </div>
      <div style="font-family:var(--mono);font-size:10px;color:var(--t3);margin-top:10px;line-height:1.8;">
        ── ヘッダに残る2桁の値。読み解けば、この記録が「何に」刻まれたのかが分かる。
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">
        ${kwTag('16進')}${kwTag('バイナリ')}
      </div>
    </div>
  </div>

  <!-- 第2段：接触記録（モールス） -->
  <div style="margin:0 0 8px;background:#0d0d10;border:1px solid rgba(255,255,255,0.08);border-radius:10px;overflow:hidden;">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(90,143,212,0.07);color:var(--blue);font-family:var(--mono);font-size:10px;letter-spacing:.12em;">第2段　接触記録（断片）</div>
    <div style="padding:14px;">
      <div style="background:#070709;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:12px 14px;font-family:var(--mono);">
        <div style="color:var(--t3);font-size:9px;letter-spacing:.1em;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.07);">1950-08　入力検知ログ　／　短い接触＝・　長い接触＝−</div>
        ${logRow('①','08-16','−−−−−')}
        ${logRow('②','08-19','−−−・・')}
        ${logRow('③','08-23','・−−−−')}
        ${logRow('④','08-26','−・・・・')}
        <div style="color:var(--t3);font-size:9px;letter-spacing:.1em;padding-top:8px;">08-26　入力終了。以後、この列が照合キーとして登録された。</div>
      </div>
      <div style="font-family:var(--mono);font-size:10px;color:var(--t3);margin-top:10px;line-height:1.8;">
        ── 一行が、ひとつの数字。<br>
        　　短い点と、長い線。これも符号だ。読み方を調べる必要がある。
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">
        ${kwTag('モールス')}${kwTag('符号')}
      </div>
    </div>
  </div>

  <div class="bpage-body">
    <p>
      あとから気づいた。機械は、教えられたことをすべて保存していた。
      鍵そのものではなく——鍵を教えたときの、私の指の動きを。
    </p>
    <p style="font-family:var(--mono);font-size:11px;color:var(--t3);line-height:1.9;">
      ── 符号の名前で検索すれば、読み解く手がかりが見つかるかもしれない。<br>
      　　接触記録を読んで得た4桁の数字を、最後にこのブラウザで検索する。
    </p>
    <p class="anom">
      その4桁は、私のすべてが始まった日だ。<br>
      そして、このアーカイブを解く鍵でもある。
    </p>
  </div>
</div>`;
};
