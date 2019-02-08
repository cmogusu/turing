// eslint-disable: no-undef
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');


workbox.routing.registerRoute(
  /.*\.css/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'css-cache',
  }),
);


workbox.routing.registerRoute(
  /images\.punkapi\.com.*\.(png|jpg|jpeg|svg|gif)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'punkapi-image-cache',
  }),
);


workbox.routing.registerRoute(
  /^(?!.*images\.punkapi\.com).*\.(?:png|jpg|jpeg|svg|gif)/,
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 200,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  }),
);


workbox.routing.registerRoute(
  /https:\/\/api\.punkapi\.com\/v2\/beers.*/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'punkapi-cache',
  }),
);
