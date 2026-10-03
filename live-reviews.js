(() => {
  'use strict';
  const roots = document.querySelectorAll('[data-review-place]');
  if (!roots.length) return;
  const choices = { piossasco: 0, pinerolo: 3, giaveno: 1, rivoli: 0 };
  const validUrl = value => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && (url.hostname === 'google.com' || url.hostname.endsWith('.google.com')) ? url.href : '';
    } catch { return ''; }
  };
  function apply(data) {
    if (!data?.live || !Number.isFinite(Date.parse(data.updatedAt))) return;
    let updated = 0;
    for (const root of roots) {
      const id = root.dataset.reviewPlace;
      const place = data.locations?.[id];
      if (!place || !Number.isFinite(place.rating) || place.rating < 1 || place.rating > 5 ||
          !Number.isInteger(place.count) || place.count < 1) continue;
      root.querySelector('[data-review-rating]').textContent = place.rating.toFixed(1).replace('.', ',');
      root.querySelector('[data-review-count]').textContent = place.count.toLocaleString('it-IT') + ' recensioni';
      updated++;
      const quotes = (Array.isArray(place.quotes) ? place.quotes : []).filter(q =>
        typeof q.text === 'string' && q.text.trim() && typeof q.author === 'string' && q.author.trim() &&
        Number.isInteger(q.rating) && q.rating >= 4 && q.rating <= 5 && validUrl(q.mapsUri));
      const cards = [...document.querySelectorAll('[data-review-card="' + id + '"]')];
      cards.forEach((card, index) => {
        const selected = id === 'pinerolo' ? [0, 2, 3][index] : index;
        const quote = quotes[card.dataset.reviewHome === 'true' ? choices[id] : selected] || quotes[index];
        if (!quote) { card.hidden = true; return; }
        card.hidden = false;
        card.querySelector('blockquote').textContent = '«' + quote.text + '»';
        const stars = card.querySelector('.review-stars');
        stars.textContent = '★'.repeat(quote.rating) + '☆'.repeat(5 - quote.rating);
        stars.setAttribute('aria-label', quote.rating + ' stelle su 5');
        const author = card.querySelector('[data-review-author]');
        author.replaceChildren();
        if (validUrl(quote.authorUri)) {
          const a = document.createElement('a');
          a.href = validUrl(quote.authorUri); a.className = 'review-author'; a.textContent = quote.author;
          author.append(a);
        } else author.textContent = quote.author;
        card.querySelector('.review-permalink').href = validUrl(quote.mapsUri);
      });
    }
    if (!updated) return;
    const date = new Date(data.updatedAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Rome' });
    const label = 'Aggiornamento automatico · Dati Google rilevati il ' + date + '. La fonte si aggiorna ogni 24 ore.';
    document.querySelectorAll('[data-review-status]').forEach(el => { el.textContent = label; });
  }
  async function refresh() {
    try {
      const response = await fetch('/api/reviews/', { signal: AbortSignal.timeout(10000) });
      if (response.ok) apply(await response.json());
    } catch { /* Keep the dated HTML fallback if the API is unavailable. */ }
  }
  refresh();
})();
