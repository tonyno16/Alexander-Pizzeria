/**
 * Analytics: GA4 e Facebook Pixel caricati solo DOPO il consenso cookie.
 * Riduce JS inutilizzato (~250 KiB) finché l'utente non accetta i cookie.
 */
(function () {
  "use strict";

  var GA4_MEASUREMENT_ID = "G-VP4K6WX6P4";
  var FB_PIXEL_ID = "256613265809196";
  var analyticsLoaded = false;

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
    gtag("js", new Date());
    gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });
    gtag("config", GA4_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure",
    });
  }

  function loadFacebookPixel() {
    if (window.fbq) return;
    !(function (f, b, e, v, n, t, s) {
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
    fbq("init", FB_PIXEL_ID);
    fbq("track", "PageView");
  }

  window.updateAnalyticsConsent = function (granted) {
    if (!granted) return;
    if (!analyticsLoaded) {
      analyticsLoaded = true;
      loadGA4();
      loadFacebookPixel();
    }
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }
    if (window.fbq) {
      fbq("consent", "grant");
    }
  };

  window.trackEvent = function (eventName, params) {
    if (window.gtag) window.gtag("event", eventName, params || {});
    if (window.fbq) fbq("trackCustom", eventName, params || {});
  };

  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("[data-event]");
    if (el && window.trackEvent) {
      var params = {};
      if (el.getAttribute("data-location"))
        params.location = el.getAttribute("data-location");
      window.trackEvent(el.getAttribute("data-event"), params);
    }
  });
})();
