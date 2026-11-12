// Service worker מינימלי: מאפשר התקנה כאפליקציה, ומגיש מטמון כשאין רשת.
const CACHE = "gmt-v1";
const SHELL = ["/", "/spots/", "/shop/", "/events/", "/destinations/", "/offline.html"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()).catch(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // קבצים עם חתימה בשם: מהמטמון קודם, הם אף פעם לא משתנים
  if (url.pathname.startsWith("/_next/static") || url.pathname.startsWith("/assets/static")) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
      return res;
    })));
    return;
  }

  // עמודים: מהרשת קודם, ואם אין רשת מהמטמון
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
      return res;
    }).catch(() => caches.match(req).then((hit) => hit || caches.match("/offline.html"))));
  }
});
