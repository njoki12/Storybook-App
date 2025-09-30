const CACHE_NAME = "storybook-cache-v2";
const urlsToCache = [
  "app.html",
  "app.css",
  "app.js",
  "offline.html",   // 👈 offline fallback
  "favicon.png",
  "audio/sparkle.mp3",
  "stories/luna/index.html",
  "stories/luna/chapter1.html",
  "stories/luna/chapter2.html",
  "stories/luna/chapter3.html",
  "stories/knight/index.html",
  "stories/garden/index.html"
];

// Install service worker and cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // activate new SW immediately
});

// Activate service worker and remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // control clients immediately
});

// Fetch files: serve from cache, else network, else offline page
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // If request is for a page, show offline.html
          if (event.request.mode === "navigate") {
            return caches.match("offline.html");
          }
        })
      );
    })
  );
});
