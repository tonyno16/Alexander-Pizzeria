/**
 * Build CSS: concatena e minifica tutti i file CSS in un unico style.min.css
 * Ordine: variables → reset → base → layout → components → header → footer → hero → locations → loyalty → blog → responsive
 */
const fs = require("fs");
const path = require("path");
const CleanCSS = require("clean-css");

const ROOT = path.join(__dirname, "..");
const CSS_DIR = path.join(ROOT, "assets", "css");
const OUT_FILE = path.join(CSS_DIR, "style.min.css");

const ORDER = [
  "variables.css",
  "reset.css",
  "base.css",
  "layout.css",
  "components.css",
  "header.css",
  "footer.css",
  "hero.css",
  "locations.css",
  "loyalty.css",
  "blog.css",
  "responsive.css",
];

function build() {
  const parts = [];
  for (const name of ORDER) {
    const file = path.join(CSS_DIR, name);
    if (!fs.existsSync(file)) {
      console.warn(`[build-css] Skip (not found): ${name}`);
      continue;
    }
    parts.push(fs.readFileSync(file, "utf8"));
  }
  const combined = parts.join("\n");
  const minified = new CleanCSS({ level: 2 }).minify(combined);
  if (minified.errors.length) {
    console.error("[build-css] Errors:", minified.errors);
    process.exit(1);
  }
  fs.writeFileSync(OUT_FILE, minified.styles, "utf8");
  console.log(
    `[build-css] Written ${OUT_FILE} (${(minified.styles.length / 1024).toFixed(
      1
    )} KB)`
  );
}

build();
