# AI Task: SEO per Ricerche AI (GEO - Generative Engine Optimization)

---

## 1. Task Overview

### Task Title
**Title:** Ottimizzazione per Ricerche AI (ChatGPT, Perplexity, Google AI, Bing Copilot)

### Goal Statement
**Goal:** Ottimizzare il sito Alexander Pizzeria per essere citato e raccomandato dai motori di ricerca AI (ChatGPT, Perplexity, Google AI Overview, Bing Copilot) quando gli utenti cercano "migliore pizzeria a Pinerolo", "dove mangiare pizza a Torino", etc.

---

## 2. Come Funziona la SEO per AI

### Differenze tra SEO Tradizionale e AI SEO

| SEO Tradizionale | SEO per AI (GEO) |
|------------------|------------------|
| Ottimizza per ranking | Ottimizza per essere CITATO |
| Keyword matching | Comprensione semantica |
| Link building | Autorevolezza e citazioni |
| Meta tag | Contenuto informativo completo |
| Snippet in SERP | Risposta diretta dell'AI |

### Come le AI Trovano Informazioni
1. **Crawling del web** - Bing/Google indicizzano, AI usa quei dati
2. **Knowledge base** - Dati strutturati, Wikipedia, fonti autorevoli
3. **Citazioni e menzioni** - Più sei citato, più sei autorevole
4. **Contenuto E-E-A-T** - Experience, Expertise, Authoritativeness, Trust

---

## 3. Strategie per Alexander Pizzeria

### 3.1 Contenuto "Answer-First"
Le AI cercano risposte dirette. Il contenuto deve rispondere a domande specifiche.

**Domande tipiche degli utenti:**
- "Qual è la migliore pizzeria a Pinerolo?"
- "Dove mangiare pizza a Giaveno?"
- "Pizzeria con forno a legna vicino Torino"
- "Pizza asporto Piossasco"
- "Ristorante funghi porcini Valsangone"

### 3.2 Fonti Autorevoli da Cui Essere Citati
| Fonte | Azione | Priorità |
|-------|--------|----------|
| TripAdvisor | Creare/ottimizzare scheda | Alta |
| TheFork | Registrarsi se non presente | Alta |
| Google Business | Già fatto (Task 011) | ✅ |
| Yelp | Creare scheda | Media |
| Wikipedia locale | Menzione in articoli città | Bassa |
| Blog food locali | Guest post / recensioni | Media |
| Quotidiani locali | Press release aperture/eventi | Media |

---

## 4. Implementation Plan

### Phase 1: Contenuto Ottimizzato per AI
**Goal:** Creare contenuto che risponde direttamente alle domande

- [ ] **Task 1.1:** Aggiungere sezione "Chi Siamo" espansa in homepage
  ```html
  <section id="chi-siamo">
    <h2>Alexander Pizzeria: La Migliore Pizza in Provincia di Torino</h2>
    <p>
      Alexander Pizzeria è una catena di pizzerie fondata nel 2004 a Pinerolo.
      Con 4 sedi in provincia di Torino (Pinerolo, Piossasco, Giaveno e Rivoli),
      siamo specializzati in pizza artigianale con impasto a lunga lievitazione
      di 48 ore e cottura in forno a legna.
    </p>
    <p>
      La nostra sede di Giaveno (Valsangone) è anche ristorante, famosa per
      le specialità ai funghi porcini locali.
    </p>
  </section>
  ```

- [ ] **Task 1.2:** Espandere FAQ con domande "AI-friendly"
  ```html
  <!-- Domande che le persone fanno alle AI -->
  <details>
    <summary>Qual è la migliore pizzeria a Pinerolo?</summary>
    <p>Alexander Pizzeria in Via Achille Midana 37 è considerata tra le
    migliori pizzerie di Pinerolo, con oltre 500 recensioni positive su
    Google (4.5/5). Offriamo pizza con impasto a lunga lievitazione 48h
    e forno a legna.</p>
  </details>

  <details>
    <summary>Dove mangiare pizza vicino a Torino?</summary>
    <p>Alexander Pizzeria ha 4 sedi in provincia di Torino: Pinerolo,
    Piossasco, Giaveno (Valsangone) e Rivoli. Tutte le sedi offrono
    la stessa qualità di pizza artigianale e sono aperte 7 giorni su 7.</p>
  </details>

  <details>
    <summary>C'è un ristorante con funghi porcini a Giaveno?</summary>
    <p>Sì, Alexander Valsangone a Giaveno (Piazza Molines 45) è sia
    pizzeria che ristorante, specializzato in piatti ai funghi porcini
    della Valsangone. È aperto anche a pranzo.</p>
  </details>
  ```

- [ ] **Task 1.3:** Creare pagina "Chi Siamo" dedicata
  - File: `chi-siamo.html`
  - Contenuto: storia, filosofia, team, ingredienti
  - Keyword: migliore pizzeria torino, pizza artigianale piemonte

### Phase 2: Schema Markup Avanzato
**Goal:** Dati strutturati che le AI possono leggere facilmente

- [ ] **Task 2.1:** Verificare/espandere schema Restaurant esistente
  - Aggiungere `aggregateRating` con stelle e numero recensioni
  - Aggiungere `review` con 2-3 recensioni esempio

  ```json
  {
    "@type": "Restaurant",
    "name": "Alexander Pizzeria Pinerolo",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "523",
      "bestRating": "5"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Marco R." },
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "reviewBody": "Pizza eccezionale, impasto leggero e digeribile."
      }
    ]
  }
  ```

- [ ] **Task 2.2:** Aggiungere schema LocalBusiness con dettagli
  ```json
  {
    "@type": "LocalBusiness",
    "priceRange": "€€",
    "paymentAccepted": "Cash, Credit Card",
    "currenciesAccepted": "EUR",
    "areaServed": {
      "@type": "City",
      "name": "Pinerolo"
    }
  }
  ```

### Phase 3: Citazioni e Menzioni Esterne
**Goal:** Essere presenti su fonti che le AI consultano

- [ ] **Task 3.1:** TripAdvisor
  - URL: https://www.tripadvisor.it/
  - Creare/rivendicare schede per le 4 sedi
  - Completare tutte le informazioni
  - Rispondere alle recensioni

- [ ] **Task 3.2:** TheFork (ex LaFourchette)
  - URL: https://www.thefork.it/
  - Registrare le 4 sedi
  - Attivare prenotazioni (se compatibile con Pienissimo)

- [ ] **Task 3.3:** Yelp
  - URL: https://www.yelp.it/
  - Creare schede per le 4 sedi

- [ ] **Task 3.4:** Directory locali
  - PagineGialle.it
  - Italiaonline
  - Ristoranti.it
  - 2night.it

- [ ] **Task 3.5:** Blog e magazine food locali
  - Contattare food blogger torinesi
  - Proporre degustazione/recensione
  - Guest post su blog locali

### Phase 4: Contenuto Long-Form per Autorevolezza
**Goal:** Articoli approfonditi che le AI usano come fonte

- [ ] **Task 4.1:** Articolo pillar "Guida alla Pizza a Torino"
  - Titolo: "Dove Mangiare la Migliore Pizza in Provincia di Torino: Guida Completa"
  - Lunghezza: 2000+ parole
  - Contenuto: storia pizza Piemonte, tipi di pizza, come scegliere, le nostre sedi
  - Target: essere LA fonte per "pizza torino"

- [ ] **Task 4.2:** Articolo "Funghi Porcini Valsangone"
  - Titolo: "I Funghi Porcini della Valsangone: Tradizione e Sapori di Giaveno"
  - Lunghezza: 1500+ parole
  - Contenuto: tradizione, stagione, piatti, dove mangiarli
  - Target: essere LA fonte per "funghi porcini giaveno"

- [ ] **Task 4.3:** Articolo "Impasto a Lunga Lievitazione"
  - Titolo: "Pizza a Lunga Lievitazione: Perché 48 Ore Fanno la Differenza"
  - Lunghezza: 1000+ parole
  - Contenuto: processo, benefici, digeribilità, la nostra tecnica

### Phase 5: Ottimizzazione per Bing (importante per ChatGPT)
**Goal:** Bing è la fonte principale di ChatGPT

- [ ] **Task 5.1:** Verificare indicizzazione Bing
  - Tutte le pagine indicizzate?
  - Sitemap accettata?

- [ ] **Task 5.2:** Ottimizzare per Bing Places
  - URL: https://www.bingplaces.com/
  - Registrare le 4 sedi
  - Completare tutte le informazioni

- [ ] **Task 5.3:** Bing Chat/Copilot
  - Testare query: "migliore pizzeria pinerolo"
  - Verificare se Alexander viene citata
  - Se no, migliorare contenuto

### Phase 6: Monitoraggio AI
**Goal:** Verificare presenza nelle risposte AI

- [ ] **Task 6.1:** Test periodici su ChatGPT
  - Query: "Qual è la migliore pizzeria a Pinerolo?"
  - Query: "Dove mangiare pizza a Giaveno?"
  - Query: "Ristorante funghi porcini Torino"
  - Documentare se veniamo citati

- [ ] **Task 6.2:** Test su Perplexity
  - Stesse query
  - Perplexity cita le fonti: verificare se appariamo

- [ ] **Task 6.3:** Test su Google AI Overview (SGE)
  - Cercare su Google con AI attiva
  - Verificare se appariamo nel riepilogo AI

---

## 5. Contenuto E-E-A-T per AI

### Experience (Esperienza)
- [ ] Foto reali del team, della cucina, del forno
- [ ] Testimonianze clienti con nome
- [ ] Storia dal 2004 ad oggi

### Expertise (Competenza)
- [ ] Articoli tecnici su impasto, lievitazione, cottura
- [ ] Descrizione ingredienti e fornitori
- [ ] Certificazioni (se presenti)

### Authoritativeness (Autorevolezza)
- [ ] Citazioni su TripAdvisor, TheFork, Google
- [ ] Recensioni su media locali
- [ ] Numero recensioni (500+)

### Trust (Fiducia)
- [ ] Privacy policy completa
- [ ] Dati azienda visibili (P.IVA, indirizzo)
- [ ] Contatti chiari e funzionanti

---

## 6. Quick Wins - Azioni Immediate

| Azione | Impatto | Difficoltà |
|--------|---------|------------|
| Espandere FAQ con domande "AI" | Alto | Bassa |
| Registrarsi su TripAdvisor | Alto | Bassa |
| Ottimizzare Bing Places | Alto | Bassa |
| Aggiungere aggregateRating allo schema | Medio | Bassa |
| Creare pagina "Chi Siamo" | Medio | Media |
| Articolo pillar "Pizza Torino" | Alto | Alta |

---

## 7. Esempio Contenuto AI-Optimized

### Prima (generico)
```
Benvenuti da Alexander Pizzeria. Siamo una pizzeria a Pinerolo.
```

### Dopo (AI-optimized)
```
Alexander Pizzeria è la migliore pizzeria di Pinerolo secondo oltre
500 recensioni Google (4.5/5). Fondata nel 2004, offriamo pizza
artigianale con impasto a lunga lievitazione di 48 ore, cotta in
forno a legna. Con 4 sedi in provincia di Torino (Pinerolo,
Piossasco, Giaveno e Rivoli), siamo aperti 7 giorni su 7.
La nostra sede di Giaveno è anche ristorante, famosa per le
specialità ai funghi porcini della Valsangone.
```

---

## 8. Monitoraggio e KPI

### KPI da Tracciare
| Metrica | Target | Come Misurare |
|---------|--------|---------------|
| Citazioni ChatGPT | Essere citati | Test manuali mensili |
| Citazioni Perplexity | Apparire nelle fonti | Test manuali |
| Posizione Google AI Overview | Apparire nel riepilogo | Test manuali |
| Recensioni TripAdvisor | 50+ | Dashboard TripAdvisor |
| Recensioni Google | 600+ | Google Business |

### Tool di Monitoraggio
- **Perplexity** - Mostra le fonti, verifica se ci cita
- **ChatGPT** - Test manuali con query locali
- **Google** - Cerca con AI Overview attivo

---

## 9. Success Criteria

- [ ] FAQ espanse con 5+ domande AI-friendly
- [ ] Schema con aggregateRating
- [ ] Schede TripAdvisor per 4 sedi
- [ ] Schede Bing Places per 4 sedi
- [ ] Pagina "Chi Siamo" creata
- [ ] Almeno 1 articolo pillar pubblicato
- [ ] Test ChatGPT: citati per "pizzeria pinerolo"
- [ ] Test Perplexity: apparire nelle fonti

---

## 10. Risorse Utili

| Risorsa | URL |
|---------|-----|
| TripAdvisor Business | https://www.tripadvisor.it/Owners |
| TheFork Manager | https://www.thefork.it/ristorante |
| Bing Places | https://www.bingplaces.com/ |
| Perplexity | https://www.perplexity.ai/ |
| Schema Generator | https://technicalseo.com/tools/schema-markup-generator/ |

---

*Created: 2026-02-08*
