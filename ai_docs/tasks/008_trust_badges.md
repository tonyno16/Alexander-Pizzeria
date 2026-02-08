# AI Task: Trust Badges

---

## 1. Task Overview

### Task Title
**Title:** Aggiunta Trust Badges per Aumentare la Credibilità

### Goal Statement
**Goal:** Aggiungere una sezione con badge di fiducia (trust badges) sotto l'hero o prima del footer per rassicurare i visitatori e aumentare le conversioni.

---

## 2. Strategic Analysis

### Perché i Trust Badges?
I trust badges sono elementi visivi che comunicano rapidamente i punti di forza del brand:
- Aumentano la fiducia dei visitatori
- Riducono l'incertezza pre-acquisto/prenotazione
- Comunicano USP (Unique Selling Points) in modo immediato

### Badge Proposti per Alexander
| Badge | Messaggio | Icona |
|-------|-----------|-------|
| Dal 2004 | Esperienza e affidabilità | 🏆 o calendario |
| 4 Sedi | Presenza sul territorio | 📍 o mappa |
| Lievitazione 48h | Qualità dell'impasto | ⏰ o timer |
| Forno a Legna | Cottura tradizionale | 🔥 o fiamma |
| 4.5★ Google | Social proof | ⭐ o stelle |

---

## 3. Implementation Plan

### Phase 1: Creare Sezione Trust Badges
**Goal:** Aggiungere HTML in homepage

- [ ] **Task 1.1:** Aggiungere sezione dopo hero in `index.html`
  ```html
  <!-- TRUST BADGES -->
  <section class="trust-badges-section">
    <div class="container">
      <div class="trust-badges">
        <div class="trust-badge">
          <svg class="trust-badge__icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="7"/>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
          </svg>
          <span class="trust-badge__text">Dal 2004</span>
        </div>

        <div class="trust-badge">
          <svg class="trust-badge__icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span class="trust-badge__text">4 Sedi in Provincia TO</span>
        </div>

        <div class="trust-badge">
          <svg class="trust-badge__icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <span class="trust-badge__text">Lievitazione 48h</span>
        </div>

        <div class="trust-badge">
          <svg class="trust-badge__icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
          </svg>
          <span class="trust-badge__text">Forno a Legna</span>
        </div>

        <div class="trust-badge">
          <svg class="trust-badge__icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span class="trust-badge__text">4.5/5 Google Reviews</span>
        </div>
      </div>
    </div>
  </section>
  ```

### Phase 2: Aggiungere CSS
**Goal:** Stilizzare i badge

- [ ] **Task 2.1:** Aggiungere stili in `components.css` (o file sorgente)
  ```css
  /* === Trust Badges === */
  .trust-badges-section {
    padding: var(--space-lg) 0;
    background: var(--color-bg-alt);
    border-bottom: 1px solid var(--color-border);
  }

  .trust-badges {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-xl);
  }

  .trust-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
    text-align: center;
  }

  .trust-badge__icon {
    color: var(--color-primary);
    flex-shrink: 0;
  }

  .trust-badge__text {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
    white-space: nowrap;
  }

  /* Dark mode */
  [data-theme="dark"] .trust-badges-section {
    background: var(--color-bg-alt);
    border-color: var(--color-border);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .trust-badges {
      gap: var(--space-lg);
    }

    .trust-badge__icon {
      width: 28px;
      height: 28px;
    }

    .trust-badge__text {
      font-size: var(--font-size-xs);
    }
  }

  @media (max-width: 576px) {
    .trust-badges {
      gap: var(--space-md);
    }

    .trust-badge {
      flex: 0 0 45%;
    }
  }
  ```

- [ ] **Task 2.2:** Rigenerare CSS bundle
  ```bash
  npm run build:css
  ```

### Phase 3: Variante Alternativa (Inline)
**Goal:** Versione compatta sotto hero

- [ ] **Task 3.1:** Alternativa più compatta (opzionale)
  ```html
  <!-- Versione inline compatta -->
  <div class="trust-badges trust-badges--inline">
    <span class="trust-badge--inline">🏆 Dal 2004</span>
    <span class="trust-badge--inline">📍 4 Sedi</span>
    <span class="trust-badge--inline">⏰ 48h Lievitazione</span>
    <span class="trust-badge--inline">🔥 Forno a Legna</span>
    <span class="trust-badge--inline">⭐ 4.5/5</span>
  </div>
  ```

### Phase 4: Verifica
**Goal:** Testare su diversi dispositivi

- [ ] **Task 4.1:** Verificare desktop (1200px+)
- [ ] **Task 4.2:** Verificare tablet (768px)
- [ ] **Task 4.3:** Verificare mobile (375px)
- [ ] **Task 4.4:** Verificare dark mode

---

## 4. Posizionamento Consigliato

### Opzione A: Sotto Hero (Consigliata)
```
┌─────────────────────────────┐
│           HERO              │
│    CTA Prenota / Menu       │
├─────────────────────────────┤
│  🏆 Dal 2004 | 📍 4 Sedi... │  ← Trust Badges
├─────────────────────────────┤
│      Dove Trovarci          │
└─────────────────────────────┘
```

### Opzione B: Prima del Footer
```
┌─────────────────────────────┐
│           FAQ               │
├─────────────────────────────┤
│  🏆 Dal 2004 | 📍 4 Sedi... │  ← Trust Badges
├─────────────────────────────┤
│          FOOTER             │
└─────────────────────────────┘
```

---

## 5. Success Criteria

- [ ] Trust badges visibili in homepage
- [ ] Icone SVG coerenti con design
- [ ] Responsive su tutti i dispositivi
- [ ] Dark mode supportato
- [ ] Non impatta negativamente performance
- [ ] CSS/JS bundle rigenerato

---

## 6. Note

### Design Consistency
- Usare icone SVG inline (no icon font esterni)
- Colore icone: --color-primary (oro)
- Font: stesso del sito (Inter)

### Alternative ai Badge
Se preferisci un approccio diverso:
- **Counter animati:** "20+ anni", "4 sedi", "500+ recensioni"
- **Logo partner:** TripAdvisor, TheFork (se presenti)
- **Certificazioni:** Certificazione qualità, km0, bio

---

*Created: 2026-02-08*
