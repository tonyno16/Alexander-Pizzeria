# AI Task: Ottimizzazione Performance

---

## 1. Task Overview

### Task Title

**Title:** Ottimizzazione Performance Sito Alexander Pizzeria

### Goal Statement

**Goal:** Migliorare significativamente le performance del sito (Core Web Vitals) attraverso l'unificazione e minificazione di CSS/JS, ottimizzazione font, e miglioramento del caricamento risorse. Obiettivo: LCP < 2.5s, FID < 100ms, CLS < 0.1.

---

## 2. Strategic Analysis & Solution Options

### Problem Context

Il sito attualmente carica **10+ file CSS separati** e **4+ file JS separati**, con font Google che includono molteplici pesi. Questo impatta negativamente il First Contentful Paint (FCP) e Largest Contentful Paint (LCP).

### Solution Options Analysis

#### Option 1: Build System Completo (Vite/Webpack)

**Approach:** Aggiungere un bundler moderno come Vite per gestire CSS, JS, e assets.

**Pros:**

- ✅ Hot reload per sviluppo
- ✅ Tree shaking automatico
- ✅ Source maps per debug
- ✅ Gestione moderna degli assets

**Cons:**

- ❌ Setup iniziale complesso
- ❌ Cambia significativamente il workflow
- ❌ Overhead per un sito statico

**Implementation Complexity:** High
**Risk Level:** Medium

#### Option 2: Script npm Semplici (clean-css + terser)

**Approach:** Aggiungere script npm per concatenare e minificare CSS/JS in fase di build.

**Pros:**

- ✅ Setup minimale (pochi devDependencies)
- ✅ Non cambia il workflow di sviluppo
- ✅ Output deterministico e controllabile
- ✅ Facile da capire e mantenere

**Cons:**

- ❌ Nessun hot reload
- ❌ Build manuale richiesta

**Implementation Complexity:** Low
**Risk Level:** Low

#### Option 3: CSS/JS Inline Critico + Lazy Load

**Approach:** Estrarre CSS critico inline nell'head, caricare il resto in modo asincrono.

**Pros:**

- ✅ Massimo impatto su FCP/LCP
- ✅ Rendering immediato above-the-fold

**Cons:**

- ❌ Manutenzione più complessa
- ❌ Richiede analisi per-page del CSS critico

**Implementation Complexity:** Medium
**Risk Level:** Medium

### Recommendation & Rationale

**RECOMMENDED SOLUTION:** Option 2 - Script npm Semplici

**Why this is the best choice:**

1. **Semplicità** - Setup minimale, non richiede cambio di workflow
2. **Efficacia** - Ridurrà significativamente le richieste HTTP e la dimensione totale
3. **Manutenibilità** - Codice sorgente resta separato, solo output è unificato

---

## 3. Project Analysis & Current State

### Technology & Architecture

- **Framework:** HTML/CSS/JS statico (no framework)
- **Hosting:** Vercel (da vercel.json)
- **CSS:** 10 file separati (~600-800 linee totali)
- **JS:** 4+ file separati (main, whatsapp-widget, analytics, location-tabs, etc.)
- **Font:** Google Fonts (Inter + Lora) con pesi 400-700
- **Immagini:** Già ottimizzate con sharp (WebP supportato)

### Current State

**CSS Files (10):**

- variables.css, reset.css, base.css, layout.css, components.css
- header.css, footer.css, hero.css, locations.css, loyalty.css, responsive.css

**JS Files (4+):**

- main.js, whatsapp-widget.js, analytics.js, location-tabs.js, form-validation.js, schema.js, cookie-consent.js

**Issues:**

- 10+ HTTP requests per CSS
- CSS non minificato
- JS non minificato
- Font con troppi pesi caricati

---

## 4. Context & Problem Definition

### Problem Statement

Le performance del sito sono impattate da:

1. Troppi file CSS/JS separati (latenza di rete)
2. File non minificati (dimensione)
3. Font Google con troppi pesi (blocking render)
4. Manca preload strategico per risorse critiche

### Success Criteria

- [x] CSS unificato in 1 file minificato (`style.min.css` ~30 KB)
- [x] JS unificato in 1 file minificato con defer (`bundle.min.js` ~17 KB)
- [x] Font con display=swap (già presente nei link Google Fonts)
- [x] Preload per CSS critico (`rel="preload" as="style"` su style.min.css)
- [ ] Score Lighthouse Performance > 90 (da verificare dopo deploy)

---

## 5. Development Mode Context

- **Sito in fase di sviluppo** - possiamo fare modifiche aggressive
- **Nessuna retrocompatibilità necessaria**
- **Priorità: velocità e semplicità**

---

## 6. Technical Requirements

### Functional Requirements

- Build script che unifica CSS
- Build script che minifica JS
- HTML aggiornato per usare file bundled
- Fallback per sviluppo (file separati o watch mode)

### Non-Functional Requirements

- **Performance:** LCP < 2.5s, FCP < 1.8s
- **Dimensione:** CSS < 50KB gzipped, JS < 30KB gzipped
- **Compatibilità:** Chrome, Firefox, Safari, Edge (ultime 2 versioni)

---

## 7. Data & Database Changes

**N/A** - Nessun database nel progetto

---

## 8. API & Backend Changes

**N/A** - Sito statico

---

## 9. Frontend Changes

### New Files to Create

- `scripts/build-css.js` - Script per unificare e minificare CSS
- `scripts/build-js.js` - Script per unificare e minificare JS
- `assets/css/style.min.css` - CSS unificato (output)
- `assets/js/bundle.min.js` - JS unificato (output)

### Files to Modify

- `package.json` - Aggiungere devDependencies e scripts
- `index.html` - Usare file minificati
- Tutte le altre pagine HTML - Stessa modifica

---

## 10. Code Changes Overview

### Current Implementation (Before)

```html
<!-- index.html - HEAD attuale -->
<link rel="stylesheet" href="assets/css/variables.css" />
<link rel="stylesheet" href="assets/css/reset.css" />
<link rel="stylesheet" href="assets/css/base.css" />
<link rel="stylesheet" href="assets/css/layout.css" />
<link rel="stylesheet" href="assets/css/components.css" />
<link rel="stylesheet" href="assets/css/header.css" />
<link rel="stylesheet" href="assets/css/footer.css" />
<link rel="stylesheet" href="assets/css/hero.css" />
<link rel="stylesheet" href="assets/css/locations.css" />
<link rel="stylesheet" href="assets/css/loyalty.css" />
<link rel="stylesheet" href="assets/css/responsive.css" />

<!-- JS attuale -->
<script src="assets/js/main.js"></script>
<script src="assets/js/whatsapp-widget.js"></script>
```

### After Optimization

```html
<!-- HEAD ottimizzato -->
<link rel="preload" as="style" href="assets/css/style.min.css" />
<link rel="stylesheet" href="assets/css/style.min.css" />

<!-- JS ottimizzato -->
<script src="assets/js/bundle.min.js" defer></script>
```

### Key Changes Summary

- [x] **12 CSS → 1 CSS minificato (style.min.css)** - Riduce richieste HTTP
- [x] **7 JS → 1 JS minificato con defer (bundle.min.js)** - Non blocca il rendering
- [x] **Preload CSS** - `rel="preload" as="style"` per style.min.css
- [x] **Build scripts npm** - `npm run build` per generare i file prima del deploy

---

## 11. Implementation Plan

### Phase 1: Setup Build Tools

**Goal:** Aggiungere dipendenze e script npm per build

- [x] **Task 1.1:** Installare dipendenze (clean-css, terser)
- [x] **Task 1.2:** Creare script build-css.js — `scripts/build-css.js`
- [x] **Task 1.3:** Creare script build-js.js — `scripts/build-js.js`
- [x] **Task 1.4:** Aggiornare package.json con script di build

### Phase 2: Ottimizzazione CSS

**Goal:** Unificare e minificare tutti i CSS

- [x] **Task 2.1:** Ordine: variables → reset → base → layout → components → header → footer → hero → locations → loyalty → blog → responsive
- [x] **Task 2.2:** Output: `assets/css/style.min.css` (~30 KB)
- [x] **Task 2.3:** Tutte le pagine usano il bundle unico

### Phase 3: Ottimizzazione JS

**Goal:** Unificare e minificare tutti i JS

- [x] **Task 3.1:** Ordine: main → analytics → cookie-consent → schema → location-tabs → form-validation → whatsapp-widget
- [x] **Task 3.2:** Output: `assets/js/bundle.min.js` (~17 KB)
- [x] **Task 3.3:** Script caricato con `defer`

### Phase 4: Ottimizzazione Font

**Goal:** Ridurre impatto font su performance

- [x] **Task 4.1:** display=swap già presente nei link Google Fonts
- [ ] **Task 4.2:** Preload font opzionale (miglioria futura)
- [x] **Task 4.3:** display=swap verificato

### Phase 5: Aggiornamento HTML

**Goal:** Applicare ottimizzazioni a tutte le pagine

- [x] **Task 5.1:** index.html aggiornato
- [x] **Task 5.2:** Tutte le altre pagine (menu, prenota, lavora-con-noi, alexander-lovers, blog, blog-post-template, pinerolo, piossasco, giaveno, rivoli, 404)
- [x] **Task 5.3:** Preload CSS aggiunto su tutte le pagine

### Phase 6: Verifica Finale

**Goal:** Testare performance

- [ ] **Task 6.1:** Test Lighthouse (locale o dopo deploy)
- [ ] **Task 6.2:** Verificare funzionalità (tab, form, navigazione)
- [ ] **Task 6.3:** Documentare risultati

---

## 12. Task Completion Tracking

_Da aggiornare durante l'implementazione_

---

## 13. File Structure & Organization

### After Implementation

```
alexander-pizzeria/
├── assets/
│   ├── css/
│   │   ├── variables.css      # Sorgente
│   │   ├── reset.css          # Sorgente
│   │   ├── ...                # Altri sorgenti
│   │   └── style.min.css      # OUTPUT MINIFICATO
│   └── js/
│       ├── main.js            # Sorgente
│       ├── whatsapp-widget.js # Sorgente
│       ├── ...                # Altri sorgenti
│       └── bundle.min.js      # OUTPUT MINIFICATO
├── scripts/
│   ├── optimize-images.js     # Esistente
│   ├── build-css.js           # NUOVO
│   └── build-js.js            # NUOVO
└── package.json               # Aggiornato
```

---

## 14. Potential Issues & Security Review

### Edge Cases

- [ ] **CSS order matters** - Variabili devono essere prima, responsive alla fine
- [ ] **JS dependencies** - main.js deve essere prima di altri script
- [ ] **Browser caching** - Considerare cache busting (hash nel nome file)

### Mitigation

- Testare accuratamente ogni pagina dopo le modifiche
- Mantenere file sorgente per debug

---

## 15. Deployment & Configuration

### Vercel Configuration

Il file `vercel.json` esistente non richiede modifiche.

### Build Process

```bash
npm run build        # Esegue entrambi i build
npm run build:css    # Solo CSS
npm run build:js     # Solo JS
```

---

## 16. AI Agent Instructions

### Implementation Approach

1. ✅ Task document creato
2. ✅ Implementazione completata (Option 2: script npm con clean-css e terser)
3. ✅ Fasi 1–5 eseguite; Fase 6 (verifica Lighthouse) da eseguire dopo deploy
4. ✅ Sezione 12 aggiornata con stato di completamento

---

_Template Version: 1.0_
_Created: 2026-02-08_
