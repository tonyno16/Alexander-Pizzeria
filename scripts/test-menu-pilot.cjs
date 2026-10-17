const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const code = readFileSync(path.join(root, 'menu/pilot.js'), 'utf8');
const consentCode = readFileSync(path.join(root, 'production-consent.js'), 'utf8');
const menu = 'https://app.lasagna.marketing/v2/menu_digitale/?key=6a68c1a2820c27aa1b070ad0';

function browser(host = 'www.alexanderpizzeria.com', source = menu, flow = 'menu', venue = 'rivoli') {
  const scripts = [], clicks = [], meta = [], handlers = {};
  const frame = { hidden: true, getAttribute: () => source, addEventListener: (name, fn) => { handlers.frameLoad = fn; }, focus() {} };
  const placeholder = { hidden: false };
  const status = { textContent: '' };
  const trigger = { addEventListener: (name, fn) => { handlers.open = fn; } };
  const nodes = { 'lasagna-menu': frame, 'show-menu': trigger, 'menu-placeholder': placeholder, 'menu-status': status };
  const pathname = (flow === 'takeaway' ? '/asporto/' : '/menu/') + venue + '/';
  const window = { location: { hostname: host, pathname, href: `https://${host}${pathname}?utm_source=google&utm_medium=organic&utm_campaign=gbp_menu_rivoli&email=private@example.com&key=not-for-analytics` }, fbq: (...args) => meta.push(args) };
  const document = { documentElement: { getAttribute: name => name === 'data-menu-flow' ? flow : venue }, head: { appendChild: node => scripts.push(node) }, createElement: () => ({}), getElementById: id => nodes[id], addEventListener: (name, fn) => { if (name === 'click') clicks.push(fn); } };
  const context = { window, document, URL };
  vm.runInNewContext(consentCode, context);
  vm.runInNewContext(code, context);
  const consent = (measurement, marketing = false) => window._iub.csConfiguration.callback.onPreferenceExpressedOrNotNeeded({ purposes: { 4: measurement, 5: marketing } });
  const click = (name, href = menu) => clicks.forEach(fn => fn({ target: { closest: selector => selector === 'a[href]' ? { href } : { getAttribute: () => name } } }));
  const events = () => (window.dataLayer || []).map(args => Array.from(args)).filter(args => args[0] === 'event');
  return { scripts, window, frame, placeholder, status, consent, click, events, meta, handlers };
}

const p = browser();
assert.equal(p.frame.src, undefined, 'No third-party menu before explicit opening');
p.click('menu_open');
assert.equal(p.events().length, 0, 'No analytics before consent');
p.consent(false, false);
assert.equal(p.scripts.filter(s => /googletagmanager/.test(s.src)).length, 0);
p.consent(true, false); p.consent(true, false);
assert.equal(p.scripts.filter(s => /googletagmanager/.test(s.src)).length, 1, 'One GA4 loader');
assert.equal(p.events().filter(e => e[1] === 'page_view').length, 1);
assert.equal(p.events().filter(e => e[1] === 'menu_view').length, 1);
p.click('menu_open');
assert.equal(p.events().at(-1)[1], 'menu_open');
assert.equal(p.events().at(-1)[2].location, 'rivoli');
assert.ok(!JSON.stringify(p.events()).includes('private@example.com'));
assert.ok(!JSON.stringify(p.events()).includes('key='));
assert.ok(JSON.stringify(p.events()).includes('gbp_menu_rivoli'));
assert.equal(p.meta.filter(e => e[0] === 'trackSingleCustom').length, 0, 'Measurement consent does not imply marketing consent');
p.consent(true, true);
p.click('click_call', 'tel:+390110608880');
assert.deepEqual(JSON.parse(JSON.stringify(p.meta.at(-1))), ['trackSingleCustom', '1242459011329386', 'click_call', { location: 'rivoli' }]);
p.window._iub.csConfiguration.callback.onConsentRejected();
const count = p.events().length;
p.click('menu_open');
assert.equal(p.events().length, count, 'No measurement events after revocation');
assert.equal(p.window['ga-disable-G-VP4K6WX6P4'], true);
p.handlers.open({ preventDefault() {} });
assert.equal(p.frame.src, menu);
assert.equal(p.frame.hidden, false);
assert.equal(p.placeholder.hidden, true);
assert.ok(!p.frame.src.includes('mode=order'));
for (const host of ['localhost', '127.0.0.1', 'pilot.vercel.app', 'www.alexanderpizzeria.com.attacker.example']) {
  const preview = browser(host); preview.consent(true, true); preview.click('menu_open');
  assert.equal(preview.events().length, 0, 'Preview/local must not feed production measurement');
  assert.equal(preview.scripts.filter(s => /googletagmanager/.test(s.src)).length, 0);
}
const foreign = browser('www.alexanderpizzeria.com', 'https://example.com/menu');
foreign.handlers.open({ preventDefault() {} });
assert.equal(foreign.frame.src, undefined, 'Do not embed an unexpected provider');
const orderUrl = menu + '&mode=order';
const order = browser('www.alexanderpizzeria.com', orderUrl, 'takeaway');
assert.equal(order.frame.src, undefined, 'No order service before explicit opening');
order.consent(true, true);
assert.equal(order.events().filter(e => e[1] === 'takeaway_view').length, 1);
assert.ok(!order.events().some(e => e[1] === 'menu_view'));
assert.equal(new URL(order.events()[0][2].page_location).pathname, '/asporto/rivoli/');
order.handlers.open({ preventDefault() {} });
assert.equal(order.frame.src, orderUrl);
order.click('takeaway_open', orderUrl);
assert.equal(order.events().at(-1)[1], 'takeaway_open');
order.click('click_call', 'tel:+390110608880');
assert.deepEqual(JSON.parse(JSON.stringify(order.meta.at(-1)[3])), { location: 'rivoli' });
p.consent(true, true);
p.click('click_takeaway', 'https://www.alexanderpizzeria.com/asporto/rivoli/');
assert.equal(p.meta.at(-1)[2], 'click_takeaway', 'Internal order link keeps intent tracking');
assert.deepEqual(JSON.parse(JSON.stringify(p.meta.at(-1)[3])), { location: 'rivoli' });
for (const [source, flow] of [[orderUrl, 'menu'], [menu, 'takeaway'], [orderUrl.replace('6a68c1a2820c27aa1b070ad0', 'other-venue'), 'takeaway']]) {
  const wrongFlow = browser('www.alexanderpizzeria.com', source, flow);
  wrongFlow.handlers.open({ preventDefault() {} });
  assert.equal(wrongFlow.frame.src, undefined, 'Wrong flow or venue is not embedded');
}
const localOrder = browser('127.0.0.1', orderUrl, 'takeaway');
localOrder.consent(true, true); localOrder.click('takeaway_open', orderUrl);
assert.equal(localOrder.events().length, 0);
order.window._iub.csConfiguration.callback.onConsentRejected();
const orderCount = order.events().length;
order.click('takeaway_open', orderUrl);
assert.equal(order.events().length, orderCount);
assert.ok(!order.events().some(e => ['purchase', 'order_confirmed'].includes(e[1])));
assert.ok(!p.events().some(e => ['purchase', 'generate_lead', 'booking_confirmed'].includes(e[1])));
const locations = {
  rivoli: ['6a68c1a2820c27aa1b070ad0', '+390110608880'],
  pinerolo: ['6ab4fe576587a85c4901e0c5', '+390121332035'],
  piossasco: ['6ab4ff967fb98b0f480b56d3', '+390117601733'],
  giaveno: ['6aaa9e5e7f0aa186140ce5c2', '+390119376286']
};
for (const [venue, [key, phone]] of Object.entries(locations)) {
  for (const flow of ['menu', 'takeaway']) {
    const route = (flow === 'menu' ? '/menu/' : '/asporto/') + venue + '/';
    const provider = `https://app.lasagna.marketing/v2/menu_digitale/?key=${key}` + (flow === 'takeaway' ? '&mode=order' : '');
    const view = browser('www.alexanderpizzeria.com', provider, flow, venue);
    view.consent(true, true); view.handlers.open({ preventDefault() {} });
    assert.equal(view.frame.src, provider, `${venue} ${flow} opens its provider`);
    assert.equal(view.events()[0][2].location, venue);
    assert.equal(new URL(view.events()[0][2].page_location).pathname, route);
    view.click('click_call', 'tel:' + phone);
    assert.deepEqual(JSON.parse(JSON.stringify(view.meta.at(-1)[3])), { location: venue });
    const html = readFileSync(path.join(root, route, 'index.html'), 'utf8');
    assert.ok(html.includes(`data-menu-pilot="${venue}"`));
    assert.ok(html.includes('tel:' + phone));
    assert.ok(html.includes('key=' + key));
    assert.ok(html.includes(`href="https://www.alexanderpizzeria.com${route}"`));
    assert.ok(!/<iframe[^>]*\ssrc=/.test(html), 'Third-party source is activated only on request');
    for (const [other, [otherKey]] of Object.entries(locations)) {
      if (other === venue) continue;
      assert.ok(!html.includes('key=' + otherKey), 'No cross-venue menu in the page');
      const wrong = browser('www.alexanderpizzeria.com', provider.replace(key, otherKey), flow, venue);
      wrong.handlers.open({ preventDefault() {} });
      assert.equal(wrong.frame.src, undefined);
    }
    const preview = browser('localhost', provider, flow, venue);
    preview.consent(true, true); preview.click(flow + '_open', provider);
    assert.equal(preview.events().length, 0);
  }
  const hub = browser(); hub.window.location.pathname = '/menu/'; hub.consent(false, true);
  hub.click('click_takeaway', 'https://www.alexanderpizzeria.com/asporto/' + venue + '/');
  assert.deepEqual(JSON.parse(JSON.stringify(hub.meta.at(-1)[3])), { location: venue });
  hub.click('click_takeaway', `https://app.lasagna.marketing/v2/menu_digitale/?mode=order&key=${key}`);
  assert.deepEqual(JSON.parse(JSON.stringify(hub.meta.at(-1)[3])), { location: venue });
}
console.log('PASS: all eight pages, venue isolation, correct menu/order flow, internal and external intent attribution, consent/revocation, no preview collection or false conversions.');
