
// Service Worker file to manage caching and offline access
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('proy-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/uv/client.js',
        '/public/index.html',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
    