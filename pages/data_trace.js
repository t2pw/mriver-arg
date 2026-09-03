// data_trace.js — 資料12「記録躯体／送信痕跡」
// 旧loopの時系列とmomoの外部接続履歴を吸収し、機械ログを中心に再構成する。

PAGE_CONTENT['data_trace'] = () => {
  const today = new Date().toLocaleDateString('ja-JP');

  const traceRow = (date, status, text, alert) => `
    <div style="display:grid;grid-template-columns:82px 72px 1fr;gap:8px;padding:9px 2px;border-bottom:1px solid rgba(255,255,255,0.05);font-family:var(--mono);font-size:10px;line-height:1.8;">
      <span style="color:${alert ? 'var(--red)' : 'var(--t3)'};">${date}</span>
      <span style="color:${alert ? 'var(--red)' : 'var(--blue)'};">${status}</span>
      <span style="color:var(--t2);">${text}</span>
    </div>`;

  return `<div class="bpage">
  <div class="bpage-num">TRACE　12</div>
  <div class="bpage-title">記録躯体／送信痕跡</div>
  <div class="bpage-meta">照合ファイル：47　／　記録セクタ：30　／　外部参照先：3サイト</div>

  <div style="margin:0 0 12px;background:#09090c;border:1px solid rgba(255,255,255,0.08);border-radius:9px;overflow:hidden;">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);font-family:var(--mono);color:var(--t3);font-size:10px;letter-spacing:.12em;">HARDWARE PROFILE</div>
    <div style="padding:12px 14px;display:grid;grid-template-columns:98px 1fr;gap:6px 12px;font-family:var(--mono);font-size:10px;line-height:1.9;">
      <span style="color:var(--t3);">外装</span><span>布製／八肢</span>
      <span style="color:var(--t3);">入力</span><span>接触時間・接触間隔</span>
      <span style="color:var(--t3);">併録</span><span>音声</span>
      <span style="color:var(--t3);">画像</span><span>音声記述から再構成</span>
      <span style="color:var(--t3);">格納</span><span>八肢分散／多重化</span>
    </div>
  </div>

  <div style="margin:0 0 12px;background:#09090c;border:1px solid rgba(255,255,255,0.08);border-radius:9px;overflow:hidden;">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);font-family:var(--mono);color:var(--t3);font-size:10px;letter-spacing:.12em;">EVENT TRACE</div>
    <div style="padding:6px 14px 10px;">
      ${traceRow('1949-08-16','BOOT','位置情報：M川駅付近。記録者入力を開始。')}
      ${traceRow('1950-08-26','KEY SET','4桁の接触列を登録。')}
      ${traceRow('1954','DUPLICATE','文書画像・音声転記を複数肢へ保存。')}
      ${traceRow('1963-09-12','FIX','裁判記録の最終行を固定。')}
      ${traceRow('1973-09-11','MERGE','全記録の索引を更新。30セクタへ再配置。')}
      ${traceRow('1973-09-12','BURY','蒼沼南岸／管理棟床下。以後、記録者入力なし。', true)}
    </div>
  </div>

  <div class="bpage-body">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.08em;">併録音声　1973-09-11 23:48</p>
    <p>
      「売店に同じ形のタコがいくつもある。混ぜてしまえば、見つからないと思う」
    </p>
  </div>

  <div style="margin:0 0 12px;background:#09090c;border:1px solid rgba(255,255,255,0.08);border-radius:9px;overflow:hidden;">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);font-family:var(--mono);color:var(--t3);font-size:10px;letter-spacing:.12em;">EXTERNAL CONNECTION</div>
    <div style="padding:6px 14px 10px;">
      ${traceRow('1973–1997','RETRY','接続試行。応答なし。')}
      ${traceRow('1998','LINK','外部文書の索引取得に成功。')}
      ${traceRow('2019','SYNC','M川駅・桃見山の公開情報を取得。')}
      ${traceRow(today,'ACTIVE','閲覧セッションを検出。受信者欄は未復号。', true)}
    </div>
  </div>

  <div style="margin:0 0 18px;background:#0d0d10;border:1px solid rgba(200,169,110,0.2);border-radius:9px;overflow:hidden;font-family:var(--mono);">
    <div style="padding:9px 14px;border-bottom:1px solid rgba(255,255,255,0.06);color:var(--gold);font-size:10px;letter-spacing:.12em;">EXTERNAL MATCH</div>
    <div style="padding:12px 14px;display:grid;grid-template-columns:96px 1fr;gap:6px 12px;font-size:10px;line-height:1.9;">
      <span style="color:var(--t3);">開発者名</span><span>蛸川小蘭</span>
      <span style="color:var(--t3);">公開分野</span><span>符号読取／文字変換</span>
      <span style="color:var(--t3);">サポート</span><span>返信を確認できません</span>
      <span style="color:var(--t3);">躯体記録開始</span><span class="anom">1949年8月16日</span>
    </div>
  </div>

  <div style="margin:0;">
    <div onclick="Shell.bNavigate('receiver_lock')"
         style="display:flex;align-items:center;gap:10px;background:#0d0009;border:1px solid rgba(200,88,88,0.25);border-radius:12px;padding:13px 14px;cursor:pointer;user-select:none;">
      <span style="font-size:20px;">🔒</span>
      <div style="font-family:var(--mono);font-size:11px;line-height:1.7;">
        <div style="color:var(--red);letter-spacing:.04em;">受信者ファイル</div>
        <div style="color:var(--t3);font-size:10px;letter-spacing:.06em;">RECEIVER-LOCK</div>
      </div>
      <span style="margin-left:auto;color:var(--t3);font-size:13px;">›</span>
    </div>
  </div>
</div>`;
};
