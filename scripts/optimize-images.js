/**
 * FASE 1 - Ottimizzazione immagini Alexander Pizzeria
 * - Converte PNG grandi a WebP (giaveno, rivoli)
 * - Comprime hero.jpg (~500KB)
 * - Comprime immagini loyalty e genera WebP
 *
 * Uso: npm install && npm run optimize-images
 * Richiede Node.js 18+
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const img = (p) => path.join(ROOT, "assets", "img", p);

async function run() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch (e) {
    console.error("Installa le dipendenze: npm install");
    process.exit(1);
  }

  console.log("Ottimizzazione immagini in corso...\n");

  // --- Hero: comprimi hero.jpg a ~500KB e genera hero.webp ---
  const heroPath = img("hero/hero.jpg");
  if (fs.existsSync(heroPath)) {
    const pipeline = sharp(heroPath).resize(1920, null, {
      withoutEnlargement: true,
    });
    const jpgBuf = await pipeline
      .clone()
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    try {
      fs.writeFileSync(heroPath, jpgBuf);
      console.log(
        "  hero/hero.jpg compresso:",
        (jpgBuf.length / 1024).toFixed(0),
        "KB"
      );
    } catch (e) {
      console.log(
        "  hero/hero.jpg non sovrascritto (chiudi eventuali programmi che lo usano)"
      );
    }
    await sharp(jpgBuf).webp({ quality: 82 }).toFile(img("hero/hero.webp"));
    console.log("  hero/hero.webp creato");
  }

  // --- Locations: PNG → WebP (giaveno, rivoli) ---
  for (const name of ["giaveno", "rivoli"]) {
    const pngPath = img("locations/" + name + ".png");
    if (fs.existsSync(pngPath)) {
      await sharp(pngPath)
        .resize(800, null, { withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(img("locations/" + name + ".webp"));
      const stat = fs.statSync(img("locations/" + name + ".webp"));
      console.log(
        "  locations/" + name + ".webp creato:",
        (stat.size / 1024).toFixed(0),
        "KB"
      );
    }
  }

  // --- Loyalty: comprimi e genera WebP (~250KB target) ---
  for (const name of ["carta-fedelta", "carta-fedelta1"]) {
    const jpgPath = img("loyalty/" + name + ".jpg");
    if (!fs.existsSync(jpgPath)) continue;
    try {
      const pipeline = sharp(jpgPath).resize(800, null, {
        withoutEnlargement: true,
      });
      const jpgBuf = await pipeline
        .clone()
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer();
      try {
        fs.writeFileSync(jpgPath, jpgBuf);
        console.log(
          "  loyalty/" + name + ".jpg compresso:",
          (jpgBuf.length / 1024).toFixed(0),
          "KB"
        );
      } catch (e) {
        console.log(
          "  loyalty/" +
            name +
            ".jpg non sovrascritto (file in uso?), genera solo WebP"
        );
      }
      const webpPath = img("loyalty/" + name + ".webp");
      await sharp(jpgPath)
        .resize(800, null, { withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(webpPath);
      const stat = fs.statSync(webpPath);
      console.log(
        "  loyalty/" + name + ".webp creato:",
        (stat.size / 1024).toFixed(0),
        "KB"
      );
    } catch (err) {
      console.warn("  loyalty/" + name + " saltato:", err.message);
    }
  }

  console.log(
    "\nCompletato. Aggiorna l'HTML con <picture> e srcset WebP dove applicabile."
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
