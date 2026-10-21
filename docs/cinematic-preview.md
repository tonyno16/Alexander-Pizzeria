# Homepage cinematografica — anteprima locale

Branch: `design/cinematic-homepage`. Base: `3729868` (main locale). Nessun deploy o modifica della cartella originale.

## Direzione

Riferimento: immagine fornita dal cliente il 21 ottobre 2026. Nero caldo #11100E, carbone #1C1915, oro #C9A227, ambra #BA8A45, avorio #F7F0E5, testo secondario #C7BFAF. Lora per titoli e marchio testuale, Inter per navigazione e testo. Allineamento a sinistra su desktop, apertura centrata su mobile. La fotografia della pizza domina; cornici sottili e oro servono a distinguere prenotazione e navigazione.

Sequenza: apertura fotografica / prenotazione quattro sedi / pizze / impasto / ingredienti / locali / senza glutine / invito finale. Il riferimento prevale sulle scelte stilistiche generiche: colori scuri e oro, titoli serif, fotografie calde e prenotazione in evidenza sono intenzionali. Nessun numero o recensione inventata. La sezione ingredienti usa una fotografia con punti interattivi, non viene presentata come un modello 3D.

## Fonti e limiti

- Sedi, indirizzi e destinazioni prenotazione: `data/locations.json`, copia dal repository al momento della creazione del branch.
- Pizze: foto originali `assets/img/signature`, descrizioni del prototipo locale precedente; prezzi esclusi, menu della sede come riferimento aggiornato.
- Impasto: testo presente nel sito/prototipo (biga, 48 ore).
- L'immagine del mockup non è fonte per ingredienti, recensioni o caratteristiche commerciali.
- Pagine interne mantengono lo stile esistente; questa fase riguarda la homepage.
- `noindex, nofollow` nella homepage di anteprima; non è controllo di accesso. Anteprima servita solo localmente.
- Nessuna analitica né cookie di marketing nella nuova homepage.

## Immagine principale

Skill `imagegen`, strumento integrato. Sorgente: `assets/img/hero/hero.jpg` originale. Destinazione: `assets/img/cinematic/hero.webp` e variante mobile. Prompt: rielaborazione fotografica cinematografica della pizza originale, pomodoro, mozzarella, basilico e condimento verde invariati; tavolo scuro, luce ambrata, pizza sulla destra, spazio scuro per il testo sulla sinistra; nessuna aggiunta di burrata, prosciutto, mani, scritte o loghi. Le varianti WebP sono esportazioni ottimizzate della stessa rielaborazione.

Foto ingredienti salvata in `assets/img/cinematic/aura-cutout.webp`, con canale alpha trasparente verificato.

## Controllo e ripristino

Aprire la homepage sul server locale della copia di lavoro. Verificare desktop, 390px e 320px, navigazione da tastiera, dialoghi, scorrimento pizze e destinazioni delle quattro prenotazioni. Nessuna prenotazione viene inviata durante i controlli.

Per scartare la proposta è sufficiente continuare a usare `Alexander Sito`; la copia separata non modifica main. Non unire il branch o pubblicare prima della revisione della homepage e dell'estensione alle pagine interne.

## Prompt esatti utilizzati (strumento integrato)

Hero — `transparent_background: false`

> Use case: style-transfer / lighting-weather. Create the final photographic hero asset for Alexander Pizzeria's real website, wide landscape 16:9. Edit target: the attached actual pizza photo. Preserve its actual toppings: tomato, white mozzarella medallions, fresh basil and green basil dressing; preserve its baked crust identity. Recompose the pizza as a complete pizza in a cinematic low three-quarter perspective on a rustic dark stone counter, occupying the right 65% of the frame. Keep the left 38% almost black, atmospheric and empty, suitable for white website text overlay. Premium realistic food photography, warm amber side lighting, rich natural colors, very dark blurred restaurant background, a subtle hint of rising heat. No additional toppings, no burrata, no prosciutto, no invented hands or bottles, no signage, no typography, no logo, no watermark. The visual direction is the user's supplied dark warm gold restaurant mockup, but the product must remain this restaurant's actual pizza. Landscape image only, not a screenshot or website mockup.

Foto ingredienti — sorgente `assets/img/signature/aura-margherita.png`, `transparent_background: true`

> Use case: background-extraction. Edit target is the real Aura Margherita pizza in the supplied image. Produce a high quality isolated cutout of ONLY this complete actual pizza on a fully transparent alpha background. Preserve the exact food identity, perspective, toppings and silhouette: tomato red base, white mozzarella slices with green basil cream drizzled on top, fresh basil center, charred round crust. Remove all the black backdrop, gold graphics, all text and logos, corner decorations. Do not add any toppings, burrata or meat. Center the whole pizza with a small transparent margin, horizontal product photograph for an interactive restaurant website. Improve clarity naturally but no radical changes to the real product.

## Esito verifiche — 21 ottobre 2026

- Layout verificato a 1440, 1024, 768, 390 e 320 pixel: nessuno scorrimento orizzontale dell'intera pagina.
- Tutte le immagini caricate; nessun errore JavaScript o risposta HTTP di errore durante la verifica.
- Quattro destinazioni prenotazione e quattro destinazioni menu confrontate con `data/locations.json`; nessuna prenotazione inviata.
- Nove collegamenti interni controllati: tutti rispondono HTTP 200 sul server locale.
- Verificati scorrimento pizze, punti ingredienti, menu mobile, chiusura con Escape e ripristino del focus, caricamento del video e pausa alla chiusura.
- Movimento ridotto rispettato; nessun video parte automaticamente.
- Controllo visivo desktop e mobile effettuato dopo il caricamento di tutte le fotografie.
- Graphify aggiornato in questa copia con AST locale e clustering senza etichette esterne. Indice escluso da Git.
- Sito originale e relativo stato Git invariati rispetto all'inizio del lavoro. Nessun push o deploy.

L'anteprima locale è su `http://localhost:4179/`. Gli screenshot e il rapporto dettagliato sono nella cartella di lavoro esterna al repository `_working/cinematic-review-2026-10-21/`.
