/** Removed test page: do not redirect its irrelevant content to a real article. */
module.exports = function gone(req, res) {
  res.statusCode = 410;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("X-Robots-Tag", "noindex, follow");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.end(req.method === "HEAD" ? "" : '<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Pagina rimossa | Alexander Pizzeria</title></head><body><main><h1>Questa pagina è stata rimossa</h1><p>La pagina di prova non è più disponibile.</p><a href="/blog/">Leggi le storie di Alexander</a></main></body></html>');
};
