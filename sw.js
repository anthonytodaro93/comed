const CACHE = 'comed-pwa-v1';

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(['./','index.html','manifest.json','icon-192.png','icon-512.png']))));

self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'clearCache') {
    caches.delete(CACHE).then(() => {
      event.ports[0].postMessage({ action: 'cacheCleared' });
    });
  }
});