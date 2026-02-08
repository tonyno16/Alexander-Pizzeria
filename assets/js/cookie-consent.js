(function () {
  'use strict';

  // Iubenda Cookie Solution Configuration
  // Site ID: 1444752
  // Policy ID: 32284578

  var _iub = _iub || [];

  _iub.csConfiguration = {
    askConsentAtCookiePolicyUpdate: true,
    enableFadp: true,
    enableLgpd: true,
    enableTcf: true,
    enableUspr: true,
    fadpApplies: true,
    floatingPreferencesButtonDisplay: 'bottom-left',
    googleAdditionalConsentMode: true,
    lang: 'it',
    perPurposeConsent: true,
    preferenceCookie: { expireAfter: 180 },
    siteId: 1444752,
    tcfPurposes: {
      2: 'consent_only',
      3: 'consent_only',
      4: 'consent_only',
      5: 'consent_only',
      6: 'consent_only',
      7: 'consent_only',
      8: 'consent_only',
      9: 'consent_only',
      10: 'consent_only',
      11: 'consent_only'
    },
    cookiePolicyId: 32284578,
    banner: {
      acceptButtonCaptionColor: '#1A1A1A',
      acceptButtonColor: '#C9A227',
      acceptButtonDisplay: true,
      backgroundColor: '#1A1A1A',
      closeButtonDisplay: false,
      customizeButtonCaptionColor: '#C9A227',
      customizeButtonColor: 'transparent',
      customizeButtonDisplay: true,
      explicitWithdrawal: true,
      listPurposes: true,
      logo: null,
      position: 'float-bottom-center',
      rejectButtonCaptionColor: '#FFFFFF',
      rejectButtonColor: '#444444',
      rejectButtonDisplay: true,
      showTitle: false,
      showTotalNumberOfProviders: true,
      textColor: '#FFFFFF'
    },
    callback: {
      onConsentGiven: function () {
        if (typeof window.updateAnalyticsConsent === 'function') {
          window.updateAnalyticsConsent(true);
        }
      }
    }
  };

  window._iub = _iub;

  // Load Iubenda scripts
  function loadIubenda() {
    var tcfStub = document.createElement('script');
    tcfStub.src = 'https://cs.iubenda.com/autoblocking/1444752.js';
    document.head.appendChild(tcfStub);

    var csScript = document.createElement('script');
    csScript.src = '//cdn.iubenda.com/cs/tcf/stub-v2.js';
    document.head.appendChild(csScript);

    var mainScript = document.createElement('script');
    mainScript.src = '//cdn.iubenda.com/cs/iubenda_cs.js';
    mainScript.async = true;
    document.head.appendChild(mainScript);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadIubenda);
  } else {
    loadIubenda();
  }
})();
