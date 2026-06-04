// data_trace.js　第2層⑧「小蘭のデータ痕跡の全容」
// prereqs: hub_002

PAGE_CONTENT['data_trace'] = () => `<div class="bpage">
  <div class="bpage-num">第2層　08</div>
  <div class="bpage-title">小蘭のデータ痕跡　全容</div>
  <div class="bpage-meta">記録者：蛸川小蘭　／　1963年9月　／　照合ファイル数：47</div>

  <div class="bpage-body">
    <p>
      14年間、私はどうやって記録を残したか。
      どうやって当局の目を逃れたか。
      以下に、使った手段の全容を記す。
    </p>
  </div>

  <div style="margin:0 0 8px;display:flex;flex-direction:column;gap:8px;">

    <div style="
      background:#0d0d10;border:1px solid rgba(255,255,255,0.07);
      border-radius:10px;overflow:hidden;font-family:var(--mono);
    ">
      <div style="
        padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.05);
        background:rgba(90,143,212,0.07);
        color:var(--blue);font-size:10px;letter-spacing:.12em;
        display:flex;align-items:center;justify-content:space-between;
      ">
        <span>01　帳面のバイナリ</span>
        <span style="color:var(--t3);">手記①〜④と照合済み</span>
      </div>
      <div style="padding:12px 14px;font-size:12px;color:var(--t2);line-height:1.9;">
        一見ただの帳面だが、罫線の幅と文字の配置を意図的にずらした。
        罫線からのズレを0/1に変換すると、バイナリデータが浮かび上がる。
        14冊の帳面全体で、約2MBのデータを記録した。
        K鉄の保線用帳面を流用した。
      </div>
    </div>

    <div style="
      background:#0d0d10;border:1px solid rgba(255,255,255,0.07);
      border-radius:10px;overflow:hidden;font-family:var(--mono);
    ">
      <div style="
        padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.05);
        background:rgba(90,143,212,0.07);
        color:var(--blue);font-size:10px;letter-spacing:.12em;
        display:flex;align-items:center;justify-content:space-between;
      ">
        <span>02　障子の穿孔</span>
        <span style="color:var(--t3);">月湯温泉　宿の部屋</span>
      </div>
      <div style="padding:12px 14px;font-size:12px;color:var(--t2);line-height:1.9;">
        月湯温泉の宿の部屋の障子に、虫食いに見せかけた針穴を開けた。
        穿孔の配置はモールス符号に対応している。
        宿の主人が「この部屋の障子は取り換えられなかった」と後に語っている。
        意図してそのままにしておいてもらった。
      </div>
    </div>

    <div style="
      background:#0d0d10;border:1px solid rgba(255,255,255,0.07);
      border-radius:10px;overflow:hidden;font-family:var(--mono);
    ">
      <div style="
        padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.05);
        background:rgba(90,143,212,0.07);
        color:var(--blue);font-size:10px;letter-spacing:.12em;
        display:flex;align-items:center;justify-content:space-between;
      ">
        <span>03　電文の分散送信</span>
        <span style="color:var(--t3);">5ノードに分割</span>
      </div>
      <div style="padding:12px 14px;font-size:12px;color:var(--t2);line-height:1.9;">
        アーカイブ本体を5つのノードに分割して、別々の場所に送信した。
        一か所が押収されても、全体は失われない構造にした。
        5つが揃った時だけ、完全なアーカイブが復元される。
      </div>
    </div>

    <div style="
      background:#0d0d10;border:1px solid rgba(255,255,255,0.07);
      border-radius:10px;overflow:hidden;font-family:var(--mono);
    ">
      <div style="
        padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.05);
        background:rgba(90,143,212,0.07);
        color:var(--blue);font-size:10px;letter-spacing:.12em;
        display:flex;align-items:center;justify-content:space-between;
      ">
        <span>04　蒼沼ブルーランド　物理保管</span>
        <span style="color:var(--t3);">最終バックアップ</span>
      </div>
      <div style="padding:12px 14px;font-size:12px;color:var(--t2);line-height:1.9;">
        観覧車支柱の根元に埋めたメモリ。旧管理棟の床板下の防水ケース。
        廃墟になってから隠した。当局の定期捜索が終わるまで待った。
        廃墟は当局が忘れる。
      </div>
    </div>

  </div>

  <div style="
    margin:12px 0 20px;
    background:#0d0d10;
    border:1px solid rgba(200,169,110,0.15);
    border-radius:10px;
    padding:12px 14px;
    font-family:var(--mono);font-size:11px;line-height:2;
  ">
    <div style="color:var(--gold);letter-spacing:.1em;margin-bottom:8px;">── 全痕跡　照合完了</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 20px;color:var(--t2);font-size:10px;">
      <span>帳面バイナリ</span><span style="color:var(--gold);">✓ 復元済み</span>
      <span>障子の穿孔</span><span style="color:var(--gold);">✓ 復元済み</span>
      <span>電文（5ノード）</span><span style="color:var(--gold);">✓ 結合済み</span>
      <span>物理保管データ</span><span style="color:var(--gold);">✓ 照合済み</span>
      <span>暗号キー N-0816</span><span style="color:var(--gold);">✓ 解読済み</span>
    </div>
  </div>

  <div class="bpage-body">
    <p>
      このアーカイブには、技術的な異常だけでなく、別の種類の異常がある。
    </p>
  </div>

  <div style="
    margin:0 0 20px;
    background:#0d0009;
    border:1px solid rgba(200,88,88,0.15);
    border-radius:10px;overflow:hidden;
    font-family:var(--mono);font-size:11px;
  ">
    <div style="
      padding:9px 14px;border-bottom:1px solid rgba(200,88,88,0.1);
      color:var(--red);font-size:10px;letter-spacing:.12em;
    ">── 存在の異常　記録</div>
    ${[
      ['1949年に現れた人物', '戸籍なし。記録なし。名前のみ存在する。'],
      ['同一人物による撮影', '1949年と近年、同一地点の写真。撮影者は同一と推定される。'],
      ['現代の実装', 'AES-256相当の暗号化を、当時存在しない形式で実装した。'],
      ['アーカイブの送信元', '1963年9月12日付。受信者欄は「あなた」。送信手段は不明。'],
    ].map(([label, note]) => `
      <div style="padding:10px 14px;border-bottom:1px solid rgba(200,88,88,0.06);">
        <div style="color:var(--red);font-size:10px;letter-spacing:.08em;margin-bottom:3px;">${label}</div>
        <div style="color:var(--t3);font-size:10px;line-height:1.7;">${note}</div>
      </div>
    `).join('')}
  </div>

  <div class="bpage-body">
    <p class="anom">
      これらの異常は、すべて私自身に起因している。<br>
      最後のファイルに、説明を残した。
    </p>
  </div>
</div>`;
