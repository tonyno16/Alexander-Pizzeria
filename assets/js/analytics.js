(function () {
  'use strict';

  // Google Analytics 4
  // Property ID: 309439443
  // This script initializes GA4 with consent mode v2
  // In production, this should only fire after cookie consent is granted

  function loadGA4() {
    // Google tag (gtag.js)
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // Replace with actual GA4 Measurement ID
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    // Default consent state - denied until user accepts
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });

    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', { // Replace with actual GA4 Measurement ID
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });
  }

  // Facebook Pixel
  // Pixel ID: 256613265809196
  function loadFacebookPixel() {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    fbq('consent', 'revoke');
    fbq('init', '256613265809196');
    fbq('track', 'PageView');
  }

  // Update consent when user accepts cookies
  window.updateAnalyticsConsent = function (granted) {
    if (granted && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });
    }
    if (granted && window.fbq) {
      fbq('consent', 'grant');
    }
  };

  // Track custom events
  window.trackEvent = function (eventName, params) {
    if (window.gtag) {
      window.gtag('event', eventName, params || {});
    }
    if (window.fbq) {
      fbq('trackCustom', eventName, params || {});
    }
  };

  // Initialize (will be consent-gated by Iubenda)
  loadGA4();
  loadFacebookPixel();
})();
