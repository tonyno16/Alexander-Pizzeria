# Slack — comunicazione interna del team

last_updated: 2026-06-27

Workspace Slack del team Alexander Pizzeria, attivato il **2026-06-27**. È il canale di coordinamento tra il founder (marketing, sito, blog, strategie) e il collaboratore che si occupa di foto e lavoro digitale. Pensato per **crescere**: in futuro entreranno altri collaboratori indipendenti.

## Cosa è / quando usarlo

Posto unico per organizzare il lavoro marketing/contenuti delle 4 sedi e **approvare i contenuti** (social, blog, promozioni) prima della pubblicazione. Sostituisce lo scambio disperso su WhatsApp.

- **Workspace:** `alexanderpizzeria.slack.com`
- **Organizzazione canali:** per **funzione** (non per sede). Le sedi si distinguono con un'etichetta nei messaggi: `[Giaveno]`, `[Rivoli]`, `[Pinerolo]`, `[Piossasco]`.

## Canali

| Canale | ID | Scopo |
|---|---|---|
| `#generale` | `C0BDP6KAZBK` | Comunicazioni e organizzazione settimanale |
| `#foto-e-materiali` | `C0BDMAZBH6E` | Foto/video/loghi/listini grezzi (archivio cercabile) |
| `#contenuti-da-approvare` | `C0BDHUTV6HK` | Social, blog, promo da approvare prima di pubblicare |
| `#strategie-marketing` | `C0BEFK8TL2U` | Campagne, idee, sito, SEO, calendario promo |
| `#fuori-menu` | `C0BD5SVKK7Z` | Off-topic, battute, buonumore del team |

**Flusso contenuti:** idea in `#strategie-marketing` → materiale in `#foto-e-materiali` → approvazione in `#contenuti-da-approvare` (✅ pubblica · ❌ rivedere · 👀 in revisione) → pubblicazione.

## Come è wired

- **Tier:** MCP. Server Slack collegato a Claude Code (lettura canali, invio messaggi, creazione canali/canvas).
- **Auth:** gestita dal connettore MCP, non in questo file. Nessun token qui.
- **Founder / owner:** Fabrizio (`U0BDM9PFFD0`).

## Note

- Canali **pubblici**: un nuovo collaboratore vede subito tutto e si mette in pari da solo. Quando il team cresce, dare a ognuno solo i canali utili; per discorsi riservati creare canali **privati**.
- Da fare alla prossima sessione: invitare il collaboratore foto ai canali (serve nome/email), eventuale Canvas "calendario editoriale" in cima a `#generale`.
