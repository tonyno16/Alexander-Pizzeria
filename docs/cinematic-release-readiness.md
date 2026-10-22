# Anteprima cinematografica: consegna e passaggio al dominio principale

22 ottobre 2026. Branch `design/cinematic-homepage`, cartella di lavoro separata `Alexander Preview cinematic`. Anteprima pubblica: https://alexander-cinematico-anteprima.vercel.app.

**Stato aggiornato: pubblicato in produzione il 22 ottobre 2026 dopo approvazione del gestore.** Dominio https://www.alexanderpizzeria.com, deployment `dpl_A1JcgqutifTtZrEAW2o7wsSG48y5`, commit applicativo `1fdc871`, ramo di rilascio `release/cinematic-production-2026-10-22`. Passaggi di indicizzazione e consenso già applicati e verificati. Il piano sotto rimane lo storico della preparazione; non riapplicare la patch al ramo di rilascio. Rapporto completo in `docs/releases/2026-10-22-cinematic-production.md`.

## Risultato preparato

Tutte le 25 pagine principali e di servizio condividono il sistema grafico: homepage, quattro locali, menu generale e quattro menu, quattro pagine asporto, prenotazione, impasto, senza glutine e approfondimento, storia, contatti, Lovers, blog e articolo Giaveno, candidature e pagina di errore. I vecchi URL conservano i reindirizzamenti; privacy e cookie policy rimandano alle pagine Iubenda esistenti.

Il menu ufficiale e il servizio asporto conservano caricamento automatico, verifica della destinazione e chiave della singola sede, alternativa in nuova scheda e distinzione consultazione/ordine. La pagina asporto abilita il pagamento nell'iframe; nessun ordine, pagamento, iscrizione, candidatura o prenotazione viene inviato nelle verifiche. I prezzi non vengono duplicati nell'anteprima.

Verifiche locali: 25 pagine, 55 destinazioni/ancore interne, immagini e risorse esistenti, titoli/H1/canoniche/JSON-LD conservati nelle nuove pagine, sei larghezze da 320 a 1440 pixel, menu mobile/Escape, FAQ da tastiera, scelta menu/prenotazione dalla homepage e preferenza movimento ridotto. Test originali su isolamento delle sedi, consenso/revoca, assenza di tracciamento produzione dalle anteprime e assenza di false conversioni superati.

Orari Rivoli allineati alla pagina specifica, mercoledì chiuso; nell'articolo Giaveno corretta la frase che la indicava come unica sede con cucina, incompatibile con la pagina Rivoli. Non modificati i dati JSON condivisi con la produzione. Immagine stock del personale esclusa dalle pagine della nuova anteprima; candidature con immagine reale della preparazione e indirizzo email originale. Nessun nuovo servizio o libreria.

Rapporti e screenshot sono conservati fuori dal repository, in `_working/cinematic-review-2026-10-21/`. `complete-static-audit.json`, `complete-local-verification.json`, `complete-cloud-verification.json` e i rapporti `provider-*-verification.json` distinguono controllo del sito, prove con risposta simulata del servizio esterno e caricamento reale del servizio. Le misure di velocità sono prove di laboratorio su singola esecuzione, non dati reali degli utenti.

## Passaggio al dominio principale dopo approvazione del risultato

La modifica concreta per i punti 2 e 3 è già preparata in `docs/cinematic-production.patch` e verificata con `git apply --check`. Non è applicata all'anteprima. La patch ripristina le indicazioni di indicizzazione e inserisce il caricatore del consenso prima degli altri script, così anche il menu può collegarsi ai callback originali. Dopo eventuali ulteriori modifiche alle pagine, rigenerarla e verificarla prima dell'uso. La patch e questo documento sono esclusi dal deployment.

1. Confrontare il branch con lo stato aggiornato di `main`, preservando le modifiche già presenti nella cartella originale. Integrare solo il lavoro del restyling e le correzioni documentate. Il sito principale non è stato modificato da questa lavorazione.
2. Preparare una versione per produzione: sostituire i meta `noindex,nofollow` dell'anteprima con le indicazioni di indicizzazione originali, mantenendo la pagina 404 esclusa. Mantenere l'header `X-Robots-Tag: noindex, nofollow` per gli host Vercel e le canoniche sul dominio pubblico, già corrette. Non promuovere direttamente il deployment di anteprima con i suoi meta attuali.
3. Ripristinare il caricatore di consenso esistente `production-consent.js` sulle pagine effettive della versione per produzione, senza nuovi identificativi o consensi automatici; verificare accettazione, rifiuto, revoca e click intent. I test esistenti devono passare nuovamente. L'anteprima non carica strumenti di tracciamento della produzione.
4. Verificare il feed recensioni con le variabili già presenti nel progetto produzione: il fallback del redesign è limitato a `VERCEL_ENV=preview`. Non copiare chiavi o configurazioni locali nel repository. Se il feed non è disponibile, usare lo stato di fallback previsto e controllare il messaggio mostrato.
5. Riconfermare con il gestore orari, chiusure, informazioni alimentari e condizioni Lovers prima della pubblicazione definitiva; mantenere i collegamenti ai servizi attuali. Non è stata effettuata una nuova revisione commerciale dei contenuti originali in questa fase grafica.
6. Ripetere sulla versione pronta per produzione i controlli di redirect, CSP, immagini, dispositivi mobili, indicizzazione e consenso. Eseguire il deployment produzione solo con l'approvazione del risultato. Controllare gli stessi percorsi sul dominio pubblico e il feed recensioni dopo il rilascio.

## Ripristino

L'alias dell'anteprima può essere riassociato al deployment precedente senza alcun effetto sul sito principale. Prima del rilascio definitivo registrare deployment e commit di produzione attivi; in caso di regressione ripristinare quella versione. La produzione osservata all'inizio di questa fase è `alexander-pizzeria-47qzjvvm6-tonynos-projects-524f5113.vercel.app`.
