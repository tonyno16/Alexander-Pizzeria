# Menu e asporto delle quattro sedi in produzione

Pubblicati il 17 ottobre 2026 su https://www.alexanderpizzeria.com/menu/. Otto nuove pagine: /menu/ e /asporto/ per rivoli, pinerolo, piossasco e giaveno. Le pagine dei quattro locali e il menu generale puntano ai nuovi percorsi, con provider, telefono e attribuzione dei clic distinti per sede. Prenotazioni Lasagna preservate. Rivoli chiude il mercoledì anche nel riepilogo e nei dati strutturati.

## Rilascio

- Progetto Vercel alexander-pizzeria, scope tonynos-projects-524f5113.
- Deployment pronto e promosso: dpl_As7XKN2ySad5gRp2E74Cxxau5f2g.
- URL del deployment: https://alexander-pizzeria-96m467t8c-tonynos-projects-524f5113.vercel.app/.
- Caricamento con ambiente production e skip-domain; promozione dopo i controlli HTTP e l'apertura del servizio asporto incorporato.
- Meta robots delle otto pagine reso index, follow; sitemap aggiornata a 24 URL. Le URL Vercel conservano X-Robots-Tag noindex, nofollow.
- Documenti interni e strumenti PowerShell esclusi dal pacchetto con .vercelignore. Anteprime cinematic e v2, indici, istruzioni locali, dipendenze e credenziali esclusi.
- Conservati il tracciamento consenso già pubblicato e buildCommand vuoto; nessuna esecuzione del vecchio build degli asset.

## Verifiche

Test Node per tutte le otto pagine, isolamento delle sedi, modalità menu/ordine, consenso e revoca, attribuzione clic, esclusione delle anteprime e assenza di false conversioni superati. Prima e dopo la promozione: otto nuove pagine corrispondenti ai file locali, sei asset verificati, 16 pagine canoniche preesistenti con risposta 200, sitemap con 24 URL, documenti interni e percorso inesistente con risposta 404. Il dominio pubblico risolve il deployment nuovo in stato Ready.

Controllo browser sul dominio pubblico: menu Rivoli con categorie e prodotti, collegamento all'asporto, carrello vuoto apribile, formato telefono senza overflow orizzontale. Iubenda mostra misurazione attiva e marketing disattivo; dopo il salvataggio delle preferenze è presente il loader GA4 G-VP4K6WX6P4. La ricezione effettiva nella proprietà GA4 non è stata verificata: il caricamento del tag non prova l'ingestione. Nessun ordine o pagamento eseguito. Conferma finale ed eventuale pagamento rimangono da collaudare con ogni sede; ordini completati nell'iframe richiedono integrazione del fornitore per la misurazione.

Lasagna registra un proprio errore Service Worker 404 anche sull'URL diretto; categorie e carrello restano consultabili. Nessun blocco CSP del sito rilevato nella prova del servizio incorporato.

Evidenze locali: Workos/02-areas/marketing-contenuti/research/2026-10-17-menu-asporto-produzione nella cartella superiore, con controlli staged/live, screenshot, registro e verifiche dei grafi. Google Business non è stato modificato in questo rilascio: collegare i campi Menu e Asporto alle nuove pagine con UTM resta un'operazione successiva.

## Ripristino

Versione precedente identificata prima del rilascio: dpl_HRa2cvQbmMeSiekLapVpzrAPXEHh, https://alexander-pizzeria-m4b33i923-tonynos-projects-524f5113.vercel.app/.

Per ripristinare il dominio usare vercel rollback con quell'identificativo e lo scope del progetto, poi verificare il sito pubblico. Il rollback del dominio non annulla le sorgenti: riallinearle prima di un rilascio successivo. Le modifiche locali non pertinenti sono preservate.
