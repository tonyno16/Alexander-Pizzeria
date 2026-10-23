'use strict';

// Rebuild the homepage derivatives from the original photos and shared CSS.
// Keep the originals: other pages and WebP fallback still use them.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const CleanCSS = require('clean-css');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'assets/img/performance');
const images = [
  ['assets/img/cinematic/hero-mobile.webp', 'hero-mobile.avif', 1000],
  ['assets/img/cinematic/hero.webp', 'hero.avif', 1672],
  ['media/logo.webp', 'logo-320.webp', 320],
  ...[480, 800, 1086].map(width => ['media/senza-glutine-tavola.webp', `senza-glutine-${width}.webp`, width]),
  ...[640, 1000].map(width => ['assets/img/cinematic/aura-cutout.webp', `aura-${width}.webp`, width]),
  ...[
    ['piossasco', 'assets/img/locations/piossasco-esterno.webp'],
    ['pinerolo', 'assets/img/locations/pinerolo.webp'],
    ['giaveno', 'media/sala-giaveno.webp'],
    ['rivoli', 'assets/img/locations/rivoli.webp']
  ].flatMap(([venue, source]) => [480, 800].map(width => [source, `${venue}-${width}.webp`, width]))
];

async function build() {
  fs.mkdirSync(out, { recursive: true });
  for (const [source, filename, width] of images) {
    const pipeline = sharp(path.join(root, source)).rotate().resize({ width, withoutEnlargement: true });
    if (filename.endsWith('.avif')) {
      await pipeline.avif({ quality: 55, effort: 6, chromaSubsampling: '4:2:0' }).toFile(path.join(out, filename));
    } else {
      await pipeline.webp({ quality: filename.startsWith('logo-') ? 84 : 74, effort: 6 }).toFile(path.join(out, filename));
    }
  }
  const source = ['cinematic-home.css', 'assets/css/seo-local.css']
    .map(file => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
  const css = new CleanCSS({ level: 2, rebase: false }).minify(source);
  if (css.errors.length) throw new Error(css.errors.join('\n'));
  fs.writeFileSync(path.join(root, 'cinematic-home.min.css'), css.styles + '\n');
  console.log(`Homepage assets: ${images.length} image variants; CSS ${Buffer.byteLength(source)} -> ${Buffer.byteLength(css.styles)} bytes.`);
}

build().catch(error => { console.error(error); process.exitCode = 1; });
