# SEO Alexander — rilascio del 23 ottobre 2026

## Modifiche pubblicate

Metadati, H1 e tag social per homepage, quattro sedi e pagina senza glutine; quattro testi locali originali di 250–300 parole; sezione fritti, farinata e dolci senza glutine con guida alle sedi; Restaurant e quattro FAQ visibili per locale; articolo sui porcini di Giaveno con due CTA e accenti corretti. Aggiornati anche il collegamento all'articolo nella pagina blog e le date pertinenti della sitemap. Le modifiche applicative riguardano dieci file, compreso il nuovo `assets/css/seo-local.css`.

Conservati immagini, script, canonical, indirizzi, orari e collegamenti specifici di menu/asporto. La terminologia AIC fa riferimento al programma Alimentazione Fuori Casa. Le 48 ore si riferiscono all'impasto classico; Rivoli mantiene forno a gas e chiusura il mercoledì. Giaveno distingue tegamino a pranzo e pizza tonda a cena. La disponibilità dei porcini è qualificata. Nessuna promessa di FAQ rich results o di posizionamento.

## Verifica e produzione

Controllo statico delle otto pagine HTML superato: metadati nei limiti richiesti, H1 e ID univoci, JSON valido, sedici FAQ visibili allineate al JSON-LD. Test esistenti `test-menu-pilot.cjs` e `test-production-tracking.cjs` superati. Verifiche visive desktop e mobile, comprese quattro sedi a 320 px e apertura FAQ.

Deployment verificato e promosso: `dpl_6e2MccrtDBCc77YQuSXskchT3x6d`, URL immutabile `https://alexander-pizzeria-hieilzqxr-tonynos-projects-524f5113.vercel.app`. Prima e dopo la promozione: quattordici risposte HTTP confrontate con i sorgenti tramite SHA-256, sei percorsi privati/locali restituiscono 404, API recensioni 200, CSP conservata e dominio ufficiale indicizzabile. Nessuna modifica Google Business Profile, prenotazione, ordine o pagamento.

Graphify codice aggiornato tramite solo AST locale: 215 nodi e 260 archi. Grafo aziendale locale: aggiunti nove nodi e tredici archi di rilascio, preservando osservazioni e snapshot precedenti. Indici, backup e prove restano fuori da Git.

## Allineamento Git

Il rilascio iniziale è stato costruito dal commit `7fd414a` più i dieci file SEO, verificati con manifest esterno. Il gestore ha successivamente richiesto di salvare e sincronizzare questi sorgenti con il repository remoto. Il commit include esclusivamente i dieci file del sito e questo rapporto. Restano esclusi e preservati `.gitignore`, `.graphifyignore`, `AGENTS.md`, `.agents/`, `aura-3d/`, `cinematic/` e `v2/` locali. Non si usano push forzati.

Evidenze, manifest e ricevuta della sincronizzazione: `output/seo-2026-10-23-task-3-4-5/implementazione/` nella cartella di lavoro esterna al repository. Gli eventuali cambiamenti di soli fine riga introdotti dalla normalizzazione Git non modificano il contenuto del sito.

## Ripristino

Versione precedente al rilascio SEO: `dpl_97NPZ2Lb1atjzrHhjNgcre7xkRkA`, URL `https://alexander-pizzeria-cno2smfr4-tonynos-projects-524f5113.vercel.app`. Se necessario, promuovere questa versione con Vercel e verificare il dominio pubblico; il ripristino del repository richiede un nuovo commit di revert del commit SEO, senza cancellare la cronologia.
