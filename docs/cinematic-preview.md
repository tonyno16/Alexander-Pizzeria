# Homepage cinematografica — anteprima locale

Branch: `design/cinematic-homepage`. Base: `3729868` (main locale). Nessun deploy in produzione o modifica della cartella originale.

## Direzione

Riferimento: immagine fornita dal cliente il 21 ottobre 2026. Nero caldo #11100E, carbone #1C1915, oro #C9A227, ambra #BA8A45, avorio #F7F0E5, testo secondario #C7BFAF. Lora per titoli e marchio testuale, Inter per navigazione e testo. Allineamento a sinistra su desktop, apertura centrata su mobile. La fotografia della pizza domina; cornici sottili e oro servono a distinguere prenotazione e navigazione.

Sequenza: apertura fotografica / prenotazione quattro sedi / pizze / impasto / ingredienti / locali / senza glutine / invito finale. Il riferimento prevale sulle scelte stilistiche generiche: colori scuri e oro, titoli serif, fotografie calde e prenotazione in evidenza sono intenzionali. Nessun numero o recensione inventata. La sezione ingredienti usa una fotografia con punti interattivi, non viene presentata come un modello 3D.

## Fonti e limiti

- Sedi, indirizzi e destinazioni prenotazione: `data/locations.json`, copia dal repository al momento della creazione del branch.
- Pizze: foto originali `assets/img/signature`, descrizioni del prototipo locale precedente; prezzi esclusi, menu della sede come riferimento aggiornato.
- Impasto: testo presente nel sito/prototipo (biga, 48 ore).
- L'immagine del mockup non è fonte per ingredienti, recensioni o caratteristiche commerciali.
- Pagine interne mantengono lo stile esistente; questa fase riguarda la homepage.
- `noindex, nofollow` nella homepage di anteprima; non è controllo di accesso. Anteprima cloud separata: accesso senza login e intestazione HTTP `X-Robots-Tag: noindex, nofollow`.
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

## Sezione Dicono di noi — 21 ottobre 2026

Aggiunta prima della prenotazione finale, con quattro recensioni Google reali, una per sede. Voti medi e conteggi restano distinti per locale. Fonte: endpoint esistente `/api/reviews/`, rilevazione `2026-10-21T05:46:08.014Z`; riusato `live-reviews.js` senza modifiche. Le recensioni selezionate e i link coincidono con quelli della precedente homepage. Il contenuto HTML datato resta disponibile se l'aggiornamento non risponde.

Verificati aggiornamento dei quattro locali, link alle singole recensioni, contenuto disponibile con API bloccata, scorrimento delle schede su telefono, assenza di errori JavaScript e scorrimento laterale della pagina a 1440, 768, 390 e 320 pixel. Controllo visivo desktop e mobile completato. Screenshot `reviews-desktop.png` e `reviews-mobile.png` nella cartella di verifica esterna al repository.

## Anteprima cloud condivisibile — 21 ottobre 2026

- URL finale: https://alexander-pizzeria-gqltdeyrj-tonynos-projects-524f5113.vercel.app
- Provider/progetto: Vercel, progetto esistente `alexander-pizzeria`.
- Deployment: `dpl_KsGYMcYwmvbtdNXmLWFLW7EcoRqi`; target `preview`, stato `Ready`; contenuto applicativo del commit `e60c33a`.
- Nessuna promozione, modifica DNS o modifica delle destinazioni di produzione. L'ultima produzione verificata resta `alexander-pizzeria-47qzjvvm6-tonynos-projects-524f5113.vercel.app`.
- Verificata risposta HTTP 200 in un nuovo browser senza sessione autenticata: link condivisibile senza login. Intestazione anti-indicizzazione presente.
- Logo, immagini e schede recensioni caricati; apertura desktop e telefono 390px verificata senza errori JavaScript o scorrimento orizzontale.
- La configurazione di esclusione del caricamento ignora il file `.git` della copia di lavoro e solo le cartelle prototipo alla radice; include le nuove fotografie in `assets/img/cinematic/`.
- Nel solo ambiente Vercel `preview`, l'endpoint recensioni riutilizza il feed pubblico e già memorizzato del sito principale. Nessuna chiave API di produzione copiata. Dati live verificati per quattro sedi, rilevazione `2026-10-21T05:46:08.014Z`. Il comportamento di produzione resta invariato.
- Verificati con risposta simulata il riuso del feed, la gestione della fonte non disponibile e il percorso di produzione senza chiave. Graphify aggiornato con AST locale, senza elaborazione semantica esterna.
- Screenshot e rapporto: `cloud-desktop.png`, `cloud-mobile.png`, `cloud-verification.json` nella cartella esterna `_working/cinematic-review-2026-10-21/`.

## Piano delle quattro sedi — 21 ottobre 2026

Continuità della homepage: nero caldo #11100E, carbone #1C1915, oro #C9A227, ambra #BA8A45, avorio #F7F0E5, testo secondario #C7BFAF. Lora nei titoli, Inter nel testo. Foto reale del locale a tutta larghezza, titolo a sinistra, prenotazione diretta della sede; sotto, indirizzo/orari/contatti, storia e caratteristiche, pizze, senza glutine, mappa attivabile, recensioni, domande frequenti e invito finale. Sul telefono foto e titolo restano leggibili e il pulsante di prenotazione è fisso.

Schema: [logo / navigazione / prenota] → [foto del locale + nome e prenotazione] → [dove / quando / contatti] → [storia / caratteristiche] → [pizze] → [senza glutine] → [mappa] → [recensioni] → [FAQ / prenota / altri locali].

Revisione rispetto al riferimento: stessa palette e pulsanti della homepage; evito un'apertura generica uguale per tutti usando le foto delle quattro sedi. Conservo titoli SEO, canoniche e dati strutturati. I contenuti del corpo pagina restano quelli delle sedi attuali. Confermati sul sito pubblico Rivoli (forno a gas, mercoledì chiuso) e Giaveno (apertura a pranzo e pizza al tegamino a pranzo). Il JSON sedi riporta ancora tutti i giorni per Rivoli: in queste pagine prevalgono testo e schema già presenti nella pagina specifica, confermati online; il JSON non viene modificato in questo intervento.

## Verifiche locali delle sedi — 21 ottobre 2026

Pagine: `piossasco/index.html`, `pinerolo/index.html`, `giaveno/index.html`, `rivoli/index.html`. Stile condiviso con la homepage tramite `cinematic-home.css`, regole delle sedi in `cinematic-venues.css`, navigazione e mappe in `cinematic-venues.js`. Fotografie esistenti, nessuna nuova generazione di immagini. Rimossi dalla nuova versione delle sedi gli script del precedente menu e del tracciamento di produzione; sono mantenuti l'aggiornamento delle recensioni e le mappe solo su richiesta. Nessun cambiamento alle pagine del sito principale.

Verifiche superate per tutte e quattro le pagine: HTTP 200, caricamento immagini, due loghi originali, un solo H1, nessun ID duplicato, collegamenti prenotazione corrispondenti alla sede, menu della sede, apertura/chiusura del menu mobile e focus con Escape, FAQ native funzionanti. Mappe non caricate prima del clic; al clic destinazione Google Maps specifica e iframe visibile (richiesta intercettata nella verifica per evitare dipendenze esterne). Nessuno scorrimento orizzontale a 1440/1024/768/390/320px; nessun errore JavaScript.

Titolo, canonica e JSON-LD delle quattro pagine confrontati con il punto di partenza: identici. Rivoli mantiene mercoledì chiuso e forno a gas; Giaveno conserva orari di pranzo e FAQ pizza al tegamino. Per Rivoli sostituito il filmato generico di un forno a legna nella sezione senza glutine con la fotografia del prodotto già usata nella homepage, senza attribuirla a una sede. Foto principali dei locali conservate.

Controllo visivo desktop e mobile completato. Rapporto `venues-verification.json` e screenshot per ogni sede nella cartella esterna `_working/cinematic-review-2026-10-21/`. Graphify aggiornato con AST locale e clustering senza etichette esterne; indice escluso da Git.

## Cloud aggiornato con le sedi — 21 ottobre 2026

Link stabile da usare per le prossime revisioni: https://alexander-cinematico-anteprima.vercel.app

Alias aggiunto esclusivamente per l'anteprima; non sostituisce domini del sito principale. Destinazione: https://alexander-pizzeria-ll3zr5ky9-tonynos-projects-524f5113.vercel.app — deployment `dpl_3kZuasNne5sMXvSzd1fCXFTAYKKU`, target `preview`, stato `Ready`, commit applicativo `4497733`.

Verificate da browser senza login tutte e quattro le pagine sul link stabile: HTTP 200, intestazione noindex/nofollow, immagini caricate, recensioni aggiornate, prenotazione corretta, stile e navigazione desktop/mobile funzionanti; nessun errore JavaScript o risposta HTTP di errore. Verificato il percorso homepage → pagina Rivoli. Feed recensioni disponibile per quattro sedi. La produzione Vercel rimane `alexander-pizzeria-47qzjvvm6-tonynos-projects-524f5113.vercel.app`; stato della cartella originale invariato.

Rapporto finale `venues-cloud-verification.json`; screenshot `venues-cloud-desktop.png` e `venues-cloud-mobile.png` nella cartella di verifica esterna al repository. Per ripristinare la sola anteprima, riassociare il suo alias al deployment precedente senza modificare produzione o domini principali.

## Piano Impasto e Senza glutine — 21 ottobre 2026

Continuità con homepage e sedi: nero caldo #11100E, carbone #1C1915, oro #C9A227, ambra #BA8A45, avorio #F7F0E5 e testo #C7BFAF. Lora per titoli, Inter per lettura e controlli. Header e footer con logo originale e navigazione già usata dalle sedi. Nessuna nuova dipendenza o immagine generata.

Impasto: [foto reale del mestiere / titolo / vai al metodo] → [metadati e sommario / articolo completo e tabella] → [scelta della sede e prenotazione]. Allineamento a sinistra e misura di lettura contenuta. Il sommario risponde alla lunghezza reale del contenuto, non è una decorazione.

Senza glutine: [foto reale del prodotto / titolo / scegli sede] → [preparazione] → [riferimento AIC] → [quattro sedi con foto e prenotazione] → [FAQ / invito finale]. Nessuna promessa aggiuntiva di assenza assoluta di contaminazione o benefici medici. Riferimento AIC del 19 maggio 2026 verificato sulla fonte originale https://piemonte.celiachia.it/nuovo-locale-afc-a-rivoli-to/.

Revisione del piano: riprendo il riferimento richiesto e il sistema già approvato; differenzio il racconto del metodo dalla scelta pratica del locale. Mantengo titoli, canoniche, JSON-LD, testo tecnico del metodo e informazioni alimentari esistenti. Correggo solo l'orario incoerente di Rivoli nella griglia senza glutine, copiandolo dalla pagina specifica già verificata: mercoledì chiuso.

## Verifiche Impasto e Senza glutine — 21 ottobre 2026

Pagine aggiornate: `pizza-lunga-lievitazione/index.html`, `senza-glutine/index.html`; nuovo foglio di stile `cinematic-craft.css`, con header/footer e navigazione esistenti delle sedi. I collegamenti Impasto e Senza glutine della homepage e delle quattro sedi ora aprono le pagine complete. Header e pulsante fisso portano alla scelta della sede nella pagina corrente; le prenotazioni delle quattro sedi mantengono le rispettive destinazioni.

Fotografie reali esistenti; per il Senza glutine usata la foto al tavolo già presente nella homepage. Testo del metodo e della preparazione conservati, come titolo, H1, canonica e JSON-LD (confronto automatico con la versione iniziale). Uniche correzioni informative: mercoledì chiuso per Rivoli nella scheda Senza glutine e nel riepilogo orari dell'articolo Impasto, coerenti con la pagina specifica verificata nella fase precedente. Non modificate ricette, dati strutturati o riferimenti AIC.

Controllati: HTTP 200, tutte le immagini caricate, due loghi originali, un solo H1, nessun ID duplicato, menu mobile con Escape, sommario dell'articolo, entrambe le tabelle (8 righe metodo e 4 confronto), FAQ senza glutine, quattro destinazioni di prenotazione e target dei pulsanti fissi. Nessun errore JavaScript o scorrimento orizzontale della pagina a 1440/1024/768/390/320px. Controllo visivo desktop/mobile completato; riutilizzato il comportamento di movimento ridotto del sistema grafico. Nessun nuovo video automatico, tracciamento o dipendenza.

Rapporto `craft-verification.json`, baseline `craft-baseline.json` e screenshot delle due pagine nella cartella di verifica esterna `_working/cinematic-review-2026-10-21/`. Graphify aggiornato esclusivamente con AST locale e clustering senza etichette esterne; indice escluso da Git.

## Cloud Impasto e Senza glutine — 22 ottobre 2026

Stesso link stabile: https://alexander-cinematico-anteprima.vercel.app

Percorsi: `/pizza-lunga-lievitazione/` e `/senza-glutine/`. Deployment `dpl_6khGF95gHQD9s56bWGM65kAqpDwB`, URL tecnico `https://alexander-pizzeria-9axxwt2pr-tonynos-projects-524f5113.vercel.app`, target `preview`, stato `Ready`, commit applicativo `8a7a02a`. Alias di anteprima aggiornato dopo il completamento del deployment.

Verifica pubblica senza login superata su entrambe le pagine: HTTP 200, intestazione noindex/nofollow, fotografie caricate, navigazione desktop e mobile, pulsanti di scelta sede con destinazione presente nella pagina, nessun errore JavaScript o HTTP. Verificati anche homepage → Impasto, collegamenti aggiornati nelle pagine sedi e feed recensioni ancora disponibile. Stato di produzione invariato: ultima produzione `alexander-pizzeria-47qzjvvm6-tonynos-projects-524f5113.vercel.app`. Nessuna modifica ai domini principali.

Rapporto `craft-cloud-verification.json` e screenshot `pizza-lunga-lievitazione-cloud-desktop.png`, `pizza-lunga-lievitazione-cloud-mobile.png`, `senza-glutine-cloud-desktop.png`, `senza-glutine-cloud-mobile.png` nella cartella esterna di verifica. Ripristino dell'anteprima: riassociare il solo alias al precedente deployment `dpl_3kZuasNne5sMXvSzd1fCXFTAYKKU`.

## Piano Storia, Contatti, Lovers e approfondimento senza glutine — 22 ottobre 2026

Sistema coerente con le pagine approvate: nero #11100E, carbone #1C1915, oro #C9A227, ambra #BA8A45, avorio #F7F0E5, testo #C7BFAF; Lora nei titoli e Inter nel testo. Header/footer originali Alexander; impaginazione a sinistra, pulsanti diretti e leggibili su telefono. Nessuna nuova libreria o generazione di immagini.

Storia: [prima sede reale / racconto] → [Alessandro e Alessio] → [2009/2020/2023/2024 con foto dei locali] → [scegli sede]. La cronologia usa date effettive e conserva il testo originale. Non uso la fotografia `media/team.webp`, che mostra una filigrana stock: preferisco la foto già verificata di Piossasco senza attribuire persone non identificate al gruppo.

Contatti: [titolo e accesso rapido alle sedi] → [quattro foto, telefoni, WhatsApp, menu, prenotazione e asporto] → [informazioni utili] → [quattro mappe attivabili]. Gli orari di Rivoli sono allineati alla pagina specifica (mercoledì chiuso). Non vengono inviati messaggi o prenotazioni durante le verifiche.

Lovers: [titolo e rappresentazione grafica HTML/CSS con il logo Alexander] → [benvenuto, visite, vantaggi] → [portale fedeltà esistente]. Non riutilizzo l'immagine della carta con marchio American Express e numero esemplificativo per evitare di presentarla come una carta di pagamento. Nessuna modifica alle condizioni del programma o iscrizione effettuata.

Approfondimento `/pizza-senza-glutine/`: adotto l'impaginazione editoriale già usata per l'Impasto, conservando testo, FAQ, note sulla preparazione e collegamenti alla pagina Senza glutine. Questa pagina è parte del percorso di approfondimento della pagina appena aggiornata. Titoli, canoniche e JSON-LD restano invariati per tutte le pagine.

## Verifiche Storia, Contatti, Lovers e approfondimento — 22 ottobre 2026

Quattro pagine aggiornate e nuovo `cinematic-brand.css`. La storia e i contatti sono raggiungibili da tutte le undici pagine già convertite; la navigazione mantiene i percorsi completi per Impasto e Senza glutine. Storia con cronologia e foto delle quattro sedi; Contatti con quattro destinazioni di prenotazione e menu, telefoni, asporto e WhatsApp esistenti; Lovers con grafica HTML/CSS e portale originale `https://pnssm.pro/psm4t3y`; articolo senza glutine con sommario apribile e tabelle scorribili.

Confronto automatico con baseline: titoli, H1, canoniche e JSON-LD invariati; paragrafi della storia, testo dei vantaggi e articolo senza glutine conservati. Link originali telefono/WhatsApp/asporto/indicazioni conservati. Correzioni intenzionali: chiusura del mercoledì di Rivoli nel riepilogo e nella scheda Contatti, immagini sostituite nella Storia e Lovers; anteprima social della Storia ora usa Piossasco anziché la foto stock. Nessuna iscrizione, messaggio o prenotazione inviati.

Verificati HTTP 200, tutte le immagini caricate, logo originale, un solo H1, ID univoci, apertura menu mobile e chiusura con Escape/focus ripristinato, target dei pulsanti fissi e quattro mappe attivabili solo al clic. Nessun errore JavaScript né scorrimento orizzontale a 1440/1100/1024/768/390/320px. Screenshot desktop/mobile esaminati; card Lovers leggibile e cronologia coerente con il sistema grafico. Graphify rigenerato esclusivamente con AST locale, clustering senza etichette esterne e indice escluso da Git.

Baseline `brand-baseline.json`, rapporto `brand-local-verification.json`, script di verifica e screenshot nelle cartelle esterne `_working/cinematic-review-2026-10-21/`. Per ripristinare il codice usare il commit precedente `a4765bb`; l'alias dell'anteprima può essere riportato al deployment `dpl_6khGF95gHQD9s56bWGM65kAqpDwB` senza modificare la produzione.

## Cloud Storia, Contatti, Lovers e approfondimento — 22 ottobre 2026

Deployment `dpl_9XRERtcmzx7WAXn3Zr9QgWS51Hkd`, URL tecnico `https://alexander-pizzeria-5sp6dand7-tonynos-projects-524f5113.vercel.app`, target `preview`, stato `Ready`, commit applicativo `a39abf5`. Alias stabile `https://alexander-cinematico-anteprima.vercel.app` aggiornato dopo il completamento del deployment.

Verifica pubblica su browser nuovo senza login superata: `/chi-siamo/`, `/contatti/`, `/alexander-lovers/`, `/pizza-senza-glutine/`, tutte HTTP 200 con intestazione noindex/nofollow; nuovo CSS disponibile, fotografie caricate, menu mobile e sommario funzionanti, quattro mappe attivate solo durante il test con risposta simulata (nessuna richiesta esterna prima del clic). Titoli, canoniche, dati strutturati e contenuti originali verificati anche sul cloud. Nessuno scorrimento orizzontale nelle sei larghezze controllate; nessun errore JavaScript. Navigazione Storia/Contatti verificata sulle undici pagine convertite, feed recensioni disponibile con `live: true`. Rapporto `brand-cloud-verification.json` nella cartella esterna di verifica.

Produzione invariata: ultimo deployment Ready `alexander-pizzeria-47qzjvvm6-tonynos-projects-524f5113.vercel.app`. Stato Git della cartella originale invariato rispetto all'inizio della fase; nessuna modifica ai domini principali. Per annullare questo aggiornamento cloud riassociare il solo alias dell'anteprima a `alexander-pizzeria-9axxwt2pr-tonynos-projects-524f5113.vercel.app`.
