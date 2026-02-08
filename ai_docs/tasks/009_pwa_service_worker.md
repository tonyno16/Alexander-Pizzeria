# AI Task: PWA e Service Worker

---

## 1. Task Overview

### Task Title
**Title:** Implementazione Progressive Web App (PWA)

### Goal Statement
**Goal:** Trasformare il sito in una Progressive Web App per permettere l'installazione su smartphone, funzionalità offline base, e migliorare l'engagement degli utenti mobili.

---

## 2. Strategic Analysis

### Benefici PWA per una Pizzeria
| Beneficio | Impatto |
|-----------|---------|
| Installabile su home screen | Accesso rapido per clienti abituali |
| Funziona offline | Menu e info base sempre disponibili |
| Notifiche push (futuro) | Promozioni e offerte speciali |
| Caricamento veloce | Migliore UX mobile |
| Icona app dedicata | Brand presence su telefono |

### Priorità
- **Alta:** Manifest + installabilità
- **Media:** Service worker per caching base
- **Bassa:** Notifiche push (richiede backend)

---

## 3. Implementation Plan

### Phase 1: Web App Manifest
**Goal:** Rendere il sito installabile

- [ ] **Task 1.1:** Creare `manifest.json` nella root
  ```json
  {
    "name": "Alexander Pizzeria",
    "short_name": "Alexander",
    "description": "Pizza artigianale in provincia di Torino. Prenota il tuo tavolo o ordina d'asporto.",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#1a1a1a",
    "theme_color": "#C9A227",
    "orientation": "portrait-primary",
    "icons": [
      {
        "src": "/assets/img/logo/icon-192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "/assets/img/logo/icon-512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "any maskable"
      }
    ],
    "categories": ["food", "lifestyle"],
    "lang": "it",
    "dir": "ltr",
    "shortcuts": [
      {
        "name": "Prenota Tavolo",
        "short_name": "Prenota",
        "url": "/prenota-un-tavolo.html",
        "icons": [{ "src": "/assets/img/logo/icon-192.png", "sizes": "192x192" }]
      },
      {
        "name": "Menu",
        "url": "/menu.html",
        "icons": [{ "src": "/assets/img/logo/icon-192.png", "sizes": "192x192" }]
      }
    ]
  }
  ```

- [ ] **Task 1.2:** Aggiungere link manifest in tutte le pagine HTML
  ```html
  <link rel="manifest" href="/manifest.json" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Alexander" />
  <link rel="apple-touch-icon" href="/assets/img/logo/icon-192.png" />
  ```

- [ ] **Task 1.3:** Creare icone PWA
  ```
  assets/img/logo/
  ├── icon-192.png   (192x192, con padding per maskable)
  └── icon-512.png   (512x512, con padding per maskable)
  ```

### Phase 2: Service Worker
**Goal:** Caching per funzionalità offline

- [ ] **Task 2.1:** Creare `sw.js` nella root
  ```javascript
  const CACHE_NAME = 'alexander-v1';
  const OFFLINE_URL = '/offline.html';

  const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/menu.html',
    '/prenota-un-tavolo.html',
    '/assets/css/style.min.css',
    '/assets/js/bundle.min.js',
    '/assets/img/logo/logo.webp',
    '/assets/img/logo/favicon.svg',
    '/offline.html'
  ];

  // Install: precache essential resources
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(PRECACHE_URLS);
      })
    );
    self.skipWaiting();
  });

  // Activate: clean old caches
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
    );
    self.clients.claim();
  });

  // Fetch: network-first with cache fallback
  self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
      event.respondWith(
        fetch(event.request).catch(() => {
          return caches.match(OFFLINE_URL);
        })
      );
      return;
    }

    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
    );
  });
  ```

- [ ] **Task 2.2:** Creare pagina `offline.html`
  ```html
  <!DOCTYPE html>
  <html lang="it">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Offline | Alexander Pizzeria</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        background: #1a1a1a;
        color: #fff;
        text-align: center;
        padding: 20px;
      }
      h1 { color: #C9A227; }
      p { color: #999; max-width: 400px; }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 24px;
        background: #C9A227;
        color: #1a1a1a;
        text-decoration: none;
        border-radius: 999px;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div>
      <h1>Sei Offline</h1>
      <p>Non sei connesso a internet. Controlla la tua connessione e riprova.</p>
      <a href="/" class="btn" onclick="location.reload()">Riprova</a>

      <p style="margin-top: 40px; font-size: 14px;">
        <strong>Contattaci:</strong><br>
        WhatsApp: +39 392 373 4826
      </p>
    </div>
  </body>
  </html>
  ```

- [ ] **Task 2.3:** Registrare service worker in `main.js`
  ```javascript
  // Aggiungere alla fine di main.js
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('SW registered:', registration.scope);
      }).catch(function(error) {
        console.log('SW registration failed:', error);
      });
    });
  }
  ```

### Phase 3: Test e Verifica
**Goal:** Verificare funzionamento PWA

- [ ] **Task 3.1:** Test con Lighthouse
  - Sezione PWA nel report
  - Verificare tutti i criteri

- [ ] **Task 3.2:** Test installazione
  - Chrome: icona "+" nella barra URL
  - Safari iOS: "Aggiungi a Home"
  - Android: banner "Aggiungi a Home"

- [ ] **Task 3.3:** Test offline
  - Attivare modalità aereo
  - Verificare pagina offline
  - Verificare cache risorse

---

## 4. File Structure

```
/ (root)
├── manifest.json          ← NUOVO
├── sw.js                  ← NUOVO
├── offline.html           ← NUOVO
├── assets/
│   └── img/
│       └── logo/
│           ├── icon-192.png   ← NUOVO
│           └── icon-512.png   ← NUOVO
└── index.html             ← Aggiungere link manifest
```

---

## 5. Criteri Lighthouse PWA

| Criterio | Requisito |
|----------|-----------|
| Installabile | manifest.json + service worker |
| Splash screen | icons + name + background_color |
| Theme color | meta theme-color + manifest |
| Viewport | meta viewport corretto |
| HTTPS | Già attivo su Vercel |
| Offline | Service worker con fallback |

---

## 6. Success Criteria

- [ ] manifest.json valido e linkato
- [ ] Icone PWA 192x192 e 512x512
- [ ] Service worker registrato
- [ ] Pagina offline funzionante
- [ ] Sito installabile su mobile
- [ ] Lighthouse PWA score > 90

---

## 7. Note Importanti

### HTTPS Richiesto
Le PWA richiedono HTTPS. Vercel fornisce già HTTPS automaticamente.

### Cache Versioning
Quando aggiorni il sito, incrementa `CACHE_NAME`:
```javascript
const CACHE_NAME = 'alexander-v2'; // Incrementare per invalidare cache
```

### Notifiche Push (Futuro)
Per implementare notifiche push servirà:
- Backend per gestire subscription
- VAPID keys
- Database per salvare subscriber

---

*Created: 2026-02-08*
