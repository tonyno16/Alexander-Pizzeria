---
status: active
owner: Famiglia Fiore
container_type: area
area_type: function
claude_role: Operate this area proactively — tieni allineati sito, blog, contenuti social e Slack alle 4 sedi; chiedi conferma solo su decisioni Red (prezzi, promesse pubbliche, timing di lancio).
last_updated: 2026-07-08
---

# Marketing & Contenuti

## Purpose

Gestire in modo continuativo il marketing di Alexander Pizzeria: sito, blog, contenuti social, campagne e coordinamento del team che ci lavora (founder + collaboratore foto, in crescita verso altri indipendenti).

## Scope

Owns:

- Coordinamento contenuti (social, blog, promozioni) tra founder e collaboratori via Slack.
- Allineamento del sito/blog ai dati ufficiali delle 4 sedi (brain `00-brain/locations.md`).
- Pianificazione campagne e strategie di comunicazione.
- Flusso di approvazione dei contenuti prima della pubblicazione.

Does not own:

- Sviluppo tecnico del sito (repo `ALexandr Sito`, gestito come progetto di sviluppo separato — vedi Related Projects).
- Dati operativi dei locali (menu, prezzi, orari) → fonte canonica `00-brain/locations.md` e `00-brain/offers.md`, non duplicare qui.
- Dati fiscali/gestionali del ristorante.

## Load First

- Canonical brain links: [`business-profile.md`](../../00-brain/business-profile.md), [`brand-voice.md`](../../00-brain/brand-voice.md), [`locations.md`](../../00-brain/locations.md), [`offers.md`](../../00-brain/offers.md), [`integrations/slack.md`](../../00-brain/integrations/slack.md)
- External source-of-truth links: workspace Slack `alexanderpizzeria.slack.com` (canali: `#generale`, `#foto-e-materiali`, `#contenuti-da-approvare`, `#strategie-marketing`, `#fuori-menu`)
- Related projects: repo sito web `ALexandr Sito` (sviluppo tecnico, gestito separatamente)
- Related apps: [`scripts/meta_ads_list_campaigns.py`](../../../scripts/meta_ads_list_campaigns.py), [`scripts/meta_ads_campaign_insights.py`](../../../scripts/meta_ads_campaign_insights.py) — script su SDK ufficiale `facebook-business` per Meta Ads (repo sito `ALexandr Sito`, vedi anche `CLAUDE.md` in quella root). Slack è wired come integrazione MCP.

## Operating Context

- Team attuale: founder (marketing, sito, blog, strategie) + un collaboratore per foto e lavoro digitale. Previsto l'ingresso di altri indipendenti in futuro.
- Flusso contenuti: idea in `#strategie-marketing` → materiale grezzo in `#foto-e-materiali` → approvazione in `#contenuti-da-approvare` (✅/❌/👀) → pubblicazione.
- 4 sedi (Giaveno, Rivoli, Pinerolo, Piossasco): si distinguono nei contenuti con etichetta `[Sede]`, non con canali separati.
- Vincoli di contenuto da rispettare sempre: Rivoli ha forno a gas (mai "forno a legna"), niente delivery in nessun locale, Giaveno comunicato come "Ristorante Valsangone" — dettagli completi in `00-brain/current-state.md` § Active Constraints.

## Active Work

- Setup iniziale di Slack completato (2026-07-04): 5 canali creati, flusso di approvazione definito.
- Da fare: invitare il collaboratore foto ai canali Slack (serve nome/email).
- Da valutare: Canvas "calendario editoriale" in cima a `#generale`.
- **Meta Ads configurato (2026-07-08)**: accesso via SDK ufficiale `facebook-business` (non il CLI `meta-ads` — vedi Decisions). Script pronti per leggere campagne e insights; verificate 2 campagne attive (boost post Instagram). `CLAUDE.md` creato nella root del repo sito per indirizzare le sessioni future sul workflow corretto.
- Da fare: capire perché la campagna "senza glutine" risulta ACTIVE ma senza spesa/impression negli ultimi 30gg.
- Da valutare: ruotare l'`ACCESS_TOKEN` in `.env` (fu generato/usato anche per il tentativo con il CLI non verificato).

## Related Projects

Generato da `/work-map` quando serve. Non mantenere a mano dopo ogni turno.

## Decisions

- Canali Slack organizzati **per funzione**, non per sede — scelta adatta a un team piccolo (2 persone), da rivedere se il numero di collaboratori cresce molto.
- Questa è la prima area reale del workspace: sostituisce lo scaffold di esempio `example-newsletter` come area function primaria del business.
- **Non usare il pacchetto PyPI `meta-ads` (il "Meta Ads CLI")**: nessun autore/maintainer/repository verificabile, bloccato dal classificatore di sicurezza di Claude Code sia in installazione che in esecuzione. Per Meta Ads usare sempre l'SDK ufficiale verificato `facebook-business` (script in `scripts/meta_ads_*.py`).

## Housekeeping

- Review cadence: ogni 14 giorni, insieme a `00-brain/current-state.md`.
- Common misfiles: dati operativi delle sedi (prezzi, menu, orari) — vanno in `00-brain/`, non qui.

## Archive Criteria

Archive when:

- Il business chiude o il marketing viene esternalizzato del tutto.

## Notes

Usare questa sezione con parsimonia. Promuovere i fatti durevoli su `00-brain/` o su un documento esterno canonico.
