// Add any other logic here as needed.

import { CacheableResponsePlugin } from 'workbox-cacheable-response/CacheableResponsePlugin';
import { CacheFirst } from 'workbox-strategies/CacheFirst';
import { createHandlerForURL } from 'workbox-precaching/createHandlerForURL';
import { ExpirationPlugin } from 'workbox-expiration/ExpirationPlugin';
import { NavigationRoute } from 'workbox-routing/NavigationRoute';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { registerRoute } from 'workbox-routing/registerRoute';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  new NavigationRoute(createHandlerForURL('react/dist/index.html'), {
    blacklist: [/\/activate\b/]
  })
);

registerRoute(
  /^https:\/\/mylibrary\.io\/graphql\?.+cache%22:1/,
  new CacheFirst({
    cacheName: 'short-cache',
    matchOptions: {
      ignoreVary: true
    },
    plugins: [
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 300,
        purgeOnQuotaError: true,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
    ]
  }));

registerRoute(
  /^https:\/\/mylibrary\.io\/graphql\?.+cache%22:5/,
  new CacheFirst({
    cacheName: 'medium-cache',
    matchOptions: {
      ignoreVary: true,
    },
    plugins: [
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: true,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
    ],
  })
);

registerRoute(
  /^https:\/\/mylibrary\.io\/graphql\?.+cache%22:9/,
  new CacheFirst({
    cacheName: 'max-cache',
    matchOptions: {
      ignoreVary: true,
    },
    plugins: [
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 63072e3,
        purgeOnQuotaError: true,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })]
  })
);

registerRoute(/^https:\/\/s3.amazonaws.com\/my-library-cover-uploads/, new CacheFirst({
  cacheName: 'local-images1',
  matchOptions: {
    ignoreVary: true,
  },
  plugins: [new ExpirationPlugin({
    maxEntries: 500,
    maxAgeSeconds: 63072e3,
    purgeOnQuotaError: true,
  }), new CacheableResponsePlugin({
    statuses: [0, 200]
  })]
}));

registerRoute(/^https:\/\/my-library-cover-uploads.s3.amazonaws.com/, new CacheFirst({
  cacheName: 'local-images2',
  matchOptions: {
    ignoreVary: true,
  },
  plugins: [new ExpirationPlugin({
    maxEntries: 500,
    maxAgeSeconds: 63072e3,
    purgeOnQuotaError: true,
  }), new CacheableResponsePlugin({
    statuses: [0, 200]
  })]
}));

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});