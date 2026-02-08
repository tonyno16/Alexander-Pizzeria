# AI Task: SEO Avanzato

---

## 1. Task Overview

### Task Title

**Title:** Implementazione SEO Avanzato per Alexander Pizzeria

### Goal Statement

**Goal:** Migliorare la visibilità su Google attraverso l'aggiunta di robots.txt, breadcrumb structured data, FAQ schema, e ottimizzazione dello schema LocalBusiness esistente. Obiettivo: migliorare ranking locale per "pizzeria + [città]".

---

## 2. Strategic Analysis & Solution Options

### Problem Context

Il sito ha già una buona base SEO (meta tag, sitemap, schema Restaurant), ma mancano elementi importanti per il SEO locale e la visibilità nei rich snippets di Google.

### Current State - Cosa c'è già

- ✅ Meta title, description ottimizzati per ogni pagina
- ✅ Open Graph e Twitter Card
- ✅ Sitemap.xml
- ✅ Canonical URL
- ✅ Schema Restaurant per ogni sede (schema.js)
- ✅ Keywords locali nelle pagine sedi

### Missing Elements - Cosa manca (stato post-implementazione)

- ✅ robots.txt (già presente con Sitemap)
- ✅ Organization schema con logo e contactPoint (in index.html)
- ✅ BreadcrumbList schema (schema.js, iniettato su pagine sedi)
- ✅ FAQPage schema in homepage (esteso con orari, prenotazione online, consegna)
- ✅ Aggregate Rating (già presente in Organization in index)
- ✅ Alt text ottimizzati (hero Giaveno/Rivoli; card location già ok)

---

## 3. Technical Requirements

### Functional Requirements

1. Creare `robots.txt` con sitemap reference
2. Aggiungere Organization schema per il brand
3. Aggiungere BreadcrumbList schema dinamico
4. Aggiungere FAQPage schema per le FAQ esistenti
5. Migliorare alt text delle immagini

### Non-Functional Requirements

- Schema markup valido (testabile su schema.org validator)
- Nessun impatto su performance (JSON-LD inline o generato)

---

## 4. Implementation Plan

### Phase 1: robots.txt

**Goal:** Creare robots.txt per indicizzazione ottimale

- [x] **Task 1.1:** File `robots.txt` già presente nella root con `User-agent: *`, `Allow: /`, `Sitemap: https://www.alexanderpizzeria.com/sitemap.xml`

### Phase 2: Organization Schema

**Goal:** Aggiungere schema per il brand Alexander Pizzeria

- [x] **Task 2.1:** In index.html aggiunti `logo` e `contactPoint` allo schema Organization esistente (telephone, contactType, areaServed, availableLanguage)

### Phase 3: BreadcrumbList Schema

**Goal:** Aggiungere breadcrumb per navigazione strutturata

- [x] **Task 3.1:** Aggiunta in `schema.js` la funzione `generateBreadcrumbSchema(items)` che restituisce BreadcrumbList con ListItem (position, name, item)
- [x] **Task 3.2:** Su ogni pagina sede (pinerolo, piossasco, giaveno, rivoli) lo script inietta automaticamente BreadcrumbList (Home → Nome Sede)

### Phase 4: FAQPage Schema

**Goal:** Aggiungere FAQ schema per le domande frequenti

- [x] **Task 4.1:** Sezione FAQ in homepage già presente (accordion)
- [x] **Task 4.2:** Aggiunte in index.html le 3 domande del task (orari, prenotare online, consegna) sia nell’accordion visivo sia nel FAQPage schema; schema ora include 7 domande in totale

### Phase 5: Ottimizzazione Alt Text

**Goal:** Migliorare alt text delle immagini per SEO

- [x] **Task 5.1:** Alt text delle location cards in homepage già descrittivi (sede + indirizzo)
- [x] **Task 5.2:** Aggiunti alt descrittivi per le immagini hero in giaveno.html e rivoli.html (prima erano vuoti)

### Phase 6: Verifica Finale

**Goal:** Testare tutti gli schema markup

- [ ] **Task 6.1:** Testare con Google Rich Results Test (dopo deploy)
- [ ] **Task 6.2:** Verificare con Schema.org Validator (https://validator.schema.org/)
- [ ] **Task 6.3:** Controllare Search Console dopo deploy

---

## 5. Code Changes Overview

### Current schema.js (Excerpt)

```javascript
// Già genera Restaurant schema per ogni sede
// Manca: Organization, Breadcrumb, FAQ
```

### After Enhancement

```javascript
// schema.js aggiornato con:
// - Organization schema (homepage)
// - BreadcrumbList schema (tutte le pagine)
// - FAQPage schema (homepage)
// - Restaurant schema (pagine sedi) - già esistente
```

### New File: robots.txt

```
User-agent: *
Allow: /

Sitemap: https://www.alexanderpizzeria.com/sitemap.xml
```

---

## 6. Success Criteria

- [x] robots.txt presente e accessibile
- [x] Organization schema in homepage (con logo e contactPoint)
- [x] BreadcrumbList schema su pagine sedi (generato da schema.js)
- [x] FAQPage schema in homepage (7 domande)
- [ ] Tutti gli schema validano su schema.org (da verificare con validator)
- [ ] Rich snippets visibili in Google Search Console (dopo qualche giorno da deploy)

---

## 7. Dependencies

- **Nessuna dipendenza esterna** - tutto JS vanilla
- **Dipende da:** Task 001 (JS bundle) per includere schema.js aggiornato

---

---

## 8. Task Completion Tracking

**Stato: Implementazione completata (2026-02-08)**

| Fase                                      | Stato                                         |
| ----------------------------------------- | --------------------------------------------- |
| Phase 1 robots.txt                        | ✅ Già presente                               |
| Phase 2 Organization (logo, contactPoint) | ✅ Aggiunto in index.html                     |
| Phase 3 BreadcrumbList                    | ✅ schema.js + iniezione su sedi              |
| Phase 4 FAQPage                           | ✅ 3 nuove FAQ in pagina e schema             |
| Phase 5 Alt text                          | ✅ Hero Giaveno/Rivoli corretti               |
| Phase 6 Verifica                          | ⏳ Da eseguire (Rich Results Test, Validator) |

**File modificati:** index.html, assets/js/schema.js, giaveno.html, rivoli.html. Bundle JS rigenerato con `npm run build:js`.

_Created: 2026-02-08_
_Updated: 2026-02-08_
