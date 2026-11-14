(function () {
  'use strict';
  if (!document.body.hasAttribute('data-rivoli-groups')) return;
  var bookingBase = 'https://app.lasagna.marketing/v2/prenotazione/?key=6a47c771839738c24e04af28';
  var measurementId = 'G-VP4K6WX6P4';
  var pixelId = '1242459011329386';
  var production = /^(www\.)?alexanderpizzeria\.com$/i.test(location.hostname);
  var consent = { analytics: false, marketing: false };
  var gaStarted = false;
  var gaPageSent = false;
  var scrollSent = { analytics: false, marketing: false };
  var campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  // Only campaign labels from this URL. No contact data, click IDs or local storage.
  function campaignParams() {
    var incoming = new URLSearchParams(location.search);
    var clean = new URLSearchParams();
    campaignKeys.forEach(function (key) {
      var value = incoming.get(key);
      if (value && value.length <= 128 && /^[a-zA-Z0-9 _.-]+$/.test(value) && !/\d{7,}/.test(value)) clean.set(key, value);
    });
    return clean;
  }
  function bookingUrl() {
    var target = new URL(bookingBase);
    campaignParams().forEach(function (value, key) { target.searchParams.set(key, value); });
    return target.href;
  }
  function pageLocation() {
    var page = new URL('https://www.alexanderpizzeria.com/rivoli/');
    campaignParams().forEach(function (value, key) { page.searchParams.set(key, value); });
    return page.href;
  }
  function pageReferrer() {
    try {
      var source = new URL(document.referrer);
      return /^https?:$/.test(source.protocol) ? source.origin + '/' : '';
    } catch (_) { return ''; }
  }
  function updateConsent(next) {
    consent.analytics = production && next && next.analytics === true;
    consent.marketing = production && next && next.marketing === true;
    window['ga-disable-' + measurementId] = !consent.analytics;
    if (consent.analytics && !gaStarted) {
      gaStarted = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      window.gtag('js', new Date());
      window.gtag('config', measurementId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: pageLocation(), page_referrer: pageReferrer() });
      if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
        document.head.appendChild(script);
      }
    }
    if (gaStarted) {
      window.gtag('consent', 'update', { analytics_storage: consent.analytics ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      if (consent.analytics && !gaPageSent) {
        gaPageSent = true;
        gaEvent('page_view');
      }
    }
  }
  function gaEvent(name) {
    if (!consent.analytics || !gaStarted || typeof window.gtag !== 'function') return;
    window.gtag('event', name, { send_to: measurementId, location: 'rivoli', page_location: pageLocation(), page_referrer: pageReferrer(), page_title: 'Alexander Rivoli - Giro pizza in gruppo' });
  }
  function metaEvent(name) {
    if (consent.marketing && typeof window.fbq === 'function') window.fbq('trackSingleCustom', pixelId, name, { location: 'rivoli' });
  }
  window.addEventListener('alexander:consent', function (event) { updateConsent(event.detail); });
  updateConsent(window.alexanderConsent);

  var frame = document.getElementById('lasagna-iframe');
  var mobileCta = document.getElementById('mobile-cta');
  var finalBookingUrl = bookingUrl();
  // Assign once: consent changes and anchor clicks must not reset the form.
  if (frame && !frame.hasAttribute('src')) frame.src = finalBookingUrl;
  document.querySelectorAll('[data-booking-direct]').forEach(function (link) {
    link.href = finalBookingUrl;
    link.addEventListener('click', function () {
      // Meta click_booking is already handled once by production-consent.js.
      gaEvent('click_booking');
    });
  });
  document.querySelectorAll('[data-booking-intro]').forEach(function (link) {
    link.addEventListener('click', function () {
      gaEvent('view_booking_options');
      metaEvent('view_booking_options');
    });
  });
  // No iframe inspection, postMessage conversion or guessed booking success.
  function measureScroll() {
    var distance = document.documentElement.scrollHeight - window.innerHeight;
    if (distance <= 0 || window.scrollY / distance < 0.5) return;
    if (consent.analytics && !scrollSent.analytics) { gaEvent('scroll_50'); scrollSent.analytics = true; }
    if (consent.marketing && !scrollSent.marketing) { metaEvent('scroll_50'); scrollSent.marketing = true; }
  }
  window.addEventListener('scroll', measureScroll, { passive: true });
  if (mobileCta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) { mobileCta.hidden = entries[0].isIntersecting; }, { threshold: 0.05 }).observe(document.getElementById('prenota-ora'));
  }
})();
