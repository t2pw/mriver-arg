// photo_001.js — 資料3「昭和二十四年八月の写真」
// 被写体は断定しない。清治の写真は存在しない。

PAGE_CONTENT['photo_001'] = () => `<div class="bpage">
  <div class="bpage-num">写真　01</div>
  <div class="bpage-title">昭和二十四年八月の写真</div>
  <div class="bpage-meta">撮影者：行商の写真師　／　撮影日：壁面の新聞から推定　／　裏面に書入れ</div>

  <img src="images/photo_koaru.jpg"
       style="width:100%;height:250px;object-fit:cover;object-position:center top;display:block;"
       alt="宿の室内で撮られた女性の写真"
       onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
  <div style="height:250px;background:#111;display:none;align-items:center;justify-content:center;color:#444;font-size:11px;letter-spacing:2px;">[ 画像データ 破損 ]</div>

  <div style="font-family:var(--mono);font-size:9px;color:var(--t3);letter-spacing:.06em;padding:5px 0 0;">復元画像（音声記述より）</div>

  <div class="bpage-body">
    <p>
      宿の座敷で、一人の女性が正面を向いている。
      壁には脱線事故を報じる新聞が貼られている。日付は昭和二十四年八月十八日。
    </p>

    <p>
      女性の名前は書かれていない。
      髪は結われていない。正面を向き、歯を見せて笑っている。
    </p>
  </div>

  <div style="margin:0 0 18px;background:#130b0d;border:1px solid rgba(200,88,88,0.2);border-radius:8px;padding:13px 14px;font-family:var(--mono);font-size:12px;line-height:2;color:var(--t1);">
    <div style="font-size:9px;color:var(--t3);letter-spacing:.12em;margin-bottom:6px;">裏面　鉛筆書き</div>
    この人はここにいた<br>
    八月十六日の夜<br>
    現場にいた<br>
    でも記録にはいない
  </div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);line-height:1.9;">
      関連資料：壁面の新聞と事件当時の縮刷は、外部目録に登録されています。
    </p>
    <p>
      <a href="fushima-archive/?q=M川事件&from=koe" target="_blank" rel="noopener"
         style="color:var(--gold);text-decoration:underline;text-underline-offset:3px;">
        芙島市立図書館 郷土資料室のデジタル目録を開く ↗
      </a>
    </p>
  </div>
</div>`;
