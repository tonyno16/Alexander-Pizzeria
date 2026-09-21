/**
 * Applica le correzioni meccaniche del GEO audit (orari, schema, immagini, breadcrumb).
 * Eseguire una volta: node scripts/apply-geo-audit.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const sharp = require("sharp");

const HOURS =
  "Le nostre pizzerie sono aperte tutti i giorni dalle 18:30 alle 23:30. La sede di Giaveno (Ristorante Valsangone) è aperta anche a pranzo dalle 12:00 alle 15:00. Le uniche chiusure annuali sono il 25 dicembre e il 1° gennaio.";
const GLUTEN =
  'Sì: la pizza senza glutine è la specialità di Alexander ed è disponibile in tutte e 4 le sedi. Alexander è riconosciuta da AIC (Associazione Italiana Celiachia) e presente nella guida ufficiale "Alimentazione Fuori Casa". Non usiamo basi pre-cotte: l\'impasto senza glutine è preparato in casa ogni giorno con miscele di amidi senza legumi, da materie prime prive di glutine all\'origine, non prodotti deglutinati. Stessa lievitazione 48 ore, stessa cottura in forno a legna. Ogni pizza del menù è disponibile anche senza glutine, a partire da €8,50. I dettagli sono sulla pagina Pizza senza glutine.';

const MAPS = {
  "pinerolo.html": "https://maps.app.goo.gl/s44LyZLYEjPKT3Pu9",
  "piossasco.html": "https://maps.app.goo.gl/CJ6EcvWXjxvTUYpV6",
  "giaveno.html": "https://maps.app.goo.gl/899YjB6VdN1DzSBw6",
  "rivoli.html": "https://maps.app.goo.gl/AYER6g8f8F6SZgW39",
};
const CUISINE = {
  "pinerolo.html": '["Pizza", "Italiana"]',
  "piossasco.html": '["Pizza", "Italiana"]',
  "giaveno.html": '["Pizza", "Italiana", "Piemontese"]',
  "rivoli.html": '["Pizza", "Italiana", "Pesce"]',
};

const CRUMBS = {
  "pinerolo.html": { name: "Pinerolo", url: "https://www.alexanderpizzeria.com/pinerolo/" },
  "piossasco.html": { name: "Piossasco", url: "https://www.alexanderpizzeria.com/piossasco/" },
  "giaveno.html": { name: "Giaveno", url: "https://www.alexanderpizzeria.com/giaveno/" },
  "rivoli.html": { name: "Rivoli", url: "https://www.alexanderpizzeria.com/rivoli/" },
  "menu.html": { name: "Menu", url: "https://www.alexanderpizzeria.com/menu/" },
  "prenota-un-tavolo.html": { name: "Prenota un tavolo", url: "https://www.alexanderpizzeria.com/prenota/" },
  "alexander-lovers.html": { name: "Alexander Lovers", url: "https://www.alexanderpizzeria.com/alexander-lovers/" },
  "lavora-con-noi.html": { name: "Lavora con noi", url: "https://www.alexanderpizzeria.com/lavora-con-noi/" },
  "blog.html": { name: "Blog", url: "https://www.alexanderpizzeria.com/blog/" },
  "blog-post-template.html": {
    name: "Funghi porcini di Giaveno",
    url: "https://www.alexanderpizzeria.com/blog/funghi-porcini-giaveno/",
    parent: { name: "Blog", url: "https://www.alexanderpizzeria.com/blog/" },
  },
  "404.html": null,
};

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}
function write(rel, text) {
  fs.writeFileSync(path.join(ROOT, rel), text, "utf8");
}

function breadcrumbJson(crumb) {
  const items = [
    { name: "Home", item: "https://www.alexanderpizzeria.com/" },
  ];
  if (crumb.parent) items.push({ name: crumb.parent.name, item: crumb.parent.url });
  items.push({ name: crumb.name });
  const list = items
    .map((it, i) => {
      const item = it.item ? `, "item": "${it.item}"` : "";
      return `      { "@type": "ListItem", "position": ${i + 1}, "name": "${it.name}"${item} }`;
    })
    .join(",\n");
  return `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
${list}
      ]
    }
    </script>
`;
}

function patchLocationSchema(file, html) {
  const maps = MAPS[file];
  if (!maps) return html;
  const cuisine = CUISINE[file];
  html = html.replace(/"servesCuisine": \[[^\]]+\]/, `"servesCuisine": ${cuisine}`);
  if (!html.includes('"parentOrganization"')) {
    html = html.replace(
      '"acceptsReservations": "True",',
      `"acceptsReservations": true,
      "currenciesAccepted": "EUR",
      "parentOrganization": { "@id": "https://www.alexanderpizzeria.com/#organization" },
      "hasMap": "${maps}",`
    );
  }
  html = html.replace(
    '"menu": "https://www.alexanderpizzeria.com/menu/"',
    '"hasMenu": { "@id": "https://www.alexanderpizzeria.com/menu/#menu" }'
  );
  if (!html.includes(maps)) {
    html = html.replace(/("sameAs": \[[\s\S]*?)(\n\s+\])/, (m, body, end) => {
      const trimmed = body.replace(/\s+$/, "");
      const withComma = trimmed.endsWith(",") ? trimmed : trimmed + ",";
      return `${withComma}\n        "${maps}"${end}`;
    });
  }
  if (!html.includes('"validFrom": "2028-12-25"')) {
    const extended = `"specialOpeningHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "validFrom": "2026-12-25", "validThrough": "2026-12-25", "opens": "00:00", "closes": "00:00" },
        { "@type": "OpeningHoursSpecification", "validFrom": "2027-01-01", "validThrough": "2027-01-01", "opens": "00:00", "closes": "00:00" },
        { "@type": "OpeningHoursSpecification", "validFrom": "2027-12-25", "validThrough": "2027-12-25", "opens": "00:00", "closes": "00:00" },
        { "@type": "OpeningHoursSpecification", "validFrom": "2028-01-01", "validThrough": "2028-01-01", "opens": "00:00", "closes": "00:00" },
        { "@type": "OpeningHoursSpecification", "validFrom": "2028-12-25", "validThrough": "2028-12-25", "opens": "00:00", "closes": "00:00" },
        { "@type": "OpeningHoursSpecification", "validFrom": "2029-01-01", "validThrough": "2029-01-01", "opens": "00:00", "closes": "00:00" }
      ]`;
    html = html.replace(
      /"specialOpeningHoursSpecification": \[[\s\S]*?\n      \]/,
      extended
    );
  }
  if (file === "pinerolo.html" && !html.includes("Pizzeria Alexander a Pinerolo, Via Achille Midana 37: forno")) {
    html = html.replace(
      '"name": "Alexander Pizzeria Pinerolo",',
      '"name": "Alexander Pizzeria Pinerolo",\n      "description": "Pizzeria Alexander a Pinerolo, Via Achille Midana 37: forno a legna a vista, lievitazione 48 ore, pizza senza glutine riconosciuta AIC. Aperta tutti i giorni 18:30-23:30.",'
    );
  }
  return html;
}

function patchIndex(html) {
  if (!html.includes('"@type": "WebSite"')) {
    const schema = `<!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": "https://www.alexanderpizzeria.com/#website",
            "url": "https://www.alexanderpizzeria.com/",
            "name": "Alexander Pizzeria",
            "alternateName": "Alexander S.R.L.",
            "description": "Pizza artigianale a lunga lievitazione in 4 sedi in provincia di Torino: Pinerolo, Piossasco, Giaveno (Valsangone) e Rivoli.",
            "inLanguage": "it-IT",
            "publisher": { "@id": "https://www.alexanderpizzeria.com/#organization" }
          },
          {
            "@type": "Organization",
            "@id": "https://www.alexanderpizzeria.com/#organization",
            "name": "Alexander Pizzeria",
            "legalName": "Alexander S.R.L.",
            "url": "https://www.alexanderpizzeria.com/",
            "logo": "https://www.alexanderpizzeria.com/assets/img/logo/logo.webp",
            "telephone": "+390117601733",
            "vatID": "IT10021390017",
            "description": "Alexander Pizzeria: catena di 4 pizzerie in provincia di Torino con pizza artigianale a lunga lievitazione. Sedi a Pinerolo, Piossasco, Giaveno (Valsangone) e Rivoli. Società iscritta nel 2009, prima sede a Piossasco nello stesso anno.",
            "foundingDate": "2009",
            "founder": {
              "@type": "Person",
              "name": "Alessandro Fiore",
              "jobTitle": "Pizzaiolo e Fondatore",
              "url": "https://www.alexanderpizzeria.com/chi-siamo/"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Via Toscanini 15",
              "addressLocality": "Piossasco",
              "addressRegion": "TO",
              "postalCode": "10045",
              "addressCountry": "IT"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+390117601733",
              "contactType": "customer service",
              "areaServed": "IT",
              "availableLanguage": "Italian"
            },
            "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 20 },
            "areaServed": {
              "@type": "State",
              "name": "Piemonte",
              "containedInPlace": { "@type": "Country", "name": "Italia" }
            },
            "sameAs": [
              "https://www.instagram.com/alexanderpizzeria_/",
              "https://www.instagram.com/alexander.pizzeria/",
              "https://www.facebook.com/alexanderpizzeria/"
            ],
            "subOrganization": [
              { "@id": "https://www.alexanderpizzeria.com/pinerolo/#restaurant" },
              { "@id": "https://www.alexanderpizzeria.com/piossasco/#restaurant" },
              { "@id": "https://www.alexanderpizzeria.com/giaveno/#restaurant" },
              { "@id": "https://www.alexanderpizzeria.com/rivoli/#restaurant" }
            ]
          },
          {
            "@type": "Restaurant",
            "@id": "https://www.alexanderpizzeria.com/pinerolo/#restaurant",
            "name": "Alexander Pizzeria Pinerolo",
            "url": "https://www.alexanderpizzeria.com/pinerolo/",
            "telephone": "+390121332035",
            "parentOrganization": { "@id": "https://www.alexanderpizzeria.com/#organization" },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Via Achille Midana, 37",
              "addressLocality": "Pinerolo",
              "addressRegion": "TO",
              "postalCode": "10064",
              "addressCountry": "IT"
            }
          },
          {
            "@type": "Restaurant",
            "@id": "https://www.alexanderpizzeria.com/piossasco/#restaurant",
            "name": "Alexander Pizzeria Piossasco",
            "url": "https://www.alexanderpizzeria.com/piossasco/",
            "telephone": "+390117601733",
            "parentOrganization": { "@id": "https://www.alexanderpizzeria.com/#organization" },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Via Pinerolo, 149",
              "addressLocality": "Piossasco",
              "addressRegion": "TO",
              "postalCode": "10045",
              "addressCountry": "IT"
            }
          },
          {
            "@type": "Restaurant",
            "@id": "https://www.alexanderpizzeria.com/giaveno/#restaurant",
            "name": "Ristorante Valsangone",
            "alternateName": "Alexander Giaveno",
            "url": "https://www.alexanderpizzeria.com/giaveno/",
            "telephone": "+390119376286",
            "parentOrganization": { "@id": "https://www.alexanderpizzeria.com/#organization" },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Piazza Molines, 45",
              "addressLocality": "Giaveno",
              "addressRegion": "TO",
              "postalCode": "10094",
              "addressCountry": "IT"
            }
          },
          {
            "@type": "Restaurant",
            "@id": "https://www.alexanderpizzeria.com/rivoli/#restaurant",
            "name": "Alexander Ristorante Pizzeria Rivoli",
            "alternateName": "Alexander Rivoli",
            "url": "https://www.alexanderpizzeria.com/rivoli/",
            "telephone": "+390110608880",
            "parentOrganization": { "@id": "https://www.alexanderpizzeria.com/#organization" },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Piazza Principe Eugenio, 7",
              "addressLocality": "Rivoli",
              "addressRegion": "TO",
              "postalCode": "10098",
              "addressCountry": "IT"
            }
          },
          {
            "@type": "FAQPage",
            "@id": "https://www.alexanderpizzeria.com/#faq",
            "inLanguage": "it-IT",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Quali sono gli orari di apertura?",
                "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(HOURS)} }
              },
              {
                "@type": "Question",
                "name": "Fate pizze senza glutine?",
                "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(GLUTEN)} }
              },
              {
                "@type": "Question",
                "name": "È possibile prenotare online?",
                "acceptedAnswer": { "@type": "Answer", "text": "Sì, puoi prenotare online dalla sezione Prenota un Tavolo. La prenotazione è disponibile per tutte le 4 sedi (Pinerolo, Piossasco, Giaveno, Rivoli)." }
              },
              {
                "@type": "Question",
                "name": "Fate consegna a domicilio?",
                "acceptedAnswer": { "@type": "Answer", "text": "No, non effettuiamo consegna a domicilio. Offriamo solo il servizio d'asporto: puoi ordinare online o per telefono e ritirare la tua pizza in sede." }
              },
              {
                "@type": "Question",
                "name": "Avete opzioni vegane?",
                "acceptedAnswer": { "@type": "Answer", "text": "Sì. Diverse pizze possono essere preparate in versione vegana (senza mozzarella o con verdure). Chiedi al personale il menu aggiornato e le varianti disponibili." }
              },
              {
                "@type": "Question",
                "name": "È necessario prenotare?",
                "acceptedAnswer": { "@type": "Answer", "text": "Consigliamo di prenotare soprattutto nei weekend e nelle sere di punta. Puoi prenotare online dalla pagina Prenota un Tavolo o chiamando la sede che preferisci." }
              },
              {
                "@type": "Question",
                "name": "Avete parcheggio?",
                "acceptedAnswer": { "@type": "Answer", "text": "Nelle vicinanze delle nostre sedi sono disponibili parcheggi pubblici e strisce blu. Per indicazioni precise consulta la pagina della sede o Google Maps." }
              }
            ]
          }
        ]
      }
    </script>
`;
    const start = html.indexOf("<!-- Schema.org JSON-LD -->");
    const end = html.lastIndexOf("</body>");
    if (start !== -1 && end > start) {
      html = html.slice(0, start) + schema + "  " + html.slice(end);
    }
  }

  html = html.replace(
    /Le nostre pizzerie sono aperte tutti i giorni dalle 19:00 alle\s+23:30\. La sede di Giaveno è aperta anche a pranzo dalle 12:00\s+alle 15:00\./,
    HOURS
  );
  html = html.replace(
    /Offriamo base senza glutine su richiesta\. Contattaci in anticipo\s+o chiedi in sede per disponibilità e modalità\./,
    GLUTEN
  );
  html = html.replace(
    /Si\. Diverse pizze possono essere preparate in versione vegana/,
    "Sì. Diverse pizze possono essere preparate in versione vegana"
  );

  if (!html.includes("Ale Ada")) {
    html = html.replace(
      /<div class="reviews-summary">[\s\S]*?<\/div>\s*<div class="reviews-quotes">[\s\S]*?<\/div>/,
      `<div class="reviews-summary">
            <span class="reviews-summary__text"
              >Su Google: 4,4 su 571 recensioni a Pinerolo, 4,2 su 679 a Piossasco, 4,3 su oltre 1.200 a Giaveno, 4,2 su 140 a Rivoli. Tripadvisor Travelers' Choice 2025: #1 di 126 ristoranti a Pinerolo e #1 di 37 a Piossasco.</span
            >
          </div>
          <div class="reviews-quotes">
            <blockquote class="review-quote">
              <p class="review-quote__text">
                "Pizza buonissima e digeribilissima. Il personale è molto cortese, attento ai clienti e non lasciano nulla al caso."
              </p>
              <footer class="review-quote__author">
                — Ale Ada, febbraio 2026, <a href="/pinerolo/">Pinerolo</a>
              </footer>
            </blockquote>
            <blockquote class="review-quote">
              <p class="review-quote__text">
                "Siamo stati io e la mia fidanzata che è celiaca: focaccia senza glutine buonissima, poi risotto e tagliatelle con i funghi molto buoni, leggeri ma gustosi. Camerieri preparati e gentili."
              </p>
              <footer class="review-quote__author">
                — Francesco Brunero, ottobre 2025, <a href="/giaveno/">Giaveno</a>
              </footer>
            </blockquote>
            <blockquote class="review-quote">
              <p class="review-quote__text">
                "Abbiamo avuto il piacere di mangiare una buonissima pizza senza glutine con prodotti di altissima qualità. Il servizio è stato perfetto, cordiale ed efficiente."
              </p>
              <footer class="review-quote__author">
                — Sara Quagliato, maggio 2026, <a href="/rivoli/">Rivoli</a>
              </footer>
            </blockquote>
          </div>`
    );
  }

  html = html.replace("<span>4.5 su Google</span>", "<span>Travelers' Choice 2025</span>");
  html = html.replace(
    `4 sedi in provincia di Torino, tutte con la stessa passione per la
            pizza artigianale.`,
    `La prima pizzeria apre a Piossasco nel 2009, per mano di Alessandro Fiore.
            Oggi le sedi sono quattro: Piossasco (2009), Pinerolo (2020), Giaveno – Valsangone (2023) e Rivoli (2024).`
  );

  if (!html.includes("sedi-confronto")) {
    html = html.replace(
      `<div class="locations-grid" style="margin-top: var(--space-xl)">`,
      `<div class="table-scroll" style="margin: var(--space-xl) 0">
            <table class="data-table" id="sedi-confronto">
              <caption>Le 4 sedi a confronto</caption>
              <thead>
                <tr>
                  <th></th>
                  <th>Pinerolo</th>
                  <th>Piossasco</th>
                  <th>Giaveno</th>
                  <th>Rivoli</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Aperta dal</th>
                  <td>2020</td>
                  <td>2009</td>
                  <td>2023</td>
                  <td>2024</td>
                </tr>
                <tr>
                  <th>Indirizzo</th>
                  <td>Via Achille Midana 37</td>
                  <td>Via Pinerolo 149</td>
                  <td>Piazza Molines 45</td>
                  <td>Piazza Principe Eugenio 7</td>
                </tr>
                <tr>
                  <th>Orari</th>
                  <td>18:30–23:30</td>
                  <td>18:30–23:30</td>
                  <td>12:00–15:00 e 18:30–23:30</td>
                  <td>18:30–23:30</td>
                </tr>
                <tr>
                  <th>Pranzo</th>
                  <td>No</td>
                  <td>No</td>
                  <td>Sì. Pizza solo al tegamino; la tonda è a cena</td>
                  <td>No</td>
                </tr>
                <tr>
                  <th>Sala</th>
                  <td>90 coperti, dehor da 60</td>
                  <td>35 coperti, dehor da 25</td>
                  <td>100 coperti, saletta da 40, dehor da 50</td>
                  <td>110 coperti, dehor da 60</td>
                </tr>
                <tr>
                  <th>Forno</th>
                  <td>A legna</td>
                  <td>A legna</td>
                  <td>A legna</td>
                  <td>A gas, a vista</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="locations-grid" style="margin-top: var(--space-xl)">`
    );
  }
  return html;
}

function patchBlog(html) {
  if (html.includes("<!-- Post 3 -->") && html.includes("<!-- Post 6 -->")) {
    html = html.replace(/<!-- Post 3 -->[\s\S]*?(?=<!-- Post 6 -->)/, "");
  }
  if (!html.includes("CollectionPage")) {
    html = html.replace(
      "</body>",
      `    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": "https://www.alexanderpizzeria.com/blog/#collectionpage",
            "url": "https://www.alexanderpizzeria.com/blog/",
            "name": "Blog Alexander Pizzeria",
            "description": "Impasto, pizza senza glutine e funghi porcini di Giaveno.",
            "inLanguage": "it-IT",
            "isPartOf": { "@id": "https://www.alexanderpizzeria.com/#website" },
            "publisher": { "@id": "https://www.alexanderpizzeria.com/#organization" },
            "mainEntity": { "@id": "https://www.alexanderpizzeria.com/blog/#itemlist" }
          },
          {
            "@type": "ItemList",
            "@id": "https://www.alexanderpizzeria.com/blog/#itemlist",
            "itemListOrder": "https://schema.org/ItemListOrderDescending",
            "numberOfItems": 3,
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "url": "https://www.alexanderpizzeria.com/blog/funghi-porcini-giaveno/", "name": "Funghi Porcini di Giaveno" },
              { "@type": "ListItem", "position": 2, "url": "https://www.alexanderpizzeria.com/pizza-lunga-lievitazione/", "name": "Impasto a lunga lievitazione" },
              { "@type": "ListItem", "position": 3, "url": "https://www.alexanderpizzeria.com/pizza-senza-glutine/", "name": "Pizza senza glutine" }
            ]
          }
        ]
      }
    </script>
  </body>`
    );
  }
  return html;
}

function patchArticle(html) {
  if (html.includes("BlogPosting")) return html;
  return html.replace(
    /<script type="application\/ld\+json">\s*\{[\s\S]*?"@type": "Article"[\s\S]*?<\/script>/,
    `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://www.alexanderpizzeria.com/#organization",
            "name": "Alexander Pizzeria",
            "legalName": "Alexander S.R.L.",
            "url": "https://www.alexanderpizzeria.com/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.alexanderpizzeria.com/assets/img/logo/logo.webp"
            }
          },
          {
            "@type": "BlogPosting",
            "@id": "https://www.alexanderpizzeria.com/blog/funghi-porcini-giaveno/#article",
            "mainEntityOfPage": "https://www.alexanderpizzeria.com/blog/funghi-porcini-giaveno/",
            "headline": "Funghi Porcini di Giaveno: La Tradizione in Tavola da Alexander Valsangone",
            "description": "La tradizione dei funghi porcini nella Val Sangone e i piatti del Ristorante Valsangone a Giaveno.",
            "inLanguage": "it-IT",
            "datePublished": "2026-02-15",
            "dateModified": "2026-09-21",
            "author": { "@id": "https://www.alexanderpizzeria.com/#organization" },
            "publisher": { "@id": "https://www.alexanderpizzeria.com/#organization" },
            "about": { "@id": "https://www.alexanderpizzeria.com/giaveno/#restaurant" }
          }
        ]
      }
    </script>`
  );
}

function patchLovers(html) {
  if (html.includes("MemberProgram")) return html;
  return html.replace(
    "</body>",
    `    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MemberProgram",
            "@id": "https://www.alexanderpizzeria.com/alexander-lovers/#program",
            "name": "Alexander Lovers",
            "alternateName": "Alexander Fidelity",
            "url": "https://www.alexanderpizzeria.com/alexander-lovers/",
            "description": "Programma fedeltà gratuito di Alexander Pizzeria: 1 punto ogni 10 euro spesi, sconti fino a 30 euro, regalo di benvenuto. Valido in tutte e 4 le sedi.",
            "hostingOrganization": { "@id": "https://www.alexanderpizzeria.com/#organization" }
          },
          {
            "@type": "FAQPage",
            "@id": "https://www.alexanderpizzeria.com/alexander-lovers/#faq",
            "inLanguage": "it-IT",
            "mainEntity": [
              { "@type": "Question", "name": "L'iscrizione e gratuita?", "acceptedAnswer": { "@type": "Answer", "text": "Si, l'iscrizione al programma Alexander Fidelity e completamente gratuita. Puoi iscriverti online o direttamente in uno dei nostri locali." } },
              { "@type": "Question", "name": "In quali sedi posso usare la carta fedelta?", "acceptedAnswer": { "@type": "Answer", "text": "La carta fedelta Alexander e valida in tutte le 4 sedi: Pinerolo, Piossasco, Giaveno (Valsangone) e Rivoli. I punti si accumulano indipendentemente dalla sede." } },
              { "@type": "Question", "name": "Come ricevo il regalo di benvenuto?", "acceptedAnswer": { "@type": "Answer", "text": "Dopo l'iscrizione, alla tua prima visita in qualsiasi sede Alexander potrai scegliere il tuo regalo di benvenuto tra: Farinata, Spritz o Patatine Ricche." } },
              { "@type": "Question", "name": "I punti hanno una scadenza?", "acceptedAnswer": { "@type": "Answer", "text": "I punti accumulati rimangono attivi finche la tua carta fedelta e attiva. Ti consigliamo di utilizzarli regolarmente per approfittare dei vantaggi." } },
              { "@type": "Question", "name": "Posso accumulare punti anche con gli ordini d'asporto?", "acceptedAnswer": { "@type": "Answer", "text": "Si, i punti fedelta si accumulano sia per i pasti al tavolo che per gli ordini d'asporto, in tutte le sedi Alexander." } }
            ]
          }
        ]
      }
    </script>
  </body>`
  );
}

const MENU_TABLE = `      <section class="section section--alt">
        <div class="container">
          <h2 class="section-title">Il menu Alexander in sintesi</h2>
          <p class="section-subtitle" style="margin-bottom: var(--space-lg)">
            Tutte le pizze sono a lievitazione 48 ore con prefermento biga e cottura oltre 3 minuti a circa 350°C.
            Ogni pizza è disponibile anche senza glutine, da €8,50. Prezzi indicativi aggiornati a settembre 2026: il menu della sede, qui sotto, fa fede.
          </p>
          <div class="table-scroll">
            <table class="data-table">
              <caption>Le Epiche</caption>
              <thead>
                <tr><th>Pizza</th><th>Ingredienti</th><th>Prezzo</th></tr>
              </thead>
              <tbody>
                <tr><td>Aura, la Margherita</td><td>Polpa di pomodori italiani, bufala campana DOP, crema al basilico</td><td>€9,50</td></tr>
                <tr><td>Nemesi</td><td>Zucchine, noci, brie, fior di latte</td><td>€10,50</td></tr>
                <tr><td>Ade</td><td>Pomodoro, fior di latte, gorgonzola DOP, cipolle dorate, scamorza affumicata, salamino piccante</td><td>€12,00</td></tr>
                <tr><td>Apollo</td><td>Salsiccia, fontina, cipolle saltate, fior di latte, gorgonzola, grana padano</td><td>€12,00</td></tr>
                <tr><td>Alexander</td><td>Pomodoro, fior di latte, fontina, battuta di fassone piemontese, prosciutto cotto, olio al tartufo, grana</td><td>€14,50</td></tr>
                <tr><td>Gea</td><td>Burrata DOP, prosciutto crudo di filiera piemontese, rucola, pomodorini</td><td>€15,50</td></tr>
                <tr><td>Imero</td><td>Crema di pistacchi di Bronte, fior di latte, mortadella IGP, burrata pugliese, granella di pistacchi</td><td>€20,50</td></tr>
              </tbody>
            </table>
          </div>
          <p style="margin-top: var(--space-lg)">
            Antipasti: farinata piemontese, focaccia con lardo, noci e miele, frittini della casa, frittura di gamberi e calamari.
            A Giaveno, da maggio a novembre, i piatti ai funghi porcini freschi della Val Sangone.
          </p>
        </div>
      </section>

`;

function commonHtml(file, html) {
  if (file === "index.html") html = patchIndex(html);
  html = html.replace(/^[ \t]*<meta name="google-site-verification" content="INSERIRE_CODICE_GOOGLE" \/>\r?\n/gm, "");
  html = html.replace(/^[ \t]*<meta name="msvalidate\.01" content="INSERIRE_CODICE_BING" \/>\r?\n/gm, "");
  html = html.replace(/^[ \t]*<link rel="preload" as="image" href="\/assets\/img\/hero\/hero\.jpg" \/>\r?\n/gm, "");
  html = html.replace(/url\(&quot;assets\/img\/hero\/hero\.jpg&quot;\)/g, "url(&quot;assets/img/hero/hero.webp&quot;)");
  html = html.replace(
    /(?:\r?\n[ \t]*<link rel="stylesheet" href="\/assets\/css\/(?!style\.min\.css)[^"]+\.css" \/>){4,}/g,
    `\n    <link rel="preload" href="/assets/css/style.min.css" as="style" />\n    <link rel="stylesheet" href="/assets/css/style.min.css" />`
  );
  html = html.replace(/19:00 - 23:30/g, "18:30 - 23:30");
  html = html.replace(/19:00-23:30/g, "18:30-23:30");
  html = html.replace(/dalle 19:00 alle/g, "dalle 18:30 alle");
  html = html.replace(/dal 2004/g, "dal 2009");
  html = html.replace('"foundingDate": "2004"', '"foundingDate": "2009"');
  html = html.replace(
    "Sede legale: Via Pinerolo 149, 10045 Piossasco TO",
    "Sede legale: Via Toscanini 15, 10045 Piossasco TO"
  );
  html = html.replace("#1 di 180 ristoranti a Pinerolo", "#1 di 126 ristoranti a Pinerolo");
  html = html.replace("#1 di 43 ristoranti a Piossasco", "#1 di 37 ristoranti a Piossasco");
  html = html.replace(
    `<span class="reviews-summary__rating">★ 4,2</span> ·\n            recensioni su Google Maps`,
    `<span class="reviews-summary__rating">★ 4,2</span> ·\n            140 recensioni su Google Maps`
  );
  html = html.replace(
    "Da maggio a novembre, quando i boschi della Val Sangone regalano il miglior porcino.",
    'Da maggio a novembre, quando i boschi della Val Sangone regalano il miglior porcino. <a href="/blog/funghi-porcini-giaveno/">La tradizione dei porcini a Giaveno</a>.'
  );
  if (!html.includes("/chi-siamo/")) {
    html = html.replace(
      /<a href="\/blog\/">Blog<\/a>(\s*)<\/div>/g,
      '<a href="/blog/">Blog</a>$1<a href="/chi-siamo/">Chi siamo</a>$1<a href="/contatti/">Contatti</a>$1</div>'
    );
  }
  html = html.replace(/<iframe\b([^>]*?)>/gs, (full, attrs) => {
    if (/\bwidth\s*=/.test(attrs)) return full;
    const isMap = /location-map|maps\/embed/.test(attrs);
    const h = isMap ? "450" : "700";
    return `<iframe width="100%" height="${h}"${attrs}>`;
  });
  html = html.replace(
    /src="(\/assets\/img\/(?:signature|cucina|beers|locations)\/[A-Za-z0-9_-]+)\.png"/g,
    (m, stem) => {
      if (/-\d+$/.test(stem)) return m;
      return `src="${stem}-800.webp" srcset="${stem}-400.webp 400w, ${stem}-800.webp 800w, ${stem}-1200.webp 1200w" sizes="(max-width: 700px) 92vw, 480px"`;
    }
  );
  html = patchLocationSchema(file, html);
  if (file === "blog.html") html = patchBlog(html);
  if (file === "blog-post-template.html") html = patchArticle(html);
  if (file === "alexander-lovers.html") html = patchLovers(html);
  if (file === "menu.html" && !html.includes("sedi-prezzi") && !html.includes("Il menu Alexander in sintesi")) {
    html = html.replace("<!-- Menu (iframe Pienissimo per sede) -->", MENU_TABLE + "      <!-- Menu (iframe Pienissimo per sede) -->");
    html = html.replace(
      /"@type": "Menu",\s*"name": "Menu Alexander Pizzeria",/,
      `"@type": "Menu",\n        "@id": "https://www.alexanderpizzeria.com/menu/#menu",\n        "inLanguage": "it-IT",\n        "name": "Menu Alexander Pizzeria",`
    );
  }
  const crumb = CRUMBS[file];
  if (crumb && !html.includes("BreadcrumbList")) {
    html = html.replace("</body>", "    " + breadcrumbJson(crumb) + "  </body>");
  }
  if (crumb && !html.includes("page-breadcrumb") && !html.includes("blog-post__breadcrumb")) {
    html = html.replace(
      '<main id="main-content">',
      `<main id="main-content">\n      <nav class="page-breadcrumb" aria-label="Percorso di navigazione"><div class="container"><a href="/">Home</a> <span aria-hidden="true">/</span> <span aria-current="page">${crumb.name}</span></div></nav>`
    );
  }
  return html;
}

async function optimizeImages() {
  const dirs = ["cucina", "signature", "beers", "locations"];
  for (const dir of dirs) {
    const abs = path.join(ROOT, "assets", "img", dir);
    if (!fs.existsSync(abs)) continue;
    const files = fs.readdirSync(abs).filter((name) => /\.(png|jpe?g|webp)$/i.test(name) && !/-\d+\.webp$/i.test(name));
    for (const name of files) {
      const input = path.join(abs, name);
      const stem = name.replace(/\.(png|jpe?g|webp)$/i, "");
      for (const width of [400, 800, 1200]) {
        const out = path.join(abs, `${stem}-${width}.webp`);
        await sharp(input)
          .rotate()
          .resize(width, null, { withoutEnlargement: true })
          .webp({ quality: 80, effort: 4 })
          .toFile(out);
      }
      const full = path.join(abs, `${stem}.webp`);
      if (!name.toLowerCase().endsWith(".webp")) {
        await sharp(input).rotate().resize(1200, null, { withoutEnlargement: true }).webp({ quality: 80 }).toFile(full);
      }
      console.log("  webp", dir + "/" + stem);
    }
  }
  const heroJpg = path.join(ROOT, "assets", "img", "hero", "hero.jpg");
  const heroWebp = path.join(ROOT, "assets", "img", "hero", "hero.webp");
  const heroSrc = fs.existsSync(heroJpg) ? heroJpg : heroWebp;
  if (fs.existsSync(heroSrc)) {
    let quality = 68;
    let buf = await sharp(heroSrc).resize(1600, null, { withoutEnlargement: true }).webp({ quality }).toBuffer();
    if (buf.length > 80 * 1024) {
      quality = 58;
      buf = await sharp(heroSrc).resize(1600, null, { withoutEnlargement: true }).webp({ quality }).toBuffer();
    }
    fs.writeFileSync(heroWebp, buf);
    console.log("  hero.webp", (buf.length / 1024).toFixed(0), "KB q" + quality);
  }
}

async function main() {
  console.log("Immagini...");
  await optimizeImages();
  console.log("HTML...");
  const htmlFiles = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html"));
  for (const file of htmlFiles) {
    const next = commonHtml(file, read(file));
    write(file, next);
    console.log("  ", file);
  }
  let locations = read("data/locations.json");
  locations = locations.replace(/19:00 - 23:30/g, "18:30 - 23:30");
  locations = locations.replace(/19:00-23:30/g, "18:30-23:30");
  locations = locations.replace(
    '"headquarters": "Via Pinerolo 149, 10045 Piossasco TO, Italia"',
    '"headquarters": "Via Toscanini 15, 10045 Piossasco TO, Italia"'
  );
  write("data/locations.json", locations);
  console.log("Fatto.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
