(function () {
  'use strict';

  const visitKey = 'koe_external_visits';
  const noteKey = 'koe_fumi_note';
  const fromKey = 'koe_from_koe';

  const cameFromKoe = (() => {
    try {
      if (new URLSearchParams(location.search).get('from') === 'koe') sessionStorage.setItem(fromKey, '1');
      return sessionStorage.getItem(fromKey) === '1';
    } catch (_) { return false; }
  })();

  function readVisits() {
    try {
      const value = JSON.parse(localStorage.getItem(visitKey) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (_) {
      return [];
    }
  }

  function addToStoredList(key, value) {
    try {
      const current = JSON.parse(localStorage.getItem(key) || '[]');
      const list = Array.isArray(current) ? current : [];
      if (!list.includes(value)) list.push(value);
      localStorage.setItem(key, JSON.stringify(list));
    } catch (_) {}
  }

  function recordReceipt(note) {
    const receiver = document.querySelector('meta[name="koe-receiver"]')?.content;
    if (!receiver) return '';
    const target = new URL(receiver, location.href);
    const params = new URLSearchParams([
      ['kr', 'v1'],
      ['visit', 'm-kawa-wiki'],
      ['ending', 'record'],
      ['note', note],
    ]);
    target.hash = params.toString();
    return target.href;
  }

  function showRecordReturn(link, note) {
    if (!link || !cameFromKoe) return;
    link.href = recordReceipt(note);
    link.hidden = false;
  }

  try {
    const visits = readVisits();
    if (!visits.includes('m-kawa-wiki')) visits.push('m-kawa-wiki');
    localStorage.setItem(visitKey, JSON.stringify(visits));
  } catch (_) {}

  const page = document.body.dataset.page;

  if (page === 'article') {
    let note = '';
    try {
      note = (localStorage.getItem(noteKey) || '').trim();
    } catch (_) {}
    if (note) {
      const section = document.getElementById('record-outside');
      const line = document.getElementById('reader-line');
      const revision = document.getElementById('reader-revision');
      line.textContent = note;
      section.hidden = false;
      if (revision) revision.hidden = false;
    }
    const receiverReturn = document.querySelector('.receiver-return');
    if (receiverReturn) {
      receiverReturn.hidden = true;
      if (note) showRecordReturn(receiverReturn, note);
    }

    const search = document.querySelector('.wiki-search');
    search?.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = search.querySelector('input').value.trim();
      if (!query) return;
      const haystack = document.querySelector('main').innerText;
      if (!haystack.includes(query)) alert('一致する記事内テキストはありません。');
      else window.find?.(query);
    });
  }

  if (page === 'edit') {
    const form = document.getElementById('wiki-edit-form');
    const locked = document.getElementById('edit-locked');
    const textarea = document.getElementById('wiki-user-line');
    const count = document.getElementById('char-count');
    const status = document.getElementById('save-status');

    let editReady = cameFromKoe;
    try {
      const restored = JSON.parse(localStorage.getItem('koe_restored') || '[]');
      editReady = cameFromKoe || (Array.isArray(restored) && restored.includes('choice'));
      textarea.value = localStorage.getItem(noteKey) || '';
    } catch (_) {}
    form.hidden = !editReady;
    locked.hidden = editReady;
    const updateCount = () => { count.textContent = String(textarea.value.length); };
    updateCount();
    textarea.addEventListener('input', updateCount);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const note = textarea.value.trim();
      if (!note) {
        textarea.focus();
        return;
      }
      try {
        localStorage.setItem(noteKey, note);
        localStorage.setItem('koe_ending', 'record');
        addToStoredList('koe_restored', 'epilogue');
        addToStoredList('koe_viewed', 'epilogue');
        if (/おかえり|オカエリ|お帰り/.test(note)) localStorage.setItem('koe_true_end', '1');
        else localStorage.removeItem('koe_true_end');
      } catch (_) {}
      textarea.value = note;
      updateCount();
      form.hidden = true;
      status.hidden = false;
      showRecordReturn(document.getElementById('save-return'), note);
      status.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
})();
