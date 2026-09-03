// map_001.js — 資料6「芙島市書込地図 1949–1973」
// 旧map_002の桃見山年次記録を統合。現在の蒼沼情報は外部サイトへ分離する。

(function () {
  const IMG_BOUNDS = [[37.67, 140.38], [37.83, 140.60]];
  const CENTER = [37.7470, 140.5350];

  function ensureLeaflet(cb) {
    if (window._leafletReady && window.L) { cb(); return; }
    if (!document.getElementById('_leaflet_css')) {
      const link = document.createElement('link');
      link.id = '_leaflet_css';
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
      link.integrity = 'sha512-h9FcoyWjHcOcmEVkxOfTLnmZFWIH0iZhZT1H2TbOq55xssQGEJHEaIm+PgoUaZbRvQTNTluNOEfb1ZRy6D3BOw==';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
    const existing = document.getElementById('_leaflet_js');
    if (existing) {
      if (window.L) { window._leafletReady = true; cb(); }
      else existing.addEventListener('load', () => { window._leafletReady = true; cb(); }, { once:true });
      return;
    }
    const script = document.createElement('script');
    script.id = '_leaflet_js';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.integrity = 'sha512-puJW3E/qXDqYp9IfhAI54BJEaWIfloJ7JWs7OeD5i6ruC9JZL1gERT1wjtwXFlh7CjE7ZJ+/vcRZRkIYIb6p4g==';
    script.crossOrigin = 'anonymous';
    script.onload = () => { window._leafletReady = true; cb(); };
    document.head.appendChild(script);
  }

  function markerIcon(color, pulse) {
    return L.divIcon({
      className: '',
      html: `<div style="width:11px;height:11px;border-radius:50%;background:${color};border:2px solid #1a1a1f;box-shadow:0 0 8px ${color};${pulse ? 'animation:map-pulse 1.4s ease infinite;' : ''}"></div>`,
      iconSize: [11, 11],
      iconAnchor: [5, 5],
      popupAnchor: [0, -8],
    });
  }

  function initMap() {
    const el = document.getElementById('leaflet-map-001');
    if (!el || el._leafletInitialized) return;
    el._leafletInitialized = true;

    const map = L.map(el, {
      center: CENTER,
      zoom: 11,
      minZoom: 11,
      maxZoom: 13,
      zoomControl: true,
      attributionControl: false,
      maxBounds: IMG_BOUNDS,
      maxBoundsViscosity: 1.0,
    });

    L.imageOverlay('images/map_fushima.jpg', IMG_BOUNDS, { opacity:0.92 }).addTo(map);

    const momomi = L.popup({ className:'koe-popup', maxWidth:240 }).setContent(`
      <div style="font-family:'IBM Plex Mono',monospace;font-size:10px;line-height:1.9;color:#e2e0da;background:#1a1a1f;padding:4px 2px;">
        <strong style="color:#c8a96e;">桃見山　三月の書入れ</strong><br>
        1950　花の時期に来た<br>
        1957　判決はまだ出ない<br>
        1963　無罪。月湯へ戻る<br>
        1973　「今年は北の沼へ」
      </div>`);
    L.marker([37.7224, 140.5365], { icon:markerIcon('#c8a96e', false) }).addTo(map).bindPopup(momomi);

    const aonuma = L.popup({ className:'koe-popup', maxWidth:250 }).setContent(`
      <div style="font-family:'IBM Plex Mono',monospace;font-size:10px;line-height:1.9;color:#e2e0da;background:#1a1a1f;padding:4px 2px;">
        <strong style="color:#c85858;">1973年　追記</strong><br>
        蒼沼南岸。人の集まる場所。<br>
        開園資料：<a href="blue-land/?from=koe#bl-73" target="_blank" rel="noopener" style="color:#c8a96e;">保存室を開く ↗</a>
      </div>`);
    L.marker([37.7745, 140.5430], { icon:markerIcon('#c85858', true) }).addTo(map).bindPopup(aonuma);

    L.polyline([[37.7224, 140.5365], [37.7745, 140.5430]], {
      color:'#77736a', weight:1, opacity:0.45, dashArray:'4 6',
    }).addTo(map);

    setTimeout(() => map.invalidateSize(), 100);
  }

  PAGE_CONTENT['map_001'] = () => {
    setTimeout(() => ensureLeaflet(initMap), 0);

    return `<div class="bpage">
  <div class="bpage-num">地図　01</div>
  <div class="bpage-title">芙島市書込地図　1949–1973</div>
  <div class="bpage-meta">原図：芙島市街図　／　書入れ：蛸川小蘭　／　筆記具二種</div>

  <style>
    #leaflet-map-001 { width:100%;height:330px;border-radius:8px;margin:0 0 4px; }
    .koe-popup .leaflet-popup-content-wrapper { background:#1a1a1f !important;border:1px solid rgba(255,255,255,0.09) !important;border-radius:8px !important;box-shadow:0 4px 16px rgba(0,0,0,.7) !important;padding:0 !important; }
    .koe-popup .leaflet-popup-content { margin:10px 12px !important; }
    .koe-popup .leaflet-popup-tip { background:#1a1a1f !important; }
    .koe-popup .leaflet-popup-close-button { color:#777 !important; }
    @keyframes map-pulse { 0%,100%{box-shadow:0 0 5px #c85858;} 50%{box-shadow:0 0 14px #c85858;} }
  </style>

  <div class="bpage-body">
    <p>
      同じ地図に、三月の日付が二十三年分書き込まれている。
      ほとんどは桃見山の周辺に集まり、最後の一つだけ北へ離れている。
    </p>
  </div>

  <div id="leaflet-map-001"></div>

  <div style="font-family:var(--mono);font-size:10px;color:var(--t3);line-height:1.9;margin:10px 0 18px;">
    金色：桃見山の年次記録　／　赤色：1973年の追記<br>
    印を開くと、書入れの転記を確認できます。
  </div>

  <div class="bpage-body">
    <p>
      <a href="blue-land/?from=koe#bl-73" target="_blank" rel="noopener"
         style="color:var(--gold);text-decoration:underline;text-underline-offset:3px;">
        蒼沼ブルーランド思い出保存会を開く ↗
      </a>
    </p>
    <p style="font-size:11px;color:var(--t3);font-family:var(--mono);">
      出典照合：未取得　／　リンクは別タブで開きます。
    </p>
  </div>
</div>`;
  };
})();
