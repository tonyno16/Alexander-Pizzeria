// Behaviour tests with no network, credentials, customer data or real bookings.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const consentCode = fs.readFileSync(path.join(root, 'production-consent.js'), 'utf8');
const pageCode = fs.readFileSync(path.join(root, 'assets/js/rivoli-gruppi.js'), 'utf8');

class Element {
  constructor(attrs = {}) { this.attrs = attrs; this.events = {}; this.hidden = false; this.open = false; this.classList = { add() {}, remove() {} }; }
  addEventListener(name, fn) { (this.events[name] ||= []).push(fn); }
  hasAttribute(name) { return name === 'src' ? !!this.src : Object.hasOwn(this.attrs, name); }
  getAttribute(name) { return this.attrs[name] ?? null; }
  closest(selector) { return selector === 'a[href]' && this.href ? this : null; }
  showModal() { this.open = true; }
  close() { this.open = false; this.emit('close'); }
  focus() { this.focused = true; }
  emit(name, detail = {}) { const e = { target: this, preventDefault() { this.defaultPrevented = true; }, ...detail }; (this.events[name] || []).forEach(fn => fn(e)); return e; }
}

function harness(host = 'www.alexanderpizzeria.com', search = '') {
  const document = new Element();
  const window = new Element();
  const body = new Element({ 'data-rivoli-groups': '' });
  const elements = Object.fromEntries(['lasagna-iframe', 'mobile-cta', 'prenota-ora'].map(id => [id, new Element()]));
  const direct = new Element(), intro = new Element();
  const scripts = [], meta = [];
  document.body = body;
  document.referrer = 'https://www.google.com/search?q=private-example';
  document.documentElement = { scrollHeight: 2000 };
  document.head = { appendChild(node) { scripts.push(node.src); } };
  document.createElement = () => new Element();
  document.getElementById = id => elements[id];
  document.querySelector = () => null;
  document.querySelectorAll = selector => selector === '[data-booking-direct]' ? [direct] : [intro];
  window.location = { hostname: host, pathname: '/giro-pizza-rivoli/', search, href: `https://${host}/giro-pizza-rivoli/${search}` };
  window.innerHeight = 800;
  window.scrollY = 700;
  window.fbq = (...args) => meta.push(args);
  window.dispatchEvent = event => window.emit(event.type, { detail: event.detail });
  const context = { window, document, location: window.location, URL, URLSearchParams, Date, Object, CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } } };
  vm.runInNewContext(consentCode, context);
  vm.runInNewContext(pageCode, context);
  const grant = (analytics, marketing) => window._iub.csConfiguration.callback.onPreferenceExpressedOrNotNeeded({ purposes: { 4: analytics, 5: marketing } });
  const reject = () => window._iub.csConfiguration.callback.onConsentRejected();
  const click = element => { const e = element.emit('click'); document.emit('click', { target: element }); return e; };
  const gaEvents = () => Array.from(window.dataLayer || []).filter(x => x[0] === 'event').map(x => x[1]);
  const metaEvents = () => meta.filter(x => x[0] === 'trackSingleCustom').map(x => x[2]);
  return { window, elements, open: direct, direct, intro, scripts, grant, reject, click, gaEvents, metaEvents };
}

let checks = 0;
function test(name, fn) { fn(); checks++; console.log('PASS', name); }
test('Inline frame is available without generating page-owned metrics before consent', () => {
  const h = harness();
  assert.equal(h.elements['lasagna-iframe'].src, h.direct.href);
  h.click(h.intro); h.window.emit('scroll');
  assert.deepEqual(h.gaEvents(), []); assert.deepEqual(h.metaEvents(), []);
  assert.ok(!h.scripts.some(x => /googletagmanager|facebook/.test(x)));
});
test('UTM handoff keeps key and approved labels, excludes arbitrary fields/contact-like data', () => {
  const h = harness(undefined, '?utm_source=meta&utm_medium=paid_social&utm_campaign=rivoli_feriali_202610&utm_content=persona%40example.com&utm_term=3273830000&email=secret&key=bad&gclid=unexpected');
  const url = new URL(h.open.href);
  assert.equal(url.searchParams.get('key'), '6a47c771839738c24e04af28');
  assert.equal(url.searchParams.get('utm_campaign'), 'rivoli_feriali_202610');
  assert.deepEqual([...url.searchParams.keys()], ['key', 'utm_source', 'utm_medium', 'utm_campaign']);
  assert.equal(h.elements['lasagna-iframe'].src, h.direct.href);
});
test('Measurement consent does not grant advertising consent', () => {
  const h = harness(); h.grant(true, false); h.click(h.open);
  assert.deepEqual(h.gaEvents(), ['page_view', 'click_booking']);
  assert.deepEqual(h.metaEvents(), []);
  const updates = h.window.dataLayer.filter(x => x[0] === 'consent' && x[1] === 'update');
  assert.equal(updates.at(-1)[2].ad_storage, 'denied');
  assert.equal(updates.at(-1)[2].ad_user_data, 'denied');
  const pageview = h.window.dataLayer.find(x => x[0] === 'event' && x[1] === 'page_view');
  assert.equal(pageview[2].page_referrer, 'https://www.google.com/');
  assert.equal(pageview[2].page_location, 'https://www.alexanderpizzeria.com/giro-pizza-rivoli/');
});
test('Marketing-only consent tracks one Meta booking click, never GA4 or Lead', () => {
  const h = harness(); h.grant(false, true); h.click(h.open);
  assert.deepEqual(h.metaEvents(), ['click_booking']);
  assert.deepEqual(h.gaEvents(), []);
});
test('Scroll 50 fires once per consented channel; anchor is not booking', () => {
  const h = harness(); h.grant(true, true); h.click(h.intro); h.window.emit('scroll'); h.window.emit('scroll');
  assert.deepEqual(h.gaEvents(), ['page_view', 'view_booking_options', 'scroll_50']);
  assert.deepEqual(h.metaEvents(), ['view_booking_options', 'scroll_50']);
});
test('Withdrawal stops metrics and duplicate pageviews on regrant', () => {
  const h = harness(); h.grant(true, true); h.reject(); h.click(h.intro); h.click(h.open); h.window.emit('scroll');
  assert.deepEqual(h.gaEvents(), ['page_view']); assert.deepEqual(h.metaEvents(), []);
  assert.equal(h.window['ga-disable-G-VP4K6WX6P4'], true);
  h.grant(true, true); assert.deepEqual(h.gaEvents(), ['page_view']);
});
test('Local/preview sites never feed production metrics even after consent', () => {
  for (const host of ['localhost', '127.0.0.1', 'preview.vercel.app']) {
    const h = harness(host); h.grant(true, true); h.click(h.open); h.window.emit('scroll');
    assert.deepEqual(h.gaEvents(), []); assert.deepEqual(h.metaEvents(), []);
    assert.ok(!h.scripts.some(x => /googletagmanager|facebook/.test(x)));
  }
});
test('Anchor clicks and consent changes preserve the current embedded form', () => {
  const h = harness();
  h.elements['lasagna-iframe'].src = 'preserved-current-form';
  h.click(h.intro); h.grant(true, true); h.reject(); h.click(h.intro);
  assert.equal(h.elements['lasagna-iframe'].src, 'preserved-current-form');
});
test('Direct fallback keeps ordinary link navigation available', () => {
  const h = harness();
  assert.notEqual(h.click(h.open).defaultPrevented, true);
  assert.equal(new URL(h.direct.href).hostname, 'app.lasagna.marketing');
});
test('HTML and structured FAQ stay aligned; supplied layout and inline form present', () => {
  const html = fs.readFileSync(path.join(root, 'giro-pizza-rivoli/index.html'), 'utf8');
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const faq = schema['@graph'].find(x => x['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, (html.match(/class="faq-item"/g) || []).length);
  assert.equal((html.match(/class="formula-card(?: highlight)?"/g) || []).length, 3);
  assert.match(html, /--bg-dark: #141414/);
  assert.ok(html.includes('rel="canonical" href="https://www.alexanderpizzeria.com/giro-pizza-rivoli/"'));
  assert.ok(html.includes('alexander-locale-800.webp'));
  const venue = fs.readFileSync(path.join(root, 'rivoli/index.html'), 'utf8');
  assert.ok(!venue.includes('data-rivoli-groups'));
  assert.ok(venue.includes('https://www.alexanderpizzeria.com/rivoli/'));
  assert.match(html, /id="lasagna-iframe"[\s\S]*?loading="lazy"/);
  assert.match(html, /id="lasagna-direct-link"[^>]+href="https:\/\/app\.lasagna\.marketing/);
  assert.ok(!html.includes('onclick='));
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.ok(!/30 secondi|zero pagamenti|dal quinto celiaco|massimo 3 tavolate/i.test(html));
  for (const match of html.matchAll(/(?:src|href)="(\/(?!\/)[^"?#]+)"/g)) {
    const ref = path.join(root, match[1]);
    assert.ok(fs.existsSync(ref), 'Missing local resource: ' + match[1]);
  }
});
console.log(`${checks} behaviour checks passed; no external services called.`);
