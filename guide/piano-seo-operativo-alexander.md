# Piano SEO Operativo Integrato — Alexander Pizzeria
**Integra:** audit tecnico (22/07/2026) + topical map DataForSEO (34 pagine · 7 pillar · 64 keyword · 14 competitor)

---

## 1. Cosa cambia con i nuovi dati

La topical map conferma e potenzia la strategia dell'audit, e **risolve una decisione rimasta aperta**: la struttura URL. I canonical rotti del sito puntano già a URL "puliti" (`/blog/...`, `/menu/`) e la topical map è costruita interamente su URL puliti (`/asporto/pinerolo`, `/pizza-senza-glutine/torino`...). Quindi la scelta è obbligata e coerente:

> **Decisione architetturale: migrare a URL puliti a cartelle, con redirect 301 da tutti i vecchi `.html`.** Un'unica migrazione sistema i canonical rotti E prepara il terreno per tutte le nuove pagine della mappa.

Secondo cambiamento: il calendario editoriale ora è **guidato dai volumi reali** — e la sorpresa più grossa è il cluster "lievitazione pizza 24 ore" (~7.700 ricerche/mese), il singolo contenuto informativo più grande di tutta la mappa.

---

## 2. ⚠️ Prima di tutto: come leggere i volumi

Alcuni numeri vanno presi con le pinze, perché sono quasi certamente **volumi nazionali, non locali**:

- "ristorante rivoli" 23.730/mese e "giaveno ristoranti" 15.100/mese sono implausibili per comuni da 50k e 16k abitanti come ricerche locali — DataForSEO restituisce spesso il volume Italia.
- Le keyword "vicino a me" (18.100, 9.330, 3.600...) sono per definizione volumi nazionali distribuiti su tutto il territorio: la quota "catturabile" da chi si trova fisicamente vicino alle 4 sedi è una frazione minima.

**Conseguenza pratica:** i volumi vanno usati per la *priorità relativa* tra le pagine (l'ordine è comunque giusto), non come previsione di traffico. Non promettere/aspettarsi "18.000 visite dal cluster asporto".

---

## 3. Valutazione della topical map: semaforo pagina per pagina

### 🟢 Verde — costruirle come previsto (alto valore, rischio basso)

| Pagina | Vol. cluster | Perché sì |
|---|---:|---|
| **/giaveno-ristorante/** — Ristorante Valsangone | 18.260 | **La mossa migliore di tutta la mappa.** "giaveno ristoranti" + "trattoria giaveno" + "aperti a pranzo" sono intent ristorante, diversi da "pizzeria". Giaveno è l'unica sede aperta a pranzo con cucina completa: split sacrosanto. |
| **Boost /pinerolo.html** | 19.580 | 7 keyword nel cluster ("pizzeria pinerolo", "trattoria a pinerolo" 3.520, "pinerolo pizza", "napoletana", "centro", "aperte oggi"). Oggi ranka solo per 2 KW: enorme margine con ottimizzazione on-page. |
| **Boost /piossasco.html** | 1.710 | 0 KW indicizzate oggi = il gap più urgente. Nota: nel cluster c'è "pizzeria piossasco **a domicilio**" — voi NON fate domicilio, va detto chiaramente in pagina per intercettare e riconvertire quell'intent sull'asporto. |
| **/asporto/** pillar + **/asporto/pinerolo** | 3.720 + 930 | Pattern validato dal competitor best-in-class (lacoccinellarivoli.it). Pinerolo ha volume reale ("pizzeria da asporto pinerolo" 660 + "pizza asporto pinerolo" 270). |
| **/pizza-senza-glutine/** pillar + **/pizza-senza-glutine/torino** | 1.020 + 4.950 | USP vera (base gluten-free in tutte le sedi). "ristoranti/pizzeria/pizza senza glutine torino" = 4.950 combinate, intent fortissimo: i celiaci si spostano volentieri anche fuori città per un locale affidabile. Il blog esistente si promuove a pillar. |
| **Guide lievitazione 24h / 72h / 36h** | 7.730 + 160 + 40 | Contenuti blog perfetti (vedi calendario §6). Attenzione: chi cerca "lievitazione pizza 24 ore in frigo" è un home baker, non un cliente → l'obiettivo è autorevolezza topica sul pillar lievitazione + brand, non prenotazioni dirette. |
| **/pizza-forno-a-legna/** | 2.550 | Pillar USP legittimo, collega impasto + cottura. |

### 🟡 Giallo — farle, ma modificate

| Pagina proposta | Problema | Correzione |
|---|---|---|
| /sedi/torino-provincia ("pizzerie torino" 16.610) | Chi cerca "pizzerie torino" vuole Torino **città** — le sedi sono in provincia: intent mismatch, ranking improbabile | Farla come **hub "Le nostre sedi"** (`/sedi/`): utile per architettura, internal linking e per query "pizzeria provincia di torino" — senza aspettarsi le query cittadine |
| /asporto/rivoli (160) | Volume basso ma pattern coerente | Farla nella seconda ondata, dopo Pinerolo |
| /pizza-senza-glutine/rivoli (480) | Volume decente | Farla, seconda ondata |
| /menu.html split per sede | Idea giusta a metà | Prima consolidare UN menu forte con schema; split per sede solo se i menu differiscono davvero (Giaveno sì per il ristorante) |
| Pagine #brand (pinerolo#brand ecc.) | Non sono pagine, sono fragment | Correttamente = azioni di rafforzamento schema/brand sulle pagine sede esistenti. Nessuna nuova URL |

### 🔴 Rosso — sconsigliate così come proposte

| Pagina proposta | Vol. | Perché no |
|---|---:|---|
| **/asporto/vicino-a-me** | 18.100 | Le query "vicino a me" vengono riscritte da Google con la **geolocalizzazione dell'utente**: rispondono il local pack e risultati geo-localizzati, non una pagina ottimizzata per la stringa "vicino a me". Il volume è nazionale e non catturabile. Chi lo cattura davvero è il **profilo Google Business**. |
| **/sedi/aperto-oggi** | 9.330 | Stesso identico meccanismo ("pizzerie vicino a me aperte oggi"). Gli orari aggiornati su GBP vincono queste query, non una landing. |
| **/sedi/migliori-vicino-a-me** | 3.600 | Come sopra + problema di credibilità (vedi sotto). |
| **/sedi/vicino-a-me** | 390 | Come sopra. |
| **/sedi/migliori-torino-provincia** | 8.180 | Per "migliori pizzerie torino" la SERP premia fonti **terze** (Gambero Rosso, TripAdvisor, magazine): un'autoclassifica sul proprio dominio non è competitiva né credibile. Meglio **digital PR**: farsi inserire in quelle classifiche. |
| /menu/torino ("pizza torino" 1.780) | 1.780 | Intent Torino città, mismatch. Accorpare al menu/hub sedi. |

**In sintesi:** 4 pagine "vicino a me" + 1 comparativa + 1 menu/torino → sostituite da **1 hub `/sedi/`** ben fatto (mappa, orari live, link alle 4 sedi) + **investimento serio su Google Business Profile**, che è lo strumento che davvero converte quei ~31.000 di volume "vicino a me". La mappa passa così da 34 a **~29 pagine più difendibili**.

Ultimo rischio evitato: le landing a volume 0-40 (senza-glutine Giaveno/Pinerolo, forno-a-legna Pinerolo, asporto Giaveno/Piossasco) create tutte insieme e sottili sono un pattern da **doorway pages**. Vanno create solo quando c'è contenuto davvero unico per sede (foto, procedure anti-contaminazione locali, recensioni della sede), altrimenti posticipate — la coda del piano, non la testa.

---

## 4. Architettura URL definitiva e mappa redirect

Struttura target (allineata alla topical map, risolve i canonical rotti):

```
/                              home
/sedi/                         hub 4 sedi (nuova — sostituisce le pagine "vicino a me")
/pinerolo/          ← 301 da /pinerolo.html
/piossasco/         ← 301 da /piossasco.html
/giaveno/           ← 301 da /giaveno.html          (solo pizzeria)
/giaveno-ristorante/                                 (nuova — cucina, pranzo, porcini)
/rivoli/            ← 301 da /rivoli.html
/menu/              ← 301 da /menu.html              (il canonical attuale già la dichiara!)
/prenota/           ← 301 da /prenota-un-tavolo.html
/asporto/                      pillar asporto
/asporto/pinerolo/  ...rivoli/ ...giaveno/ ...piossasco/
/pizza-senza-glutine/          pillar (da blog-pizza-senza-glutine.html via 301)
/pizza-senza-glutine/torino/   + /rivoli/ (fase 2) + /pinerolo/ /giaveno/ (fase 3)
/pizza-lunga-lievitazione/     pillar (da blog-impasto-lunga-lievitazione.html via 301)
/pizza-forno-a-legna/          pillar
/guide/lievitazione-pizza-24-ore/   + 36 / 72 ore
/blog/                         ← 301 da /blog.html (canonical attuale già corretto!)
/blog/nome-articolo/           ← 301 dai vecchi blog-*.html
```

Regole di migrazione: redirect 301 uno-a-uno (mai tutto verso la home), canonical autoreferenziali sui nuovi URL, sitemap rigenerata con SOLI nuovi URL, aggiornare tutti i link interni (niente link che passano dal redirect), aggiornare i link sito nei 4 profili GBP. I fix già elencati nell'audit restano validi (307→301 su non-www, verifiche Search Console/Bing, og:description, template in noindex).

---

## 5. Roadmap rivista (fasi integrate audit + topical map)

**Fase 0 · entro fine agosto — Fondamenta tecniche** *(dall'audit, invariata ma ora con la migrazione URL)*
1. Search Console + Bing verificati (DNS)
2. Migrazione URL puliti + redirect 301 + sitemap nuova
3. Redirect non-www 307→301 · og:description fix · template noindex
4. Riscrittura dei 6 articoli esistenti a 800+ parole con schema BlogPosting
5. Ottimizzazione dei 4 profili Google Business (è qui che si "prendono" le query vicino a me)

**Fase 1 · set-ott — Quick win sulle pagine esistenti** *(= Fase 1 della strategia, confermata)*
1. Boost on-page **Pinerolo**: title/H1 che coprano il cluster (pizzeria · trattoria · centro · napoletana), FAQ ampliate, sezione "aperti oggi/orari" ben marcata
2. Boost on-page **Piossasco**: da 0 KW — stesso pattern + gestione esplicita dell'intent "a domicilio" → "solo asporto, ecco come"
3. Hub **/sedi/** nuovo
4. Rafforzamento brand schema (le ex pagine "#brand")

**Fase 2 · ott-nov — Cluster asporto + split Giaveno** *(= Fase 2, con priorità corrette)*
1. **/giaveno-ristorante/** — la pagina nuova a più alto potenziale della mappa
2. Pillar **/asporto/** + **/asporto/pinerolo/** (poi Rivoli; Giaveno/Piossasco in coda)
3. Interlinking: ogni pagina sede ↔ sua pagina asporto ↔ pillar

**Fase 3 · nov-gen — Pillar USP** *(= Fase 3, confermata)*
1. **/pizza-senza-glutine/** (pillar) + **/torino/** + /rivoli/
2. **/pizza-lunga-lievitazione/** (pillar) + guide 24h/36h/72h dal blog (già nel calendario)
3. **/pizza-forno-a-legna/**
4. Landing volume-zero: solo se/quando c'è contenuto unico per sede

---

## 6. Calendario editoriale v2 — ora keyword-driven (ago 2026 → gen 2027)

Rispetto alla v1: entrano le **guide lievitazione** (il tesoro da 7.700+ ricerche trovato dalla mappa), ogni articolo dichiara **quale pillar/pagina supporta**, restano gli articoli stagionali/locali che i dati keyword non vedono ma che per una pizzeria locale funzionano (sagra, porcini, feste).

| Mese | Articolo | Keyword primaria (vol.) | Supporta |
|---|---|---|---|
| **Ago** | Lievitazione pizza 24 ore: guida completa (anche in frigo) | lievitazione pizza 24 ore (6.250) + "in frigo" (1.480) | Pillar lievitazione |
| **Ago** | Pizza d'asporto da Alexander: come ordinare, sedi e orari | pizza d'asporto (3.720) | Pillar /asporto/ |
| **Set** | Sagra del Fungo di Giaveno 2026: programma e dove mangiare i porcini | sagra del fungo giaveno (stagionale) | /giaveno-ristorante/ |
| **Set** | Farina di mais rosso e tipo 1 macinate a pietra: il nostro impasto | farina tipo 1 pizza | Pillar lievitazione |
| **Ott** | Porcini freschi in Valsangone: la stagione al ristorante di Giaveno | funghi porcini giaveno (stagionale) | /giaveno-ristorante/ |
| **Ott** | Dove mangiare a Rivoli: dal Castello a Piazza Principe Eugenio | ristoranti rivoli cena (260) + long tail | /rivoli/ (cluster 40k) |
| **Nov** | Lievitazione 72 ore: cosa cambia davvero oltre le 48 | pizza lievitazione 72 ore (160) | Pillar lievitazione |
| **Nov** | Dove mangiare a Pinerolo: guida tra centro e Via Midana | trattoria a pinerolo (3.520, di sponda) | /pinerolo/ |
| **Dic** | Cene di Natale e feste aziendali nelle 4 sedi | cena aziendale + stagionale | /prenota/ + sedi |
| **Dic** | Cos'è una pizza gourmet (e le nostre speciali) | pizzeria gourmet torino (1.770) | /menu/ |
| **Gen** | Pizza senza glutine per celiaci: come evitiamo la contaminazione | pizzerie per celiaci (1.020) | Pillar senza glutine |
| **Gen** | Lievitazione 36 ore + tabella comparativa 24/36/48/72 | pizza lievitazione 36 ore (40) | Chiude il cluster lievitazione |

Regole invariate dalla v1: 800-1.200 parole, schema BlogPosting, 2-3 link interni (di cui sempre 1 al pillar supportato), WebP, CTA finale, articolo in sitemap il giorno stesso. Gli stagionali si aggiornano e ripubblicano ogni anno.

---

## 7. Gestione cannibalizzazione (i 20 flag del CSV)

Il CSV segna 20 pagine a rischio. Regole per neutralizzarlo:

1. **Un intent = una pagina.** Sede (venire a cena) ≠ asporto (ritirare) ≠ senza glutine (esigenza specifica) ≠ ristorante (pranzo/cucina). Title e H1 devono dichiarare intent diversi senza sovrapporsi.
2. **Giaveno è il caso ALTO rischio**: dopo lo split, /giaveno/ mantiene solo keyword "pizzeria", /giaveno-ristorante/ prende "ristorante/trattoria/pranzo". Le due pagine si linkano a vicenda nel primo paragrafo ("cerchi il ristorante? →").
3. **Le pagine sede linkano le figlie** (asporto, senza glutine) con anchor esatte; le figlie linkano su al pillar e alla sede. Mai due pagine che puntano alla stessa keyword primaria.
4. I supporting a volume ~0 escono per ultimi proprio per non creare quasi-duplicati prematuri.
5. Monitoraggio: in Search Console, report "Rendimento" filtrato per query → se due URL si alternano sulla stessa query per 4+ settimane, consolidare (301 o canonical).

---

## 8. KPI aggiornati

Oltre a quelli dell'audit (click/impression per sede, posizioni "pizzeria+comune", azioni GBP, prenotazioni con UTM, recensioni/mese):

- **Copertura cluster**: n° keyword del CSV per cui il sito entra in top 20 / top 10 (baseline oggi: ~2 su 64)
- **Pinerolo e Piossasco**: da 2 e 0 keyword posizionate → target 10+ ciascuna entro fine Fase 1
- **Migrazione URL**: errori 404 in Search Console = 0 entro 2 settimane dal go-live; traffico organico recuperato al 100% entro 4-6 settimane
- **Cluster lievitazione**: impression sulle query "lievitazione pizza *" come proxy dell'autorevolezza topica

---

*Fonti: audit tecnico diretto del sito (22/07/2026) + strategy.md, page-plan.csv (34 pagine), keyword-mapping.csv (64 keyword), topical map DataForSEO su 14 competitor.*
