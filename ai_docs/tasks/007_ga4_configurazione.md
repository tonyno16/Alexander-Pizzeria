# AI Task: Configurazione Google Analytics 4

---

## 1. Task Overview

### Task Title
**Title:** Configurazione Google Analytics 4 con ID Reale

### Goal Statement
**Goal:** Sostituire il placeholder "G-XXXXXXXXXX" con l'ID Measurement reale di GA4 per iniziare a tracciare il traffico e le conversioni del sito.

---

## 2. Current State

### File: `assets/js/analytics.js`
```javascript
// Linea 15 - Placeholder attuale
var GA4_MEASUREMENT_ID = "G-XXXXXXXXXX";
```

Il codice GA4 è già implementato correttamente con:
- ✅ Consent mode (GDPR compliant)
- ✅ Anonymize IP
- ✅ Cookie flags sicuri
- ✅ Integrazione con Iubenda per consenso
- ✅ Event tracking per click (click_call, click_booking, click_takeaway)

**Facebook Pixel** è già configurato con ID: `256613265809196`

---

## 3. Implementation Plan

### Phase 1: Creare Proprietà GA4
**Goal:** Setup su Google Analytics

- [ ] **Task 1.1:** Accedere a Google Analytics
  - URL: https://analytics.google.com

- [ ] **Task 1.2:** Creare nuova proprietà GA4
  - Nome: "Alexander Pizzeria - Website"
  - Fuso orario: Europe/Rome
  - Valuta: EUR

- [ ] **Task 1.3:** Creare flusso di dati web
  - URL sito: https://www.alexanderpizzeria.com
  - Nome flusso: "Sito Web Alexander"

- [ ] **Task 1.4:** Copiare Measurement ID
  - Formato: G-XXXXXXXXXX (es. G-ABC123XY)
  - Trovalo in: Admin > Flussi di dati > [tuo flusso] > ID misurazione

### Phase 2: Aggiornare Codice
**Goal:** Inserire ID reale nel sito

- [ ] **Task 2.1:** Modificare `assets/js/analytics.js`
  ```javascript
  // Prima
  var GA4_MEASUREMENT_ID = "G-XXXXXXXXXX";

  // Dopo
  var GA4_MEASUREMENT_ID = "G-TUO_ID_REALE";
  ```

- [ ] **Task 2.2:** Rigenerare bundle JS
  ```bash
  npm run build:js
  ```

### Phase 3: Configurazione GA4
**Goal:** Setup eventi e conversioni

- [ ] **Task 3.1:** Configurare eventi come conversioni
  - `click_booking` → Conversione (prenotazione tavolo)
  - `click_call` → Conversione (chiamata telefono)
  - `click_takeaway` → Conversione (ordine asporto)

- [ ] **Task 3.2:** Creare pubblici personalizzati
  - Visitatori homepage
  - Visitatori pagina prenotazione
  - Visitatori da mobile

- [ ] **Task 3.3:** Collegare Google Search Console
  - Per vedere query di ricerca organica

### Phase 4: Verifica
**Goal:** Controllare che tutto funzioni

- [ ] **Task 4.1:** Testare con GA4 DebugView
  - Estensione Chrome: Google Analytics Debugger
  - Verificare che gli eventi arrivino

- [ ] **Task 4.2:** Verificare consent mode
  - Prima del consenso: analytics_storage = denied
  - Dopo consenso Iubenda: analytics_storage = granted

- [ ] **Task 4.3:** Testare su diverse pagine
  - Homepage
  - Pagine sedi
  - Pagina prenotazione

---

## 4. Eventi Tracciati Automaticamente

Il codice in `analytics.js` già traccia questi eventi:

| Evento | Trigger | Parametri |
|--------|---------|-----------|
| `click_call` | Click su "Chiama" | `location: pinerolo/piossasco/giaveno/rivoli` |
| `click_booking` | Click su "Prenota" | - |
| `click_takeaway` | Click su "Ordina" | `location: pinerolo/piossasco/giaveno/rivoli` |

Questi elementi hanno `data-event` e `data-location` negli HTML.

---

## 5. Configurazione Consigliata GA4

### Impostazioni Proprietà
- **Retention dati:** 14 mesi
- **Google Signals:** Attivo (per dati demografici)
- **Data collection:** Enhanced measurement attivo

### Conversioni da Configurare
1. **click_booking** - Obiettivo principale
2. **click_call** - Lead telefonica
3. **click_takeaway** - Ordine asporto

### Rapporti Utili
- Acquisizione > Panoramica (da dove arriva il traffico)
- Coinvolgimento > Pagine (pagine più viste)
- Conversioni > Eventi (azioni completate)
- Tempo reale (monitoraggio live)

---

## 6. Success Criteria

- [ ] GA4 attivo e riceve dati
- [ ] Measurement ID reale nel codice
- [ ] Eventi conversione configurati
- [ ] Consent mode funzionante
- [ ] Google Search Console collegata
- [ ] Report accessibili in GA4

---

## 7. Note Importanti

### GDPR Compliance
Il codice è già GDPR compliant:
- Consent mode attivo (analytics_storage: denied di default)
- Integrazione con Iubenda per gestione consenso
- IP anonimizzato
- Cookie flags sicuri

### Verifica Funzionamento
Dopo l'implementazione, usare:
1. **GA4 DebugView** - Tempo reale eventi
2. **Google Tag Assistant** - Chrome extension
3. **Browser DevTools** - Network tab, cercare "gtag"

---

*Created: 2026-02-08*
