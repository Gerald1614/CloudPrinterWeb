/* eslint-disable no-restricted-globals */

self.addEventListener('notificationclose', (event) => {
  const notification = event.notification;
});

self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const action = event.action;

  if (action === 'close') {
    notification.close();
  } if (action === 'explore') {
    clients.openWindow('http://localhost:8080');

    notification.close();
  } else {
    notification.close();
  }
});


self.addEventListener('push', (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Cloud Printer notification';
  }
  const title = 'Cloud Printer !!!';
  const options = {
    icon: '../img/icons/icon-512x512.png',
    body,
    vibrate: [100, 50, 100],
    timestamp: Date.now(),
    actions: [
      {
        action: 'explore',
        title: 'Go to new Order',
      },
      {
        action: 'close',
        title: 'Close the notification',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(title, options),
  );
});

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