(function () {
  'use strict';

  const visitKey = 'koe_external_visits';
  const installedKey = 'koe_installed_apps';
  const fromKey = 'koe_from_koe';
  const appAllowlist = new Set(['hexconv', 'morse']);

  const cameFromKoe = (() => {
    try {
      if (new URLSearchParams(location.search).get('from') === 'koe') sessionStorage.setItem(fromKey, '1');
      return sessionStorage.getItem(fromKey) === '1';
    } catch (_) { return false; }
  })();

  function readArray(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (_) {
      return [];
    }
  }

  function receipt() {
    const receiver = document.querySelector('meta[name="koe-receiver"]')?.content;
    if (!receiver) return '';
    const target = new URL(receiver, location.href);
    const params = new URLSearchParams([['kr', 'v1'], ['visit', 'pray-store']]);
    readArray(installedKey).filter(id => appAllowlist.has(id)).forEach(id => params.append('app', id));
    target.hash = params.toString();
    return target.href;
  }

  try {
    const visits = readArray(visitKey);
    if (!visits.includes('pray-store')) visits.push('pray-store');
    localStorage.setItem(visitKey, JSON.stringify(visits));
  } catch (_) {}

  const buttons = Array.from(document.querySelectorAll('[data-install]'));
  const message = document.getElementById('install-message');
  const legacyReturn = document.querySelector('.return-row');
  let returnLink = null;

  if (legacyReturn) {
    legacyReturn.hidden = !cameFromKoe;
    const legacyLink = legacyReturn.querySelector('a');
    if (legacyLink) legacyLink.hidden = true;
  }
  if (cameFromKoe) {
    returnLink = document.createElement('a');
    returnLink.className = 'koe-return';
    returnLink.textContent = '回収端末へ追加結果を返す';
    (legacyReturn || document.querySelector('main'))?.append(returnLink);
  }

  function refresh() {
    const installed = readArray(installedKey);
    buttons.forEach((button) => {
      const done = installed.includes(button.dataset.install);
      button.disabled = done;
      button.textContent = done ? '追加済み' : '端末に追加';
    });
    if (returnLink) returnLink.href = receipt();
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const installed = readArray(installedKey);
      const id = button.dataset.install;
      if (!installed.includes(id)) installed.push(id);
      try { localStorage.setItem(installedKey, JSON.stringify(installed)); } catch (_) {}
      refresh();
      if (message) {
        const appName = id === 'hexconv' ? '16進変換器' : 'モールス読取機';
        message.hidden = false;
        message.textContent = `${appName}を回収端末に追加しました。ホーム画面から開けます。`;
      }
    });
  });

  refresh();
})();
