# AI Task: Contenuti Foto Reali

---

## 1. Task Overview

### Task Title
**Title:** Sostituzione Placeholder con Foto Reali

### Goal Statement
**Goal:** Sostituire i placeholder presenti in homepage (sezione "La Nostra Pizza, Il Nostro Team") con foto reali del forno a legna, dell'impasto e del team Alexander per aumentare l'autenticità e la fiducia dei visitatori.

---

## 2. Current State

### Placeholder Identificati
In `index.html` sezione "La Nostra Pizza, Il Nostro Team" ci sono 3 card con placeholder:

```html
<div class="card__img-placeholder">Forno a legna</div>
<div class="card__img-placeholder">Impasto e preparazione</div>
<div class="card__img-placeholder">Il team Alexander</div>
```

### Messaggio Attuale
> "Presto foto reali: forno a legna, impasto, team. Inserisci le immagini nella cartella assets/img/ quando disponibili."

---

## 3. Implementation Plan

### Phase 1: Preparazione Immagini
**Goal:** Ottenere e ottimizzare le foto

- [ ] **Task 1.1:** Scattare/raccogliere foto
  - Foto 1: Forno a legna in azione (fiamme, pizza che cuoce)
  - Foto 2: Impasto/preparazione (mani che lavorano, lievitazione)
  - Foto 3: Team Alexander (pizzaioli, staff, ambiente)

- [ ] **Task 1.2:** Specifiche tecniche consigliate
  - Dimensione: 800x600px minimo (aspect ratio 4:3 o 16:9)
  - Formato: JPG ad alta qualità, poi convertire in WebP
  - Peso: < 200KB per immagine dopo ottimizzazione

- [ ] **Task 1.3:** Ottimizzare con sharp
  ```bash
  npm run optimize-images
  ```

### Phase 2: Aggiornamento HTML
**Goal:** Sostituire placeholder con immagini reali

- [ ] **Task 2.1:** Caricare immagini in `assets/img/about/`
  ```
  assets/img/about/
  ├── forno-legna.webp
  ├── impasto-lievitazione.webp
  └── team-alexander.webp
  ```

- [ ] **Task 2.2:** Aggiornare index.html
  ```html
  <!-- Prima (placeholder) -->
  <div class="card__img-placeholder">Forno a legna</div>

  <!-- Dopo (immagine reale) -->
  <picture>
    <source type="image/webp" srcset="assets/img/about/forno-legna.webp" />
    <img
      class="card__img"
      src="assets/img/about/forno-legna.jpg"
      alt="Forno a legna Alexander Pizzeria - cottura pizza artigianale"
      width="400"
      height="300"
      loading="lazy"
    />
  </picture>
  ```

- [ ] **Task 2.3:** Rimuovere messaggio placeholder
  - Eliminare il paragrafo "Presto foto reali..."

### Phase 3: Verifica
**Goal:** Controllare che tutto funzioni

- [ ] **Task 3.1:** Verificare caricamento immagini
- [ ] **Task 3.2:** Verificare responsive su mobile
- [ ] **Task 3.3:** Verificare dark mode
- [ ] **Task 3.4:** Rigenerare CSS/JS bundle se necessario

---

## 4. Alt Text Consigliati

| Immagine | Alt Text SEO-friendly |
|----------|----------------------|
| Forno a legna | "Forno a legna Alexander Pizzeria - cottura pizza artigianale a Pinerolo" |
| Impasto | "Impasto pizza a lunga lievitazione 48 ore - Alexander Pizzeria" |
| Team | "Team pizzaioli Alexander Pizzeria - passione per la pizza dal 2004" |

---

## 5. Success Criteria

- [ ] 3 immagini reali caricate e visibili
- [ ] Formato WebP con fallback JPG
- [ ] Alt text descrittivi per SEO
- [ ] Lazy loading attivo
- [ ] Dimensioni esplicite (width/height) per CLS
- [ ] Messaggio placeholder rimosso

---

## 6. Note per il Fotografo/Team

### Suggerimenti per le foto
1. **Forno a legna:** Scatto con fiamme visibili, pizza in cottura, ambiente caldo
2. **Impasto:** Mani che lavorano, panetti in lievitazione, farina
3. **Team:** Gruppo in cucina, sorrisi, divise Alexander, ambiente professionale

### Illuminazione
- Preferire luce naturale o illuminazione calda
- Evitare flash diretto
- Mostrare l'atmosfera accogliente del locale

---

*Created: 2026-02-08*
