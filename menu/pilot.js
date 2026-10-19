(function () {
  'use strict';
  var page = document.documentElement;
  var venue = page.getAttribute('data-menu-pilot');
  var venues = {
    rivoli: { name: 'Rivoli', key: '6a68c1a2820c27aa1b070ad0' },
    pinerolo: { name: 'Pinerolo', key: '6ab4fe576587a85c4901e0c5' },
    piossasco: { name: 'Piossasco', key: '6ab4ff967fb98b0f480b56d3' },
    giaveno: { name: 'Ristorante Valsangone Giaveno', key: '6aaa9e5e7f0aa186140ce5c2' }
  };
  if (!Object.prototype.hasOwnProperty.call(venues, venue)) return;
  var takeaway = page.getAttribute('data-menu-flow') === 'takeaway';
  var canonicalPath = (takeaway ? '/asporto/' : '/menu/') + venue + '/';
  var pageTitle = (takeaway ? 'Asporto ' : 'Menu ') + venues[venue].name + ' | Alexander';
  var flowName = takeaway ? 'takeaway' : 'menu';
  var frame = document.getElementById('lasagna-menu');
  var status = document.getElementById('menu-status');
  var embedLoaded = false;
  var embedLoadMeasured = false;
  var production = /^(www\.)?alexanderpizzeria\.com$/i.test(window.location.hostname);
  var gaId = 'G-VP4K6WX6P4'; // Existing site GA4 property; verify ingestion before release.
  var measurementGranted = false;
  var gaStarted = false;

  function pageLocation() {
    var safe = new URL(canonicalPath, 'https://www.alexanderpizzeria.com');
    var current = new URL(window.location.href);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(function (key) {
      var value = current.searchParams.get(key);
      if (value && /^[a-z0-9_-]{1,80}$/i.test(value)) safe.searchParams.set(key, value);
    });
    return safe.href;
  }

  function updateMeasurement(preference) {
    measurementGranted = production && !!(preference && preference.purposes && preference.purposes[4] === true);
    window['ga-disable-' + gaId] = !measurementGranted;
    if (!measurementGranted) {
      if (gaStarted && window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
      return;
    }
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
    }
    if (!gaStarted) {
      gaStarted = true;
      window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      window.gtag('js', new Date());
      var script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
      document.head.appendChild(script);
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      window.gtag('config', gaId, { send_page_view: false, page_location: pageLocation(), page_title: pageTitle, allow_google_signals: false, allow_ad_personalization_signals: false });
      window.gtag('event', 'page_view', { send_to: gaId, page_location: pageLocation(), page_title: pageTitle, location: venue });
      measure(flowName + '_view');
    } else {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    measureEmbedLoad();
  }

  function measure(name) {
    if (!measurementGranted || !gaStarted || !window.gtag) return;
    window.gtag('event', name, { send_to: gaId, location: venue, page_location: pageLocation() });
  }

  function measureEmbedLoad() {
    if (!embedLoaded || embedLoadMeasured || !measurementGranted || !gaStarted || !window.gtag) return;
    measure(flowName + '_embed_load');
    embedLoadMeasured = true;
  }

  // Preserve the existing Meta consent callback. Never grant consent ourselves.
  var config = window._iub && window._iub.csConfiguration;
  if (config) {
    var callbacks = config.callback || (config.callback = {});
    ['onPreferenceExpressedOrNotNeeded', 'onConsentRejected'].forEach(function (name) {
      var original = callbacks[name];
      callbacks[name] = function (preference) {
        try { if (typeof original === 'function') original.apply(this, arguments); }
        finally { updateMeasurement(name === 'onConsentRejected' ? null : preference); }
      };
    });
    if (window._iub.cs && window._iub.cs.api && window._iub.cs.api.getPreferences) {
      updateMeasurement(window._iub.cs.api.getPreferences());
    }
  }

  document.addEventListener('click', function (event) {
    var action = event.target.closest && event.target.closest('[data-menu-event]');
    if (action) measure(action.getAttribute('data-menu-event'));
  });

  function loadEmbed() {
    var url;
    try { url = new URL(frame.getAttribute('data-src')); } catch (_) { return; }
    if (url.origin !== 'https://app.lasagna.marketing' || url.pathname !== '/v2/menu_digitale/' || url.searchParams.get('key') !== venues[venue].key) return;
    if (takeaway ? url.searchParams.get('mode') !== 'order' : url.searchParams.has('mode')) return;
    frame.hidden = false;
    status.textContent = takeaway ? 'Caricamento del servizio asporto…' : 'Caricamento del menu…';
    frame.addEventListener('load', function () {
      embedLoaded = true;
      status.textContent = takeaway ? 'Se il servizio non compare o il pagamento non si apre, continua in una nuova scheda dal collegamento qui sopra.' : 'Se il menu non compare, aprilo in una nuova scheda dal collegamento qui sopra.';
      measureEmbedLoad();
    }, { once: true });
    frame.src = url.href;
  }

  loadEmbed();
})();
