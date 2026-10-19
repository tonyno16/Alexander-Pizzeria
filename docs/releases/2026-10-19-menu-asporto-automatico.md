# Menu e Asporto aperti automaticamente

Dal 19 ottobre 2026 le otto pagine Menu e Asporto delle quattro sedi caricano Lasagna all'ingresso, senza premere un secondo pulsante. Restano disponibili i collegamenti per continuare in una nuova scheda. Il caricamento non sposta il focus e conserva sede e modalità menu/ordine.

## Verifiche e misurazione

- Test `scripts/test-menu-pilot.cjs` e `scripts/test-production-tracking.cjs` superati: otto percorsi, isolamento sede/modalità, URL non validi respinti, nessun focus automatico, consenso e revoca rispettati.
- Undici risorse controllate prima e dopo la promozione: risposta 200, contenuto identico ai sorgenti, CSP e COOP conservati. Otto richieste con ETag precedenti ricevono 200 e il documento aggiornato.
- Prova browser pubblica: Asporto Pinerolo e Menu Rivoli mostrano le categorie senza premere pulsanti preliminari. Anche la prova staged con tracciamento rifiutato carica Asporto.
- GA4 In tempo reale riceve `menu_embed_load` e `takeaway_embed_load`, uno ciascuno nel campione osservato. Il dettaglio di `menu_embed_load` conferma la campagna tecnica `autoembed_20261019`.
- I due eventi indicano il caricamento dell'iframe, non un clic, un ordine o la conferma del contenuto del fornitore. Le aperture automatiche non generano `menu_open` o `takeaway_open`. Misurazione resta subordinata al consenso; Marketing resta separato.

Prove in `Workos/02-areas/marketing-contenuti/research/2026-10-19-apertura-automatica-menu-asporto/` nella cartella superiore del progetto. Nessun ordine o pagamento eseguito. Nessuna nuova modifica Google Business: la propagazione pubblica Asporto resta una verifica distinta.

## Produzione e ripristino

Deployment `dpl_AoA5yvMvDMVvbgFn3YEHKskg9MYu`, Ready e promosso sul dominio `www.alexanderpizzeria.com`.

URL immutabile: https://alexander-pizzeria-47qzjvvm6-tonynos-projects-524f5113.vercel.app

Il deployment precedente verificato è `dpl_244TF6dUNzJgdmyd2GdYxgKksURs`. Per ripristinare il comportamento precedente:

```powershell
vercel promote https://alexander-pizzeria-kocr0j6ip-tonynos-projects-524f5113.vercel.app --yes --scope tonynos-projects-524f5113
```

Il ripristino reintroduce il pulsante preliminare e gli eventi di apertura manuale. Le modifiche locali preesistenti estranee al rilascio sono conservate.
