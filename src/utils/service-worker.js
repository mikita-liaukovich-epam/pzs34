const CACHE_NAME = 'aip-cache-v1';
const PRE_CACHED_ASSETS = [
  '/app​.js',
  '/style.css',
  '/index.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        let cachePromises = PRE_CACHED_ASSETS.map((asset) => {
          const url = new URL(asset, location.href);
          const request = new Request(url);

          return fetch(request).then((response) => {
            return cache.put(asset, response);
          });
        });

        return Promise.all(cachePromises);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }),
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.headers.get('accept').startsWith('text/html')) {
    event.respondWith(
      fetch(event.request).catch((error) => {
        return caches.match('index.html');
      }),
    );
  }
});