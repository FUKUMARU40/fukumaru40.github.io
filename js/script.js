(() => {
  'use strict';

  // JS有効化フラグ（CSS側のreveal初期非表示を有効に）
  document.documentElement.classList.add('js-on');

  // 年表示
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ヘッダーのスクロール時背景切替
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // モバイルメニュー
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // スクロール連動フェードイン
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = Array.from(document.querySelectorAll('.reveal'));

  const showAll = () => reveals.forEach(el => el.classList.add('is-visible'));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  // 現在ビューポート内にある要素を即座に可視化
  const revealInViewport = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    reveals.forEach(el => {
      if (el.classList.contains('is-visible')) return;
      const r = el.getBoundingClientRect();
      if (r.top < vh - 40 && r.bottom > 0) {
        el.classList.add('is-visible');
      }
    });
  };

  // スクロール時に追加表示
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        revealInViewport();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // 初期表示
  revealInViewport();
  setTimeout(revealInViewport, 50);
  setTimeout(revealInViewport, 300);

  // 最終フォールバック（環境によってはIntersectionObserverもscroll検知も使えない場合がある）
  setTimeout(showAll, 1500);
})();
