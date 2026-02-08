# AI Task: Immagini Open Graph per Sedi

---

## 1. Task Overview

### Task Title
**Title:** Creazione Immagini Open Graph Specifiche per Ogni Sede

### Goal Statement
**Goal:** Creare immagini Open Graph (OG) dedicate per ogni sede (Pinerolo, Piossasco, Giaveno, Rivoli) per migliorare l'aspetto delle condivisioni social e aumentare il CTR quando i link vengono condivisi su Facebook, WhatsApp, LinkedIn, etc.

---

## 2. Current State

### Situazione Attuale
Tutte le pagine usano la stessa immagine OG generica:
```html
<meta property="og:image" content="https://www.alexanderpizzeria.com/assets/img/og/og-home.jpg" />
```

### Problema
Quando qualcuno condivide il link di una sede specifica (es. Pinerolo), appare l'immagine generica invece di un'immagine che mostri quella sede.

---

## 3. Implementation Plan

### Phase 1: Creazione Immagini
**Goal:** Creare 4 immagini OG specifiche

- [ ] **Task 1.1:** Specifiche tecniche
  - Dimensioni: 1200x630px (ratio 1.91:1)
  - Formato: JPG (< 300KB)
  - Contenuto: Foto sede + logo + nome sede

- [ ] **Task 1.2:** Design template
  ```
  ┌─────────────────────────────────────────────┐
  │                                             │
  │         [FOTO LOCALE/ESTERNO SEDE]          │
  │                                             │
  │  ┌─────────────────────────────────────┐    │
  │  │  Logo Alexander     PINEROLO       │    │
  │  │  Via Achille Midana, 37            │    │
  │  └─────────────────────────────────────┘    │
  └─────────────────────────────────────────────┘
  ```

- [ ] **Task 1.3:** Creare immagini
  ```
  assets/img/og/
  ├── og-home.jpg       (esistente - homepage)
  ├── og-pinerolo.jpg   ← NUOVO
  ├── og-piossasco.jpg  ← NUOVO
  ├── og-giaveno.jpg    ← NUOVO
  └── og-rivoli.jpg     ← NUOVO
  ```

### Phase 2: Aggiornare HTML
**Goal:** Aggiornare meta tag in ogni pagina sede

- [ ] **Task 2.1:** Aggiornare `pinerolo.html`
  ```html
  <meta property="og:image" content="https://www.alexanderpizzeria.com/assets/img/og/og-pinerolo.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Alexander Pizzeria Pinerolo - Via Midana 37" />
  ```

- [ ] **Task 2.2:** Aggiornare `piossasco.html`
  ```html
  <meta property="og:image" content="https://www.alexanderpizzeria.com/assets/img/og/og-piossasco.jpg" />
  ```

- [ ] **Task 2.3:** Aggiornare `giaveno.html`
  ```html
  <meta property="og:image" content="https://www.alexanderpizzeria.com/assets/img/og/og-giaveno.jpg" />
  ```

- [ ] **Task 2.4:** Aggiornare `rivoli.html`
  ```html
  <meta property="og:image" content="https://www.alexanderpizzeria.com/assets/img/og/og-rivoli.jpg" />
  ```

### Phase 3: Twitter Card (Opzionale)
**Goal:** Aggiornare anche twitter:image

- [ ] **Task 3.1:** Aggiornare twitter:image in ogni pagina sede
  ```html
  <meta name="twitter:image" content="https://www.alexanderpizzeria.com/assets/img/og/og-pinerolo.jpg" />
  ```

### Phase 4: Verifica
**Goal:** Testare le immagini OG

- [ ] **Task 4.1:** Facebook Sharing Debugger
  - URL: https://developers.facebook.com/tools/debug/
  - Testare ogni URL sede
  - Usare "Scrape Again" per aggiornare cache

- [ ] **Task 4.2:** Twitter Card Validator
  - URL: https://cards-dev.twitter.com/validator
  - Verificare anteprima corretta

- [ ] **Task 4.3:** LinkedIn Post Inspector
  - URL: https://www.linkedin.com/post-inspector/
  - Testare condivisione

- [ ] **Task 4.4:** WhatsApp Test
  - Condividere link in chat WhatsApp
  - Verificare anteprima immagine

---

## 4. Design Suggerimenti

### Elementi da Includere
- **Foto principale:** Interno locale o facciata
- **Logo Alexander:** In alto a sinistra o centrato
- **Nome sede:** Grande e leggibile (PINEROLO, PIOSSASCO, etc.)
- **Indirizzo:** Sotto il nome, più piccolo
- **Colori brand:** Oro (#C9A227) + nero (#1a1a1a)

### Template Canva/Figma
Dimensioni: 1200x630px
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   [FOTO LOCALE - 70% immagine]                         │
│                                                         │
│   ┌───────────────────────────────────────────────┐    │
│   │  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  │    │
│   │        Alexander Pizzeria                     │    │
│   │           PINEROLO                            │    │
│   │      Via Achille Midana, 37                   │    │
│   │  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄  │    │
│   └───────────────────────────────────────────────┘    │
│                 [Overlay scuro 30%]                     │
└─────────────────────────────────────────────────────────┘
```

### Font e Stili
- **Nome sede:** Lora Bold, 72px, bianco
- **Indirizzo:** Inter Regular, 24px, bianco 80% opacity
- **Logo:** SVG o PNG con sfondo trasparente
- **Overlay:** Gradiente nero dal basso (0% → 70%)

---

## 5. Immagini Necessarie

| Sede | File | Foto Suggerita |
|------|------|----------------|
| Pinerolo | og-pinerolo.jpg | Ingresso Via Midana o interno |
| Piossasco | og-piossasco.jpg | Facciata o sala principale |
| Giaveno | og-giaveno.jpg | Vista Piazza Molines o funghi porcini |
| Rivoli | og-rivoli.jpg | Piazza Principe Eugenio o interno |

---

## 6. Success Criteria

- [ ] 4 immagini OG create (1200x630px)
- [ ] Immagini ottimizzate (< 300KB ciascuna)
- [ ] Meta tag aggiornati in tutte le pagine sede
- [ ] Test Facebook Debugger passato
- [ ] Anteprima corretta su WhatsApp
- [ ] Twitter Card funzionante

---

## 7. Tool Utili

### Creazione Immagini
- **Canva:** Template gratuiti per OG image
- **Figma:** Design preciso con dimensioni esatte
- **Photoshop/GIMP:** Editing professionale

### Compressione
- **TinyPNG:** https://tinypng.com
- **Squoosh:** https://squoosh.app

### Test/Debug
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Validator:** https://cards-dev.twitter.com/validator
- **OpenGraph.xyz:** https://www.opengraph.xyz/

---

## 8. Note

### Cache Social
Facebook e altri social cachano le immagini OG. Dopo l'aggiornamento:
1. Usare Facebook Debugger
2. Cliccare "Scrape Again"
3. Attendere qualche minuto

### Fallback
Se una sede non ha foto dedicata, può temporaneamente usare og-home.jpg fino a quando la foto specifica non è disponibile.

---

*Created: 2026-02-08*
