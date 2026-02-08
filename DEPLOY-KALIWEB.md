# Guida Deploy su KaliWeb

Come mettere online il sito Alexander Pizzeria su un hosting KaliWeb (o simile: Keliweb, Aruba, ecc.) tramite **FTP**.

---

## 1. Cosa ti serve dall’hosting

Dalla **area clienti** o dalla **email di benvenuto** KaliWeb recupera:

| Dato         | Dove trovarlo                                            | Esempio                                 |
| ------------ | -------------------------------------------------------- | --------------------------------------- |
| **Host FTP** | Pannello → FTP / Accesso FTP                             | `ftp.tuodominio.com` o `ftp.kaliweb.it` |
| **Username** | Stesso dell’accesso al pannello (o account FTP dedicato) | `tuoutente`                             |
| **Password** | Password del pannello o password FTP                     | ••••••••                                |
| **Porta**    | Di solito **21** (FTP) o **22** (SFTP)                   | 21                                      |

Se non li trovi: area clienti → **Hosting** → **Dettaglio** → **FTP** / **Accesso FTP**, oppure contatta l’assistenza KaliWeb.

---

## 2. Dove vanno i file sul server

Sul server KaliWeb la cartella del sito è quasi sempre:

- **`public_html`**  
  (a volte si chiama `www` o `htdocs`; la documentazione del tuo piano lo indica)

Tutti i file del sito vanno **dentro** questa cartella. La **homepage** sarà il file **index.html** che metti lì dentro.

---

## 3. Cosa caricare (dal tuo PC)

Dalla cartella del progetto (es. `C:\Users\fabri\Desktop\ALexandr Sito`) devi caricare **solo** ciò che serve al sito.

### ✅ Da caricare

**File nella root:**

- `index.html`
- `404.html`
- `menu.html`
- `pinerolo.html`
- `piossasco.html`
- `giaveno.html`
- `rivoli.html`
- `prenota-un-tavolo.html`
- `alexander-lovers.html`
- `lavora-con-noi.html`
- `blog.html`
- `blog-post-template.html`
- `robots.txt`
- `sitemap.xml`

**Cartelle (con tutto il contenuto):**

- **`assets/`** → intera cartella (css, img, js e tutto ciò che c’è dentro)
- **`data/`** → intera cartella (con `locations.json`)

### ❌ Da non caricare

- `node_modules/`
- `.git/`
- `scripts/`
- `package.json`, `package-lock.json`
- Cartelle `ai_docs/`, `guide/`
- File tipo `README.md`, `DEPLOY-VERCEL.md`, `GUIDA-GIT.md`, `vercel.json`

Caricandoli non rompi nulla, ma non servono per far funzionare il sito.

---

## 4. Connessione FTP con FileZilla

### 4.1 Scaricare FileZilla

- Vai su [https://filezilla-project.org](https://filezilla-project.org)
- Scarica **FileZilla Client** (gratuito) e installalo

### 4.2 Connessione

1. Apri **FileZilla**.
2. In alto nella barra **Host**, **Nome utente**, **Password**, **Porta** inserisci:
   - **Host:** l’indirizzo FTP che ti ha dato KaliWeb
   - **Nome utente:** username FTP
   - **Password:** password FTP
   - **Porta:** `21` (o `22` se usi SFTP)
3. Clicca **Connessione rapida** (o il pulsante per avviare la connessione).

Se la connessione va a buon fine, a **destra** vedi le cartelle del server; a **sinistra** le cartelle del tuo PC.

### 4.3 Trovare la cartella del sito sul server

- A **destra** (server) apri le cartelle fino a entrare in **`public_html`**  
  (o nella cartella che KaliWeb indica come “root del sito” nella documentazione del tuo piano).

### 4.4 Trovare la cartella del sito sul PC

- A **sinistra** (tuo PC) apri la cartella del progetto, ad esempio:  
  `C:\Users\fabri\Desktop\ALexandr Sito`

---

## 5. Caricamento dei file

1. A **sinistra** seleziona:
   - tutti i file `.html` elencati sopra
   - `robots.txt` e `sitemap.xml`
   - le cartelle **`assets`** e **`data`**
2. **Trascina** tutto nella finestra di **destra** (dentro `public_html`).

In alternativa: tasto destro sui file/cartelle selezionati → **Carica**.

**Importante:** i file devono stare **direttamente** dentro `public_html`, non dentro una sotto-cartella tipo “ALexandr Sito”.

- ✅ Corretto: `public_html/index.html`, `public_html/assets/`, `public_html/data/`
- ❌ Sbagliato: `public_html/ALexandr Sito/index.html`

Attendi che il caricamento finisca (barra in basso). Se ti chiede di sovrascrivere file già presenti, conferma.

---

## 6. Struttura finale sul server

Controllando da FileZilla (lato server) dovresti vedere qualcosa del genere:

```
public_html/
├── index.html
├── 404.html
├── menu.html
├── pinerolo.html
├── piossasco.html
├── giaveno.html
├── rivoli.html
├── prenota-un-tavolo.html
├── alexander-lovers.html
├── lavora-con-noi.html
├── blog.html
├── blog-post-template.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   ├── img/
│   └── js/
└── data/
    └── locations.json
```

---

## 7. Verificare il sito

1. Apri il browser e vai all’indirizzo del tuo sito (es. `https://www.tuodominio.com`).
2. Controlla:
   - si vede la **homepage** (Alexander Pizzeria);
   - **Menu**, **Prenota un Tavolo**, **Blog**, **Lavora con noi** funzionano;
   - le **pagine sedi** (Pinerolo, Piossasco, Giaveno, Rivoli) si aprono;
   - **immagini**, stili e pulsanti (Chiama, Ordina, Mappa) funzionano.
3. Prova un link inesistente (es. `https://www.tuodominio.com/pagina-che-non-esiste`) e verifica che compaia la pagina **404**.

Se qualcosa non funziona:

- Controlla che **nomi file e cartelle** siano esattamente come nel progetto (maiuscole/minuscole, trattini).
- Verifica che **assets** e **data** siano state caricate per intero (con tutte le sotto-cartelle e i file).

---

## 8. Dominio e HTTPS

- Se il **dominio** (es. `www.alexanderpizzeria.com`) è già associato al tuo spazio KaliWeb, il sito sarà raggiungibile a quell’indirizzo.
- **HTTPS:** molti piani KaliWeb includono certificato SSL (Let’s Encrypt). Se è attivo, il sito sarà disponibile con `https://`. Controlla nel pannello la sezione **SSL** / **Certificati**.

---

## 9. Aggiornare il sito in futuro

1. Apri FileZilla e ricollegati (stessi host, utente, password, porta).
2. Vai in `public_html` sul server e nella cartella del progetto sul PC.
3. Carica **solo i file che hai modificato** (sostituendo quelli già presenti).  
   Non è obbligatorio ricaricare tutto ogni volta.

---

## Riepilogo

| Cosa                    | Dettaglio                                                        |
| ----------------------- | ---------------------------------------------------------------- |
| **Dati FTP**            | Pannello KaliWeb → Hosting → FTP / Accesso FTP                   |
| **Cartella sul server** | `public_html`                                                    |
| **Cosa caricare**       | Tutti i `.html`, `assets/`, `data/`, `robots.txt`, `sitemap.xml` |
| **Cosa non caricare**   | `node_modules/`, `.git/`, `scripts/`, `package.json`             |
| **Strumento**           | FileZilla (Host, Nome utente, Password, Porta 21)                |
| **Homepage**            | `index.html` nella root del sito (`public_html`)                 |

Se qualcosa non torna (nomi cartelle diverse, errori FTP), controlla la documentazione del tuo piano su KaliWeb o contatta l’assistenza indicando che stai caricando un sito statico in **public_html** via FTP.
