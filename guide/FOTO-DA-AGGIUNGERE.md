# Foto da aggiungere al sito Alexander Pizzeria

Elenco di **tutte le immagini mancanti**: nome file, cartella e dove compaiono nel sito. Quando aggiungi un file con il nome indicato nella cartella indicata, il sito la userà in automatico.

---

## Riepilogo rapido

| Cartella                  | File da avere                                                | Dove si vedono                                             |
| ------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| **assets/img/hero/**      | `hero.jpg` ✅ (già presente)                                 | Sfondo hero homepage                                       |
| **assets/img/locations/** | `pinerolo.jpg`, `piossasco.jpg`, `giaveno.jpg`, `rivoli.jpg` | Card sedi in homepage + hero pagine locali + Schema.org    |
| **assets/img/og/**        | `og-home.jpg`, (opzionale: una per pagina)                   | Anteprima link su social (Facebook, WhatsApp, LinkedIn)    |
| **assets/img/blog/**      | Una per articolo (es. `funghi-porcini-giaveno.jpg`)          | Card blog, articolo singolo, “Dal Nostro Blog” in homepage |

---

## 1. Hero (homepage) — ✅ Fatto

- **Cartella:** `assets/img/hero/`
- **File:** `hero.jpg` — **già presente**
- **Uso:** Sfondo della sezione hero in homepage.

---

## 2. Foto sedi (locations)

- **Cartella:** `assets/img/locations/`
- **Nomi file da creare:**

| Nome file         | Sede                 | Dove si usa                                                                       |
| ----------------- | -------------------- | --------------------------------------------------------------------------------- |
| **pinerolo.jpg**  | Pinerolo             | Card “Dove Trovarci” in homepage; hero pagina `pinerolo.html`; Schema.org JSON-LD |
| **piossasco.jpg** | Piossasco            | Card homepage; hero `piossasco.html`; Schema.org                                  |
| **giaveno.jpg**   | Giaveno (Valsangone) | Card homepage; hero `giaveno.html`; Schema.org                                    |
| **rivoli.jpg**    | Rivoli               | Card homepage; hero `rivoli.html`; Schema.org                                     |

**Suggerimenti:**

- **Card homepage:** proporzione circa 16:9 o 4:3, larghezza consigliata ≥ 600 px (altezza in CSS 180px, ritaglio centrale).
- **Hero pagine locali:** stessa immagine o versione più alta; si usa a tutta larghezza con overlay scuro.
- Formato: JPG o WebP, ottimizzato per il web.

---

## 3. Immagini Open Graph (social)

Quando condividi un link (Facebook, WhatsApp, LinkedIn, ecc.) viene usata un’immagine di anteprima. Ora **nessuna pagina** ha `og:image` impostato.

- **Cartella:** `assets/img/og/`
- **File consigliati:**

| Nome file            | Uso suggerito                                         |
| -------------------- | ----------------------------------------------------- |
| **og-home.jpg**      | Homepage (e pagine generiche senza immagine dedicata) |
| **og-pinerolo.jpg**  | (opzionale) Pagina Pinerolo                           |
| **og-piossasco.jpg** | (opzionale) Pagina Piossasco                          |
| **og-giaveno.jpg**   | (opzionale) Pagina Giaveno                            |
| **og-rivoli.jpg**    | (opzionale) Pagina Rivoli                             |
| **og-menu.jpg**      | (opzionale) Pagina Menu                               |
| **og-blog.jpg**      | (opzionale) Pagina Blog                               |

**Specifiche:** 1200 × 630 px (formato standard Open Graph). JPG o PNG. Testo/logo leggibile al centro (i lati possono essere ritagliati su alcuni social).

**Nota:** Per attivarle bisogna aggiungere in ogni pagina il meta tag, ad es.  
`<meta property="og:image" content="https://www.alexanderpizzeria.com/assets/img/og/og-home.jpg">`  
(Per ora il sito è pronto per usare queste path quando aggiungi i file e i meta tag.)

---

## 4. Blog

- **Cartella:** `assets/img/blog/`

**Lista articoli (blog.html + preview homepage):**

| Nome file suggerito                | Articolo                                                        |
| ---------------------------------- | --------------------------------------------------------------- |
| **funghi-porcini-giaveno.jpg**     | Funghi Porcini di Giaveno: La Tradizione in Tavola              |
| **impasto-lunga-lievitazione.jpg** | Pizza Artigianale: Il Segreto dell'Impasto a Lunga Lievitazione |
| **pizzeria-pinerolo.jpg**          | La Migliore Pizzeria a Pinerolo: Scopri Alexander               |
| **alexander-fidelity.jpg**         | Alexander Fidelity: Come Funziona il Programma Fedeltà          |
| **dove-mangiare-rivoli.jpg**       | Dove Mangiare a Rivoli: Alexander in Piazza Principe Eugenio    |
| **pizza-senza-glutine.jpg**        | Pizza Senza Glutine a Torino: Le Opzioni di Alexander           |

**Dove si usano:**

- **blog.html:** ogni card articolo ha un’immagine (6 articoli).
- **index.html:** sezione “Dal Nostro Blog” (3 card).
- **blog-post-template.html:** immagine in evidenza in alto all’articolo + 3 card “Articoli correlati”.

Proporzione consigliata: 16:9 o 4:3, larghezza ≥ 800 px.

---

## 5. Logo (opzionale)

- **Cartella:** `assets/img/logo/`
- **Già presente:** `favicon.svg`
- **Opzionale:** logo completo per header (es. `logo.svg` o `logo.png`) se in futuro sostituisci il logo testuale con un’immagine.

---

## Ordine consigliato per riempire il sito

1. **locations:** aggiungi `pinerolo.jpg`, `piossasco.jpg`, `giaveno.jpg`, `rivoli.jpg` in `assets/img/locations/` — così card homepage e hero delle 4 pagine locali sono a posto.
2. **og:** crea almeno `og-home.jpg` (1200×630) e mettila in `assets/img/og/`; poi aggiungiamo il meta `og:image` in homepage (e, se vuoi, nelle altre pagine).
3. **blog:** aggiungi le foto articolo in `assets/img/blog/` con i nomi sopra (o simili); il codice può essere aggiornato per collegare ogni articolo alla sua immagine.

Se mi dici quali di questi file hai già (o quali cartelle hai riempito), posso indicarti esattamente come aggiornare HTML/CSS per usarli (path e tag).

---

## Nota: se le foto non ci sono ancora

- **Homepage (card sedi):** finché non aggiungi `pinerolo.jpg`, `piossasco.jpg`, `giaveno.jpg`, `rivoli.jpg` in `assets/img/locations/`, le card mostreranno l’icona “immagine non trovata”. Per prova puoi copiare `assets/img/hero/hero.jpg` in ognuno dei quattro file (pinerolo.jpg, piossasco.jpg, ecc.) così le card si riempiono subito.
- **Pagine locali (hero):** stesso percorso; se il file manca vedrai solo lo sfondo scuro. Stessa soluzione: copia temporanea di `hero.jpg` con il nome della sede.
