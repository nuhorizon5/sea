const V = 'sea-v1792725726';
const PRE = ["./", "index.html", "support.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-180.png", "OnboardD.dc.html", "OnboardM.dc.html", "LetterD.dc.html", "LetterM.dc.html", "HomeD.dc.html", "HomeM2.dc.html", "ScheduleD.dc.html", "ScheduleM.dc.html", "NoticeD.dc.html", "NoticeM.dc.html", "TipsD.dc.html", "TipsM.dc.html", "AskD.dc.html", "AskM.dc.html"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(PRE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
const put = (req, r) => { if (r && r.ok) { const c = r.clone(); caches.open(V).then((cc) => cc.put(req, c)); } return r; };
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  const doc = e.request.mode === 'navigate' || e.request.destination === 'iframe' || e.request.destination === 'document' || /\.html$/.test(u.pathname) || u.pathname.endsWith('/');
  if (doc) {
    e.respondWith(new Promise((res) => {
      let done = false; const hit = () => caches.match(e.request, { ignoreSearch: true });
      const t = setTimeout(() => hit().then((c) => { if (c && !done) { done = true; res(c); } }), 1800);
      fetch(e.request).then((r) => { put(e.request, r); if (!done) { done = true; clearTimeout(t); res(r); } }).catch(() => hit().then((c) => { if (!done) { done = true; res(c || Response.error()); } }));
    }));
    return;
  }
  e.respondWith(caches.match(e.request).then((c) => c || fetch(e.request).then((r) => put(e.request, r))));
});