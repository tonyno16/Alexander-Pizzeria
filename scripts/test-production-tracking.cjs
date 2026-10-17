const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = readFileSync(require('node:path').join(__dirname, '../production-consent.js'), 'utf8');
function page(hostname = 'www.alexanderpizzeria.com') {
  const scripts = [], listeners = {}, calls = [];
  const window = { location: { hostname, pathname: '/rivoli/', href: `https://${hostname}/rivoli/` } };
  const document = { createElement: () => ({}), head: { appendChild: s => scripts.push(s) },
    addEventListener: (name, fn) => { listeners[name] = fn; } };
  vm.runInNewContext(source, { window, document, URL });
  const consent = granted => {
    window._iub.csConfiguration.callback.onPreferenceExpressedOrNotNeeded({ purposes: { 5: granted } });
    if (window.fbq && !window.fbq.callMethod) {
      calls.push(...window.fbq.queue.map(a => Array.from(a)));
      window.fbq.callMethod = (...args) => calls.push(args);
    }
  };
  const click = href => listeners.click({ target: { closest: () => ({ href }) } });
  return { scripts, calls, consent, click, window };
}
const booking = 'https://app.lasagna.marketing/v2/prenotazione/?key=6a47c771839738c24e04af28';
const p = page();
p.click(booking);
assert.equal(p.calls.length, 0, 'No events before consent');
p.consent(false);
assert.equal(p.scripts.filter(s => /fbevents/.test(s.src)).length, 0);
p.consent(true); p.consent(true);
assert.equal(p.calls.filter(c => c[1] === 'PageView').length, 1, 'PageView once per page');
assert.equal(p.scripts.filter(s => /fbevents/.test(s.src)).length, 1);
p.click(booking);
const intent = p.calls.find(c => c[2] === 'click_booking');
assert.equal(intent[0], 'trackSingleCustom'); assert.equal(intent[1], '1242459011329386');
assert.deepEqual(JSON.parse(JSON.stringify(intent[3])), { location: 'rivoli' });
assert.ok(!JSON.stringify(intent).includes('key='));
const count = p.calls.length;
p.click('https://example.com/v2/prenotazione/');
assert.equal(p.calls.length, count, 'Unrelated destinations ignored');
p.consent(false); const revoked = p.calls.length; p.click(booking);
assert.equal(p.calls.length, revoked, 'No click events after withdrawal');
p.consent(true); p.click('tel:+390110608880');
assert.equal(p.calls.at(-1)[2], 'click_call');
assert.ok(!JSON.stringify(p.calls.at(-1)).includes('+39'));
for (const host of ['localhost', 'alexander-pizzeria.vercel.app', 'www.alexanderpizzeria.com.attacker.example']) {
  const preview = page(host); preview.consent(true); preview.click(booking);
  assert.equal(preview.calls.length, 0, `No production events from ${host}`);
  assert.equal(preview.scripts.filter(s => /fbevents/.test(s.src)).length, 0);
}
assert.ok(!p.calls.some(c => ['Schedule', 'Purchase', 'Lead'].includes(c[1]) || ['Schedule', 'Purchase', 'Lead'].includes(c[2])), 'Intent is never a conversion');
console.log('PASS: consent, revocation, single initialization, booking intent, phone privacy, production-only hosts, no false conversion.');
