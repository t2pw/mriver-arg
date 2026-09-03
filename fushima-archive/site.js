(function () {
  'use strict';

  const visitKey = 'koe_external_visits';
  const fromKey = 'koe_from_koe';
  const cameFromKoe = (() => {
    try {
      if (new URLSearchParams(location.search).get('from') === 'koe') sessionStorage.setItem(fromKey, '1');
      return sessionStorage.getItem(fromKey) === '1';
    } catch (_) { return false; }
  })();

  function receipt(visits) {
    const receiver = document.querySelector('meta[name="koe-receiver"]')?.content;
    if (!receiver) return '';
    const target = new URL(receiver, location.href);
    const params = new URLSearchParams([['kr', 'v1']]);
    visits.forEach(id => params.append('visit', id));
    target.hash = params.toString();
    return target.href;
  }
  function markVisit(id) {
    try {
      const value = JSON.parse(localStorage.getItem(visitKey) || '[]');
      const visits = Array.isArray(value) ? value : [];
      if (!visits.includes(id)) visits.push(id);
      localStorage.setItem(visitKey, JSON.stringify(visits));
    } catch (_) {}
  }

  markVisit('fushima-archive');

  const detailVisits = new Map([
    ['memo-record', 'fushima-memo'],
    ['unrecorded-letter', 'fushima-book']
  ]);

  let returnLink = null;
  function updateReturnLink() {
    if (!returnLink) return;
    const visits = ['fushima-archive'];
    detailVisits.forEach((visitId, detailId) => {
      if (document.getElementById(detailId)?.open) visits.push(visitId);
    });
    returnLink.href = receipt(visits);
  }

  detailVisits.forEach((visitId, detailId) => {
    const detail = document.getElementById(detailId);
    detail?.addEventListener('toggle', () => {
      if (detail.open) markVisit(visitId);
      updateReturnLink();
    });
  });

  function openLinkedDetail() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!detailVisits.has(id)) return;
    const detail = document.getElementById(id);
    if (detail) {
      detail.open = true;
      markVisit(detailVisits.get(id));
      updateReturnLink();
    }
  }

  openLinkedDetail();
  window.addEventListener('hashchange', openLinkedDetail);

  if (cameFromKoe) {
    returnLink = document.createElement('a');
    returnLink.className = 'koe-return';
    returnLink.textContent = '回収端末へ照合結果を返す';
    document.querySelector('main')?.append(returnLink);
    updateReturnLink();
  }

  const form = document.getElementById('catalog-search');
  const input = document.getElementById('catalog-query');
  const count = document.getElementById('result-count');
  const empty = document.getElementById('no-results');
  const records = Array.from(document.querySelectorAll('.record'));

  function normalize(value) {
    return value.trim().toLocaleLowerCase('ja-JP').replace(/[\s　]+/g, ' ');
  }

  function filterRecords(query) {
    const terms = normalize(query).split(' ').filter(Boolean);
    let visible = 0;
    records.forEach((record) => {
      const haystack = normalize(record.dataset.search + ' ' + record.textContent);
      const show = terms.every((term) => haystack.includes(term));
      record.hidden = !show;
      if (show) visible += 1;
    });
    count.textContent = `${visible}件`;
    empty.hidden = visible !== 0;
  }

  const initial = new URLSearchParams(location.search).get('q') || '';
  input.value = initial;
  filterRecords(initial);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    filterRecords(input.value);
    const url = new URL(location.href);
    if (input.value.trim()) url.searchParams.set('q', input.value.trim());
    else url.searchParams.delete('q');
    history.replaceState(null, '', url);
  });
})();
