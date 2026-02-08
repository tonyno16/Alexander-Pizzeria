# AI Task: Blog Content

---

## 1. Task Overview

### Task Title
**Title:** Creazione Contenuti Blog per SEO

### Goal Statement
**Goal:** Popolare il blog con 3-5 articoli iniziali ottimizzati per SEO locale, per attrarre traffico organico su keyword come "pizza pinerolo", "funghi porcini giaveno", "pizzeria torino".

---

## 2. Current State

### Struttura Esistente
- `blog.html` - Pagina lista blog (template pronto)
- `blog-post-template.html` - Template singolo articolo
- CSS per blog già incluso in `assets/css/blog.css`

### Stato Attuale
Il blog è vuoto, mostra solo la struttura template senza contenuti reali.

---

## 3. Content Strategy

### Keyword Target
| Keyword | Volume stimato | Difficoltà | Articolo |
|---------|---------------|------------|----------|
| pizza pinerolo | Alto | Media | La nostra storia |
| funghi porcini giaveno | Medio | Bassa | Specialità Valsangone |
| pizza lunga lievitazione | Medio | Media | L'arte dell'impasto |
| pizzeria torino provincia | Alto | Alta | Dove mangiare pizza |
| pizza asporto pinerolo | Medio | Bassa | Ordina d'asporto |

---

## 4. Implementation Plan

### Phase 1: Struttura Articoli
**Goal:** Creare i file HTML per gli articoli

- [ ] **Task 1.1:** Creare cartella blog/
  ```
  blog/
  ├── la-nostra-storia.html
  ├── impasto-lunga-lievitazione.html
  ├── funghi-porcini-valsangone.html
  ├── dove-mangiare-pizza-torino.html
  └── ordina-pizza-asporto.html
  ```

- [ ] **Task 1.2:** Creare template base articolo
  - Copiare struttura da `blog-post-template.html`
  - Adattare per ogni articolo

### Phase 2: Contenuti Articoli
**Goal:** Scrivere i contenuti

#### Articolo 1: "La Nostra Storia: Dal 2004 ad Oggi"
- [ ] **Task 2.1:** Scrivere articolo
  - Keyword: pizza pinerolo, alexander pizzeria, storia
  - Lunghezza: 800-1200 parole
  - Contenuto:
    - Come è nata Alexander Pizzeria
    - L'apertura a Pinerolo nel 2004
    - L'espansione: Piossasco, Giaveno, Rivoli
    - La filosofia: impasto, ingredienti, qualità
    - Il team e la passione

#### Articolo 2: "L'Arte dell'Impasto a Lunga Lievitazione"
- [ ] **Task 2.2:** Scrivere articolo
  - Keyword: impasto lunga lievitazione, pizza digeribile
  - Lunghezza: 600-800 parole
  - Contenuto:
    - Cos'è la lievitazione lunga (48 ore)
    - Benefici: digeribilità, sapore, texture
    - Le farine: mais rosso, tipo 1, macinata a pietra
    - Il processo quotidiano

#### Articolo 3: "I Funghi Porcini della Valsangone"
- [ ] **Task 2.3:** Scrivere articolo
  - Keyword: funghi porcini giaveno, ristorante valsangone
  - Lunghezza: 600-800 parole
  - Contenuto:
    - La tradizione dei porcini in Valsangone
    - Le nostre specialità ai funghi
    - Perché Giaveno è diversa (ristorante + pizzeria)
    - Stagionalità e ingredienti locali

#### Articolo 4: "Dove Mangiare Pizza in Provincia di Torino"
- [ ] **Task 2.4:** Scrivere articolo
  - Keyword: pizzeria torino, dove mangiare pizza
  - Lunghezza: 800-1000 parole
  - Contenuto:
    - Guida alle 4 sedi Alexander
    - Cosa rende speciale ogni location
    - Orari, come arrivare, parcheggio
    - Prenotazione e asporto

#### Articolo 5: "Ordina Pizza d'Asporto: Guida Completa"
- [ ] **Task 2.5:** Scrivere articolo
  - Keyword: pizza asporto pinerolo, delivery pizza
  - Lunghezza: 500-700 parole
  - Contenuto:
    - Come ordinare online
    - Tempi di preparazione
    - Consigli per gustare la pizza a casa
    - Link alle 4 sedi per ordinare

### Phase 3: SEO On-Page
**Goal:** Ottimizzare ogni articolo

- [ ] **Task 3.1:** Meta tag per ogni articolo
  ```html
  <title>[Titolo] | Blog Alexander Pizzeria</title>
  <meta name="description" content="[150-160 caratteri]" />
  <link rel="canonical" href="https://www.alexanderpizzeria.com/blog/[slug].html" />
  ```

- [ ] **Task 3.2:** Schema Article
  ```json
  {
    "@type": "Article",
    "headline": "[Titolo]",
    "author": { "@type": "Organization", "name": "Alexander Pizzeria" },
    "datePublished": "2026-02-08",
    "image": "[URL immagine]"
  }
  ```

- [ ] **Task 3.3:** Internal linking
  - Link a pagine sedi
  - Link a pagina prenotazione
  - Link a menu
  - Link tra articoli correlati

### Phase 4: Aggiornamento Lista Blog
**Goal:** Popolare blog.html con gli articoli

- [ ] **Task 4.1:** Aggiornare blog.html con card articoli
- [ ] **Task 4.2:** Aggiungere immagini hero per ogni articolo
- [ ] **Task 4.3:** Aggiungere date e categorie

---

## 5. Struttura Singolo Articolo

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <!-- Iubenda + Meta standard -->
  <title>Titolo Articolo | Blog Alexander Pizzeria</title>
  <meta name="description" content="Descrizione 150-160 caratteri" />
  <link rel="canonical" href="https://www.alexanderpizzeria.com/blog/slug.html" />

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Titolo Articolo" />
  <!-- ... -->

  <!-- Schema Article -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Titolo Articolo",
    "author": {
      "@type": "Organization",
      "name": "Alexander Pizzeria"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Alexander Pizzeria",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.alexanderpizzeria.com/assets/img/logo/logo.webp"
      }
    },
    "datePublished": "2026-02-08",
    "dateModified": "2026-02-08",
    "image": "https://www.alexanderpizzeria.com/assets/img/blog/articolo.webp"
  }
  </script>
</head>
<body>
  <!-- Header standard -->

  <main id="main-content">
    <article class="blog-post">
      <header class="blog-post__header">
        <div class="container">
          <a href="blog.html" class="blog-post__back">← Torna al Blog</a>
          <span class="tag tag--gold">Categoria</span>
          <h1>Titolo Articolo</h1>
          <p class="blog-post__meta">
            <time datetime="2026-02-08">8 Febbraio 2026</time> · 5 min lettura
          </p>
        </div>
      </header>

      <img
        src="assets/img/blog/articolo.webp"
        alt="Descrizione immagine"
        class="blog-post__hero"
      />

      <div class="container">
        <div class="blog-post__content prose">
          <!-- Contenuto articolo -->
          <p>Introduzione...</p>
          <h2>Sottotitolo 1</h2>
          <p>Contenuto...</p>
          <!-- ... -->
        </div>

        <footer class="blog-post__cta">
          <h3>Ti è piaciuto questo articolo?</h3>
          <p>Vieni a trovarci in una delle nostre 4 sedi!</p>
          <a href="prenota-un-tavolo.html" class="btn btn--primary">
            Prenota il Tuo Tavolo
          </a>
        </footer>
      </div>
    </article>
  </main>

  <!-- Footer standard -->
</body>
</html>
```

---

## 6. Immagini Blog

### Immagini Necessarie
| Articolo | Immagine | Dimensioni |
|----------|----------|------------|
| La nostra storia | Foto storica o team | 1200x630 |
| Impasto | Impasto/lievitazione | 1200x630 |
| Funghi porcini | Piatto ai porcini | 1200x630 |
| Dove mangiare | Collage 4 sedi | 1200x630 |
| Asporto | Box pizza/delivery | 1200x630 |

### Cartella
```
assets/img/blog/
├── storia-alexander.webp
├── impasto-lievitazione.webp
├── funghi-porcini.webp
├── sedi-alexander.webp
└── pizza-asporto.webp
```

---

## 7. Success Criteria

- [ ] Almeno 3 articoli pubblicati
- [ ] Ogni articolo ottimizzato SEO (meta, schema, internal links)
- [ ] blog.html aggiornato con lista articoli
- [ ] Immagini ottimizzate per ogni articolo
- [ ] CTA "Prenota" in ogni articolo
- [ ] Sitemap aggiornata con nuovi URL

---

## 8. Aggiornamento Sitemap

Aggiungere a `sitemap.xml`:
```xml
<url>
  <loc>https://www.alexanderpizzeria.com/blog/la-nostra-storia.html</loc>
  <lastmod>2026-02-08</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
<!-- Ripetere per ogni articolo -->
```

---

*Created: 2026-02-08*
