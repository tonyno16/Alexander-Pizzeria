(function () {
  'use strict';

  // Single Iubenda Cookie Solution loader for all pages.
  // Site ID: 1444752 · Policy ID: 32284578
  if (window.__iubendaCookieConsentLoaded) {
    return;
  }
  window.__iubendaCookieConsentLoaded = true;

  var pixelStarted = false;
  var marketingGranted = false;
  var pixelId = '1242459011329386';
  // Preview and local environments must never feed the production audience.
  var productionHost = /^(www\.)?alexanderpizzeria\.com$/i.test(window.location.hostname);
  function updateMarketingConsent(granted) {
    marketingGranted = productionHost && granted === true;
    if (!marketingGranted) {
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
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    }
  }

  // Measure intent only: opening Lasagna is not a completed reservation.
  document.addEventListener('click', function (event) {
    if (!marketingGranted || !pixelStarted || !window.fbq) return;
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var target;
    try { target = new URL(link.href, window.location.href); } catch (_) { return; }
    var internalTakeaway = /^(www\.)?alexanderpizzeria\.com$/i.test(target.hostname) && target.pathname.match(/^\/asporto\/(rivoli|pinerolo|piossasco|giaveno)\/$/);
    var eventName;
    if (target.hostname === 'app.lasagna.marketing' && target.pathname === '/v2/prenotazione/') {
      eventName = 'click_booking';
    } else if (target.protocol === 'tel:') {
      eventName = 'click_call';
    } else if (internalTakeaway) {
      eventName = 'click_takeaway';
    } else if (target.hostname === 'app.lasagna.marketing' &&
               target.pathname === '/v2/menu_digitale/' && target.searchParams.get('mode') === 'order') {
      eventName = 'click_takeaway';
    }
    if (!eventName) return;
    // Only a fixed venue label is sent; never the telephone number, booking key or query string.
    var venues = {
      '6a47c771839738c24e04af28': 'rivoli',
      '6a7c78bc240c3dafdf0290ec': 'piossasco',
      '6a7c747fe711423f710a9aef': 'pinerolo',
      '6a7c78a3a9ff50bdd7076e1b': 'giaveno',
      '6a68c1a2820c27aa1b070ad0': 'rivoli',
      '6ab4fe576587a85c4901e0c5': 'pinerolo',
      '6ab4ff967fb98b0f480b56d3': 'piossasco',
      '6aaa9e5e7f0aa186140ce5c2': 'giaveno'
    };
    var pageVenue = window.location.pathname.match(/^\/(?:(?:menu|asporto)\/)?(rivoli|pinerolo|piossasco|giaveno)(?:\/|\.html$)/);
    var venue = venues[target.searchParams.get('key')] || (internalTakeaway ? internalTakeaway[1] : pageVenue ? pageVenue[1] : 'non_specificata');
    window.fbq('trackSingleCustom', pixelId, eventName, { location: venue });
  });

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
