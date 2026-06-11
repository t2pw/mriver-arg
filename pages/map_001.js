// map_001.js　地図①「芙島市中心部」
// キーワード例: 芙島市、桃見山
// v4: 地図上の欠落した地名をたどる記録として整理

(function () {

  // 画像（1448×1086px）の四隅に対応する緯度経度
  const IMG_BOUNDS = [[37.67, 140.38], [37.83, 140.60]];
  const CENTER     = [37.7285, 140.5112];
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

  // v5（0611レビュー項目2）：黒塗りは「索引データ」側。版面（地図の画）には名前が残っている。
  // 印は答えを言わない。プレイヤーが地図を拡大し、印のそばの版面の文字を読んで検索する。
  const POINTS = [
    {
      lat: 37.7224, lng: 140.5365,
      label: '███ ██',
      note: '索引から地名が失われている。版面には、まだ残っているかもしれない。',
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
                <div style="margin-top:6px;font-size:10px;color:${p.anom ? '#c85858' : '#a0a09a'};">${p.note}</div>
              </div>`);

          L.marker([p.lat, p.lng], { icon }).addTo(map).bindPopup(popup);
        });

        setTimeout(() => map.invalidateSize(), 100);
      });
    }, 0);

    return `<div class="bpage">
  <div class="bpage-num">記録 No.13</div>
  <div class="bpage-title">芙島市　欠落した地名</div>
  <div class="bpage-meta">データ形式：不明　／　埋め込み日時：1973年以前（推定）　／　復元済み</div>

  <div class="bpage-body">
    <p>アーカイブの地図には、索引が付いている。地名と、位置の対応表だ。そのうちひとつだけ、名前が黒塗りされている。</p>
    <p>ただし、地図の画そのものは古い版面の写しだ。索引から消された名前も、版面の上には残っているかもしれない。</p>
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
      ── 赤い印は、索引で名前が黒塗りされた場所を示している。<br>
      　　地図を拡大して、印のそばに残る版面の文字を読む。<br>
      　　読めた名前を、照合にかける。
    </p>
    <p class="anom">
      索引で消されたこの地名にだけ、対応する記録が別ファイルに存在する。<br>
      なぜ、この場所の名前だけが消されたのか。
    </p>
  </div>
</div>`;
  };

})();
