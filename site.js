(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const panel = document.querySelector('#menu-panel');
  const main = document.querySelector('main');
  function closeMenu(restore = false) {
    if (!panel || !toggle) return;
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Apri menu');
    document.body.classList.remove('menu-open');
    main.inert = false;
    if (restore) toggle.focus();
  }
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    if (!open) return closeMenu(true);
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Chiudi menu');
    document.body.classList.add('menu-open');
    main.inert = true;
    panel.querySelector('a')?.focus();
  });
  panel?.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (panel?.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); }
    if (event.key === 'Tab') {
      const items = [toggle, ...panel.querySelectorAll('a[href],button')];
      const first = items[0], last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let paused = reduced.matches || !!connection?.saveData;
  const videos = [...document.querySelectorAll('video[data-video]')];
  const visible = new Set();
  const controls = [...document.querySelectorAll('.motion-toggle')];
  function syncMotion() {
    controls.forEach(button => {
      button.textContent = paused || reduced.matches ? 'Video in pausa' : 'Metti in pausa i video';
      button.setAttribute('aria-pressed', String(paused || reduced.matches));
      button.setAttribute('aria-label', reduced.matches ? 'Video disattivati: preferenza di movimento ridotto' : paused ? 'Riprendi i video' : 'Metti in pausa i video');
      button.disabled = reduced.matches;
    });
    videos.forEach(video => {
      if (paused || reduced.matches || document.hidden || !visible.has(video)) { video.pause(); return; }
      if (!video.src) video.src = video.dataset.video;
      video.play().then(() => video.classList.add('playing')).catch(() => video.classList.remove('playing'));
    });
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
      syncMotion();
    }, { threshold: 0.12 });
    videos.forEach(video => observer.observe(video));
  }
  videos.forEach(video => video.addEventListener('error', () => video.classList.remove('playing')));
  controls.forEach(button => button.addEventListener('click', () => { paused = !paused; syncMotion(); }));
  reduced.addEventListener('change', () => { paused = reduced.matches; syncMotion(); });
  document.addEventListener('visibilitychange', syncMotion);
  syncMotion();
  document.querySelectorAll('.map-load').forEach(button => {
    button.addEventListener('click', () => {
      const frame = document.getElementById(button.getAttribute('aria-controls'));
      if (!frame || !frame.dataset.mapSrc) return;
      const placeholder = button.closest('.map-placeholder');
      frame.src = frame.dataset.mapSrc;
      frame.hidden = false;
      placeholder.hidden = true;
      frame.setAttribute('tabindex', '0');
      frame.focus();
    });
  });
})();
