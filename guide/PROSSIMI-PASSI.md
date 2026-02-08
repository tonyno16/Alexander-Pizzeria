# Cosa fare adesso — Alexander Pizzeria

Stato: **prototipo quasi completo**. Hero e foto delle 4 sedi sono a posto. Restano questi passi.

---

## 1. Verifica finale (prima di andare online)

- [ ] Aprire il sito in locale (`python -m http.server 8000` → http://localhost:8000).
- [ ] Controllare **tutte le pagine**: link, menu, bottoni (Chiama, Prenota, Mappa, WhatsApp).
- [ ] Testare **menu.html** e **prenota-un-tavolo.html**: i tab cambiano sede e l’iframe si aggiorna.
- [ ] Testare **form Lavora con noi**: validazione (campi obbligatori, email, file CV).
- [ ] **Responsive**: provare su mobile (375px), tablet (768px), desktop.
- [ ] **Schema.org**: incollare l’HTML di una pagina su [validator.schema.org](https://validator.schema.org/) e correggere eventuali errori.
- [ ] **Performance**: [PageSpeed Insights](https://pagespeed.web.dev/) (obiettivo >80 su mobile).

---

## 2. Immagini Open Graph (condivisione social)

Quando qualcuno condivide un link (WhatsApp, Facebook, ecc.) appare un’anteprima. Ora **manca** l’immagine.

- **Cosa fare:** creare almeno **og-home.jpg** (1200×630 px) e metterla in `assets/img/og/`.
- **Poi:** aggiungere in **index.html** (e, se vuoi, nelle altre pagine) il meta tag:
  ```html
  <meta
    property="og:image"
    content="https://www.alexanderpizzeria.com/assets/img/og/og-home.jpg"
  />
  ```
- Dettagli e nomi per le altre pagine in **FOTO-DA-AGGIUNGERE.md**.

---

## 3. Immagini blog (opzionale ma consigliato)

- **Cartella:** `assets/img/blog/`
- Aggiungere un’immagine per articolo (es. `funghi-porcini-giaveno.jpg`, `impasto-lunga-lievitazione.jpg`).
- Poi si possono aggiornare **blog.html**, **index.html** (sezione “Dal Nostro Blog”) e **blog-post-template.html** per usare queste immagini al posto dei placeholder.

---

## 4. Feed Instagram (placeholder attuale)

In homepage la sezione “Chi Ama Alexander Ci Segua!” usa ancora **placeholder** (rettangoli con scritta “Instagram Post”).

- **Nel prototipo:** si può lasciare così o sostituire con 6–8 foto statiche in `assets/img/` collegate a mano.
- **In WordPress:** si userà il plugin Smash Balloon (o simile) per il feed reale.

---

## 5. Andare online

- Scegliere un **hosting** (es. KaliWeb Corporate come da piano, o Netlify/Vercel per sito statico).
- Caricare i file (o collegare il repository GitHub).
- Configurare il **dominio** (es. www.alexanderpizzeria.com) e **SSL** (HTTPS).
- Verificare che **GA4** e **Facebook Pixel** ricevano dati (consenso cookie già gestito con Iubenda).

---

## 6. Dopo il lancio

- **Google Business Profile:** 1 profilo per sede, NAP uguale al sito.
- **Piano marketing:** campagne Meta/Google, WhatsApp, blog (vedi piano originale).
- **Conversione WordPress:** se prevista, creare il tema partendo da questo HTML e integrare i plugin (Yoast, WPForms, Smash Balloon, ecc.).

---

## Riepilogo “cosa fare subito”

| Priorità        | Azione                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------- |
| **Ora**         | Fare la **verifica finale** (punto 1): tutte le pagine, tab, form, responsive.              |
| **Poi**         | Aggiungere **og-home.jpg** (1200×630) in `assets/img/og/` e il meta `og:image` in homepage. |
| **Quando vuoi** | Immagini blog, feed Instagram reale, messa online, marketing.                               |

Se mi dici su cosa vuoi lavorare per primo (verifica, OG, blog o messa online), posso guidarti passo passo.
