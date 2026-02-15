/**
 * FASE 1 - Configurazione Analytics
 * ---------------------------------
 * 1. Google Analytics 4: sostituisci "G-XXXXXXXXXX" con il tuo Measurement ID reale.
 *    Dove trovarlo: GA4 > Admin > Dati > Flussi di dati > [tuo flusso web] > ID misurazione (es. G-ABC123XY).
 *    Se lasci il placeholder, GA4 non verrà caricato (nessun errore in console).
 *
 * 2. Facebook Pixel: ID 256613265809196 è già configurato. Verifica in Meta Events Manager
 *    che il pixel sia attivo e che gli eventi PageView arrivino dopo il consenso cookie.
 */
(function () {
  "use strict";

  // Google Analytics 4 - Sostituire con il proprio Measurement ID (es. G-ABC123XY)
  var GA4_MEASUREMENT_ID = "G-VP4K6WX6P4";

  function loadGA4() {
    if (!GA4_MEASUREMENT_ID || GA4_MEASUREMENT_ID.indexOf("XXX") !== -1) return;
    var script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" + GA4_MEASUREMENT_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });

    gtag("js", new Date());
    gtag("config", GA4_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure",
    });
  }

  // Facebook Pixel
  // Pixel ID: 256613265809196
  function loadFacebookPixel() {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    fbq("consent", "revoke");
    fbq("init", "256613265809196");
    fbq("track", "PageView");
  }

  // Update consent when user accepts cookies
  window.updateAnalyticsConsent = function (granted) {
    if (granted && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }
    if (granted && window.fbq) {
      fbq("consent", "grant");
    }
  };

  // Track custom events
  window.trackEvent = function (eventName, params) {
    if (window.gtag) {
      window.gtag("event", eventName, params || {});
    }
    if (window.fbq) {
      fbq("trackCustom", eventName, params || {});
    }
  };

  // Event delegation: track clicks on elements with data-event (e.g. data-event="click_call" data-location="pinerolo")
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("[data-event]");
    if (el && window.trackEvent) {
      var params = {};
      if (el.getAttribute("data-location"))
        params.location = el.getAttribute("data-location");
      window.trackEvent(el.getAttribute("data-event"), params);
    }
  });

  loadGA4();
  loadFacebookPixel();
})();
