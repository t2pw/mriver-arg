// map_002.js　地図②「桃見山」
// キーワード例: 桃見山、三月、帰れる
// v3: IMG_BOUNDS・マーカー座標を map_fushima.jpg に合わせて調整済み

(function () {

  const IMG_BOUNDS = [[37.67, 140.38], [37.83, 140.60]];
  // 桃見山（右下）を中心に表示
  const CENTER     = [37.7224, 140.5365];
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

  function _init() {
    const el = document.getElementById('leaflet-map-002');
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

    // 桃見山の観察ポイント群（画像上の山の位置に合わせた座標）
    const POINTS = [
      {
        lat: 37.7224, lng: 140.5365,
        label: '桃見山　展望点',
        note: '「毎年三月、ここから山を見た。帰れると思っていた」──手記断片より。',
        anom: false,
      },
      {
        lat: 37.7260, lng: 140.5400,
        label: '観察記録　1952年3月',
        note: '桜の花、満開。人出多し。子ども連れ。自分だけが時間の外にいる気がした。',
        anom: false,
      },
      {
        lat: 37.7190, lng: 140.5330,
        label: '観察記録　1957年3月',
        note: '今年も来た。八年目。M川事件の判決がまだ出ていない。花は関係なく咲く。',
        anom: false,
      },
      {
        lat: 37.7240, lng: 140.5380,
        label: '観察記録　1973年3月',
        note: '最後に来た三月。この年、蒼沼ブルーランドが開いた。私はその雑踏に紛れて、最後の記録を隠した。',
        anom: true,
      },
    ];

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

      const popup = L.popup({ className: 'koe-popup', maxWidth: 230 })
        .setContent(`
          <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;line-height:1.8;
            color:${p.anom ? '#c85858' : '#e2e0da'};background:#1a1a1f;padding:4px 2px;">
            <div style="font-weight:bold;letter-spacing:.08em;margin-bottom:4px;">${p.label}</div>
            <div style="margin-top:4px;font-size:10px;color:${p.anom ? '#c85858' : '#a0a09a'};">${p.note}</div>
          </div>`);

      L.marker([p.lat, p.lng], { icon }).addTo(map).bindPopup(popup);
    });

    // 展望点の視野範囲
    L.circle([37.7224, 140.5365], {
      radius: 300, color: '#c8a96e', fillColor: '#c8a96e',
      fillOpacity: 0.05, weight: 1, dashArray: '4 4', opacity: 0.4,
    }).addTo(map);

    setTimeout(() => map.invalidateSize(), 100);
  }

  PAGE_CONTENT['map_002'] = () => {
    setTimeout(() => ensureLeaflet(_init), 0);

    return `<div class="bpage">
  <div class="bpage-num">記録 No.14</div>
  <div class="bpage-title">桃見山　── 三月の記録</div>
  <div class="bpage-meta">観測記録：1950年〜1973年　／　記録者：蛸川小蘭　／　毎年三月</div>

  <style>
    #leaflet-map-002 { width:100%;height:260px;border-radius:8px;margin:0 0 4px; }
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
    <p>毎年三月、桃見山に行った。行けなかった年はなかった。</p>
    <p>桜の花が咲く頃には帰れると思っていた。なぜそう思うのか、自分でも分からなかった。どこへ帰るつもりなのかも。</p>
    <p>それでも春が来るたびに、山に向かった。</p>
  </div>

  <div id="leaflet-map-002"></div>

  <div style="margin:12px 0 0;">
    <div style="font-family:var(--mono);font-size:10px;color:var(--t3);letter-spacing:.06em;margin-bottom:6px;">
      ── 桃見山　全景　昭和32年春
    </div>
    <img src="images/photo_hmiyama.jpg"
         style="width:100%;border-radius:6px;display:block;"
         onerror="this.style.display='none'">
  </div>

  <div class="bpage-body" style="margin-top:12px;">
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);letter-spacing:.06em;">
      ── 金色のポイント：観察記録あり。タップで内容が開く。<br>
      　　点線の円：展望点からの視野（推定300m）。
    </p>
    <p class="anom">
      1973年3月の記録は、他の年と筆跡が違う。<br>
      書き直した跡がある。消された地名の下に、もう一つの地名が透けて見える──蒼沼ブルーランド。
    </p>
    <p style="font-style:italic;font-size:12px;color:var(--t3);line-height:1.9;">
      「桜の花は毎年咲く。<br>
      　私が帰れなくても、咲く。<br>
      　それだけは確かだと思って、二十四年間、春を待った。」<br>
      <span style="font-size:10px;color:var(--t3);">──手記断片　1973年3月</span>
    </p>
  </div>
</div>`;
  };

})();
