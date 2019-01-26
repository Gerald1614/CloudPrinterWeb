
workbox.routing.registerRoute(
  new RegExp('https://fonts.googleapis.com/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'GoogleFont',
  }),
);

workbox.routing.registerRoute(
  new RegExp('http://localhost:8080/api/v1/orders'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'DATA-ORDERS',
  }),
);

const bgSyncPlugin = new workbox.backgroundSync.Plugin('orderSignals', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
});

workbox.routing.registerRoute(
  /\/api\/.*\/*.json/,
  workbox.strategies.networkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST',
);

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});