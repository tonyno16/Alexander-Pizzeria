# Guida implementazione Analytics – Alexander Pizzeria

Questa guida spiega come completare e verificare gli analytics sul sito (Google Analytics 4, Facebook Pixel) e come funziona l’integrazione con il consenso cookie (Iubenda).

---

## 1. Cosa c’è già nel sito

- **Google Analytics 4 (GA4):** script pronto in `assets/js/analytics.js`, ma con **Measurement ID placeholder** (`G-XXXXXXXXXX`). Finché non lo sostituisci, GA4 non viene caricato.
- **Facebook Pixel:** ID **256613265809196** già impostato; invia `PageView` e rispetta il consenso.
- **Consenso cookie (Iubenda):** quando l’utente accetta i cookie, viene chiamata `updateAnalyticsConsent(true)` e GA4/Pixel possono registrare dati.
- **Eventi automatici:** i click su pulsanti con `data-event` (Chiama, Prenota, Ordina) vengono inviati a GA4 e Facebook come eventi personalizzati, con eventuale `data-location` (es. `pinerolo`, `giaveno`).

---

## 2. Google Analytics 4 – Completare la configurazione

### 2.1 Ottenere il Measurement ID

1. Vai su [analytics.google.com](https://analytics.google.com) e accedi con l’account Google del business.
2. In basso a sinistra clicca **Admin** (ingranaggio).
3. Nella colonna **Proprietà** seleziona la proprietà del sito (o creane una: **Crea proprietà** → nome tipo “Alexander Pizzeria” → fusi e valuta → Crea).
4. Sotto **Dati** (o “Raccolta dati”) clicca **Flussi di dati**.
5. Clicca sul flusso **Web** (o “Aggiungi flusso” → Web → URL del sito, es. `https://www.alexanderpizzeria.com`).
6. Nella scheda del flusso trovi **ID misurazione** in formato `G-XXXXXXXXX`. Copialo.

### 2.2 Inserire l’ID nel sito

1. Apri **`assets/js/analytics.js`**.
2. Trova la riga:
   ```js
   var GA4_MEASUREMENT_ID = "G-XXXXXXXXXX";
   ```
3. Sostituisci con il tuo ID, ad esempio:
   ```js
   var GA4_MEASUREMENT_ID = "G-ABC123XYZ";
   ```
4. Salva il file.

### 2.3 Aggiornare il bundle (importante)

Il sito carica **`assets/js/bundle.min.js`**, che include `analytics.js`. Dopo aver modificato `analytics.js` devi rigenerare il bundle:

```bash
npm run build
```

(oppure lo script che nel tuo progetto genera `bundle.min.js`). Se non esegui il build, le modifiche in `analytics.js` non appariranno sul sito.

### 2.4 Verificare che GA4 riceva dati

1. In GA4 vai in **Report** → **Tempo reale** (o **Configurazione** → **DebugView** se hai attivato la modalità debug).
2. Apri il sito in un’altra scheda, accetta i cookie e naviga un po’.
3. In Tempo reale dovresti vedere almeno 1 utente attivo e le pagine visualizzate. Per eventi (Chiama, Prenota, Ordina) controlla **Eventi** in GA4 dopo qualche ora o il giorno dopo.

---

## 3. Facebook Pixel – Verifica

- **ID Pixel:** **256613265809196** (già in `analytics.js`).
- **Eventi:** alla prima visita viene inviato `PageView`; dopo il consenso cookie il pixel è attivo. I click su elementi con `data-event` generano anche eventi personalizzati su Facebook.

**Verifica in Meta:**

1. Vai su [business.facebook.com](https://business.facebook.com) → **Strumenti** → **Gestione attività** → **Eventi** (o “Event Manager”).
2. Seleziona il Pixel (ID 256613265809196).
3. Apri **Test eventi** (o “Test Events”): inserisci l’URL del sito, carica la pagina e accetta i cookie; dovresti vedere eventi come `PageView` e, cliccando Chiama/Prenota/Ordina, gli eventi personalizzati.

Se devi usare un **Pixel ID diverso**, sostituisci in `assets/js/analytics.js` la stringa `"256613265809196"` nelle chiamate `fbq("init", ...)` e, se presente, in eventuali altri punti. Poi riesegui il build del JS.

---

## 4. Consenso cookie e collegamento con gli analytics

- Il **banner cookie** è gestito da **Iubenda** (configurazione in `index.html` e in `cookie-consent.js` / bundle).
- Quando l’utente **accetta** i cookie, Iubenda chiama:
  ```js
  window.updateAnalyticsConsent(true);
  ```
- Questa funzione (definita in `analytics.js`) abilita l’uso di cookie/archiviazione per GA4 e per il Pixel. **Senza accettazione**, gli script non registrano dati in modo conforme (consenso “revoke” / “denied” fino all’accettazione).

Non serve modificare nulla se Iubenda e `updateAnalyticsConsent` sono già collegati come sopra; verifica solo che, accettando il banner, in GA4 e in Meta compaiano i dati.

---

## 5. Eventi già tracciati (data-event)

Gli elementi con attributi **`data-event`** (e opzionalmente **`data-location`**) inviano automaticamente eventi a GA4 e Facebook quando l’utente clicca.

| Valore `data-event`   | Significato        | Esempio uso                          |
|------------------------|--------------------|--------------------------------------|
| `click_call`          | Click su “Chiama”  | Card sedi, barra mobile, pulsanti tel|
| `click_booking`       | Click su “Prenota” | Link a prenota-un-tavolo / form      |
| `click_takeaway`      | Click su “Ordina”  | Link asporto / delivery              |

Se è presente **`data-location="pinerolo"`** (o `giaveno`, `piossasco`, `rivoli`), il valore viene inviato come parametro dell’evento (in GA4 e come parametro custom su Facebook), così puoi vedere da quale sede arriva il click.

**Dove sono usati:** homepage (card sedi, barra sticky mobile), eventuali CTA nelle pagine sedi e in prenota-un-tavolo. Cercando nel progetto `data-event` trovi tutti i punti.

**Aggiungere un nuovo evento:** su un link o pulsante aggiungi ad esempio:
```html
data-event="click_booking"
data-location="giaveno"
```
Non serve scrivere JavaScript: `analytics.js` usa la delega sugli elementi con `data-event` e chiama `trackEvent` al click.

**Eventi da codice:** puoi chiamare da qualsiasi script:
```js
if (window.trackEvent) {
  window.trackEvent("nome_evento", { parametro: "valore" });
}
```
Questo invia l’evento a GA4 e al Pixel (evento personalizzato).

---

## 6. Riepilogo passi operativi

| Passo | Azione |
|-------|--------|
| 1 | Ottenere l’**ID misurazione GA4** (G-…) da Admin → Flussi di dati → Web. |
| 2 | In **`assets/js/analytics.js`** sostituire `G-XXXXXXXXXX` con l’ID reale. |
| 3 | Eseguire **build JS** (es. `npm run build`) per aggiornare `bundle.min.js`. |
| 4 | Caricare il sito (deploy) e verificare in GA4 **Tempo reale** e in Meta **Test eventi**. |
| 5 | (Opzionale) Controllare in GA4 **Configurazione → Eventi** e in Meta **Eventi** che gli eventi personalizzati (click_call, click_booking, click_takeaway) arrivino con i parametri desiderati. |

---

## 7. File coinvolti

| File | Ruolo |
|------|--------|
| **assets/js/analytics.js** | GA4 (Measurement ID), Facebook Pixel, consenso, `trackEvent`, delega `data-event`. |
| **assets/js/cookie-consent.js** | Configurazione Iubenda e callback che chiama `updateAnalyticsConsent(true)` all’accettazione. |
| **assets/js/bundle.min.js** | Bundle usato dal sito; va rigenerato dopo modifiche a `analytics.js` (o altri script inclusi nel build). |
| **index.html** (e altre pagine) | Banner Iubenda in head; pulsanti/link con `data-event` e `data-location`. |

Dopo aver inserito l’ID GA4 e aver fatto il build, gli analytics sono operativi; la guida qui sopra ti permette di verificare e, se serve, estendere gli eventi o il Pixel.
