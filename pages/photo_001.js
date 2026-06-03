// photo_001.js　写真①「記録されなかった人物」
// キーワード例: ここにいた、裏面、写真

PAGE_CONTENT['photo_001'] = () => `<div class="bpage">
  <div class="bpage-num">写真　01</div>
  <div class="bpage-title">記録されなかった人物</div>
  <div class="bpage-meta">撮影日時：不明　／　出典：不明　／　裏面にメモあり</div>

  <div class="bpage-body">
    <img src="images/photo_koaru.jpg"
         style="width:100%;height:220px;object-fit:cover;object-position:center top;display:block;"
         onerror="this.parentElement.innerHTML='<div style=\'height:220px;background:#111;display:flex;align-items:center;justify-content:center;color:#444;font-size:11px;letter-spacing:2px;\'>[ 画像データ 破損 ]</div>'">

    <p style="margin-top:1.4em;">
      この写真の人物は特定されていない。
    </p>

    <p>
      M川事件の記録を洗い直した時、この一枚だけが出所不明のまま残った。
      被告でも証人でも支援者でもない。名前が出てくる資料が一切ない。
    </p>

    <p>
      作業服。頭に巻いた布。下を向いた目。後ろに市場らしき建物が並んでいる。
      芙島市内と思われるが、確認できていない。
    </p>

    <p>
      一点だけ、気になることがある。
      撮影のアングルが低い。地面すれすれに近い高さから撮られている。
      まるで草むらに伏せたまま、カメラだけを持ち上げたような構図だ。
    </p>

    <hr style="border:none;border-top:1px solid #2a2a2a;margin:1.4em 0;">

    <p style="font-size:11px;color:#888;letter-spacing:1px;">── 裏面のメモ（鉛筆書き）</p>

    <p class="anom" style="font-family:var(--mono);font-size:13px;line-height:2;padding:12px;background:#1a0000;border-radius:6px;">
      この人はここにいた<br>
      昭和24年8月16日の夜<br>
      現場にいた<br>
      でも記録にはいない
    </p>

    <p style="margin-top:1.4em;">
      筆跡は一人のもの。写された人物のものか、撮影者のものかは分からない。
    </p>

    <p>
      写真の人物が猫塚清治なのかどうかも分からない。
      あるいは、撮影者自身が写り込んだのかもしれない。
    </p>

    <p class="anom">
      アーカイブの目録には、この一枚を撮った人物が「撮影者不詳」と記されている。<br>
      そして同じ「撮影者不詳」の符号が、別の写真にも付されている。<br>
      ──七十年後に、同じ場所で撮られた一枚にも。
    </p>
  </div>
</div>`;
