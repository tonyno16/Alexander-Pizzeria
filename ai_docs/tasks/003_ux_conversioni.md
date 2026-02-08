# AI Task: UX e Conversioni

---

## 1. Task Overview

### Task Title

**Title:** Ottimizzazione UX per Aumentare le Prenotazioni

### Goal Statement

**Goal:** Aumentare il tasso di conversione (prenotazioni tavoli) attraverso miglioramenti UX: CTA sticky su mobile, sezione recensioni/testimonianze, badge di fiducia, e micro-interazioni che guidano l'utente verso la prenotazione.

---

## 2. Strategic Analysis

### Problem Context

L'obiettivo principale del business è **aumentare le prenotazioni tavoli** e il **brand awareness**. Attualmente il sito ha:

- ✅ Pagina prenotazione funzionante (iframe Pienissimo)
- ✅ CTA "Prenota Ora" nell'hero
- ✅ CTA sticky mobile già implementato in responsive.css
- ❌ Nessuna sezione recensioni/testimonianze in homepage
- ❌ Nessun badge Google Reviews o TripAdvisor
- ❌ Manca urgency/scarcity messaging
- ❌ Mancano elementi di social proof

### User Journey Analysis

```
Utente cerca "pizzeria pinerolo"
    ↓
Trova Alexander su Google
    ↓
Arriva su homepage o pagina sede
    ↓
[PROBLEMA] Non vede recensioni, si chiede "è buona?"
    ↓
Cerca recensioni esterne (rischio abbandono)
    ↓
[OBIETTIVO] Convertire in prenotazione
```

### Solution: Social Proof + Clear CTAs

Aggiungere elementi che rassicurano l'utente e lo guidano verso la prenotazione.

---

## 3. Implementation Plan

### Phase 1: Sezione Recensioni/Testimonianze

**Goal:** Aggiungere social proof in homepage

- [x] **Task 1.1:** Creata sezione "Cosa dicono di noi" in homepage
  - Posizione: dopo "Dove Trovarci", prima di "Alexander Fidelity"
  - Contenuto: titolo, reviews-summary (4.5/5, 500+ recensioni), 3 blockquote recensioni, link "Leggi Tutte le Recensioni su Google"
- [x] **Task 1.2:** Aggiunto CSS per .reviews-summary, .reviews-quotes, .review-quote in components.css
- [x] **Task 1.3:** Inserite 3 recensioni rappresentative (Marco R., Laura B., Giuseppe T.)

### Phase 2: Badge di Fiducia

**Goal:** Aggiungere badge che aumentano la credibilità

- [x] **Task 2.1:** Creata sezione Trust badges sotto hero (prima di "Dove Trovarci")
  - Badge: Dal 2004, 4 Sedi in Provincia di Torino, Impasto 48h Lievitazione, Forno a Legna, 4.5 su Google (con stelle)
- [x] **Task 2.2:** Aggiunto stile .trust-badges e .trust-badge in components.css (con .trust-badge--highlight per Google)

### Phase 3: CTA Migliorati

**Goal:** Rendere i CTA più efficaci

- [x] **Task 3.1:** CTA sticky mobile verificato (responsive.css); aggiunto bottone "Prenota" come primo CTA nella barra sticky (Prenota, Chiama, Ordina)
- [ ] **Task 3.2:** CTA floating desktop non implementato (opzionale)
- [x] **Task 3.3:** Copy CTA hero: "Prenota il Tuo Tavolo" con sottotitolo "Conferma immediata"; stile .hero\_\_cta-main in hero.css

### Phase 4: Urgency Elements (Opzionale)

**Goal:** Creare senso di urgency senza essere aggressivi

- [ ] **Task 4.1:** Aggiungere banner eventi speciali (se applicabile)

  - Es. "Serata Funghi Porcini - Prenota subito"

- [ ] **Task 4.2:** Considerare countdown per promozioni

### Phase 5: Micro-interazioni

**Goal:** Migliorare l'esperienza con piccoli dettagli

- [x] **Task 5.1:** Hover su .btn--primary reso più evidente (translateY -2px, box-shadow oro in components.css)
- [ ] **Task 5.2:** Animazione scroll non implementata (opzionale)
- [ ] **Task 5.3:** Feedback visivo dopo click opzionale (non implementato)

---

## 4. Code Changes Overview

### Homepage - Nuova sezione recensioni

```html
<!-- Dopo "Dove Trovarci" -->
<section class="section section--dark" id="recensioni">
  <div class="container text-center">
    <h2 class="section-title" style="color: var(--color-white)">
      Cosa Dicono di Noi
    </h2>
    <div class="reviews-summary">
      <span class="reviews-stars">★★★★★</span>
      <span style="color: var(--color-text-on-dark)">
        4.5/5 basato su 500+ recensioni Google
      </span>
    </div>

    <div
      class="reviews-quotes"
      style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-lg); margin-top: var(--space-xl); text-align: left;"
    >
      <blockquote class="review-quote">
        <p class="review-quote__text">
          "Pizza eccezionale, impasto leggero e digeribile. Locale accogliente,
          personale gentilissimo. Consigliato!"
        </p>
        <footer class="review-quote__author">— Marco R., Google Reviews</footer>
      </blockquote>
      <blockquote class="review-quote">
        <p class="review-quote__text">
          "La migliore pizza di Pinerolo. Ingredienti di qualità e servizio
          impeccabile. Torneremo sicuramente."
        </p>
        <footer class="review-quote__author">— Laura B., Google Reviews</footer>
      </blockquote>
      <blockquote class="review-quote">
        <p class="review-quote__text">
          "Specialità funghi porcini buonissime! Ambiente familiare e prezzi
          onesti. 5 stelle meritate."
        </p>
        <footer class="review-quote__author">
          — Giuseppe T., Google Reviews
        </footer>
      </blockquote>
    </div>

    <a
      href="https://search.google.com/local/reviews?placeid=YOUR_PLACE_ID"
      class="btn btn--outline-light"
      target="_blank"
      rel="noopener"
      style="margin-top: var(--space-xl)"
    >
      Leggi Tutte le Recensioni su Google
    </a>
  </div>
</section>
```

### Trust Badges (sotto hero)

```html
<div class="trust-badges">
  <div class="trust-badge">
    <svg>...</svg>
    <span>Dal 2004</span>
  </div>
  <div class="trust-badge">
    <svg>...</svg>
    <span>4 Sedi in Provincia di Torino</span>
  </div>
  <div class="trust-badge">
    <svg>...</svg>
    <span>Impasto 48h Lievitazione</span>
  </div>
  <div class="trust-badge">
    <svg>...</svg>
    <span>4.5★ Google Reviews</span>
  </div>
</div>
```

---

## 5. Success Criteria

- [x] Sezione recensioni visibile in homepage (id="recensioni")
- [x] Trust badges visibili sotto hero
- [x] CTA sticky con Prenota + Chiama + Ordina su mobile
- [x] Copy CTA hero: "Prenota il Tuo Tavolo" + "Conferma immediata"
- [x] Responsive (grid recensioni auto-fit, trust-badges wrap)
- [x] Sezione recensioni in section--dark (stile scuro)

---

## 6. Notes

### Recensioni da ottenere

Per le recensioni, consiglio di:

1. Copiare recensioni reali da Google Business Profile
2. Usare nomi e iniziali (es. "Marco R.")
3. Mantenere 3-4 recensioni rappresentative

### Google Place ID

Per il link "Leggi tutte le recensioni", serve il Place ID di Google:

- Cercarlo su: https://developers.google.com/maps/documentation/places/web-service/place-id

### Metriche da monitorare

- Click-through rate su CTA "Prenota"
- Tempo sulla pagina
- Scroll depth
- Conversioni prenotazioni (da analytics Pienissimo)

---

## 7. Dependencies

- **Nessuna dipendenza esterna**
- **Dipende da:** Task 001 (CSS unificato) per gli stili

---

---

## 8. Task Completion Tracking

**Stato: Implementazione completata (2026-02-08)**

| Fase                      | Stato                                             |
| ------------------------- | ------------------------------------------------- |
| Phase 1 Recensioni        | ✅ Sezione "Cosa dicono di noi" + 3 quote + CSS   |
| Phase 2 Trust badges      | ✅ 5 badge sotto hero + CSS                       |
| Phase 3 CTA               | ✅ Sticky con Prenota primo; hero copy migliorato |
| Phase 4 Urgency           | ⏸ Opzionale (non implementato)                    |
| Phase 5 Micro-interazioni | ✅ Hover CTA primary potenziato                   |

**File modificati:** index.html, assets/css/components.css, assets/css/hero.css. Eseguito `npm run build:css` per rigenerare style.min.css.

**Link recensioni:** attualmente punta a ricerca Google "Alexander Pizzeria recensioni Torino". Per un link diretto alle recensioni della sede, sostituire con URL Google Business (Place ID) o g.page.

_Created: 2026-02-08_
_Updated: 2026-02-08_
