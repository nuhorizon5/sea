const V = 'sea-v1792121155';
const PRE = ["./", "index.html", "support.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-180.png", "OnboardD.dc.html", "OnboardM.dc.html", "LetterD.dc.html", "LetterM.dc.html", "HomeD.dc.html", "HomeM2.dc.html", "ScheduleD.dc.html", "ScheduleM.dc.html", "NoticeD.dc.html", "NoticeM.dc.html", "TipsD.dc.html", "TipsM.dc.html", "AskD.dc.html", "AskM.dc.html"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(PRE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.hostname === 'ntfy.sh') return;
  e.respondWith(fetch(e.request).then((r) => { if (r.ok && (u.origin === location.origin || /fonts\.(googleapis|gstatic)\.com/.test(u.hostname))) { const c = r.clone(); caches.open(V).then((cc) => cc.put(e.request, c)); } return r; }).catch(() => caches.match(e.request)));
});