// data_trace.js　第2層⑧「小蘭のデータ痕跡の全容」
// キーワード例: バイナリ、穿孔、電文
// prereqs: hub_002
// 役割：小蘭が使った記録手段の全体像。暗号化→分散→隠蔽の完全な説明。
//       第2層のラスト。第3層への接続。

PAGE_CONTENT['data_trace'] = () => `<div class="bpage">
  <div class="bpage-num">第2層　08</div>
  <div class="bpage-title">小蘭のデータ痕跡　全容</div>
  <div class="bpage-meta">解析者：不明　／　解析完了日：不明　／　照合ファイル数：47</div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── アーカイブの構造を解析したレポート。作成者は小蘭ではない可能性がある。
    </p>
    <p>
      小蘭は14年間、どうやって記録を残したのか。
      どうやって当局の目を逃れたのか。
      アーカイブの構造を逆算すると、以下のことが分かる。
    </p>
  </div>

  <!-- 記録手段パネル -->
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
        一見ただの帳面だが、罫線の幅と文字の配置が意図的にずらされている。
        罫線からのズレを0/1に変換すると、バイナリデータが浮かび上がる。
        14冊の帳面全体で、約2MBのデータが記録されていた。
        K鉄の保線用帳面を流用したと思われる。
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
        <span style="color:var(--t3);">十湯温泉　宿の部屋</span>
      </div>
      <div style="padding:12px 14px;font-size:12px;color:var(--t2);line-height:1.9;">
        十湯温泉の宿の部屋の障子に、虫食いに見せかけた針穴がある。
        穿孔の配置がモールス符号に対応している。
        宿の主人が「この部屋の障子は取り換えられなかった」と後に語っている。
        意図してそのままにしておいたのかもしれない。
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
        一か所が押収されても、全体は失われない構造。
        各ノードには単独では意味をなさないデータが格納されている。
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
        観覧車支柱の根元に埋められたメモリ。
        旧管理棟の床板下の防水ケース。
        いずれも廃墟になってから隠した。
        当局の定期捜索が終わるまで待ったと記録にある。
        「廃墟は当局が忘れる」と小蘭は書いている。
      </div>
    </div>

  </div>

  <!-- 照合サマリー -->
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
      <span>暗号キー N-0314</span><span style="color:var(--gold);">✓ 解読済み</span>
    </div>
  </div>

  <div class="bpage-body">
    <p>
      小蘭は、一人でこれをやった。
      14年間、追われながら、潜みながら。
    </p>
    <p>
      ITエンジニアとしての知識が、1949年の道具で変換された。
      バイナリを帳面に書き込んだ。
      モールス符号を障子に刻んだ。
      AES-256を、当時存在しない形式で実装した。
    </p>
    <p>
      すべては、あなたに届けるためだった。
    </p>
    <p class="anom">
      まだ開いていない扉がある。<br>
      小蘭が最後に残したものが、その先にある。
    </p>
  </div>
</div>`;
