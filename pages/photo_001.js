// photo_001.js　写真①「記録されなかった人物」 v3
// 2026-06-11: 制作者が photo_koaru.jpg を再生成（女性のポートレート・壁に脱線の新聞貼付）。
//   被写体を清治から「アーカイブの記録者自身」（本文では明言しない）に変更。
//   清治の写真は「一枚も残っていない」設定に統一（kiroku_003「写真はない」と整合。inochi も修正）。
//   壁の新聞の発行日（昭和二十四年八月十八日）＝ photo_002 解錠語「昭和24年」の観察素材
//   （④-b の役割をこの画像が兼ねる）。裏面メモ「この人はここにいた」は不変条件
//   （hidden「あなたはここにいた」の前振り）として保持。メモから年号は外し、年は画像から読ませる。

PAGE_CONTENT['photo_001'] = () => `<div class="bpage">
  <div class="bpage-num">写真　01</div>
  <div class="bpage-title">記録されなかった人物</div>
  <div class="bpage-meta">撮影：行商の写真師　／　撮影日：不明（壁の新聞が日付の代わりになる）　／　裏面にメモあり</div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── 当該写真には、記録者自身のメモが同封されていた。<br>
      　　アーカイブの中で、人の顔が写っている写真は、これ一枚しかない。
    </p>
  </div>

  <img src="images/photo_koaru.jpg"
       style="width:100%;height:220px;object-fit:cover;object-position:center top;display:block;"
       onerror="this.parentElement.innerHTML='<div style=\\'height:220px;background:#111;display:flex;align-items:center;justify-content:center;color:#444;font-size:11px;letter-spacing:2px;\\'>[ 画像データ 破損 ]</div>'">

  <div style="font-family:var(--mono);font-size:9px;color:var(--t3);letter-spacing:.06em;padding:4px 0 0;">── 復元画像（声の描写より）</div>

  <div class="bpage-body">
    <p>
      写っている女のことを、書いておく。
    </p>
    <p>
      撮られたのは、事故から十日ばかりあとだ。
      宿に行商の写真師が来て、主人が「働きはじめの記念に」と言って、女を座らせた。
      名字を訊かれて、女は、すぐには答えられなかった。
    </p>
    <p>
      壁の新聞は、主人が貼ったものだ。
      脱線。けが人二十名。
      町じゅうがその話をしていた、八月だった。
    </p>
    <p>
      この一枚は、この女がこの土地に存在したことを示す、最初の記録になった。
      そして長いあいだ、唯一の記録だった。
      戸籍にも、名簿にも、この顔に該当するものはない。
    </p>

    <hr style="border:none;border-top:1px solid #2a2a2a;margin:1.4em 0;">

    <p style="font-size:11px;color:#888;letter-spacing:1px;">── 裏面のメモ（鉛筆書き、自筆）</p>

    <p class="anom" style="font-family:var(--mono);font-size:13px;line-height:2;padding:12px;background:#1a0000;border-radius:6px;">
      この人はここにいた<br>
      八月十六日の夜<br>
      現場にいた<br>
      でも記録にはいない
    </p>

    <p>
      裏のメモは、写真の女が自分で書いた。
      三人称で書いた。
      記録というものは、そう書くものだから。
    </p>
    <p>
      なぜ笑っているのかは、書かれていない。
      たぶん写真師が、笑ってください、と言ったのだ。
      それだけのことが、難しい八月だった。
    </p>

    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;line-height:1.9;">
      ── 壁の新聞の発行日が読める。<br>
      　　読み取れた年号を、照合にかける。
    </p>
  </div>
</div>`;
