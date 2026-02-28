// The name of your cache. Update the 'v1' if you make major changes to your code later!
const CACHE_NAME = 'blurple-cache-v1';

// The files we want to save offline
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

// Install Event - Caches your files when the user first visits
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event - Serves the cached files when the user is offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the file is in the cache, return it! Otherwise, fetch it from the internet.
        return response || fetch(event.request);
      })
  );
});
