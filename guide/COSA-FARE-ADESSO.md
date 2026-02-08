# Cosa fare adesso — Alexander Pizzeria

Riferimento: piano completo (architettura, sprint, SEO, marketing, WordPress).  
Questo documento allinea lo **stato attuale** del prototipo al piano e indica **i prossimi passi in ordine di priorità**.

---

## Stato attuale vs piano

### Già implementato (Sprint 1–5 sostanzialmente completi)

| Elemento             | Stato                                                                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Struttura file**   | Tutte le pagine HTML, cartelle `assets/`, `data/`                                                                                                            |
| **Design system**    | `variables.css`, `reset.css`, `base.css`, `layout.css`, `components.css`, header, footer                                                                     |
| **Homepage**         | Hero, Dove Trovarci (4 card), Alexander Fidelity, Il Nostro Menu, Prenota il Tuo Tavolo, feed Instagram (placeholder), footer                                |
| **Pagine locali**    | Pinerolo, Piossasco, Giaveno, Rivoli con contenuto SEO, barra info, iframe Pienissimo (prenota/asporto/menu), Google Maps, FAQ, JSON-LD Restaurant + FAQPage |
| **Menu / Prenota**   | Tab per sede, iframe Pienissimo corretti, `location-tabs.js`                                                                                                 |
| **Alexander Lovers** | Hero, benefici, CTA → Pienissimo Fidelity                                                                                                                    |
| **Lavora con noi**   | Form + `form-validation.js`                                                                                                                                  |
| **Blog**             | `blog.html` (lista) + `blog-post-template.html`                                                                                                              |
| **404**              | Pagina errore                                                                                                                                                |
| **SEO**              | Meta title/description, OG, Twitter Card, canonical; `sitemap.xml`, `robots.txt`                                                                             |
| **Script**           | `main.js`, `location-tabs.js`, `form-validation.js`, `schema.js`, `analytics.js`, `cookie-consent.js`, `whatsapp-widget.js`                                  |
| **Dati**             | `locations.json` con sedi, telefoni, URL Pienissimo, tracking (GA4, Pixel, Iubenda)                                                                          |

### Lacune da colmare (in ordine di priorità)

1. **Logo e favicon**  
   Le pagine referenziano `assets/img/logo/favicon.svg` ma la cartella `assets/img/logo/` **non esiste**. Risultato: favicon 404.  
   **Azione:** creare `assets/img/logo/` e aggiungere almeno un `favicon.svg` (o .ico) e, se possibile, logo per header.

2. **Immagini hero / sedi / OG**  
   Il piano prevede:

   - `assets/img/hero/` (desktop/tablet/mobile WebP)
   - `assets/img/locations/` (foto per ogni sede)
   - `assets/img/og/` (Open Graph 1200×630)  
     Attualmente l’hero usa uno sfondo a gradiente; le OG non sono impostate con immagini dedicate.  
     **Azione:** aggiungere le cartelle e, quando disponibili, le immagini (anche placeholder per non rompere link).

3. **Verifica end-to-end**  
   Eseguire la checklist **VERIFICA** del piano per trovare eventuali bug, link rotti, schema errati, problemi responsive/performance.

---

## Cosa fare adesso (ordine consigliato)

### Fase 1 — Verifica del prototipo (questa settimana)

Obiettivo: assicurarsi che tutto ciò che è già implementato funzioni correttamente prima di passare a contenuti extra o WordPress.

1. **Avviare il sito in locale**

   - Da PowerShell: `cd "c:\Users\fabri\Desktop\ALexandr Sito"` poi `python -m http.server 8000`
   - Aprire `http://localhost:8000`

2. **Checklist VERIFICA (dal piano)**

   - [ ] Homepage: hero, card sedi, fidelity, menu, prenotazione, footer
   - [ ] Ogni pagina locale: contenuto unico, iframe Pienissimo (prenota, asporto, menu), Google Maps
   - [ ] `menu.html` e `prenota-un-tavolo.html`: tab che cambiano sede e caricano l’iframe corretto
   - [ ] Form `lavora-con-noi.html`: validazione lato client
   - [ ] Responsive: 375px (mobile), 768px (tablet), 1200px+ (desktop)
   - [ ] Schema.org: incollare l’HTML su [Schema Markup Validator](https://validator.schema.org/)
   - [ ] Meta tag: [metatags.io](https://metatags.io) per anteprima OG
   - [ ] Performance: [PageSpeed Insights](https://pagespeed.web.dev/) (obiettivo >80 mobile)
   - [ ] Widget WhatsApp: click apre chat con numero corretto
   - [ ] Accessibilità: navigazione da tastiera, contrasto, link “Salta al contenuto”

3. **Correggere** tutto ciò che esce dalla checklist (link rotti, iframe, testi, contrasti, ecc.).

### Fase 2 — Fix minimi (logo e favicon)

- Creare la cartella `assets/img/logo/`.
- Aggiungere un file `favicon.svg` (o `favicon.ico`) e aggiornare i tag `<link rel="icon">` solo se cambi nome file.
- Opzionale: aggiungere un logo testuale o SVG per l’header se non è già solo testo.

Dopo questa fase il sito non deve più dare 404 sul favicon.

### Fase 3 — Contenuti e asset (quando possibile)

- **Immagini:** hero, sedi, OG 1200×630 (anche placeholder temporanei per non avere link vuoti).
- **Blog:** scrivere i primi articoli seguendo il **Calendario blog (Parte 5)** del piano e usare `blog-post-template.html` come base.
- **SEO locale:** verificare NAP (Nome, Indirizzo, Telefono) uguali su sito, Google Business, social, directory.

### Fase 4 — Scelta successiva

A seconda dell’obiettivo:

- **Andare online con il prototipo:** mettere i file su hosting statico (es. Netlify, GitHub Pages, KaliWeb come sito statico) e puntare il dominio. Poi avviare il **Piano marketing (Parte 4)** (meta, Google Ads, ecc.).
- **Convertire a WordPress (Parte 6):** creare il tema partendo da questo HTML/CSS/JS, integrare i plugin indicati nel piano (Yoast/Rank Math, WPForms/CF7, Smash Balloon, Iubenda, PixelYourSite, cache, ShortPixel, Redirection, backup) e mantenere stesso design e stessi URL (o gestire redirect 301).

---

## Riepilogo “cosa fare adesso”

1. **Subito:** eseguire la **VERIFICA** (Fase 1) in locale e correggere eventuali errori.
2. **Subito dopo:** creare **logo/favicon** (Fase 2) per eliminare il 404.
3. **Poi:** immagini hero/sedi/OG e primi articoli blog (Fase 3).
4. **Infine:** decidere se **andare online** con il sito statico e il marketing oppure **convertire a WordPress** e poi andare online.

Se vuoi, il passo successivo concreto può essere: creare la cartella `assets/img/logo/` e un `favicon.svg` minimo, così il sito passa la verifica senza 404 sul favicon.
