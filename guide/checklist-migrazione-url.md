# Checklist post-migrazione URL — Fase 0

Dopo il deploy di questa migrazione, eseguire in ordine:

## 1. Deploy
- [ ] Commit + push su `main` (o PR)
- [ ] Attendere deploy Vercel green

## 2. Smoke test URL (devono rispondere 200)
- [ ] `https://www.alexanderpizzeria.com/pinerolo/`
- [ ] `https://www.alexanderpizzeria.com/menu/`
- [ ] `https://www.alexanderpizzeria.com/prenota/`
- [ ] `https://www.alexanderpizzeria.com/blog/`
- [ ] `https://www.alexanderpizzeria.com/pizza-senza-glutine/`
- [ ] `https://www.alexanderpizzeria.com/pizza-lunga-lievitazione/`
- [ ] CSS/JS caricati (niente 404 su `/assets/...`)

## 3. Smoke test redirect (devono essere 301)
- [ ] `/pinerolo.html` → `/pinerolo/`
- [ ] `/menu.html` → `/menu/`
- [ ] `/blog-pizza-senza-glutine.html` → `/pizza-senza-glutine/`
- [ ] `https://alexanderpizzeria.com/` → `https://www.alexanderpizzeria.com/` con **301** (non 307)

## 4. Search Console
- [ ] Inviare nuova `sitemap.xml`
- [ ] Usare “Ispezione URL” su 2-3 pagine chiave
- [ ] Monitorare 404 per 14 giorni

## 5. Google Business Profile (4 sedi)
- [ ] Aggiornare link sito a URL puliti (`/pinerolo/`, `/giaveno/`, ecc.)

## 6. Bing
- [ ] Inserire codice `msvalidate.01` reale (oggi è ancora placeholder)
