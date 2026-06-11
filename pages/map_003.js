// map_003.js　地図③「蒼沼ブルーランドへ」
// キーワード例: 蒼沼、廃墟、最後
// v4: 地図上の印をたどる保管記録

(function () {

  const IMG_BOUNDS = [[37.67, 140.38], [37.83, 140.60]];
  // 蒼沼の南岸（右上）を中心に表示
  // v5（0611レビュー項目4）：遊園地は「沼の南岸を埋め立てて造成」設定に変更し、
  // 印と敷地を水面の中から南岸の陸側へ移動。
  const CENTER     = [37.7755, 140.5440];
  const ZOOM_INIT  = 12;
  const ZOOM_MIN   = 11;
  const ZOOM_MAX   = 13;

  function ensureLeaflet(cb) {
    if (window._leafletReady) { cb(); return; }
    if (!document.getElementById('_leaflet_css')) {
      const lk = document.createElement('link');
      lk.id = '_leaflet_css'; lk.rel = 'stylesheet';
      lk.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
      lk.integrity = 'sha512-h9FcoyWjHcOcmEVkxOfTLnmZFWIH0iZhZT1H2TbOq55xssQGEJHEaIm+PgoUaZbRvQTNTluNOEfb1ZRy6D3BOw=='; lk.crossOrigin = 'anonymous';
      document.head.appendChild(lk);
    }
    if (!document.getElementById('_leaflet_js')) {
      const ls = document.createElement('script');
      ls.id = '_leaflet_js';
      ls.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      ls.integrity = 'sha512-puJW3E/qXDqYp9IfhAI54BJEaWIfloJ7JWs7OeD5i6ruC9JZL1gERT1wjtwXFlh7CjE7ZJ+/vcRZRkIYIb6p4g=='; ls.crossOrigin = 'anonymous';
      ls.onload = () => { window._leafletReady = true; cb(); };
      document.head.appendChild(ls);
    } else if (window.L) {
      window._leafletReady = true; cb();
    } else {
      document.getElementById('_leaflet_js').addEventListener('load', () => {
        window._leafletReady = true; cb();
      });
    }
  }

  function _init() {
    const el = document.getElementById('leaflet-map-003');
    if (!el || el._leafletInitialized) return;
    el._leafletInitialized = true;

    const map = L.map(el, {
      center: CENTER,
      zoom: ZOOM_INIT,
      minZoom: ZOOM_MIN,
      maxZoom: ZOOM_MAX,
      zoomControl: true,
      attributionControl: false,
      maxBounds: IMG_BOUNDS,
      maxBoundsViscosity: 1.0,
    });

    L.imageOverlay('images/map_fushima.jpg', IMG_BOUNDS, { opacity: 0.92 }).addTo(map);

    // 蒼沼周辺の保管記録
    const POINTS = [
      {
        lat: 37.7745, lng: 140.5430,
        label: '蒼沼ブルーランド　正門跡',
        note: '人で賑わう場所を選んだ。ぬいぐるみが一つ埋まっていても、誰も掘り返さない。──小蘭、最後の記録より。',
        anom: false, size: 12, color: '#5a8fd4',
      },
      {
        lat: 37.7765, lng: 140.5395,
        label: '観覧車支柱　根元',
        note: '「観覧車の根元の地面を、二十センチ掘った」──詳細は data_trace に記録。',
        anom: false, size: 10, color: '#5a8fd4',
      },
      {
        lat: 37.7720, lng: 140.5460,
        label: '旧管理棟',
        note: '床板の下。防水ケースに収めたメモリを埋めた。',
        anom: true, size: 10, color: '#c85858',
      },
      {
        lat: 37.7775, lng: 140.5500,
        label: '███',
        note: '対応する記録なし。この印だけが他のファイルと一致する。',
        anom: true, size: 10, color: '#c85858',
      },
    ];

    POINTS.forEach(p => {
      const sz   = p.size || 10;
      const glow = p.anom ? 'rgba(200,88,88,.8)' : 'rgba(90,143,212,.6)';
      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width:${sz}px;height:${sz}px;border-radius:50%;
          background:${p.color};border:2px solid #1a1a1f;
          box-shadow:0 0 8px ${glow};
          ${p.anom ? 'animation:anom-pulse 1.4s ease infinite;' : ''}
        "></div>`,
        iconSize: [sz, sz], iconAnchor: [sz/2, sz/2], popupAnchor: [0, -sz/2-2],
      });

      const popup = L.popup({ className: 'koe-popup', maxWidth: 240 })
        .setContent(`
          <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;line-height:1.8;
            color:${p.anom ? '#c85858' : '#e2e0da'};background:#1a1a1f;padding:4px 2px;">
            <div style="font-weight:bold;letter-spacing:.08em;margin-bottom:4px;">${p.label}</div>
            <div style="margin-top:4px;font-size:10px;color:${p.anom ? '#c85858' : '#a0a09a'};">${p.note}</div>
          </div>`);

      L.marker([p.lat, p.lng], { icon }).addTo(map).bindPopup(popup);
    });

    // 敷地輪郭（沼の南岸の埋立地。北辺だけが沼に接する）
    L.rectangle(
      [[37.7695, 140.5360], [37.7800, 140.5520]],
      { color:'#5a8fd4', fillColor:'#5a8fd4', fillOpacity:0.04,
        weight:1, dashArray:'3 5', opacity:0.35 }
    ).addTo(map);

    setTimeout(() => map.invalidateSize(), 100);
  }

  PAGE_CONTENT['map_003'] = () => {
    setTimeout(() => {
      ensureLeaflet(_init);
      document.querySelectorAll('[data-kwtag]').forEach(el => {
        el.addEventListener('click', () => Shell.setSearchAndFocus(el.getAttribute('data-kwtag')));
      });
    }, 0);

    return `<div class="bpage">
  <div class="bpage-num">記録 No.15</div>
  <div class="bpage-title">蒼沼ブルーランド　── 最後の場所</div>
  <div class="bpage-meta">最終記録日：1973年9月（推定）　／　現在：廃墟　／　立入禁止区域</div>

  <style>
    #leaflet-map-003 { width:100%;height:270px;border-radius:8px;margin:0 0 4px; }
    .koe-popup .leaflet-popup-content-wrapper {
      background:#1a1a1f !important;border:1px solid rgba(255,255,255,0.09) !important;
      border-radius:8px !important;box-shadow:0 4px 16px rgba(0,0,0,.7) !important;padding:0 !important;
    }
    .koe-popup .leaflet-popup-content { margin:10px 12px !important; }
    .koe-popup .leaflet-popup-tip { background:#1a1a1f !important; }
    .koe-popup .leaflet-popup-close-button { color:#666 !important; }
    @keyframes anom-pulse {
      0%,100% { box-shadow:0 0 6px rgba(200,88,88,.7); }
      50%      { box-shadow:0 0 14px rgba(200,88,88,1); }
    }
  </style>

  <div class="bpage-body">
    <p>私が最後にデータを隠した場所。</p>
    <p>人で賑わう場所を選んだ。新しくできた遊園地は、毎日たくさんの人が訪れる。ぬいぐるみが一つ埋まっていても、誰も掘り返したりしない。誰も気に留めない。</p>
    <p>それに、この遊園地のマスコットは、タコだった。沼の遊園地だから、だろう。売店には、私のとよく似たぬいぐるみが、いくつも並んでいた。タコの群れの中に、タコを一匹、返す。これ以上の隠し場所を、私は知らない。</p>
    <p>1973年。蒼沼の南岸を埋め立てて、沼の名前を取った遊園地が開いた年だ。私はその雑踏に紛れて、最後の記録を埋めた。無罪が確定してから、十年が経っていた。</p>
    <p>その後のことは、ここには書いていない。</p>
  </div>

  <div style="margin:0 0 16px;">
    <div style="font-family:var(--mono);font-size:10px;color:var(--t3);letter-spacing:.06em;margin-bottom:6px;">
      ── 蒼沼ブルーランド　昭和50年代（営業当時）
    </div>
    <img src="images/photo_tsanuma_1960.jpg"
         style="width:100%;height:200px;object-fit:cover;border-radius:6px;display:block;"
         onerror="this.style.display='none'">
    <div style="font-family:var(--mono);font-size:9px;color:var(--t3);letter-spacing:.06em;padding:4px 0 0;">── 復元画像（声の描写より）</div>
    <div style="font-family:var(--mono);font-size:10px;color:var(--t3);letter-spacing:.06em;margin:10px 0 6px;">
      ── 同地点　現在
    </div>
    <img src="images/photo_tsanuma_now.jpg"
         style="width:100%;height:200px;object-fit:cover;border-radius:6px;display:block;"
         onerror="this.style.display='none'">
  </div>

  <div id="leaflet-map-003"></div>

  <div class="bpage-body" style="margin-top:12px;">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── 青い印：記録された保管場所。タップで詳細。<br>
      　　点線の矩形：旧遊園地の敷地範囲（推定）。
    </p>
    <p class="anom">
      正門跡から旧管理棟まで、直線距離で約35メートル。<br>
      この区画に紐付いているファイルが、まだ残っている。<br>
      埋めたメモリには鍵がかかっている。その<span data-kwtag="暗号キー" style="color:var(--gold);border-bottom:1px solid rgba(200,169,110,0.4);cursor:pointer;">暗号キー</span>は、電文の中に残した。
    </p>
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;line-height:1.9;">
      ── 鍵のかかったファイルを開くには、「暗号キー」を照合にかける。
    </p>
    <p style="font-style:italic;font-size:12px;color:var(--t3);line-height:1.9;">
      「いつかこれを読む人へ──<br>
      　ここまで来てくれて、ありがとう。」<br>
      <span style="font-size:10px;color:var(--t3);">──小蘭、最後の記録　1973年</span>
    </p>
  </div>
</div>`;
  };

})();
