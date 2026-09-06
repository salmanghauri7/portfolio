// Headless Chrome page check via the DevTools protocol (no dependencies).
// usage: node scripts/shot.mjs <url> <width> <height> <out.png> [scrollY] [waitMs] [js]
//   REDUCE=1   emulate prefers-reduced-motion: reduce
//   RELOAD=ms  reload after the wait and shoot ms later (curtain without preloader)
//   CHROME=... path to chrome.exe (default: Program Files)
//   js runs after the wait, may return a promise; its value is printed.
// Prints title, innerWidth, scrollWidth, elements overflowing to the right, page errors; saves a PNG.
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';

const [url, w, h, out, scrollY = '0', waitMs = '2500', js = ''] = process.argv.slice(2);
const port = 9333 + (process.pid % 1000); // parallel runs must not share a port
const chrome = spawn(process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${port}`, `--user-data-dir=${tmpdir()}/cdp-profile-${port}`, 'about:blank',
], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
setTimeout(() => { console.log('WATCHDOG: hung. errors:', errors); chrome.kill(); process.exit(1); }, 25000);

let targets;
for (let i = 0; i < 50 && !targets; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { await sleep(200); }
}
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map(); const errors = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text);
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push(m.params.args.map((a) => a.value ?? a.description).join(' '));
};
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 768 });
if (process.env.REDUCE) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await send('Page.navigate', { url });
await sleep(+waitMs);
if (process.env.RELOAD) { await send('Page.reload'); await sleep(+process.env.RELOAD); }
if (+scrollY) { await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${scrollY})` }); await sleep(1800); }
if (js) {
  const r = await send('Runtime.evaluate', { expression: js, awaitPromise: true, returnByValue: true });
  console.log('js:', JSON.stringify(r.result.exceptionDetails ? r.result.exceptionDetails.exception?.description : r.result.result.value));
}
const { result } = await send('Runtime.evaluate', { returnByValue: true, expression: `JSON.stringify({
  title: document.title, innerWidth, scrollY: Math.round(scrollY), scrollWidth: document.documentElement.scrollWidth,
  overflowing: [...document.querySelectorAll('body *')].filter(el => !el.closest('astro-dev-toolbar') && !el.closest('.drawer') && !el.closest('.curtain') && el.getBoundingClientRect().right > innerWidth + 1)
    .slice(0, 8).map(el => el.tagName.toLowerCase() + '.' + el.className + ' right=' + Math.round(el.getBoundingClientRect().right))
})` });
console.log(result.result.value);
if (errors.length) console.log('PAGE ERRORS:', errors);
const shot = await send('Page.captureScreenshot', { format: 'png' });
writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
ws.close(); chrome.kill(); process.exit(0);
