/**
 * Aggiorna voto e numero di recensioni Google senza toccare l'HTML.
 * I numeri scritti in pagina restano se /api/reviews non è disponibile.
 */
(function () {
  var ROOTS = "[data-live-review]";

  function parseCount(text) {
    var digits = String(text || "").replace(/\./g, "").replace(/[^\d]/g, "");
    var value = Number(digits);
    return Number.isFinite(value) ? value : NaN;
  }

  function parseRating(text) {
    var match = String(text || "").match(/(\d+)[,.](\d)/);
    return match ? Number(match[1] + "." + match[2]) : NaN;
  }

  function formatCount(value) {
    return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function formatRating(value) {
    return value.toFixed(1).replace(".", ",");
  }

  function markUpdated(el) {
    el.classList.add("is-updated");
    window.setTimeout(function () {
      el.classList.remove("is-updated");
    }, 1600);
  }

  function apply(data) {
    if (!data || !data.locations) return;
    Object.keys(data.locations).forEach(function (id) {
      var place = data.locations[id];
      if (!place || !Number.isFinite(place.count) || !Number.isFinite(place.rating)) return;
      document.querySelectorAll('[data-live-review="' + id + '"]').forEach(function (root) {
        var ratingEl = root.querySelector("[data-field='rating']");
        var countEl = root.querySelector("[data-field='count']");
        if (ratingEl) {
          var previousRating = parseRating(ratingEl.textContent);
          var nextRating = formatRating(place.rating);
          if (previousRating !== place.rating) {
            ratingEl.textContent = nextRating;
            markUpdated(ratingEl);
          }
        }
        if (countEl && parseCount(countEl.textContent) !== place.count) {
          countEl.textContent = formatCount(place.count);
          markUpdated(countEl);
        }
      });
      fillQuotes(id, place.quotes || []);
    });
    if (document.querySelector("[data-live-quote].is-live, [data-live-quotes] .is-live")) {
      document.querySelectorAll("[data-live-filter]").forEach(function (el) {
        el.hidden = false;
      });
    }

    if (!data.updatedAt) return;
    var when = new Date(data.updatedAt);
    if (Number.isNaN(when.getTime())) return;
    var label =
      "Numeri Google aggiornati il " +
      when.toLocaleDateString("it-IT", { day: "numeric", month: "long" });
    document.querySelectorAll("[data-live-status]").forEach(function (el) {
      el.hidden = false;
      el.textContent = label;
    });
  }

  function stars(value) {
    var count = Math.round(value);
    if (count < 1) count = 1;
    if (count > 5) count = 5;
    return "★★★★★".slice(0, count);
  }

  function fillQuotes(id, quotes) {
    if (!quotes.length) return;
    document.querySelectorAll('[data-live-quote="' + id + '"]').forEach(function (quoteEl, index) {
      var quote = quotes[index];
      if (!quote) return;
      var textEl = quoteEl.querySelector(".review-quote__text");
      var authorEl = quoteEl.querySelector(".review-quote__author");
      if (!textEl || !authorEl) return;
      textEl.textContent = "“" + quote.text + "”";
      authorEl.textContent = "";
      authorEl.appendChild(document.createTextNode("— "));
      appendAuthor(authorEl, quote);
      if (quote.when) authorEl.appendChild(document.createTextNode(", " + quote.when));
      if (quote.mapsUri) {
        authorEl.appendChild(document.createTextNode(" · "));
        var more = document.createElement("a");
        more.className = "review-quote__more";
        more.href = quote.mapsUri;
        more.target = "_blank";
        more.rel = "noopener";
        more.textContent = "Leggi su Google";
        authorEl.appendChild(more);
      }
      quoteEl.hidden = false;
      quoteEl.classList.add("is-live");
    });

    document.querySelectorAll('[data-live-quotes="' + id + '"] .review-card').forEach(function (card, index) {
      var quote = quotes[index];
      if (!quote) return;
      var textEl = card.querySelector(".review-card__text");
      var authorEl = card.querySelector(".review-card__author");
      var starsEl = card.querySelector(".review-card__stars");
      var whenEl = card.querySelector(".review-card__when") || card.querySelector(".review-card__meta span:last-child");
      if (textEl) textEl.textContent = "“" + quote.text + "”";
      if (starsEl) {
        starsEl.textContent = stars(quote.rating);
        starsEl.setAttribute("aria-label", Math.round(quote.rating) + " stelle su 5");
      }
      if (authorEl) {
        authorEl.textContent = "";
        appendAuthor(authorEl, quote);
      }
      if (whenEl && quote.when) whenEl.textContent = quote.when;
      card.classList.add("is-live");
    });
  }

  function appendAuthor(parent, quote) {
    if (!quote.authorUri) {
      parent.appendChild(document.createTextNode(quote.author));
      return;
    }
    var link = document.createElement("a");
    link.href = quote.authorUri;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = quote.author;
    parent.appendChild(link);
  }

  function refresh() {
    return fetch("/api/reviews/?v=2")
      .then(function (response) {
        if (!response.ok) return null;
        return response.json();
      })
      .then(function (data) {
        if (!data || !data.live) return false;
        apply(data);
        return true;
      })
      .catch(function () {
        return false;
      });
  }

  function start() {
    if (!document.querySelector(ROOTS)) return;
    refresh();
  }

  window.AlexanderLiveReviews = { apply: apply, refresh: refresh };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
