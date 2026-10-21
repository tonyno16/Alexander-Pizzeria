# Alexander Pizzeria

Questa cartella è il repository del sito. La configurazione MCP del progetto salvato si trova in `../.codex/config.toml`; `.codex/config.toml` contiene la stessa configurazione per chat aperte direttamente nel repository. Mantieni sincronizzate le due copie.

- Usa Serena (contesto `codex`) per cercare simboli e leggere il codice del sito; usa Graphify per relazioni, dipendenze e impatto. Verifica nel codice i risultati del grafo, che è una fotografia locale.
- Per documentazione aggiornata di librerie realmente usate, risolvi prima il relativo ID con Context7, poi interroga la documentazione.
- Rigenera Graphify esclusivamente con AST locale: `graphify extract . --code-only --no-cluster`, poi `graphify cluster-only . --no-label`. Non eseguire estrazione semantica o etichette tramite modelli esterni senza richiesta esplicita.
- Rispetta `.graphifyignore` e le esclusioni Serena: non indicizzare credenziali, `.env`, dipendenze, build, backup, cache o configurazioni locali. Gli indici e i log restano fuori da Git.
- Preserva le modifiche esistenti. Configurare questi strumenti non autorizza modifiche applicative o deploy.
