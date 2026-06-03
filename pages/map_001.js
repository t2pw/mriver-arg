// map_001.js　地図①「芙島市中心部」
// キーワード例: 座標、芙島市、埋め込み
// v3: IMG_BOUNDS・マーカー座標を map_fushima.jpg の実画像に合わせて調整済み

(function () {

  // 画像（1448×1086px）の四隅に対応する緯度経度
  const IMG_BOUNDS = [[37.67, 140.38], [37.83, 140.60]];
  const CENTER     = [37.750, 140.490];
  const ZOOM_INIT  = 12;
  const ZOOM_MIN   = 11;
  const ZOOM_MAX   = 13;

  function ensureLeaflet(cb) {
    if (window._leafletReady) { cb(); return; }
    if (!document.getElementById('_leaflet_css')) {
      const lk = document.createElement('link');
      lk.id = '_leaflet_css'; lk.rel = 'stylesheet';
      lk.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
      document.head.appendChild(lk);
    }
    if (!document.getElementById('_leaflet_js')) {
      const ls = document.createElement('script');
      ls.id = '_leaflet_js';
      ls.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
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

  // 座標は map_fushima.jpg のピクセル位置から逆算
  const POINTS = [
    {
      lat: 37.7578, lng: 140.4453,
      label: '芙島市中心部',
      note: '現在地として記録された座標。理由は不明。',
      anom: false,
    },
    {
      lat: 37.7504, lng: 140.4408,
      label: '偲山',
      note: '手記②に記述あり。十湯温泉への経路上。市街地の南側に位置する。',
      anom: false,
    },
    {
      lat: 37.7285, lng: 140.5112,
      label: '███ ██',
      note: '座標のみ。地名は黒塗り。記録番号：N-0816',
      anom: true,
    },
    {
      lat: 37.7578, lng: 140.4200,
      label: '芙島大学付近',
      note: '「図書館に通い続けた」──手記③より。',
      anom: false,
    },
    {
      lat: 37.7400, lng: 140.5300,
      label: '送信点（推定）',
      note: 'アーカイブのデータ送信元と思われる座標。現在は住宅地。',
      anom: true,
    },
  ];

  PAGE_CONTENT['map_001'] = () => {
    setTimeout(() => {
      ensureLeaflet(() => {
        const el = document.getElementById('leaflet-map-001');
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

        L.imageOverlay('images/map_fushima.jpg', IMG_BOUNDS, {
          opacity: 0.92,
        }).addTo(map);

        POINTS.forEach(p => {
          const color = p.anom ? '#c85858' : '#c8a96e';
          const glow  = p.anom ? 'rgba(200,88,88,.8)' : 'rgba(200,169,110,.5)';
          const icon = L.divIcon({
            className: '',
            html: `<div style="
              width:10px;height:10px;border-radius:50%;
              background:${color};border:2px solid #1a1a1f;
              box-shadow:0 0 7px ${glow};
              ${p.anom ? 'animation:anom-pulse 1.4s ease infinite;' : ''}
            "></div>`,
            iconSize: [10, 10], iconAnchor: [5, 5], popupAnchor: [0, -8],
          });

          const popup = L.popup({ className: 'koe-popup', maxWidth: 220 })
            .setContent(`
              <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;line-height:1.8;
                color:${p.anom ? '#c85858' : '#e2e0da'};background:#1a1a1f;padding:4px 2px;">
                <div style="font-weight:bold;letter-spacing:.08em;margin-bottom:4px;">${p.label}</div>
                <div style="color:#8a8880;font-size:10px;">${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}</div>
                <div style="margin-top:6px;font-size:10px;color:${p.anom ? '#c85858' : '#a0a09a'};">${p.note}</div>
              </div>`);

          L.marker([p.lat, p.lng], { icon }).addTo(map).bindPopup(popup);
        });

        setTimeout(() => map.invalidateSize(), 100);
      });
    }, 0);

    return `<div class="bpage">
  <div class="bpage-num">記録 No.13</div>
  <div class="bpage-title">芙島市　座標データ</div>
  <div class="bpage-meta">データ形式：不明　／　埋め込み日時：1963年以前（推定）　／　復元済み</div>

  <div class="bpage-body">
    <p>アーカイブのデータ層に、五つの座標が埋め込まれていた。</p>
    <p>地名は一部が黒塗りされている。なぜそこが記録されたのかは、各ポイントをタップすると確認できる。</p>
  </div>

  <style>
    #leaflet-map-001 { width:100%;height:280px;border-radius:8px;margin:0 0 4px; }
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

  <div id="leaflet-map-001"></div>

  <div class="bpage-body" style="margin-top:12px;">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── 赤いポイントは座標のみが記録され、地名が黒塗りされている。<br>
      　　タップで詳細が開く。
    </p>
    <p class="anom">
      N-0816 の座標については、対応する記録が別ファイルに存在する可能性がある。
    </p>
  </div>
</div>`;
  };

})();
