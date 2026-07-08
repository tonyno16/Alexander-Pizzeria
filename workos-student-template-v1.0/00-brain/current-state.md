# Current State

last_updated: 2026-07-08

## Active Priorities

- Popolare e mantenere il **business brain** (`00-brain/`) con i dati ufficiali dei 4 locali (schede maggio 2026).
- Tenere il **sito** (repo `ALexandr Sito`) allineato alle schede: orari 18:30, forno gas a Rivoli, "mais rustica", "riconosciuti AIC", 2009.

## This Week

- Brain compilato da: business-profile, offers, customers, founder-profile, brand-voice, glossary, current-state.
- Attivato il **workspace Slack** del team (`alexanderpizzeria.slack.com`): 5 canali per funzione + flusso di approvazione contenuti. Vedi [`integrations/slack.md`](integrations/slack.md).
- **Correzione birre** segnalata da staff (Matteo) su Slack e confermata dal founder: Entropia SG rimossa dalla spina (resta solo in bottiglia), aggiunta Affligem Rossa in bottiglia. Founder ha confermato che le birre sono servite in **tutti i 4 locali** (non solo Giaveno/Rivoli) → aggiunta l'intera sezione birre anche a `pinerolo.html` e `piossasco.html` (FAQ visibile + JSON-LD + card). Aggiornati tutti e 4 gli HTML e `offers.md`.
- **Meta Ads configurato (2026-07-08)**: il founder ha chiesto di installare un "Meta Ads CLI" (pacchetto PyPI `meta-ads`) — bloccato dal classificatore di sicurezza (nessun autore/maintainer/repository verificabile). Usato invece l'SDK ufficiale `facebook-business`: script in `scripts/meta_ads_list_campaigns.py` e `scripts/meta_ads_campaign_insights.py` (repo sito). Verificate 2 campagne attive; creato `CLAUDE.md` nella root del repo sito per indirizzare le sessioni future sul workflow corretto. Vedi anche `02-areas/marketing-contenuti/_overview.md` § Decisions.

## Waiting On Founder

- **Slack:** nome/email del collaboratore foto per invitarlo ai canali; ok per Canvas "calendario editoriale" in cima a `#generale`.
- ~~**Immagine Affligem Rossa**~~ — risolto: file salvato dal founder in `assets/img/beers/affligem-rossa.png` (2026-07-04), verificato PNG valido.
- Conferma **prezzi piatti ristorante 2026** (Giaveno/Rivoli): le pizze sono +€0,50, i piatti riportano ancora il database 2025.
- Conferma dati "da verificare" nelle schede: numero recensioni Google per locale, account Instagram per Piossasco/Giaveno/Rivoli, chiusure annuali Rivoli, stagionalità/provenienza porcini a Rivoli.

## Active Areas

- [`02-areas/marketing-contenuti/_overview.md`](../02-areas/marketing-contenuti/_overview.md) — prima area reale: marketing, contenuti, sito/blog, coordinamento team (founder + collaboratore foto) via Slack.
- [`02-areas/follow-ups/_overview.md`](../02-areas/follow-ups/_overview.md) — registro follow-up (preesistente).
- Scaffold di esempio (`example-newsletter`, `example-launch`, `example-weekly-pulse`) archiviati in `99-archive/` il 2026-07-04.

## Active Projects

TBD — vedi repo sito web `ALexandr Sito` (gestito separatamente come progetto di sviluppo).

## Workspace Shape

operating_model: single-business
area_pattern: function
reconfigure_notes: Run `/setup-workos` in reconfigure-work-map mode if the business shifts from single-business to client/venture work, or back again.

## Decisions To Remember

- **Prezzi 2026 = database 2025 + €0,50**, uguali in tutti i locali (confermato giugno 2026).
- **Niente delivery** in nessun locale (scelta operativa).
- **Rating finti rimossi** dai JSON-LD del sito — non reintrodurre.
- Giaveno comunicato come **"Ristorante Valsangone"** con pizza Alexander.
- **Meta Ads**: mai usare il pacchetto PyPI `meta-ads` ("Meta Ads CLI") — nessuna provenienza verificabile. Usare solo l'SDK ufficiale `facebook-business` (script in `scripts/meta_ads_*.py`, indicazione anche in `CLAUDE.md` root del repo sito).

## Decision Log

- 2026-06-26: Brain `00-brain/` popolato con dati Alexander dalle 4 schede ufficiali (prima era tutto TBD).
- 2026-06-27: Workspace Slack creato con canali organizzati **per funzione** (non per sede); sedi distinte da etichetta `[Sede]` nei messaggi.
- 2026-07-04: Creata la prima area reale `02-areas/marketing-contenuti/`; archiviati gli scaffold di esempio in `99-archive/`.
- 2026-07-04: Corretta lista birre (Entropia SG fuori dalla spina, aggiunta Affligem Rossa) su `giaveno.html`, `rivoli.html`, `offers.md` — segnalazione arrivata da Slack.
- 2026-07-04: Confermato che le birre artigianali si servono in tutti i 4 locali; estesa la sezione birre anche a `pinerolo.html` e `piossasco.html`.
- 2026-07-08: Rifiutata l'installazione/esecuzione del pacchetto PyPI `meta-ads` (provenienza non verificabile); adottato l'SDK ufficiale `facebook-business` per tutto il lavoro Meta Ads.

## Active Constraints

- Rivoli: **forno a gas** (mai "forno a legna"); non unici AIC in città.
- Porcini freschi solo **maggio–novembre**.
- Giaveno a pranzo: **solo pizza al tegamino**.

## Recent Changes That Affect Output

- Schede ufficiali aggiornate maggio 2026 sono la fonte canonica; il sito conteneva dati errati (2004, 19:00, mais rosso, forno a legna a Rivoli) ora in correzione.

## Open Risks

- Disallineamento tra schede, brain e pagine del sito se aggiornati separatamente.
- Prezzi piatti ristorante non confermati per il 2026.

## Refresh Cadence

Review every 14 days or whenever priorities shift.

## Recent Housekeeping

- 2026-07-08: completato il wizard `/setup-workos` — voce chat = house default (scelta esplicita del founder), schedulati `workos-weekly-cleanup` (lun 09:00) e `workos-follow-up-runner` (08:00/15:00), verificato `.env` git-ignored.
- 2026-06-26: compilati i file brain principali.

## Stale Soon

- Dati "da verificare" delle schede (recensioni Google, Instagram per locale) — confermare con il founder.
