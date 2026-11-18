// Render one built app in headless Chrome and record what is actually visible, before and after one interaction.
//
// Usage: node render_app.mjs SITE_DIR OUT_DIR [--hosted]
//
// Coding-agent builds are opened at /index.html. --hosted is the variant used for the ProDeGen sites (Figma Make, Lovable,
// Base44): it opens the site root (they use client-side routers), leaves the page title out of the record (the platforms put
// their name in it) and skips the platforms' badge overlays.
// The site is served from disk under a fake origin (http://app.local/). GET requests to a short list of static CDN
// hosts (CDN_HOSTS) are allowed; every other request is blocked, so the app cannot reach any API. Output in OUT_DIR:
//   render.json            initial state (visible text lines, visible controls with states) and one record per
//                          interaction (control clicked from a fresh load, what appeared, what disappeared, kind)
//   initial.png            screenshot of the first render
//   interaction_NN.png     screenshot after interaction NN, only when the click changed something visible
// "kind" per interaction:
//   same_screen_state   most of the first screen is still visible: a state of the same screen (modal, sheet,
//                       inline expansion, toggled control, dialog)
//   different_screen    most of the first screen is gone: navigation to another screen
//   no_visible_change   nothing visible changed
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright-core");

const args = process.argv.slice(2);
const hosted = args.includes("--hosted");
const [siteDir, outDir] = args.filter((a) => a !== "--hosted");
if (!siteDir || !outDir) {
  console.error("usage: node render_app.mjs SITE_DIR OUT_DIR [--hosted]");
  process.exit(2);
}
const CHROME = process.env.CHROME_BIN || "/usr/bin/google-chrome";
const ORIGIN = "http://app.local";
const VIEWPORT = { width: 1280, height: 900 };
const MAX_INTERACTIONS = 15;
// Static CDN hosts an app may load its styles, fonts, icons or libraries from, as a user's browser would. Without them
// apps that load Tailwind from cdn.tailwindcss.com render unstyled or blank. Every other request stays blocked.
const CDN_HOSTS = new Set(["cdn.tailwindcss.com", "fonts.googleapis.com", "fonts.gstatic.com", "api.iconify.design",
  "cdn.jsdelivr.net", "unpkg.com", "cdnjs.cloudflare.com", "esm.sh"]);
const SETTLE_MS = 1200;
const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".ico": "image/x-icon",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".otf": "font/otf",
  ".mp3": "audio/mpeg", ".mp4": "video/mp4", ".webm": "video/webm", ".txt": "text/plain",
};
fs.mkdirSync(outDir, { recursive: true });
const root = path.resolve(siteDir);

// Runs in the page: visible text lines and visible controls.
const CAPTURE = (hosted) => {
  const vw = window.innerWidth, vh = window.innerHeight;
  const shown = (el) => {
    if (!el || !el.checkVisibility) return false;
    if (hosted && el.closest && el.closest("#lovable-badge, #base44-edit-badge")) return false;  // hosting-platform overlays, not part of the generated app
    if (!el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) return false;
    const r = el.getBoundingClientRect();
    return r.width > 1 && r.height > 1 && r.right > 0 && r.bottom > 0 && r.left < vw && r.top < vh;
  };
  const lines = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent.replace(/\s+/g, " ").trim();
    if (!text || !shown(node.parentElement)) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    const r = range.getBoundingClientRect();
    if (r.width < 1 || r.height < 1 || r.bottom <= 0 || r.top >= vh) continue;
    if (lines[lines.length - 1] !== text) lines.push(text);
  }
  const selector = 'button, a[href], input, select, textarea, [role="button"], [role="switch"], [role="checkbox"], ' +
    '[role="radio"], [role="link"], [role="tab"], [role="menuitem"], [onclick], summary';
  const controls = [];
  document.querySelectorAll(selector).forEach((el, index) => {
    if (!shown(el)) return;
    const r = el.getBoundingClientRect();
    const label = (el.getAttribute("aria-label") || el.innerText || el.value || el.placeholder ||
      el.title || (el.labels && el.labels[0] && el.labels[0].innerText) || "").replace(/\s+/g, " ").trim().slice(0, 140);
    const checked = el.type === "checkbox" || el.type === "radio" ? el.checked
      : el.getAttribute("aria-checked") ?? el.getAttribute("aria-pressed") ?? null;
    controls.push({
      index, tag: el.tagName.toLowerCase(), type: el.type || null, role: el.getAttribute("role"),
      label, checked: checked === null ? null : String(checked), disabled: !!el.disabled || el.getAttribute("aria-disabled") === "true",
      box: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)],
    });
  });
  return { url: location.href, title: hosted ? "" : document.title, text_lines: lines, controls };
};

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
async function openPage(log) {
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== ORIGIN) {
      if (route.request().method() === "GET" && CDN_HOSTS.has(url.hostname)) return route.continue();
      return route.abort();
    }
    let file = path.join(root, decodeURIComponent(url.pathname));
    if (!file.startsWith(root)) return route.abort();
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    if (!fs.existsSync(file)) file = path.join(root, "index.html");  // single-page app fallback
    return route.fulfill({ status: 200, body: fs.readFileSync(file),
      contentType: MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => log.page_errors.push(String(e.message || e).slice(0, 300)));
  page.on("console", (m) => { if (m.type() === "error") log.console_errors.push(m.text().slice(0, 300)); });
  page.on("dialog", async (d) => { log.dialogs.push({ type: d.type(), message: d.message().slice(0, 400) }); await d.dismiss(); });
  await page.goto(hosted ? `${ORIGIN}/` : `${ORIGIN}/index.html`, { waitUntil: "load", timeout: 30000 });
  await page.waitForTimeout(SETTLE_MS);
  return { context, page };
}

// No host paths in the record: the site path carries the run name (level, round, model), and agents read this file.
const result = { site: "APP/", viewport: VIEWPORT, chrome: "headless Chrome", initial: null, interactions: [],
  page_errors: [], console_errors: [], dialogs_on_load: [], blank_render: false, notes: [] };
const loadLog = { page_errors: result.page_errors, console_errors: result.console_errors, dialogs: result.dialogs_on_load };
const first = await openPage(loadLog);
result.initial = await first.page.evaluate(CAPTURE, hosted);
await first.page.screenshot({ path: path.join(outDir, "initial.png") });
await first.context.close();
result.blank_render = result.initial.text_lines.length === 0;

// One interaction at a time, each from a fresh load, on visible clickable controls of the first screen.
const typing = new Set(["text", "email", "password", "search", "tel", "url", "number", "date"]);
const candidates = result.initial.controls.filter((c) => !c.disabled &&
  !(c.tag === "textarea" || c.tag === "select" || (c.tag === "input" && typing.has(c.type || "text"))));
const seen = new Set();
const unique = candidates.filter((c) => { const k = `${c.label}|${c.box}`; if (seen.has(k)) return false; seen.add(k); return true; });
if (unique.length > MAX_INTERACTIONS) result.notes.push(`${unique.length} clickable controls; only the first ${MAX_INTERACTIONS} were tried`);
const before = new Set(result.initial.text_lines);
for (const [n, control] of unique.slice(0, MAX_INTERACTIONS).entries()) {
  const log = { page_errors: [], console_errors: [], dialogs: [] };
  const record = { n: n + 1, control, kind: "no_visible_change", retained_fraction: 1, appeared_text: [],
    disappeared_count: 0, control_state_changes: [], dialogs: log.dialogs, url_after: null, screenshot: null, error: null };
  try {
    const { context, page } = await openPage(log);
    const handle = (await page.$$('button, a[href], input, select, textarea, [role="button"], [role="switch"], ' +
      '[role="checkbox"], [role="radio"], [role="link"], [role="tab"], [role="menuitem"], [onclick], summary'))[control.index];
    if (!handle) throw new Error("control not found after reload");
    await handle.click({ timeout: 3000 });
    await page.waitForTimeout(SETTLE_MS);
    const after = await page.evaluate(CAPTURE, hosted);
    const afterSet = new Set(after.text_lines);
    const kept = result.initial.text_lines.filter((t) => afterSet.has(t)).length;
    record.retained_fraction = result.initial.text_lines.length ? +(kept / result.initial.text_lines.length).toFixed(2) : 0;
    record.appeared_text = after.text_lines.filter((t) => !before.has(t)).slice(0, 60);
    record.disappeared_count = result.initial.text_lines.length - kept;
    const states = new Map(result.initial.controls.map((c) => [`${c.label}|${c.box}`, c.checked]));
    record.control_state_changes = after.controls.filter((c) => states.has(`${c.label}|${c.box}`) &&
      states.get(`${c.label}|${c.box}`) !== c.checked).map((c) => ({ label: c.label, from: states.get(`${c.label}|${c.box}`), to: c.checked }));
    record.url_after = after.url;
    const changed = record.appeared_text.length || record.disappeared_count || record.control_state_changes.length || log.dialogs.length;
    if (changed) {
      record.kind = record.retained_fraction >= 0.6 ? "same_screen_state" : "different_screen";
      record.screenshot = `interaction_${String(n + 1).padStart(2, "0")}.png`;
      await page.screenshot({ path: path.join(outDir, record.screenshot) });
    }
    await context.close();
  } catch (error) {
    record.error = String(error.message || error).split("\n")[0].slice(0, 300);
  }
  result.interactions.push(record);
}
await browser.close();
fs.writeFileSync(path.join(outDir, "render.json"), JSON.stringify(result, null, 2) + "\n");
console.log(`rendered: ${result.initial.text_lines.length} text lines, ${result.initial.controls.length} controls, ` +
  `${result.interactions.length} interactions (${result.interactions.filter((i) => i.kind !== "no_visible_change").length} with a visible change)`);
