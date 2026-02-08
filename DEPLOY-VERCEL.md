# Deploy su Vercel — Alexander Pizzeria

Il sito è statico (HTML/CSS/JS): nessun build, deploy diretto.

---

## Opzione A: Deploy da GitHub (consigliato)

1. **Vai su** [vercel.com](https://vercel.com) e accedi (o crea account con GitHub).
2. **Add New Project** → **Import Git Repository**.
3. Scegli il repo **tonyno16/Alexander-Pizzeria** (collega GitHub se non l’hai già fatto).
4. **Configure Project:**
   - **Framework Preset:** Other
   - **Root Directory:** lascia vuoto (è la root del repo)
   - **Build Command:** lascia vuoto
   - **Output Directory:** lascia vuoto (o `.`)
   - **Install Command:** lascia vuoto
5. Clicca **Deploy**.
6. Quando finisce avrai un URL tipo `alexander-pizzeria-xxx.vercel.app`. Puoi cambiare nome in **Settings → Domains** (es. `alexander-pizzeria.vercel.app`).

Ogni **push su `main`** farà un nuovo deploy in automatico.

---

## Opzione B: Deploy da terminale (Vercel CLI)

1. **Installa Vercel CLI:**
   ```bash
   npm i -g vercel
   ```
2. **Dalla cartella del progetto:**
   ```bash
   cd "c:\Users\fabri\Desktop\ALexandr Sito"
   vercel
   ```
3. Segui le domande: login (se serve), link a progetto esistente o nuovo, conferma.
4. Per andare in **produzione** (dominio stabile):
   ```bash
   vercel --prod
   ```

---

## Dopo il deploy

- **Dominio proprio:** in Vercel → Project → **Settings → Domains** aggiungi il tuo dominio (es. `www.alexanderpizzeria.com`) e configura i DNS come indicato da Vercel.
- **Controlla:** apri l’URL Vercel e prova tutte le pagine (home, menu, prenota, sedi, lavora con noi, blog, 404).
