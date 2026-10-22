# Rilascio cinematografico Alexander — 22 ottobre 2026

## Autorizzazione e versione

Il gestore ha approvato l'anteprima e autorizzato il completamento tecnico e la pubblicazione sul dominio principale. Ramo `release/cinematic-production-2026-10-22`, creato dal lavoro approvato `98d5323`; `main` (`3729868`) e `origin/main` sono già antenati del ramo, senza modifiche successive da integrare al momento del controllo. La cartella originale e le sue modifiche locali sono preservate; questa cartella separata rimane la sorgente del rilascio.

## Ripristino verificato prima del rilascio

Produzione iniziale: deployment `dpl_AoA5yvMvDMVvbgFn3YEHKskg9MYu`, URL `https://alexander-pizzeria-47qzjvvm6-tonynos-projects-524f5113.vercel.app`, Ready. La homepage pubblica corrisponde esattamente al file `main:index.html`. Snapshot di 25 pagine e homepage precedente salvati fuori dal repository in `_working/cinematic-production-2026-10-22/before-production.json` e `before-home.html`. DNS Vercel del dominio verificato; il dominio pubblico risponde da Vercel. Chiave Places presente e cifrata nell'ambiente produzione; non letta né copiata.

## Preparazione completata

- Ripristinata indicizzazione su tutte le pagine principali; 404 esclusa. Canoniche sul dominio ufficiale e header noindex/nofollow mantenuto per gli host `.vercel.app`.
- Ripristinato il caricatore originale `production-consent.js` come primo script differito, prima del menu; aggiunto pulsante funzionante Preferenze cookie a tutti i footer. Identificativi e logica del consenso esistenti conservati.
- Sitemap dei 24 URL canonici aggiornata al 22 ottobre 2026; pagina di errore fuori dalla sitemap. Robot invariati.
- Test Node originali su otto menu/asporti, sedi, consenso, revoca, esclusione delle anteprime e assenza di false conversioni superati.
- Suite locale su 25 pagine, sei larghezze da 320 a 1440 pixel, immagini, navigazione, FAQ, movimento ridotto e scelta sede superata. Servizi esterni simulati solo nella suite di impaginazione; caricamento reale verificato separatamente nell'anteprima.
- Interfaccia Iubenda reale verificata sui file candidati usando origine ufficiale simulata e intercettazione di ogni endpoint di misura: rifiuto senza tracker, accettazione dopo salvataggio con attivazione GA4/Meta, revoca con disabilitazione GA4 e revoca Meta. Nessun evento inviato ai servizi di misura. Il pannello richiede Salva e continua dopo la selezione; l'omissione di quel passaggio nel primo test è stata corretta, senza modificare i due script originali. Rapporto `consent-verification.json` esterno.

## Strategia di pubblicazione

Deployment con ambiente produzione e `--skip-domain`, controllo della URL tecnica e del feed recensioni, poi promozione sul dominio ufficiale. Questo mantiene il vecchio sito attivo durante le verifiche del candidato. Documentazione CLI verificata: https://vercel.com/docs/cli/deploy e https://vercel.com/docs/cli/promote. Consenso e callback riscontrati con interfaccia reale; riferimento originale https://www.iubenda.com/en/help/1205-how-to-configure-your-cookie-solution-advanced-guide-2/.

## Pubblicazione completata e verificata

Deployment `dpl_A1JcgqutifTtZrEAW2o7wsSG48y5`, URL tecnica `https://alexander-pizzeria-8l4hdc496-tonynos-projects-524f5113.vercel.app`, ambiente produzione, Ready, commit applicativo `1fdc871`. Creato con `--prod --skip-domain` e promosso dopo il superamento dei controlli. Prima della promozione il dominio ufficiale corrispondeva ancora alla homepage precedente; dopo la promozione `vercel inspect https://www.alexanderpizzeria.com` risolve questo nuovo deployment.

Verifiche prima e dopo la promozione: 25 pagine e 10 risorse corrispondenti ai file locali, nessun errore; sitemap di 24 URL, indicizzazione consentita sul dominio pubblico e negata tramite header sulle URL tecniche; cinque redirect legacy corretti; pagina inesistente, patch interna, AGENTS.md e `.env` restituiscono 404. Feed recensioni produzione `live: true`, quattro sedi, rilevazione `2026-10-22T08:18:22.974Z`; nessuna chiave copiata o esposta. Rapporti esterni `staged-deployment.json` e `public-deployment.json`.

Suite browser sul dominio pubblico superata su 25 pagine e sei larghezze: foto, loghi, menu mobile, FAQ, scelta menu/prenotazione, movimento ridotto e assenza di overflow. Nessun errore JavaScript o HTTP interno. In questa suite le librerie Iubenda sono simulate per misurare l'impaginazione senza banner; interfaccia reale testata separatamente. Rapporto `complete-cloud-verification.json` nella cartella di verifica produzione.

Consenso reale sul sito pubblico: rifiuto senza tracker, accettazione dopo salvataggio con loader GA4/Meta, successiva revoca con GA4 disabilitato e revoca Meta. Tutti gli endpoint di misura intercettati durante i test: nessun evento inviato alle proprietà reali e nessuna prova dell'effettiva ingestione nelle dashboard di analisi. Rapporto `public-consent-verification.json` e screenshot nella cartella di verifica produzione.

Otto servizi menu/asporto reali caricati sul dominio ufficiale, con riquadro portato nella parte visibile: tutti superati. Rapporto `provider-cloud-verification.json` nella precedente cartella di verifica anteprima, con `base` uguale al dominio pubblico. Nessun ordine, prenotazione, iscrizione, candidatura o pagamento eseguito.

Graphify rigenerato esclusivamente con AST locale e clustering senza etichette esterne: 180 nodi, 210 archi, indice escluso da Git. L'anteprima stabile rimane associata al proprio deployment separato e noindex. Per ripristinare il sito precedente usare il deployment di rollback sopra registrato e poi verificare il dominio pubblico.
