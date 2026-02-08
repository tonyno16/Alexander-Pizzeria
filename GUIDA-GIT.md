# Guida Git dettagliata — Alexander Pizzeria

Guida passo-passo per usare Git e GitHub con questo progetto: primo setup, commit, push e operazioni quotidiane.

---

## Indice

1. [Prerequisiti](#1-prerequisiti)
2. [Primo setup: da zero a GitHub](#2-primo-setup-da-zero-a-github)
3. [Spiegazione comando per comando](#3-spiegazione-comando-per-comando)
4. [Workflow quotidiano (dopo il primo push)](#4-workflow-quotidiano-dopo-il-primo-push)
5. [Comandi utili](#5-comandi-utili)
6. [Risoluzione problemi comuni](#6-risoluzione-problemi-comuni)

---

## 1. Prerequisiti

- **Git installato** su Windows: [git-scm.com/download/win](https://git-scm.com/download/win)  
  Verifica: apri PowerShell e scrivi `git --version`.
- **Account GitHub** e repository creato:  
  [github.com/new](https://github.com/new) → nome repository es. `Alexander-Pizzeria` → Create repository.
- **Cartella del progetto** aperta in terminale nella root del sito (dove si trova `index.html`).

---

## 2. Primo setup: da zero a GitHub

Esegui questi comandi **in ordine** dalla cartella del progetto (es. `c:\Users\fabri\Desktop\ALexandr Sito`).

### Passo 1 — Inizializzare il repository

```powershell
git init
```

**Cosa fa:** Crea la cartella nascosta `.git` nella directory corrente. Da qui in poi Git tiene traccia di tutti i file del progetto. Da eseguire **una sola volta** per progetto.

---

### Passo 2 — Aggiungere i file allo “staging”

```powershell
git add .
```

**Cosa fa:** Mette in “staging” tutti i file (e cartelle) della directory, pronti per il prossimo commit.  
I file elencati in `.gitignore` (es. `.claude/`, `.vscode/`) **non** vengono aggiunti.

- Aggiungere **solo alcuni file:**  
  `git add README.md index.html`
- Vedere cosa è in staging:  
  `git status`

---

### Passo 3 — Primo commit

```powershell
git commit -m "first commit"
```

**Cosa fa:** Crea il primo “salvataggio” (commit) con tutti i file che erano in staging. Il messaggio `"first commit"` è la descrizione di questo snapshot; puoi usare un testo più descrittivo, es. `"Setup iniziale sito Alexander Pizzeria"`.

---

### Passo 4 — Rinominare il branch in `main`

```powershell
git branch -M main
```

**Cosa fa:** Rinomina il branch corrente (solitamente `master`) in `main`, che è il nome standard usato da GitHub per il branch principale. Così il tuo repo è allineato con GitHub.

---

### Passo 5 — Collegare il repository remoto (GitHub)

```powershell
git remote add origin https://github.com/tonyno16/Alexander-Pizzeria.git
```

**Cosa fa:** Aggiunge un “remote” chiamato `origin` che punta al repository GitHub. Da ora in poi potrai fare `git push origin main` e `git pull origin main` per sincronizzare con GitHub.

- Verificare i remote:  
  `git remote -v`

---

### Passo 6 — Primo push su GitHub

```powershell
git push -u origin main
```

**Cosa fa:**  
- Invia tutti i commit locali (in questo caso il “first commit”) sul branch `main` del repository `origin` (GitHub).  
- L’opzione `-u` (o `--set-upstream`) collega il branch locale `main` al branch remoto `origin/main`. Dopo questo primo push potrai usare semplicemente `git push` e `git pull` senza specificare `origin main`.

**Nota:** La prima volta GitHub potrebbe chiedere **login** (browser o token). Se usi HTTPS e la password non funziona, GitHub richiede un **Personal Access Token** invece della password dell’account.

---

## 3. Spiegazione comando per comando

| Comando | Significato breve |
|--------|--------------------|
| `git init` | Crea un nuovo repository Git nella cartella corrente. |
| `git add .` | Aggiunge tutti i file modificati/nuovi allo staging. |
| `git commit -m "messaggio"` | Salva uno snapshot dello staging con un messaggio. |
| `git branch -M main` | Rinomina il branch corrente in `main`. |
| `git remote add origin <url>` | Collega il repo locale al repo GitHub (nome `origin`). |
| `git push -u origin main` | Invia i commit su GitHub e imposta `main` come branch predefinito per push/pull. |

---

## 4. Workflow quotidiano (dopo il primo push)

Quando modifichi il sito in locale:

```powershell
# 1. Vai nella cartella del progetto
cd "c:\Users\fabri\Desktop\ALexandr Sito"

# 2. Controlla cosa è cambiato
git status

# 3. Aggiungi i file che vuoi includere nel commit
git add .
# oppure solo alcuni file: git add menu.html assets/css/menu.css

# 4. Crea un commit con messaggio descrittivo
git commit -m "Aggiornato menù e stili sedi"

# 5. Invia su GitHub
git push
```

Se è la prima volta dopo il “first commit” e non hai usato `-u`, usa:  
`git push -u origin main`. Poi basterà `git push`.

---

## 5. Comandi utili

- **Stato e differenze**
  - `git status` — file modificati, in staging, non tracciati.
  - `git diff` — differenze non ancora in staging.
  - `git diff --staged` — differenze già in staging.

- **Storia**
  - `git log` — elenco commit (q per uscire).
  - `git log --oneline` — un commit per riga.

- **Remote**
  - `git remote -v` — elenco remote (es. `origin`).
  - Cambiare URL del remote:  
    `git remote set-url origin https://github.com/tonyno16/Alexander-Pizzeria.git`

- **Annullare**
  - Togliere un file dallo staging:  
    `git restore --staged nomefile`
  - Ripristinare un file alle ultime versione committata (attenzione: perdi modifiche locali):  
    `git restore nomefile`

---

## 6. Risoluzione problemi comuni

### “Permission denied” o “Authentication failed”

- Con **HTTPS:** usa un **Personal Access Token** al posto della password.  
  GitHub → Settings → Developer settings → Personal access tokens → Generate new token.  
  Quando Git chiede la password, incolla il token.
- In alternativa usa **SSH:** genera una chiave (`ssh-keygen`), aggiungila a GitHub (Settings → SSH and GPG keys) e usa l’URL SSH del repo:  
  `git@github.com:tonyno16/Alexander-Pizzeria.git`

### “Failed to push some refs” / “Updates were rejected”

Qualcuno (o tu da un altro PC) ha fatto push su GitHub dopo il tuo ultimo pull. Soluzione:

```powershell
git pull origin main
# Risolvi eventuali conflitti, poi
git push origin main
```

### “Repository not found”

- Controlla che l’URL sia corretto:  
  `https://github.com/tonyno16/Alexander-Pizzeria.git`
- Verifica di essere loggato con l’account che ha accesso a quel repository.

### Hai dimenticato qualcosa nel commit

Aggiungi i file e modifica l’ultimo commit (senza crearne uno nuovo):

```powershell
git add file-mancante.html
git commit --amend -m "first commit"
git push -u origin main
```

Usa `--amend` solo per commit non ancora pushati o per il primo push; evitalo su commit già condivisi se altri usano lo stesso branch.

---

## Riepilogo comandi per il primo push (copia-incolla)

```powershell
cd "c:\Users\fabri\Desktop\ALexandr Sito"
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/tonyno16/Alexander-Pizzeria.git
git push -u origin main
```

Dopo aver eseguito questi passi, il sito Alexander Pizzeria sarà su GitHub e potrai continuare con il workflow della sezione 4 per ogni modifica.
