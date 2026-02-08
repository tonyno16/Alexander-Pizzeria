# AI Task: Funzionalità e Correzioni

---

## 1. Task Overview

### Task Title

**Title:** Completamento Funzionalità e Correzioni Sito

### Goal Statement

**Goal:** Completare le funzionalità mancanti del sito: attivare il blog per SEO content, correggere link Privacy/Cookie Policy, aggiungere newsletter signup (opzionale), e sistemare eventuali broken links.

---

## 2. Current State Analysis

### Funzionalità esistenti

- ✅ Homepage completa
- ✅ Pagine sedi (Pinerolo, Piossasco, Giaveno, Rivoli)
- ✅ Pagina prenotazione
- ✅ Pagina menu
- ✅ Pagina Alexander Lovers (fedeltà)
- ✅ Pagina Lavora con Noi
- ✅ Blog template (blog.html, blog-post-template.html)
- ✅ Widget WhatsApp
- ✅ Cookie consent (cookie-consent.js)

### Problemi identificati

- ~~❌ Privacy Policy link punta a `#` (broken)~~ ✅ Risolto con Iubenda
- ~~❌ Cookie Policy link punta a `#` (broken)~~ ✅ Risolto con Iubenda
- ❌ Blog vuoto (nessun contenuto reale)
- ❌ Newsletter signup non presente

---

## 3. Implementation Plan

### Phase 1: Privacy e Cookie Policy ✅ (completata con Iubenda)

**Goal:** Policy funzionanti e Cookie Solution installata

- [x] **Task 1.1–1.2:** Policy ospitate su Iubenda (nessuna pagina locale)

  - Privacy Policy: `https://www.iubenda.com/privacy-policy/32284578`
  - Cookie Policy: `https://www.iubenda.com/privacy-policy/32284578/cookie-policy`
  - Link nel footer con classi `iubenda-embed` + script `iubenda.js` per apertura in overlay

- [x] **Task 1.3:** Cookie Solution e Privacy Controls installate
  - Script Iubenda (config + sync/tcf/iubenda_cs.js) inseriti **all’inizio del `<head>`** in tutte le 12 pagine
  - Banner cookie: float-top-center, lingua IT, cookiePolicyId 32284578, siteId 1444752
  - Pulsante preferenze in basso a destra

**Pagine aggiornate:** index.html, menu.html, prenota-un-tavolo.html, lavora-con-noi.html, alexander-lovers.html, blog.html, blog-post-template.html, pinerolo.html, piossasco.html, giaveno.html, rivoli.html, 404.html

### Phase 2: Blog Content Strategy

**Goal:** Attivare il blog per SEO

- [ ] **Task 2.1:** Analizzare template blog esistente

  - File: `blog.html`, `blog-post-template.html`

- [ ] **Task 2.2:** Creare 2-3 articoli iniziali

  - Articolo 1: "La nostra storia: dal 2004 ad oggi"
  - Articolo 2: "L'arte dell'impasto a lunga lievitazione"
  - Articolo 3: "I funghi porcini della Valsangone"

- [ ] **Task 2.3:** Struttura articolo blog
  ```
  blog/
  ├── index.html (lista articoli)
  ├── la-nostra-storia.html
  ├── impasto-lunga-lievitazione.html
  └── funghi-porcini-valsangone.html
  ```

### Phase 3: Newsletter Signup (Opzionale)

**Goal:** Aggiungere form per raccolta email

- [ ] **Task 3.1:** Decidere provider newsletter

  - Opzioni: Mailchimp, Brevo (ex Sendinblue), semplice Google Form

- [ ] **Task 3.2:** Aggiungere sezione newsletter in footer
  ```html
  <div class="footer__newsletter">
    <h4>Resta Aggiornato</h4>
    <p>Iscriviti per ricevere offerte esclusive e novità.</p>
    <form action="..." method="POST" class="newsletter-form">
      <input type="email" placeholder="La tua email" required />
      <button type="submit" class="btn btn--primary">Iscriviti</button>
    </form>
  </div>
  ```

### Phase 4: Verifiche e Fix

**Goal:** Controllare e sistemare problemi

- [ ] **Task 4.1:** Verificare tutti i link del sito

  - Controllare link interni
  - Controllare link esterni (social, Pienissimo, Google Maps)

- [ ] **Task 4.2:** Verificare form "Lavora con Noi"

  - Controllare che il form invii correttamente

- [ ] **Task 4.3:** Verificare immagini mancanti o broken

  - Controllare assets/img/

- [ ] **Task 4.4:** Verificare 404.html funzionante
  - Controllare redirect Vercel

---

## 4. Code Changes Overview

### Privacy Policy Template (Estratto)

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <title>Privacy Policy | Alexander Pizzeria</title>
    <meta
      name="description"
      content="Informativa sulla privacy di Alexander Pizzeria ai sensi del GDPR."
    />
    <meta name="robots" content="noindex, follow" />
    <!-- ... -->
  </head>
  <body>
    <!-- Header standard -->

    <main id="main-content">
      <section class="section">
        <div class="container" style="max-width: var(--container-narrow)">
          <h1>Privacy Policy</h1>
          <p class="text-muted">Ultimo aggiornamento: Febbraio 2026</p>

          <h2>1. Titolare del Trattamento</h2>
          <p>Alexander S.R.L. - P.IVA 10021390017</p>

          <h2>2. Dati Raccolti</h2>
          <p>Raccogliamo i seguenti dati:</p>
          <ul>
            <li>Dati di navigazione (IP, browser, pagine visitate)</li>
            <li>Dati forniti volontariamente (prenotazioni, form contatto)</li>
          </ul>

          <!-- ... altre sezioni ... -->
        </div>
      </section>
    </main>

    <!-- Footer standard -->
  </body>
</html>
```

### Footer Link Update

```html
<!-- Prima -->
<a href="#">Privacy Policy</a>
<a href="#">Cookie Policy</a>

<!-- Dopo -->
<a href="privacy-policy.html">Privacy Policy</a>
<a href="cookie-policy.html">Cookie Policy</a>
```

---

## 5. Blog Article Structure

### Template Articolo

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <title>[Titolo Articolo] | Blog Alexander Pizzeria</title>
    <meta name="description" content="[Descrizione 150-160 caratteri]" />
    <link
      rel="canonical"
      href="https://www.alexanderpizzeria.com/blog/[slug].html"
    />
    <!-- Schema Article -->
  </head>
  <body>
    <main>
      <article class="blog-post">
        <header class="blog-post__header">
          <span class="tag tag--gold">[Categoria]</span>
          <h1>[Titolo]</h1>
          <p class="blog-post__meta">
            <time datetime="2026-02-08">8 Febbraio 2026</time>
            · 5 min lettura
          </p>
        </header>

        <img
          src="assets/img/blog/[immagine].webp"
          alt="[Alt descrittivo]"
          class="blog-post__hero"
        />

        <div class="blog-post__content prose">
          <!-- Contenuto articolo -->
        </div>

        <footer class="blog-post__footer">
          <p>Ti è piaciuto questo articolo?</p>
          <a href="prenota-un-tavolo.html" class="btn btn--primary">
            Prenota il Tuo Tavolo
          </a>
        </footer>
      </article>
    </main>
  </body>
</html>
```

---

## 6. Priority Order

| Priorità | Task                  | Impatto                      |
| -------- | --------------------- | ---------------------------- |
| 🔴 Alta  | Privacy/Cookie Policy | GDPR compliance obbligatorio |
| 🟡 Media | Blog content          | SEO long-term                |
| 🟢 Bassa | Newsletter            | Nice-to-have per marketing   |

---

## 7. Success Criteria

- [x] Privacy Policy accessibile e completa (Iubenda)
- [x] Cookie Policy accessibile e completa (Iubenda)
- [x] Link footer funzionanti (embed Iubenda)
- [ ] Almeno 1 articolo blog pubblicato
- [ ] Nessun broken link nel sito
- [ ] Form Lavora con Noi funzionante

---

## 8. Notes

### GDPR Compliance

Per la privacy policy, includere:

- Nome e contatti del titolare del trattamento
- Finalità e base giuridica del trattamento
- Destinatari dei dati
- Trasferimenti extra-UE (se applicabile)
- Periodo di conservazione
- Diritti dell'interessato
- Diritto di reclamo al Garante

### Cookie utilizzati (da verificare)

- Google Analytics (se presente)
- Widget WhatsApp
- Iframe Pienissimo (prenotazioni)
- Font Google (possibili cookie)

---

## 9. Dependencies

- **Nessuna dipendenza esterna**
- **Può essere fatto in parallelo** con altri task

---

_Created: 2026-02-08_
