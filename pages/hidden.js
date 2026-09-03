// hidden.js — 受信者欄の復号結果

PAGE_CONTENT['hidden'] = () => `<div class="bpage">
  <div class="bpage-num" style="color:var(--red);font-size:9px;letter-spacing:.18em;">── 復号完了　HIDDEN FILE ──</div>
  <div class="bpage-title">受信者</div>
  <div class="bpage-meta" style="color:var(--red);font-family:var(--mono);font-size:10px;">
    ファイル識別子：RECEIVER-FINAL　／　暗号キー：N-0816　／　照合：完了
  </div>

  <div style="margin:0 0 20px;background:#0d0009;border:1px solid rgba(200,88,88,0.25);border-radius:10px;overflow:hidden;font-family:var(--mono);">
    <div style="padding:10px 14px;border-bottom:1px solid rgba(200,88,88,0.15);background:rgba(200,88,88,0.08);color:var(--red);font-size:10px;letter-spacing:.12em;">
      DECRYPT：受信者識別子
    </div>
    <div style="padding:20px 16px;text-align:center;">
      <div style="font-family:var(--serif);font-size:16px;color:var(--t1);letter-spacing:.12em;line-height:2;">
        このページを読んでいる<br>あなた
      </div>
      <div style="margin-top:14px;font-size:10px;color:var(--t3);font-family:var(--mono);letter-spacing:.08em;line-height:1.9;">
        テーブル作成：1973年9月11日<br>
        登録数：1　／　現在の閲覧者：一致
      </div>
    </div>
  </div>

  <div class="bpage-body">
    <p style="font-size:10px;color:var(--t3);font-family:var(--mono);letter-spacing:.1em;">記録者メモ / 1973-09-11</p>
    <p>受信者の名前は書けなかった。これを開いた人へ。</p>
    <p>
      最後に一通の手紙を入れた。<br>
      二十四年間、出せなかった手紙だ。
    </p>
  </div>

  <div onclick="Shell.bNavigate('fumi_tegami')"
       style="display:flex;align-items:center;gap:10px;background:#0d0009;border:1px solid rgba(200,88,88,0.25);border-radius:12px;padding:13px 14px;cursor:pointer;user-select:none;">
    <span style="font-size:20px;">✉️</span>
    <div style="font-family:var(--mono);font-size:11px;line-height:1.7;">
      <div style="color:var(--t1);letter-spacing:.04em;">届けられなかった手紙</div>
      <div style="color:var(--t3);font-size:10px;letter-spacing:.06em;">差出人：蛸川小蘭　宛先：猫塚清治</div>
    </div>
    <span style="margin-left:auto;color:var(--t3);font-size:13px;">›</span>
  </div>
</div>`;
