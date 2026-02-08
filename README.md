# Alexander Pizzeria

Sito web ufficiale **Alexander Pizzeria** — 4 pizzerie nella provincia di Torino (Pinerolo, Piossasco, Giaveno, Rivoli). Pizza artigianale con impasto a lunga lievitazione.

## Sedi

- **Pinerolo**
- **Piossasco**
- **Giaveno** (Valsangone)
- **Rivoli**

## Struttura del progetto

```
Alexander-Pizzeria/
├── index.html              # Homepage
├── menu.html               # Menù
├── blog.html               # Blog
├── blog-post-template.html # Template articolo blog
├── prenota-un-tavolo.html  # Prenotazioni
├── lavora-con-noi.html     # Lavora con noi
├── alexander-lovers.html   # Programma fedeltà
├── pinerolo.html           # Scheda sede Pinerolo
├── piossasco.html          # Scheda sede Piossasco
├── giaveno.html            # Scheda sede Giaveno
├── rivoli.html             # Scheda sede Rivoli
├── 404.html                # Pagina errore 404
├── assets/
│   ├── css/                # Stili (reset, layout, componenti, responsive)
│   ├── img/                # Immagini e icone
│   └── js/                 # Script (analytics, cookie, form, widget WhatsApp)
├── data/
│   └── locations.json      # Dati sedi
├── robots.txt
└── sitemap.xml
```

## Tecnologie

- HTML5
- CSS3 (variabili, flexbox, grid, responsive)
- JavaScript vanilla
- Dati JSON per le sedi

## Come visualizzare in locale

1. **Aprire il file:** doppio clic su `index.html`.
2. **Con server locale (consigliato):**
   ```bash
   # Con Python
   python -m http.server 8000
   # Poi apri http://localhost:8000

   # Con Node.js
   npx serve
   ```

## Repository

- **GitHub:** [tonyno16/Alexander-Pizzeria](https://github.com/tonyno16/Alexander-Pizzeria)

## Autore

Alexander S.R.L.
