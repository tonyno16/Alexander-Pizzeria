(() => {
  'use strict';
  const toggle = document.getElementById('nav-toggle');
  const navigation = document.getElementById('navigation');
  function closeNavigation() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Apri menu');
    navigation.classList.remove('open');
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
    navigation.classList.toggle('open', open);
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeNavigation();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      closeNavigation();
      toggle.focus();
    }
  });
  matchMedia('(min-width: 1061px)').addEventListener('change', closeNavigation);

  document.querySelectorAll('.map-load').forEach(button => {
    button.addEventListener('click', () => {
      const frame = document.getElementById(button.getAttribute('aria-controls'));
      if (!frame || !frame.dataset.mapSrc?.startsWith('https://www.google.com/maps/embed?')) return;
      frame.src = frame.dataset.mapSrc;
      frame.hidden = false;
      button.closest('.map-placeholder').hidden = true;
    });
  });
})();
