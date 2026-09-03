(function () {
  'use strict';
  const key = 'koe_external_visits';
  const fromKey = 'koe_from_koe';

  function cameFromKoe() {
    try {
      if (new URLSearchParams(location.search).get('from') === 'koe') sessionStorage.setItem(fromKey, '1');
      return sessionStorage.getItem(fromKey) === '1';
    } catch (_) { return false; }
  }

  function receipt(visits) {
    const receiver = document.querySelector('meta[name="koe-receiver"]')?.content;
    if (!receiver) return '';
    const target = new URL(receiver, location.href);
    const params = new URLSearchParams([['kr', 'v1']]);
    visits.forEach(id => params.append('visit', id));
    target.hash = params.toString();
    return target.href;
  }

  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    const seen = Array.isArray(value) ? value : [];
    if (!seen.includes('blue-land')) seen.push('blue-land');
    localStorage.setItem(key, JSON.stringify(seen));
  } catch (_) {}

  if (cameFromKoe()) {
    const link = document.createElement('a');
    link.className = 'koe-return';
    link.href = receipt(['blue-land']);
    link.textContent = '回収端末へ照合結果を返す';
    document.querySelector('main')?.append(link);
  }
})();
