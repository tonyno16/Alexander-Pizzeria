# Raccolta regionale Google Analytics del 18 ottobre 2026

La direttiva connect-src della CSP pubblicata autorizzava soltanto www.google-analytics.com. Una prova nel browser con gli stessi header ha riprodotto il rifiuto della connessione a region1.google-analytics.com/g/collect. La CSP corretta consente i sottodomini di google-analytics.com, secondo la documentazione Google, e la stessa richiesta tecnica passa senza violazioni CSP.

La connect-src in vercel.json passa da https://www.google-analytics.com a https://*.google-analytics.com. Le otto pagine Menu/Asporto usano il riferimento /menu/pilot.js?v=20261018-csp: il nuovo corpo HTML cambia l'ETag e fa scaricare anche ai visitatori di ritorno la CSP corretta. Con il corpo invariato, la risposta 304 osservata ometteva la CSP e poteva conservare l'header precedente nel browser. Tutte le altre direttive e impostazioni Vercel sono conservate, incluso Cross-Origin-Opener-Policy same-origin. Gli script di consenso e misurazione non cambiano; Analytics richiede ancora il consenso Misurazione, mentre Marketing rimane separato.

## Rilascio e controlli

- Deployment produzione dpl_244TF6dUNzJgdmyd2GdYxgKksURs.
- URL: https://alexander-pizzeria-kocr0j6ip-tonynos-projects-524f5113.vercel.app/.
- Caricato con skip-domain, verificato prima della promozione e poi promosso sul dominio ufficiale.
- Controllate prima e dopo la promozione 11 risorse: otto pagine Menu/Asporto, homepage e due script. CSP corrispondente al file locale; documenti e script identici alle sorgenti; COOP conservata.
- Otto richieste condizionali con i vecchi ETag restituiscono 200, nuovi ETag e CSP corretta sia prima sia dopo la promozione.
- Test Node esistenti per menu/asporto, consenso, revoca, isolamento delle sedi e assenza di false conversioni superati.
- Prova Iubenda reale in fixture locale: scelta e rilettura Misurazione=true, Marketing=false; callback e API concordi. La fixture non invia eventi Analytics o Meta.
- Il filtro proprietà Internal Traffic è in stato Test. Nessun filtro Analytics modificato.

La rimozione del blocco CSP è verificata. Ricevuti in tempo reale otto page_view e quattro eventi per ciascuno di menu_view, menu_open, click_takeaway, takeaway_view e takeaway_open. Le otto pagine sono distinte per titolo; i menu_view riportano le quattro sedi distinte e campaign=cspfix_20261018. L'attribuzione aggregata nei rapporti ordinari resta distinta da questa prova in tempo reale. Le conversioni completate richiedono l'integrazione del fornitore. Nessun ordine o pagamento effettuato.

## Ripristino

Deployment precedente conservato: dpl_As7XKN2ySad5gRp2E74Cxxau5f2g, https://alexander-pizzeria-96m467t8c-tonynos-projects-524f5113.vercel.app/. Usare il normale rollback Vercel allo scope tonynos-projects-524f5113, poi controllare il dominio. Il rollback del dominio non cambia il file sorgente.

Evidenze: Workos/02-areas/marketing-contenuti/research/2026-10-18-diagnosi-consenso-analytics nella cartella superiore. Le prove precedenti restano conservate.

Fonte tecnica: [CSP per Google Analytics nella documentazione Google](https://developers.google.com/tag-platform/security/guides/csp).
