(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var tabContainers = document.querySelectorAll('[data-tabs]');

    tabContainers.forEach(function (container) {
      var tabs = container.querySelectorAll('[data-tab]');
      var panels = container.querySelectorAll('[data-panel]');

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var target = tab.dataset.tab;

          // Deactivate all tabs and panels
          tabs.forEach(function (t) {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
          });
          panels.forEach(function (p) {
            p.classList.remove('active');
          });

          // Activate selected tab and panel
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');

          var panel = container.querySelector('[data-panel="' + target + '"]');
          if (panel) {
            panel.classList.add('active');
          }

          // Track tab switch event
          if (typeof window.trackEvent === 'function') {
            window.trackEvent('tab_switch', {
              location: target,
              page: window.location.pathname
            });
          }
        });
      });

      // Check URL hash for pre-selected location
      var hash = window.location.hash.replace('#', '');
      if (hash) {
        var matchingTab = container.querySelector('[data-tab="' + hash + '"]');
        if (matchingTab) {
          matchingTab.click();
        }
      }
    });
  });
})();
