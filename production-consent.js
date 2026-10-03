(function () {
  'use strict';

  // Single Iubenda Cookie Solution loader for all pages.
  // Site ID: 1444752 · Policy ID: 32284578
  if (window.__iubendaCookieConsentLoaded) {
    return;
  }
  window.__iubendaCookieConsentLoaded = true;

  var pixelStarted = false;
  function updateMarketingConsent(granted) {
    if (!granted) {
      if (window.fbq) window.fbq('consent', 'revoke');
      return;
    }
    if (!window.fbq) {
      var fbq = function () {
        fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
      };
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];
      window.fbq = fbq;
      window._fbq = fbq;
      var pixelScript = document.createElement('script');
      pixelScript.async = true;
      pixelScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(pixelScript);
    }
    window.fbq('consent', 'grant');
    if (!pixelStarted) {
      pixelStarted = true;
      window.fbq('init', '1242459011329386');
      window.fbq('track', 'PageView');
    }
  }

  var _iub = window._iub || [];
  window._iub = _iub;

  _iub.csConfiguration = {
    askConsentAtCookiePolicyUpdate: true,
    emailMarketing: { theme: 'dark' },
    enableTcf: true,
    floatingPreferencesButtonDisplay: 'bottom-right',
    googleAdditionalConsentMode: true,
    lang: 'it',
    perPurposeConsent: true,
    preferenceCookie: { expireAfter: 180 },
    siteId: 1444752,
    storage: { useSiteId: true },
    cookiePolicyId: 32284578,
    whitelabel: false,
    tcfPurposes: {
      2: 'consent_only',
      7: 'consent_only',
      8: 'consent_only',
      9: 'consent_only',
      10: 'consent_only',
      11: 'consent_only'
    },
    banner: {
      acceptButtonDisplay: true,
      closeButtonRejects: true,
      customizeButtonDisplay: true,
      explicitWithdrawal: true,
      listPurposes: true,
      position: 'float-top-center',
      showTitle: false
    },
    callback: {
      onPreferenceExpressedOrNotNeeded: function (preference) {
        updateMarketingConsent(!!(preference && preference.purposes && preference.purposes[5] === true));
      },
      onConsentRejected: function () { updateMarketingConsent(false); }
    }
  };

  _iub.csLangConfiguration = { it: { cookiePolicyId: 32284578 } };

  [
    '//cs.iubenda.com/sync/1444752.js',
    '//cdn.iubenda.com/cs/tcf/stub-v2.js',
    '//cdn.iubenda.com/cs/tcf/safe-tcf-v2.js'
  ].forEach(function (src) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    document.head.appendChild(script);
  });

  var mainScript = document.createElement('script');
  mainScript.type = 'text/javascript';
  mainScript.charset = 'UTF-8';
  mainScript.async = true;
  mainScript.src = '//cdn.iubenda.com/cs/iubenda_cs.js';
  document.head.appendChild(mainScript);
})();
