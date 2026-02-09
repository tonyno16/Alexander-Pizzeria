# Completare la configurazione di Google Search Console

Dopo aver **verificato** il sito (meta tag in homepage), fai questi passi in [Search Console](https://search.google.com/search-console).

---

## 1. Inviare la Sitemap

1. Nel menu a sinistra vai su **Sitemap** (o “Sitemap” sotto “Indicizzazione”).
2. Nel campo **“Aggiungi una nuova sitemap”** inserisci solo:
   ```text
   sitemap.xml
   ```
   (non l’URL completo: Search Console lo aggiunge in automatico al tuo dominio).
3. Clicca **Invia**.

Lo stato passerà da “In attesa” a “Completato” (o “Non riuscito” se l’URL non è raggiungibile). Controlla che il sito sia online e che `https://www.alexanderpizzeria.com/sitemap.xml` si apra nel browser.

---

## 2. Controllare la copertura (Copertura / Pagine)

- Vai in **Indicizzazione** → **Pagine** (o “Copertura” nelle versioni precedenti).
- Qui vedi quante pagine sono “Valide”, “Escluse”, “Errori”. All’inizio è normale avere poche pagine indicizzate; i numeri si aggiornano nei giorni successivi.

---

## 3. (Opzionale) Verificare anche la versione senza www

Se vuoi che Google consideri sia `www` che non-www:

- Aggiungi una **seconda proprietà** con prefisso URL: `https://alexanderpizzeria.com` (senza www).
- Verifica anche questa (stesso meta tag in homepage va bene).
- In una delle due proprietà imposta il **dominio preferito** (in “Impostazioni” o nelle indicazioni di Google) per evitare contenuti duplicati. Di solito si sceglie **www** se il sito è configurato così (come nel tuo caso).

---

## 4. (Opzionale) Controllare robots.txt

- Vai in **Impostazioni** → **robots.txt** (o “Scansione” → “robots.txt”).
- Puoi usare il **tester** per verificare che le pagine importanti non siano bloccate.  
  Il tuo `robots.txt` consente tutto (`Allow: /`) e indica la sitemap: va bene.

---

## 5. Cosa aspettarsi

- **Sitemap:** Google elabora la sitemap in alcune ore o giorni; le pagine verranno scansionate e poi indicizzate.
- **Report:** “Prestazioni” (clic, impressioni, posizioni) si popola dopo che alcune pagine sono in indice e ricevono ricerche.
- **Controllo URL:** Puoi usare **Controllo URL** (in alto) per richiedere l’indicizzazione di una singola pagina (es. homepage o una sede).

---

## Riepilogo

| Cosa fare                     | Dove in Search Console                   |
| ----------------------------- | ---------------------------------------- |
| Inviare sitemap               | Sitemap → Aggiungi `sitemap.xml` → Invia |
| Vedere pagine indicizzate     | Indicizzazione → Pagine                  |
| Dominio preferito (opzionale) | Impostazioni / proprietà                 |
| Verificare robots.txt         | Scansione → robots.txt                   |

Dopo aver inviato la sitemap la configurazione è completa; il resto è monitoraggio nel tempo.
