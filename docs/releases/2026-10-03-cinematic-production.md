# Sito cinematico Alexander in produzione

Pubblicato il 3 ottobre 2026 su https://www.alexanderpizzeria.com/. Il dominio senza www reindirizza permanentemente alla versione www; HTTP passa a HTTPS.

## Versione pubblicata

- Hosting: progetto Vercel `alexander-pizzeria`, scope `tonynos-projects-524f5113`.
- Deployment: `dpl_H4HjEa2AiHLNFRgZj9XYwccAwSg3`.
- URL del deployment: https://alexander-pizzeria-6d5tvoy09-tonynos-projects-524f5113.vercel.app/.
- Contenuto: Site cinematico versione 7, commit `d2d7e7ad1d8f5d0d18326bc7e25506d4b4cbb25a`, adattato per il dominio principale.
- Release eseguita prima con ambiente di produzione e `--skip-domain`; promozione solo dopo i controlli preliminari.

Le pagine canoniche risiedono ora nelle cartelle con `index.html`. Homepage, CSS, JavaScript, fotografie e video autentici, metadati, sitemap, robots e documenti llms sono allineati alla versione pubblicata. I file HTML piatti della precedente versione restano disponibili nel checkout come storico, esclusi dai futuri upload; le vecchie URL sono gestite dai redirect di `vercel.json`.

Conservati logo, AIC, foto di Piossasco, nuova foto senza glutine, contatti e URL di menu/prenotazione. L'API Google Places `api/reviews.js` è identica alla precedente; la credenziale rimane nel progetto Vercel. Il modulo dimostrativo delle candidature è sostituito da collegamenti all'email pubblica `info@alexanderpizzeria.com`. Iubenda usa gli stessi identificativi; il pixel Meta `1242459011329386` parte dopo il consenso marketing. Nessun nuovo endpoint per dati personali o invio automatico di email.

Rimossi i blocchi di anteprima dall'indicizzazione sul dominio pubblico; le URL Vercel mantengono `X-Robots-Tag: noindex, nofollow`. Corretto anche il vecchio wildcard `/news/` per i percorsi con slash finale.

## Validazione

Verifiche HTTP prima e dopo la promozione: tutte le 16 pagine canoniche, 40 percorsi legacy (compreso un percorso sotto news), integrità di otto asset rappresentativi, canonical, meta robots, JSON-LD, sitemap/robots/llms e risposta 404 per una URL inesistente. Le recensioni live sono disponibili per tutte e quattro le sedi, con attribuzione Google e collegamenti agli autori.

I report completi sono in `Alexander Cinematic Sites/review/staged-production-checks.json` e `live-production-checks.json`. La verifica browser conferma la home sul dominio pubblico, le recensioni aggiornate automaticamente e il banner Iubenda. Le modifiche locali preesistenti a `.gitignore`, `.agents/`, `.graphifyignore`, `AGENTS.md`, `cinematic/` e `v2/` sono preservate e non incluse nel commit di rilascio.

## Rollback

Deployment precedente: `dpl_DGvmNimUaDzV6iCTboWzYTMHpNkZ`, https://alexander-pizzeria-2w81pda1g-tonynos-projects-524f5113.vercel.app/.

Per tornare alla versione precedente usare il comando Vercel rollback con quell'identificativo e lo scope sopra indicato, poi verificare le pagine sul dominio pubblico. Il rollback del dominio non modifica automaticamente le sorgenti locali: riallinearle prima del successivo deploy.

L'anteprima Sites resta separata e conserva il pubblico `workspace_all`; nessuna modifica ai DNS o al suo accesso.


Preservati i codici di verifica Google Search Console e Bing presenti nella home precedente, insieme al file BingSiteAuth.xml. Verificati risposta pubblica, resa della nuova fotografia su desktop e mobile (nessuno scorrimento orizzontale a 390px) e apertura effettiva della mappa Google di Piossasco. Il grafo locale è aggiornato con AST e clustering senza modelli esterni.
