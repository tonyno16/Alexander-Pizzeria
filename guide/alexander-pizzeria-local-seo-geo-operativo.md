# Alexander Pizzeria — Piano Operativo Local SEO + GEO + LLM Visibility

**Versione:** 1.0  
**Data:** 22 settembre 2026  
**Obiettivo principale:** aumentare la probabilità che Alexander Pizzeria venga trovata, compresa, verificata e citata da Google, Google Maps, Bing, ChatGPT, Gemini, Claude, Perplexity e altri sistemi di ricerca/risposta AI per query locali e intenti ad alta conversione.

---

## 0. Obiettivo del progetto

Il progetto NON deve limitarsi alla SEO tradizionale.

La nuova architettura deve ottimizzare contemporaneamente:

1. **Local SEO**
2. **Google Maps / Business Profile**
3. **Entity SEO**
4. **GEO — Generative Engine Optimization**
5. **AEO — Answer Engine Optimization**
6. **Crawlability**
7. **Machine readability**
8. **Citation consistency**
9. **Authority locale**
10. **Conversione: prenotazioni, chiamate, WhatsApp, indicazioni stradali**

La logica di fondo è:

```text
Alexander Pizzeria
       ↓
Dati proprietari coerenti
       ↓
Google / Bing / Maps / Tripadvisor / AIC / Gluto / directory
       ↓
stessa entità verificata da più fonti indipendenti
       ↓
maggiore confidence
       ↓
maggiore possibilità di apparire nei motori di ricerca e nelle risposte AI
```

---

# 1. PRIORITÀ ASSOLUTA — ENTITY SOURCE OF TRUTH

Creare una sola fonte dati centrale per tutte le sedi.

## 1.1 File consigliato

Se il progetto è Next.js / React:

```text
/data/alexander-locations.ts
```

oppure:

```text
/data/alexander-locations.json
```

Se il sito usa un CMS, creare una collection/tabella equivalente.

## 1.2 Schema dati minimo

```ts
export type AlexanderLocation = {
  id: string
  slug: string
  canonicalUrl: string

  brandName: string
  locationName: string
  legalName?: string

  streetAddress: string
  postalCode: string
  city: string
  province: string
  region: string
  country: string

  latitude: number
  longitude: number

  phone: string
  whatsapp?: string
  email?: string

  openingHours: {
    dayOfWeek: string[]
    opens: string
    closes: string
  }[]

  cuisine: string[]

  glutenFree: boolean
  aic: boolean
  aicOfficialUrl?: string

  woodFiredOven: boolean
  gasOven: boolean

  takeaway: boolean
  delivery: boolean
  reservations: boolean
  wheelchairAccessible?: boolean
  parking?: boolean
  petsAllowed?: boolean

  menuUrl: string
  bookingUrl?: string
  googleMapsUrl?: string
  googlePlaceId?: string
  tripadvisorUrl?: string
  instagramUrl?: string
  facebookUrl?: string
  glutoUrl?: string

  openedYear?: number

  shortDescription: string
  longDescription?: string

  images: string[]
}
```

---

# 2. DATI DA VALIDARE PRIMA DI QUALSIASI DEPLOY

Creare una tabella di validazione interna.

## 2.1 Sedi

```text
Alexander Pizzeria Piossasco
Alexander Pizzeria Pinerolo
Ristorante Valsangone / Alexander Giaveno
Alexander Pizzeria Rivoli
```

## 2.2 Verificare manualmente per ogni sede

- nome commerciale esatto
- indirizzo
- CAP
- telefono
- WhatsApp
- coordinate
- giorni di apertura
- orari
- delivery sì/no
- asporto sì/no
- prenotazione sì/no
- forno a legna sì/no
- forno a gas sì/no
- certificazione / adesione AIC
- URL AIC ufficiale
- URL Google Maps
- Place ID
- URL Tripadvisor
- URL Gluto
- URL Facebook
- URL Instagram
- anno di apertura

## 2.3 Incongruenze da correggere

### Anno di fondazione

Attualmente risultano riferimenti differenti a:

```text
2004
2009
```

Scegliere l'anno corretto sulla base dei dati ufficiali e usarlo OVUNQUE.

### Orari

Non devono esistere differenze tra:

```text
Homepage
Pagina sede
Google Business Profile
Tripadvisor
Restaurant Guru
Facebook
Apple Maps
Bing Places
Gluto
altre directory
```

### Sede legale

Verificare il dato societario reale di Alexander S.R.L. e usare un solo indirizzo legale.

### Delivery

Definire una volta per tutte per ogni sede:

```text
delivery: true | false
takeaway: true | false
```

Poi correggere le fonti esterne errate.

### Forno Rivoli

Se Rivoli usa forno professionale a gas:

```text
woodFiredOven: false
gasOven: true
```

Le altre sedi devono riflettere la configurazione reale.

---

# 3. ARCHITETTURA ENTITÀ

Il sito deve rappresentare chiaramente:

```text
Alexander S.R.L.
│
├── Alexander Pizzeria Piossasco
├── Alexander Pizzeria Pinerolo
├── Ristorante Valsangone
└── Alexander Pizzeria Rivoli
```

Ogni sede è un'entità `Restaurant` indipendente.

L'organizzazione principale è un'entità `Organization`.

---

# 4. URL CANONICHE

Conservare URL semplici e permanenti.

```text
https://www.alexanderpizzeria.com/
https://www.alexanderpizzeria.com/piossasco/
https://www.alexanderpizzeria.com/pinerolo/
https://www.alexanderpizzeria.com/giaveno/
https://www.alexanderpizzeria.com/rivoli/
https://www.alexanderpizzeria.com/menu/
https://www.alexanderpizzeria.com/senza-glutine/
```

Non creare inutilmente varianti tipo:

```text
/pizzeria-pinerolo/
/pizza-pinerolo/
/migliore-pizzeria-pinerolo/
/pizza-pinerolo-centro/
/pizza-gluten-free-pinerolo/
```

se il contenuto sarebbe quasi duplicato.

---

# 5. CANONICAL

Ogni pagina deve avere canonical autoreferenziale.

Esempio:

```html
<link
  rel="canonical"
  href="https://www.alexanderpizzeria.com/pinerolo/"
/>
```

Verificare che:

- HTTP → HTTPS
- www/non-www
- slash/no slash
- parametri UTM

convergano correttamente sulla URL canonica.

---

# 6. NAVIGAZIONE PRINCIPALE

Aggiungere una voce ben visibile:

```text
LE SEDI
├── Piossasco
├── Pinerolo
├── Giaveno
└── Rivoli
```

Non relegare le location page solo al footer.

Ogni pagina sede deve ricevere link interni sitewide o quasi-sitewide.

---

# 7. INTERNAL LINKING

Ogni sede deve linkare le altre.

Esempio Pinerolo:

```html
<section>
  <h2>Le altre sedi Alexander</h2>

  <ul>
    <li><a href="/piossasco/">Alexander Pizzeria Piossasco</a></li>
    <li><a href="/giaveno/">Ristorante Valsangone a Giaveno</a></li>
    <li><a href="/rivoli/">Alexander Pizzeria Rivoli</a></li>
  </ul>
</section>
```

Utilizzare anchor naturali, non keyword stuffing.

Buone anchor:

```text
Alexander Pizzeria Piossasco
pizzeria Alexander a Pinerolo
Ristorante Valsangone a Giaveno
Alexander Rivoli
pizza senza glutine Alexander
menu Alexander
```

---

# 8. ORGANIZATION JSON-LD

Creare un'entità madre.

## 8.1 Esempio

```tsx
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.alexanderpizzeria.com/#organization",

  name: "Alexander Pizzeria",
  legalName: "Alexander S.R.L.",

  url: "https://www.alexanderpizzeria.com/",
  logo: "https://www.alexanderpizzeria.com/path/logo.png",

  sameAs: [
    "URL_FACEBOOK_UFFICIALE",
    "URL_INSTAGRAM_UFFICIALE"
  ]
}
```

Renderizzare nel `<head>` o nel markup server-side:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(organizationSchema)
  }}
/>
```

---

# 9. RESTAURANT JSON-LD — UNA ENTITÀ PER SEDE

## 9.1 Esempio Pinerolo

```tsx
const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",

  "@id":
    "https://www.alexanderpizzeria.com/pinerolo/#restaurant",

  name:
    "Alexander Pizzeria Pinerolo",

  url:
    "https://www.alexanderpizzeria.com/pinerolo/",

  parentOrganization: {
    "@id":
      "https://www.alexanderpizzeria.com/#organization"
  },

  telephone:
    "+390121332035",

  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Achille Midana 37",
    postalCode: "10064",
    addressLocality: "Pinerolo",
    addressRegion: "TO",
    addressCountry: "IT"
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: "INSERIRE_LAT_CORRETTA",
    longitude: "INSERIRE_LNG_CORRETTA"
  },

  servesCuisine: [
    "Pizza",
    "Italian",
    "Gluten Free"
  ],

  hasMenu:
    "https://www.alexanderpizzeria.com/menu/",

  acceptsReservations: true,

  priceRange: "€€",

  sameAs: [
    "GOOGLE_MAPS_URL",
    "TRIPADVISOR_URL",
    "AIC_URL",
    "GLUTO_URL"
  ]
}
```

## 9.2 OpeningHoursSpecification

Aggiungere:

```json
"openingHoursSpecification": [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "18:30",
    "closes": "23:30"
  }
]
```

Usare SOLO gli orari verificati.

---

# 10. BREADCRUMBLIST

Implementare breadcrumbs visibili e schema.

Esempio:

```text
Home > Sedi > Pinerolo
```

Schema:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.alexanderpizzeria.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Pinerolo",
      "item": "https://www.alexanderpizzeria.com/pinerolo/"
    }
  ]
}
```

---

# 11. MENU MACHINE-READABLE

Il menu non deve vivere esclusivamente su servizi terzi.

Il sito deve contenere HTML indexabile con:

```text
nome pizza
categoria
ingredienti
prezzo
varianti
gluten-free sì/no
vegetariana sì/no
piccante sì/no
```

## 11.1 Struttura dati

```ts
type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  category: string
  glutenFreeAvailable: boolean
  vegetarian?: boolean
  image?: string
}
```

---

# 12. SCHEMA MENU

Esempio:

```json
{
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": "https://www.alexanderpizzeria.com/menu/#menu",
  "name": "Menu Alexander Pizzeria",

  "hasMenuSection": [
    {
      "@type": "MenuSection",
      "name": "Pizze",
      "hasMenuItem": [
        {
          "@type": "MenuItem",
          "name": "Aura",
          "description": "INGREDIENTI REALI",
          "offers": {
            "@type": "Offer",
            "price": "9.50",
            "priceCurrency": "EUR"
          }
        }
      ]
    }
  ]
}
```

Non inventare ingredienti o proprietà.

---

# 13. PAGINA HUB `/senza-glutine/`

Creare una pagina principale dedicata al tema.

## H1

```text
Pizza senza glutine Alexander
```

## Title consigliato

```text
Pizza Senza Glutine Alexander | Sedi e Locali AIC
```

## Meta description

```text
Scopri le sedi Alexander con proposta senza glutine, informazioni AIC, menu, procedure, prenotazioni e indirizzi a Pinerolo, Piossasco, Giaveno e Rivoli.
```

## Struttura

```text
H1 Pizza senza glutine Alexander

Intro

H2 Le sedi con proposta senza glutine

H3 Pinerolo
H3 Piossasco
H3 Giaveno
H3 Rivoli

H2 Alexander e il circuito AIC

H2 Come viene preparata la pizza senza glutine

H2 Gestione della contaminazione

H2 Ingredienti e impasti

H2 Menu senza glutine

H2 Domande frequenti

H2 Prenota nella sede più vicina
```

---

# 14. REGOLE IMPORTANTI PAGINA SENZA GLUTINE

NON affermare:

```text
siamo gli unici AIC della zona
siamo la migliore pizzeria
zero contaminazione
100% sicuro
```

se non dimostrabile.

Usare invece dati verificabili.

Esempio:

```text
La sede di Pinerolo aderisce al programma Alimentazione Fuori Casa AIC.
```

con link alla fonte ufficiale.

---

# 15. LOCATION PAGE TEMPLATE

Ogni pagina sede deve avere una struttura omogenea.

```text
H1 Alexander Pizzeria [Città]

Intro entity-first

Dati rapidi
- indirizzo
- telefono
- orari
- prenota
- indicazioni

H2 La pizzeria Alexander a [Città]

H2 Pizza e impasto

H2 Pizza senza glutine

H2 Menu

H2 Dove siamo

H2 Parcheggio e accessibilità

H2 Prenotazioni e asporto

H2 Recensioni

H2 Domande frequenti

H2 Le altre sedi Alexander
```

---

# 16. ENTITY-FIRST COPY

I primi 100-150 vocaboli della pagina devono spiegare chiaramente:

```text
chi è il locale
dove si trova
cosa serve
caratteristiche distintive
servizi principali
```

Esempio:

```text
Alexander Pizzeria Pinerolo è una pizzeria situata in Via Achille Midana 37 a Pinerolo, in provincia di Torino. Il locale propone pizza, opzioni senza glutine e un impasto caratterizzato da lunga maturazione. Sono disponibili prenotazione e asporto secondo le modalità indicate in questa pagina.
```

Non usare superlativi non verificabili.

---

# 17. FAQ SEMANTICHE

Le FAQ devono rispondere a intenti reali.

Esempi:

```text
Alexander Pinerolo prepara pizza senza glutine?
La sede è AIC?
È necessario prenotare?
È possibile ordinare da asporto?
Alexander fa consegna a domicilio?
Dove posso parcheggiare?
Il locale è accessibile?
Quali sono gli orari?
Posso vedere il menu online?
Sono ammessi animali?
```

Le risposte devono essere direttamente nel markup HTML.

---

# 18. HOME PAGE

La home deve fungere da hub del brand.

Struttura consigliata:

```text
H1 Alexander Pizzeria

Intro brand

H2 Scegli la tua sede
4 cards

H2 La nostra pizza

H2 Pizza senza glutine

H2 Il nostro impasto

H2 Menu

H2 Perché quattro sedi diverse

H2 Recensioni

H2 Prenota
```

---

# 19. CARD SEDI

Ogni card deve contenere:

```text
Nome sede
Città
breve descrizione
indirizzo
CTA "Scopri la sede"
CTA "Indicazioni"
CTA "Prenota"
```

I link alle location page devono essere normali `<a>` crawlable.

---

# 20. ROBOTS.TXT

Verificare che sia disponibile:

```text
https://www.alexanderpizzeria.com/robots.txt
```

Configurazione indicativa:

```txt
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: OAI-SearchBot
Allow: /

Sitemap: https://www.alexanderpizzeria.com/sitemap.xml
```

IMPORTANTE:

controllare anche Cloudflare, WAF, firewall, rate limiter e sistemi anti-bot.

Non basta `robots.txt` se il server restituisce:

```text
403
429
challenge
CAPTCHA
```

---

# 21. SITEMAP.XML

La sitemap deve includere almeno:

```text
/
piossasco/
pinerolo/
giaveno/
rivoli/
menu/
senza-glutine/
```

E i contenuti editoriali validi.

Escludere:

```text
URL duplicate
parametri
preview
staging
search page
pagine vuote
pagine thin
```

---

# 22. METADATA

## Esempio Pinerolo

Title:

```text
Alexander Pizzeria Pinerolo | Pizza e Senza Glutine
```

Description:

```text
Alexander Pizzeria a Pinerolo: menu, pizza, proposta senza glutine, orari, indirizzo, prenotazioni e informazioni sul locale.
```

Non forzare keyword ripetute.

---

# 23. OPEN GRAPH

Ogni sede deve avere OG personalizzato.

```html
<meta property="og:title" content="Alexander Pizzeria Pinerolo" />
<meta property="og:description" content="..." />
<meta property="og:url" content="https://www.alexanderpizzeria.com/pinerolo/" />
<meta property="og:image" content="URL_FOTO_PINEROLO" />
<meta property="og:type" content="website" />
```

---

# 24. IMMAGINI

Per ogni sede utilizzare immagini originali.

File naming:

```text
alexander-pizzeria-pinerolo-sala.webp
alexander-pizzeria-pinerolo-pizza.webp
alexander-pizzeria-pinerolo-esterno.webp
alexander-pizzeria-pinerolo-senza-glutine.webp
```

Alt:

```text
Pizza servita da Alexander Pizzeria Pinerolo
```

NON:

```text
migliore pizza pinerolo migliore pizzeria pinerolo pizza pinerolo
```

---

# 25. PERFORMANCE

Target tecnici:

```text
LCP < 2.5s
INP < 200ms
CLS < 0.1
```

Ottimizzare:

- immagini WebP/AVIF
- responsive images
- lazy loading
- preload hero
- font
- script esterni
- cookie banner
- map embed
- tracking

---

# 26. GOOGLE BUSINESS PROFILE — CHECKLIST

Per OGNI sede:

```text
[ ] nome corretto
[ ] categoria primaria corretta
[ ] categorie secondarie
[ ] indirizzo
[ ] pin corretto
[ ] telefono
[ ] sito → URL della sede
[ ] prenotazione
[ ] menu
[ ] orari
[ ] orari speciali
[ ] asporto
[ ] delivery
[ ] accessibilità
[ ] parcheggio
[ ] servizi
[ ] foto recenti
[ ] foto esterno
[ ] foto interno
[ ] foto menu
[ ] foto piatti
[ ] Q&A
[ ] descrizione aggiornata
```

Il link website di Pinerolo deve puntare a:

```text
/alexanderpizzeria.com/pinerolo/
```

non semplicemente alla home.

Stessa logica per tutte le sedi.

---

# 27. BING PLACES

Creare/verificare le 4 schede.

Dati identici alla Source of Truth.

Checklist:

```text
[ ] nome
[ ] indirizzo
[ ] telefono
[ ] orari
[ ] sito sede
[ ] categoria
[ ] foto
[ ] menu
```

---

# 28. APPLE MAPS

Verificare ogni sede.

Checklist:

```text
[ ] nome
[ ] pin
[ ] categoria
[ ] sito
[ ] telefono
[ ] orari
```

---

# 29. OPENSTREETMAP

Controllare che ciascuna sede abbia:

```text
name
amenity=restaurant
cuisine=pizza
website
phone
opening_hours
addr:street
addr:housenumber
addr:postcode
addr:city
```

Solo dati reali.

---

# 30. CITATION AUDIT

Creare un foglio di controllo.

Colonne:

```text
Source
Location
URL
Name
Address
Phone
Hours
Website
Delivery
Takeaway
AIC
Status
Last checked
Needs correction
```

Fonti iniziali:

```text
Google
Bing
Apple Maps
Tripadvisor
Restaurant Guru
Gluto
AIC
Facebook
Instagram
OpenStreetMap
PagineGialle
Yelp, se presente
TheFork, se presente
hotel locali
B&B locali
portali turistici
associazioni locali
Pro Loco
```

---

# 31. CORREZIONE CITATION POLLUTION

Cercare incoerenze come:

```text
telefono sbagliato
indirizzo sbagliato
orario vecchio
Instagram di un'altra sede
delivery non disponibile ma indicato come disponibile
nome attività differente
URL homepage invece di location page
```

Correggere in ordine di importanza:

```text
1 Google
2 Tripadvisor
3 Bing
4 Apple
5 AIC
6 Gluto
7 Restaurant Guru
8 directory locali
```

---

# 32. RECENSIONI

Non acquistare recensioni.

Non chiedere ai clienti di inserire keyword precise.

Flusso consigliato:

```text
Cliente
   ↓
QR sul tavolo / scontrino
   ↓
pagina /recensione/
   ↓
scegli sede
   ↓
Google Review
```

Copy:

```text
Ti è piaciuta la tua esperienza da Alexander?
Raccontaci cosa hai provato e come ti sei trovato.
```

---

# 33. PAGINA `/recensione/`

La pagina deve permettere di selezionare:

```text
Piossasco
Pinerolo
Giaveno
Rivoli
```

e aprire il relativo link diretto Google review.

Non filtrare gli utenti in base al voto.

---

# 34. RECENSIONI SUL SITO

Non hardcodare continuamente:

```text
571 recensioni
1200 recensioni
```

se non vengono aggiornate automaticamente.

Preferire:

```text
oltre 500 recensioni Google
```

oppure sincronizzare via API con cache.

Testo consigliato:

```text
Una selezione di recensioni recenti. Consulta Google Maps per vedere tutte le recensioni aggiornate.
```

---

# 35. BACKLINK STRATEGY LOCALE

Priorità a backlink geograficamente e semanticamente coerenti.

Target:

```text
hotel Pinerolo
B&B Pinerolo
hotel Piossasco
B&B Piossasco
strutture Giaveno / Val Sangone
hotel Rivoli
portali turistici locali
Pro Loco
blog Piemonte
giornali locali
guide senza glutine
associazioni
eventi locali
guide food
campeggi
agriturismi
```

---

# 36. LINK MAGNET LOCALI

Creare risorse originali.

Esempi:

```text
Guida senza glutine a Pinerolo
Guida senza glutine in Val Sangone
Dove mangiare dopo una giornata in montagna a Giaveno
Guida ai parcheggi serali vicino al centro di Pinerolo
Mappa delle attività gluten-free della zona
Statistiche Alexander sulle pizze più ordinate
```

Le guide devono essere realmente utili e non finte pagine promozionali.

---

# 37. DIGITAL PR

Raccogliere dati proprietari.

Esempio:

```text
Top 10 pizze ordinate
percentuale ordini gluten-free
periodi dell'anno con maggiore domanda
ingredienti più richiesti
evoluzione delle preferenze
```

Possibile titolo stampa:

```text
Alexander: cresce la domanda di pizza senza glutine nel Torinese
```

Solo se supportato da dati reali.

---

# 38. GIAVENO — CLUSTER INDIPENDENTE

Ristorante Valsangone può presidiare:

```text
ristorante Giaveno
ristorante Val Sangone
pizza Giaveno
ristorante funghi porcini Giaveno
cucina piemontese Giaveno
ristorante senza glutine Giaveno
pranzo Giaveno
```

Non trattarlo soltanto come "quarta sede pizza".

Creare contenuti specifici sulla sua identità reale.

---

# 39. PINEROLO — CLUSTER PRIORITARIO

Query da monitorare:

```text
pizzeria pinerolo
pizza pinerolo
pizza senza glutine pinerolo
pizzeria senza glutine pinerolo
pizzeria aic pinerolo
ristorante senza glutine pinerolo
pizza asporto pinerolo
pizzeria aperta domenica pinerolo
```

---

# 40. PIOSSASCO — CLUSTER PRIORITARIO

```text
pizzeria piossasco
pizza piossasco
pizza senza glutine piossasco
pizzeria senza glutine piossasco
pizzeria aic piossasco
pizza asporto piossasco
```

---

# 41. RIVOLI — CLUSTER PRIORITARIO

```text
pizzeria rivoli
pizza rivoli
pizza senza glutine rivoli
pizzeria senza glutine rivoli
pizzeria centro rivoli
pizza asporto rivoli
```

---

# 42. QUERY LLM — TEST SET

Creare un dataset fisso e testarlo periodicamente.

## Pinerolo

```text
Consigliami una pizzeria a Pinerolo
Dove mangiare una buona pizza a Pinerolo?
Quali sono le migliori pizzerie di Pinerolo?
Pizzeria senza glutine a Pinerolo
Dove può mangiare pizza un celiaco a Pinerolo?
Pizzeria AIC a Pinerolo
Pizza da asporto a Pinerolo
Pizzeria aperta domenica a Pinerolo
```

## Piossasco

```text
Consigliami una pizzeria a Piossasco
Pizza senza glutine Piossasco
Pizzeria per celiaci Piossasco
Dove mangiare pizza a Piossasco?
```

## Giaveno

```text
Consigliami un ristorante a Giaveno
Consigliami una pizzeria a Giaveno
Dove mangiare funghi porcini a Giaveno?
Ristorante senza glutine a Giaveno
Ristorante AIC Giaveno
Dove mangiare in Val Sangone?
```

## Rivoli

```text
Consigliami una pizzeria a Rivoli
Pizza senza glutine Rivoli
Pizzeria centro Rivoli
Pizzeria per celiaci Rivoli
```

---

# 43. LLM TRACKING TABLE

Salvare ogni test.

```text
date
model
prompt
Alexander mentioned?
position in answer
location mentioned?
link included?
citation included?
competitors mentioned
source cited
notes
```

Modelli:

```text
ChatGPT
Gemini
Claude
Perplexity
Microsoft Copilot
```

---

# 44. GEO KPI

KPI principali:

```text
LLM mention rate
LLM citation rate
citation source diversity
brand query growth
organic clicks location pages
Google Maps actions
calls
direction requests
booking clicks
menu clicks
WhatsApp clicks
review velocity
referring local domains
indexed location pages
```

---

# 45. EVENT TRACKING

Implementare eventi analytics.

```text
click_phone
click_whatsapp
click_booking
click_menu
click_google_maps
click_tripadvisor
click_instagram
location_switch
gluten_free_cta
```

Esempio:

```js
gtag("event", "click_booking", {
  location: "pinerolo"
})
```

---

# 46. UTM

Per campagne controllate:

```text
?utm_source=google_business&utm_medium=organic&utm_campaign=pinerolo
```

Per link social:

```text
?utm_source=instagram&utm_medium=social&utm_campaign=pinerolo
```

Non usare UTM nelle canonical.

---

# 47. SEARCH CONSOLE

Controllare:

```text
Coverage / Page Indexing
Sitemaps
Enhancements
Core Web Vitals
Manual Actions
Security Issues
Performance
```

Creare filtri per:

```text
/pinerolo/
/piossasco/
/giaveno/
/rivoli/
/senza-glutine/
```

---

# 48. LOG ANALYSIS

Se possibile, conservare access log del server.

Cercare user-agent:

```text
Googlebot
Bingbot
OAI-SearchBot
```

Monitorare:

```text
status code
URL richiesta
frequency
403
404
429
5xx
```

---

# 49. 404 / REDIRECT

Ogni vecchia URL deve:

```text
301 → equivalente corretto
```

Non mandare tutte le vecchie pagine alla homepage.

Esempio:

```text
/vecchia-pizzeria-pinerolo/
        ↓ 301
/pinerolo/
```

---

# 50. BLACK-HAT MONITORING

Possiamo monitorare i competitor per capire se usano:

```text
fake review
PBN
doorway pages
expired domain
parasite SEO
review spam
schema spam
fake local listings
```

NON replicare automaticamente queste tecniche.

Obiettivo:

```text
conoscere il mercato
+
difendere il brand
+
segnalare abusi quando rilevanti
```

---

# 51. GREY-HAT ACCETTABILE

Esperimenti a basso rischio:

```text
digital PR data-driven
programmatic research reale
landing page locali solo quando realmente differenti
community participation trasparente
partnership locali
guest post reali
guide locali proprietarie
```

Regola:

```text
pagina utile anche se Google non esistesse?
```

Se sì → generalmente buona.

---

# 52. NON FARE

```text
comprare 500 recensioni
creare 100 account Reddit falsi
comprare 10.000 backlink
creare PBN
generare 3.000 doorway page
inventare premi
inventare certificazioni AIC
inventare AggregateRating
copiare contenuti competitor
nascondere testo SEO
cloaking
fake Google Maps location
```

---

# 53. FILE `llms.txt`

Priorità bassa.

Se si vuole comunque implementare:

```txt
# Alexander Pizzeria

Official website:
https://www.alexanderpizzeria.com/

## Locations

- Piossasco: https://www.alexanderpizzeria.com/piossasco/
- Pinerolo: https://www.alexanderpizzeria.com/pinerolo/
- Giaveno: https://www.alexanderpizzeria.com/giaveno/
- Rivoli: https://www.alexanderpizzeria.com/rivoli/

## Menu

https://www.alexanderpizzeria.com/menu/

## Gluten Free

https://www.alexanderpizzeria.com/senza-glutine/
```

Non considerarlo un ranking factor.

---

# 54. ORDINE DI IMPLEMENTAZIONE

## SPRINT 1 — DATA CLEANUP

```text
[ ] Source of Truth
[ ] anno corretto
[ ] sede legale
[ ] orari
[ ] telefoni
[ ] delivery
[ ] takeaway
[ ] forno
[ ] AIC
```

## SPRINT 2 — ENTITY SEO

```text
[ ] Organization JSON-LD
[ ] Restaurant schema x4
[ ] BreadcrumbList
[ ] canonical
[ ] sameAs
[ ] geocoordinates
```

## SPRINT 3 — CRAWL

```text
[ ] robots.txt
[ ] OAI-SearchBot
[ ] sitemap.xml
[ ] 301
[ ] 404
[ ] noindex unwanted URLs
```

## SPRINT 4 — INTERNAL ARCHITECTURE

```text
[ ] navbar Sedi
[ ] cross-link sedi
[ ] home location hub
[ ] footer
[ ] breadcrumbs
```

## SPRINT 5 — CONTENT

```text
[ ] /senza-glutine/
[ ] upgrade location pages
[ ] menu HTML
[ ] FAQ
[ ] Giaveno semantic expansion
```

## SPRINT 6 — OFF-SITE

```text
[ ] Google Business Profiles
[ ] Bing Places
[ ] Apple Maps
[ ] Tripadvisor
[ ] Gluto
[ ] AIC
[ ] Restaurant Guru
[ ] OSM
[ ] directory locali
```

## SPRINT 7 — AUTHORITY

```text
[ ] hotel
[ ] B&B
[ ] blog locali
[ ] guide turistiche
[ ] giornali
[ ] gluten-free sites
[ ] Pro Loco
```

## SPRINT 8 — GEO MONITORING

```text
[ ] 50 prompt
[ ] ChatGPT
[ ] Gemini
[ ] Claude
[ ] Perplexity
[ ] benchmark mensile
```

---

# 55. DEFINITION OF DONE

Il progetto tecnico può considerarsi completato quando:

```text
[ ] ogni sede ha dati coerenti
[ ] nessuna contraddizione 2004/2009
[ ] nessuna contraddizione sugli orari
[ ] nessuna contraddizione delivery
[ ] ogni pagina sede ha canonical
[ ] ogni sede ha Restaurant JSON-LD valido
[ ] Organization schema valido
[ ] sitemap disponibile
[ ] robots disponibile
[ ] OAI-SearchBot non bloccato
[ ] navbar include le sedi
[ ] sedi cross-linked
[ ] /senza-glutine/ online
[ ] menu HTML crawlable
[ ] Google GBP → URL sede corretta
[ ] Bing aggiornato
[ ] Apple Maps aggiornato
[ ] Tripadvisor aggiornato
[ ] Gluto aggiornato
[ ] AIC verificato
[ ] baseline LLM salvata
[ ] KPI analytics attivi
```

---

# 56. VALIDATION TOOLS

Dopo il deploy controllare:

```text
Google Rich Results Test
Schema.org Validator
Google Search Console URL Inspection
Bing Webmaster Tools
PageSpeed Insights
Lighthouse
curl
```

Comandi:

```bash
curl -I https://www.alexanderpizzeria.com/
curl -I https://www.alexanderpizzeria.com/pinerolo/
curl -I https://www.alexanderpizzeria.com/robots.txt
curl -I https://www.alexanderpizzeria.com/sitemap.xml
```

Verificare:

```text
200 OK
canonical corretto
content-type corretto
nessun blocco bot
```

---

# 57. TEST ROBOTS

```bash
curl -A "OAI-SearchBot" \
https://www.alexanderpizzeria.com/pinerolo/
```

Deve restituire contenuto normale e non:

```text
403
429
CAPTCHA
JS challenge
```

---

# 58. CURSOR — MASTER PROMPT

Copia questo prompt in Cursor dopo aver aperto il repository del sito:

```text
Agisci come senior Technical SEO Engineer, Local SEO Engineer e Next.js/Web Engineer.

Stiamo ottimizzando AlexanderPizzeria.com per:

- SEO tradizionale
- Local SEO
- Google Maps
- entity SEO
- GEO / Generative Engine Optimization
- AI crawlers
- machine-readable structured data

NON modificare il design visivo se non è necessario.

PRIMA DI MODIFICARE QUALSIASI FILE:

1. analizza lo stack del repository
2. identifica framework e routing
3. individua:
   - homepage
   - pagine Pinerolo
   - Piossasco
   - Giaveno
   - Rivoli
   - menu
   - componenti navbar/footer
   - metadata
   - sitemap
   - robots
   - eventuale schema JSON-LD già esistente
4. elenca duplicazioni e incoerenze
5. crea un piano modifiche
6. solo dopo implementa

REQUISITI:

A. Creare una Entity Source of Truth unica per tutte le sedi.

B. Nessuna pagina deve hardcodare indipendentemente:
- indirizzo
- telefono
- orari
- delivery
- takeaway
- AIC
- forno
- booking URL

Questi dati devono provenire dalla Source of Truth.

C. Implementare:
- Organization JSON-LD
- Restaurant JSON-LD distinto per ogni sede
- BreadcrumbList
- canonical
- Open Graph
- geocoordinates
- sameAs
- hasMenu
- acceptsReservations
- openingHoursSpecification

D. Creare una navigazione 'Le sedi' con:
- Piossasco
- Pinerolo
- Giaveno
- Rivoli

E. Creare cross-link tra le location page.

F. Verificare/creare:
- robots.txt
- sitemap.xml
- accesso Googlebot
- accesso Bingbot
- accesso OAI-SearchBot

G. Creare:
https://www.alexanderpizzeria.com/senza-glutine/

La pagina deve essere utile, leggibile e non doorway.

H. Rendere il menu leggibile in HTML e non dipendente esclusivamente da un provider esterno.

I. Non implementare:
- fake AggregateRating
- keyword stuffing
- doorway pages
- hidden text
- schema non supportato da contenuto reale
- recensioni inventate

J. Alla fine:
1. esegui lint
2. esegui typecheck
3. esegui build
4. controlla link interni
5. valida JSON-LD
6. fornisci diff dei file modificati
7. elenca eventuali dati mancanti che richiedono verifica umana.

IMPORTANTE:
Non inventare indirizzi, orari, coordinate, URL AIC o Place ID.
Quando un dato non è presente nel repository, usa TODO chiaramente identificati.
```

---

# 59. PROMPT CURSOR — FASE 1

Per partire in modo controllato:

```text
Non modificare ancora nulla.

Analizza il repository AlexanderPizzeria.com e crea un audit tecnico limitato a:

1. stack
2. struttura routing
3. pagine delle 4 sedi
4. navbar/footer
5. metadata
6. canonical
7. JSON-LD
8. robots
9. sitemap
10. dati hardcoded relativi a indirizzi, telefoni, orari e servizi

Cerca in tutto il repository stringhe relative a:

2004
2009
18:30
19:00
23:00
23:30
delivery
consegna
asporto
AIC
forno
Pinerolo
Piossasco
Giaveno
Rivoli

Restituisci:

- file
- numero di linea
- valore trovato
- eventuale conflitto
- modifica consigliata

NON applicare ancora patch.
```

---

# 60. PROMPT CURSOR — FASE 2

Dopo aver controllato l'audit:

```text
Implementa ora la Entity Source of Truth.

Requisiti:

1. un solo file/modulo dati centrale
2. TypeScript typed se il progetto usa TypeScript
3. dati separati per:
   - piossasco
   - pinerolo
   - giaveno
   - rivoli

4. rifattorizza le pagine affinché:
   - indirizzo
   - telefono
   - orari
   - delivery
   - takeaway
   - booking
   - menu
   - AIC
   - oven type

provengano dalla Source of Truth.

Non inventare dati mancanti.
Usa TODO.
```

---

# 61. PROMPT CURSOR — FASE 3

```text
Implementa il layer Entity SEO.

Crea componenti riutilizzabili per:

- OrganizationSchema
- RestaurantSchema
- BreadcrumbSchema

Ogni pagina location deve generare JSON-LD dalla Source of Truth.

Aggiungi:
- @id stabile
- URL canonica
- PostalAddress
- GeoCoordinates
- telephone
- openingHoursSpecification
- servesCuisine
- hasMenu
- acceptsReservations
- parentOrganization
- sameAs

Non aggiungere AggregateRating.

Alla fine mostrami il JSON-LD renderizzato per tutte e quattro le sedi.
```

---

# 62. PROMPT CURSOR — FASE 4

```text
Implementa crawling e discovery.

Controlla e correggi:

- robots.txt
- sitemap.xml
- canonical
- redirect HTTP→HTTPS
- www/non-www
- trailing slash policy
- noindex accidentali

Permetti:
Googlebot
Bingbot
OAI-SearchBot

Inserisci in sitemap:
/
piossasco/
pinerolo/
giaveno/
rivoli/
menu/
senza-glutine/

Non bloccare asset necessari al rendering.
```

---

# 63. PROMPT CURSOR — FASE 5

```text
Crea la pagina /senza-glutine/.

Usa i componenti e il design system già presenti.

Struttura:

H1 Pizza senza glutine Alexander

- intro
- sedi
- informazioni AIC
- preparazione
- gestione contaminazione
- menu
- FAQ
- CTA prenotazione
- link alle quattro sedi

IMPORTANTE:

Non inventare informazioni mediche, AIC, procedure o promesse di sicurezza.

Se mancano dati nel repository, inserisci TODO espliciti.
```

---

# 64. PRIORITÀ BUSINESS

Se bisogna scegliere cosa fare prima:

```text
1 ENTITY CONSISTENCY
2 GOOGLE BUSINESS PROFILE
3 JSON-LD
4 CRAWLING
5 INTERNAL LINKING
6 GLUTEN FREE HUB
7 CITATIONS
8 LOCAL BACKLINKS
9 DIGITAL PR
10 LLM MONITORING
```

---

# 65. RISULTATO DESIDERATO

Lo scopo finale non è semplicemente:

```text
posizionarsi per "Alexander Pizzeria"
```

ma aumentare la presenza per intenti come:

```text
pizzeria Pinerolo
pizza senza glutine Pinerolo
pizzeria Piossasco
ristorante Giaveno
ristorante senza glutine Giaveno
pizzeria Rivoli
pizza senza glutine Rivoli
pizzeria AIC vicino a me
ristorante per celiaci
```

La strategia deve fare in modo che i motori e gli LLM possano concludere:

```text
Alexander è una vera entità locale
+
ha sedi verificabili
+
ha informazioni coerenti
+
è citata da fonti indipendenti
+
possiede attributi distintivi verificabili
+
è pertinente alla query
```

Questo è il nucleo della strategia SEO + GEO di Alexander Pizzeria.
