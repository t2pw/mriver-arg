// soran_profile.js — v11 で archive_about に統合済み
// このページへの直接ナビゲーションは archive_about にリダイレクト
PAGE_CONTENT['soran_profile'] = () => {
  setTimeout(() => Shell.bNavigate('archive_about'), 0);
  return '';
};
