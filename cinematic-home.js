(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const navigation = $('#navigation');
  const toggle = $('#nav-toggle');
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

  const rail = $('#pizza-rail');
  function movePizzas(direction) {
    const card = rail.querySelector('article');
    const distance = card.getBoundingClientRect().width + 24;
    rail.scrollBy({left: direction * distance, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }
  $('#pizza-prev').addEventListener('click', () => movePizzas(-1));
  $('#pizza-next').addEventListener('click', () => movePizzas(1));
  function updateCarousel() {
    $('#pizza-prev').disabled = rail.scrollLeft < 4;
    $('#pizza-next').disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
  }
  rail.addEventListener('scroll', updateCarousel, {passive: true});
  new ResizeObserver(updateCarousel).observe(rail);
  updateCarousel();

  const booking = $('#booking-dialog');
  const bookingTitle = $('#booking-dialog-title');
  const bookingNote = $('#booking-dialog-note');
  const bookingLinks = [...booking.querySelectorAll('[data-destination]')];
  function openBooking(menu = false) {
    bookingTitle.textContent = menu ? 'Il menu del tuo Alexander.' : 'Dove ci vediamo stasera?';
    bookingNote.textContent = menu ? 'Scegli la sede per consultare il suo menu.' : 'Scegli la sede. Data, orario e persone si selezionano nel calendario del locale.';
    bookingLinks.forEach(link => {
      link.href = menu ? link.dataset.menu : link.dataset.booking;
      link.querySelector('small').textContent = menu ? 'Guarda il menu' : 'Scegli data e orario';
    });
    booking.showModal();
  }
  document.querySelectorAll('[data-open-booking]').forEach(button => button.addEventListener('click', () => openBooking(false)));
  document.querySelectorAll('[data-open-menu]').forEach(button => button.addEventListener('click', () => openBooking(true)));
  document.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }));

  const videoDialog = $('#video-dialog');
  const video = videoDialog.querySelector('video');
  $('#watch-film').addEventListener('click', () => {
    videoDialog.showModal();
    if (!video.getAttribute('src')) { video.src = video.dataset.src; video.load(); }
    video.play().catch(() => {});
  });
  videoDialog.addEventListener('close', () => video.pause());

  const ingredients = {
    pomodoro: ['Il pomodoro', 'La base rossa di Aura, la nostra Margherita.'],
    bufala: ['Bufala campana DOP', 'Il latte, la morbidezza e il contrasto con il pomodoro.'],
    basilico: ['Crema al basilico', 'La nota verde che completa Aura.']
  };
  document.querySelectorAll('[data-ingredient]').forEach(button => button.addEventListener('click', () => {
    const [title, text] = ingredients[button.dataset.ingredient];
    document.querySelectorAll('[data-ingredient]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    $('#ingredient-title').textContent = title;
    $('#ingredient-text').textContent = text;
  }));
})();
