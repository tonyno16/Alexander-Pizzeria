(function () {
  'use strict';

  // Single Iubenda Cookie Solution loader for all pages.
  // Site ID: 1444752 · Policy ID: 32284578
  if (window.__iubendaCookieConsentLoaded) {
    return;
  }
  window.__iubendaCookieConsentLoaded = true;

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
      onConsentGiven: function () {
        if (typeof window.updateAnalyticsConsent === 'function') {
          window.updateAnalyticsConsent(true);
        }
      }
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
