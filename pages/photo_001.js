// photo_001.js　写真①「記録されなかった人物」
// B-4: 小蘭が清治を調べて入手した写真として書き直し・第一人称化

PAGE_CONTENT['photo_001'] = () => `<div class="bpage">
  <div class="bpage-num">写真　01</div>
  <div class="bpage-title">記録されなかった人物</div>
  <div class="bpage-meta">入手：昭和三十年頃　／　出典：不明　／　裏面にメモあり</div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── 以下、蛸川小蘭の調査メモ。当該写真に同封されていた。
    </p>
  </div>

  <img src="images/photo_koaru.jpg"
       style="width:100%;height:220px;object-fit:cover;object-position:center top;display:block;"
       onerror="this.parentElement.innerHTML='<div style=\'height:220px;background:#111;display:flex;align-items:center;justify-content:center;color:#444;font-size:11px;letter-spacing:2px;\'>[ 画像データ 破損 ]</div>'">

  <div class="bpage-body">
    <p>
      この一枚を手に入れるまでに、六年かかった。
    </p>
    <p>
      脱線事故から六年。私はずっと彼の消息を追っていた。
      芙島市の図書館、守る会の記録、地域の古い新聞。
      どこにも清治さんの名前は出てこなかった。
    </p>
    <p>
      ある日、宿の近くに住む老婆が話しかけてきた。
      「あんた、M川の方をよく歩いているね」と。
      なんでもない世間話のつもりで「知り合いがいたんです、あのあたりに」と答えた。
      老婆は少し考えてから、「これは要らないものだ」と言って、この写真をくれた。
    </p>
    <p>
      事故の前年に撮られたものだと老婆は言った。
      誰が撮ったのかは分からない、と。
    </p>
    <p>
      作業服。頭に巻いた布。下を向いた目。
      背後に市場らしき建物が並んでいる。
      芙島市内と思われるが、確認できていない。
    </p>
    <p>
      一点だけ、気になることがある。
      撮影のアングルが低い。地面すれすれに近い高さから撮られている。
      まるで草むらに伏せたまま、カメラだけを持ち上げたような構図だ。
      あの夜、私が草むらに伏せていたように。
    </p>

    <hr style="border:none;border-top:1px solid #2a2a2a;margin:1.4em 0;">

    <p style="font-size:11px;color:#888;letter-spacing:1px;">── 裏面のメモ（鉛筆書き、自筆）</p>

    <p class="anom" style="font-family:var(--mono);font-size:13px;line-height:2;padding:12px;background:#1a0000;border-radius:6px;">
      この人はここにいた<br>
      昭和24年8月16日の夜<br>
      現場にいた<br>
      でも記録にはいない
    </p>

    <p>
      この人が清治さんかどうか、私には分からない。
      でも、あの夜の作業着姿と、構図と、撮影者の視点は——
      どれも、あの夜と重なる。
    </p>
  </div>
</div>`;
