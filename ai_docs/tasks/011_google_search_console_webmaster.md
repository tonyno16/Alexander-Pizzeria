# AI Task: Google Search Console e Webmaster Tools

---

## 1. Task Overview

### Task Title

**Title:** Configurazione Google Search Console e Strumenti Webmaster

### Goal Statement

**Goal:** Configurare Google Search Console, Bing Webmaster Tools e altri strumenti di monitoraggio per tracciare l'indicizzazione, le performance SEO, e identificare problemi tecnici del sito.

---

## 2. Strumenti da Configurare

| Strumento               | Scopo                                          | Priorità |
| ----------------------- | ---------------------------------------------- | -------- |
| Google Search Console   | Indicizzazione, query, errori, Core Web Vitals | Alta     |
| Bing Webmaster Tools    | Indicizzazione Bing/Yahoo                      | Media    |
| Google Business Profile | SEO locale, recensioni, Maps                   | Alta     |
| Schema Markup Validator | Verifica structured data                       | Media    |
| PageSpeed Insights      | Monitoraggio performance                       | Media    |

---

## 3. Implementation Plan

### Phase 1: Google Search Console

**Goal:** Configurare GSC e verificare proprietà

- [ ] **Task 1.1:** Accedere a Google Search Console

  - URL: https://search.google.com/search-console
  - Accedere con account Google aziendale

- [ ] **Task 1.2:** Aggiungere proprietà

  - Tipo: "Prefisso URL"
  - URL: `https://www.alexanderpizzeria.com`

- [ ] **Task 1.3:** Verificare proprietà (scegliere un metodo)

  **Metodo A - Tag HTML (Consigliato):**

  ```html
  <!-- Aggiungere in <head> di tutte le pagine -->
  <meta name="google-site-verification" content="CODICE_VERIFICA_GOOGLE" />
  ```

  **Metodo B - File HTML:**

  - Scaricare file `googleXXXXXXXX.html` da GSC
  - Caricarlo nella root del sito

  **Metodo C - DNS (se hai accesso):**

  - Aggiungere record TXT nel DNS

- [ ] **Task 1.4:** Inviare Sitemap

  - Andare su "Sitemap" nel menu
  - Aggiungere: `https://www.alexanderpizzeria.com/sitemap.xml`
  - Verificare stato "Riuscito"

- [ ] **Task 1.5:** Richiedere indicizzazione pagine principali
  - Usare "Controllo URL" per ogni pagina importante
  - Cliccare "Richiedi indicizzazione"
  - Pagine prioritarie:
    - / (homepage)
    - /pinerolo.html
    - /piossasco.html
    - /giaveno.html
    - /rivoli.html
    - /menu.html
    - /prenota-un-tavolo.html

### Phase 2: Collegamento GA4 con Search Console

**Goal:** Vedere dati query in GA4

- [ ] **Task 2.1:** In Google Analytics 4

  - Admin > Collegamento prodotti > Search Console
  - Collegare la proprietà GSC

- [ ] **Task 2.2:** Verificare report
  - Rapporti > Acquisizione > Search Console
  - Query, pagine di destinazione, dispositivi

### Phase 3: Google Business Profile

**Goal:** Ottimizzare presenza su Google Maps

- [ ] **Task 3.1:** Verificare/creare profili per ogni sede

  - URL: https://business.google.com
  - Cercare "Alexander Pizzeria Pinerolo" etc.

- [ ] **Task 3.2:** Completare informazioni per ogni sede

  - Nome: Alexander Pizzeria [Città]
  - Indirizzo completo
  - Telefono
  - Orari di apertura
  - Categoria: Pizzeria, Ristorante italiano
  - Sito web: link alla pagina sede specifica
  - Foto: interno, esterno, piatti

- [ ] **Task 3.3:** Aggiungere attributi

  - Prenotazione tavolo (link a prenota-un-tavolo.html)
  - Ordine online (link delivery Pienissimo)
  - Menu (link a menu.html)
  - Wi-Fi, parcheggio, accessibilità

- [ ] **Task 3.4:** Collegare sito a Google Business
  - Nel profilo Business: Modifica > Sito web
  - Inserire URL pagina sede

### Phase 4: Bing Webmaster Tools

**Goal:** Indicizzazione su Bing/Yahoo

- [ ] **Task 4.1:** Accedere a Bing Webmaster Tools

  - URL: https://www.bing.com/webmasters
  - Accedere con account Microsoft

- [ ] **Task 4.2:** Aggiungere sito

  - URL: `https://www.alexanderpizzeria.com`

- [ ] **Task 4.3:** Verificare proprietà

  **Metodo A - Tag HTML:**

  ```html
  <meta name="msvalidate.01" content="CODICE_VERIFICA_BING" />
  ```

  **Metodo B - Importa da GSC:**

  - Bing può importare automaticamente da Google Search Console

- [ ] **Task 4.4:** Inviare Sitemap
  - Menu > Sitemap
  - Aggiungere URL sitemap

### Phase 5: Meta Tag Verifica nel Sito ✅ (implementato)

**Goal:** Aggiungere tutti i tag di verifica

- [x] **Task 5.1:** Aggiungere meta tag in `<head>` di tutte le pagine

  - Inseriti in: index, menu, prenota-un-tavolo, lavora-con-noi, alexander-lovers, blog, blog-post-template, pinerolo, piossasco, giaveno, rivoli, 404.
  - Placeholder attuali: `INSERIRE_CODICE_GOOGLE` e `INSERIRE_CODICE_BING`.
  - **Da fare:** in Google Search Console e Bing Webmaster ottenere i codici di verifica, poi sostituire i placeholder in tutte le pagine (cerca "INSERIRE_CODICE_GOOGLE" e "INSERIRE_CODICE_BING").
  - Opzionale: aggiungere `<meta name="facebook-domain-verification" content="TUO_CODICE_FB" />` se usi Domain Verification su Facebook.

- [ ] **Task 5.2:** Dopo aver inserito i codici reali, rigenerare bundle se necessario
  ```bash
  npm run build:css && npm run build:js
  ```

### Phase 6: Monitoraggio e Report

**Goal:** Configurare alert e report

- [ ] **Task 6.1:** Configurare alert GSC

  - Impostazioni > Notifiche email
  - Attivare notifiche per errori critici

- [ ] **Task 6.2:** Verificare Core Web Vitals

  - GSC > Esperienza > Segnali web essenziali
  - Controllare LCP, FID, CLS

- [ ] **Task 6.3:** Controllare copertura indicizzazione

  - GSC > Indicizzazione > Pagine
  - Verificare pagine indicizzate vs escluse

- [ ] **Task 6.4:** Monitorare errori
  - Errori 404
  - Problemi di scansione
  - Problemi di usabilità mobile

---

## 4. Checklist Verifica Proprietà

### Google Search Console

```
□ Proprietà aggiunta
□ Verifica completata (tag HTML o file)
□ Sitemap inviata
□ Pagine principali indicizzate
□ Collegato a GA4
```

### Bing Webmaster Tools

```
□ Sito aggiunto
□ Verifica completata
□ Sitemap inviata
```

### Google Business Profile (per ogni sede)

```
□ Pinerolo - Profilo verificato e completo
□ Piossasco - Profilo verificato e completo
□ Giaveno - Profilo verificato e completo
□ Rivoli - Profilo verificato e completo
```

---

## 5. Codici da Ottenere

| Strumento             | Dove Trovare                            | Formato                                 |
| --------------------- | --------------------------------------- | --------------------------------------- |
| Google Search Console | Impostazioni > Verifica proprietà       | `google-site-verification` meta tag     |
| Bing Webmaster        | Dashboard > Verifica                    | `msvalidate.01` meta tag                |
| Facebook              | Business Settings > Domain Verification | `facebook-domain-verification` meta tag |

---

## 6. Aggiornamento HTML

Aggiungere in `<head>` di **tutte le pagine HTML**:

```html
<!-- Webmaster Tools Verification -->
<meta name="google-site-verification" content="INSERIRE_CODICE_GOOGLE" />
<meta name="msvalidate.01" content="INSERIRE_CODICE_BING" />
```

### File da Modificare (già aggiornati con placeholder)

- index.html, pinerolo.html, piossasco.html, giaveno.html, rivoli.html
- menu.html, prenota-un-tavolo.html, alexander-lovers.html, lavora-con-noi.html
- blog.html, blog-post-template.html, 404.html

---

## 7. Report da Monitorare Settimanalmente

### Google Search Console

| Report        | Cosa Controllare                         |
| ------------- | ---------------------------------------- |
| Rendimento    | Click, impressioni, CTR, posizione media |
| Pagine        | Pagine indicizzate, errori, avvisi       |
| Esperienza    | Core Web Vitals, usabilità mobile        |
| Miglioramenti | Breadcrumb, FAQ, dati strutturati        |

### Google Analytics 4

| Report                  | Cosa Controllare             |
| ----------------------- | ---------------------------- |
| Acquisizione > Organico | Traffico da Google           |
| Search Console > Query  | Keyword che portano traffico |
| Conversioni             | click_booking, click_call    |

---

## 8. Timeline Indicizzazione

| Fase                      | Tempo Stimato |
| ------------------------- | ------------- |
| Verifica proprietà        | Immediato     |
| Prima scansione           | 1-3 giorni    |
| Indicizzazione homepage   | 3-7 giorni    |
| Indicizzazione completa   | 2-4 settimane |
| Dati significativi in GSC | 1-2 mesi      |

---

## 9. Troubleshooting Comune

### "Pagina non indicizzata"

1. Controllare robots.txt (non deve bloccare)
2. Verificare meta robots (non deve avere noindex)
3. Richiedere indicizzazione manuale
4. Verificare canonical URL corretto

### "Errori Core Web Vitals"

1. Controllare LCP (immagini grandi?)
2. Controllare CLS (elementi che si spostano?)
3. Usare PageSpeed Insights per dettagli

### "Sitemap non letta"

1. Verificare formato XML corretto
2. Controllare che tutti gli URL siano accessibili
3. Verificare che non ci siano errori 404

---

## 10. Success Criteria

- [ ] Google Search Console verificato e attivo
- [ ] Sitemap inviata e accettata
- [ ] Almeno 5 pagine indicizzate
- [ ] GA4 collegato a Search Console
- [ ] Bing Webmaster Tools configurato
- [ ] 4 profili Google Business completi
- [ ] Core Web Vitals tutti verdi
- [ ] Nessun errore critico in GSC

---

## 11. Link Utili

| Strumento               | URL                                            |
| ----------------------- | ---------------------------------------------- |
| Google Search Console   | https://search.google.com/search-console       |
| Google Analytics        | https://analytics.google.com                   |
| Google Business Profile | https://business.google.com                    |
| Bing Webmaster Tools    | https://www.bing.com/webmasters                |
| PageSpeed Insights      | https://pagespeed.web.dev                      |
| Rich Results Test       | https://search.google.com/test/rich-results    |
| Schema Validator        | https://validator.schema.org                   |
| Mobile-Friendly Test    | https://search.google.com/test/mobile-friendly |

---

---

## 12. Cosa fare adesso (passi manuali)

1. **Google Search Console** – Vai su https://search.google.com/search-console → Aggiungi proprietà → Prefisso URL `https://www.alexanderpizzeria.com` → Verifica con “Tag HTML”: copia il valore `content="..."` e sostituisci `INSERIRE_CODICE_GOOGLE` in tutte le pagine.
2. **Sitemap GSC** – In GSC → Sitemap → Aggiungi `https://www.alexanderpizzeria.com/sitemap.xml`.
3. **Bing Webmaster** – Vai su https://www.bing.com/webmasters → Aggiungi sito → Verifica (tag HTML): copia il valore e sostituisci `INSERIRE_CODICE_BING` in tutte le pagine.
4. **Collegamento GA4** – In GA4: Admin → Collegamento prodotti → Search Console.
5. **Google Business Profile** – Verifica/completa i 4 profili (Pinerolo, Piossasco, Giaveno, Rivoli) su https://business.google.com.

_Created: 2026-02-08_
