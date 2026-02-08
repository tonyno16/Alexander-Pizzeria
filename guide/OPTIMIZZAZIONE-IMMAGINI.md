# FASE 1 - Ottimizzazione immagini

## Cosa fa lo script

Esegui **una volta** (o quando cambi le foto):

```bash
npm install
npm run optimize-images
```

Lo script:

- **Hero:** comprime `hero.jpg` (obiettivo ~500 KB) e crea `hero.webp`
- **Sedi:** crea `giaveno.webp` e `rivoli.webp` da i PNG (pinerolo e Piossasco sono già WebP)
- **Loyalty:** comprime `carta-fedelta.jpg` e `carta-fedelta1.jpg` e crea le versioni `.webp`

I file originali `.jpg` e `.png` vengono sovrascritti (solo hero e loyalty) o affiancati (WebP in `locations/`). Tieni un backup se necessario.

## Cosa è già stato fatto in HTML/CSS/JS

- **&lt;picture&gt;** con fallback: Giaveno, Rivoli (card sedi), Carta Fedeltà; le pagine Giaveno e Rivoli usano &lt;picture&gt; nell’hero.
- **Hero homepage:** `main.js` rileva il supporto WebP e, se presente, usa `hero.webp` per le slide.
- **Lazy loading:** le immagini below-the-fold hanno già `loading="lazy"` (card sedi, loyalty, blog).

## Dopo aver eseguito lo script

- In homepage le slide hero useranno `hero.webp` sui browser che lo supportano.
- Le card sedi e la carta fedeltà useranno automaticamente i WebP tramite &lt;picture&gt;.
- Controlla che in `assets/img/hero/`, `assets/img/locations/` e `assets/img/loyalty/` ci siano i nuovi file `.webp`.

## Verifica

- Apri il sito in locale e controlla che non ci siano 404 su `.webp`.
- Usa DevTools > Network: filtra per “Img” e verifica che vengano caricati i WebP (o i fallback) corretti.
