const version = "0.0.4" //Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
const imageVersion = "0.0.1"

// Version images and code separately again
const appCacheFiles = [
  ],
// The name of the Cache Storage
  appCache = `sweeplcom-cache-${version}`,
  awsImageCache = `sweeplcom-image-cache-${imageVersion}`

async function deleteAllCaches() {
  const cacheNames = await caches.keys();
  const deletePromises = cacheNames.map(name => caches.delete(name));
  return Promise.all(deletePromises);
}

function clearAllData() {
  // Clear cookies
  window.document.cookie.split(";").forEach((c) => {
    window.document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });

  // Clear session storage
  sessionStorage.clear();
}

/**
 * The installation event is fired when the service worker
 * is installed.
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 */
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(appCache).then(function (cache) {
      // console.log("CACHING", cache)
      return cache.addAll(appCacheFiles);
    })
  );
})


const cacheClone = async (e) => {
  const res = await fetch(e.request);
  const resClone = res.clone();

  const cache = await caches.open(appCache);
  await cache.put(e.request, resClone);
  return res;
};

/**
 * The activate vent is fired when the  service worker is activated
 * and added to the home screen.
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 */
self.addEventListener('activate', (event) => {
  clients.claim();
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete previous versions of appCache
          if (cacheName.startsWith('sweeplcom-cache-') && cacheName !== appCache) {
            return caches.delete(cacheName);
          }
          if (cacheName.startsWith('sweeplcom-image-cache-') && cacheName !== awsImageCache) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});

async function prefetchImages(imageUrls) {
  const cache = await caches.open(awsImageCache);
  // Fetch and cache each image URL
  const cachePromises = imageUrls.map(async (url) => {
    const response = await fetch(url);
    return cache.put(url, response);
  });
  return Promise.all(cachePromises);
}

self.addEventListener('message', (event) => {
  if (event.data.type === 'CACHE_IMAGES') {
    prefetchImages(event.data.payload).then(() => {
      // console.log('All images prefetched and cached.');
    });
  }
});

self.addEventListener('fetch', (event) => {
  // console.log("FETCH", event.request.url, event.request.method)
  const url = new URL(event.request.url);

  if (url.pathname === '/worker.js') {
    // Try to fetch the updated worker.js from network
    event.respondWith(
      fetch(event.request).catch(() => {
        // If it fails, fallback to the cached worker.js
        return caches.match(event.request);
      })
    );
    return;
  }
  if (event.request.method === 'PUT') {
    return;
  }
  if (url.pathname === '/graphql') {
    return
  }
  // Check if the request is for an image
  if (url.pathname === '/_next/image') {
    // console.log("NEXT_IMG", url.searchParams.get('url'))
    const imageURI = url.searchParams.get('url')?.replace(/\?.*/, '')
    event.respondWith(
      caches.match(imageURI).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          caches.open(awsImageCache).then((cache) => {
            // Store the image using the pathname as the key, ignoring the query string
            cache.put(imageURI, networkResponse.clone()).then(() => {
              // console.log('cached image', imageURI)
            })
          });
          return networkResponse.clone();
        });
      })
    );
  } else if (url.searchParams.get('url') && (url.pathname.endsWith('.webp') || url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.jpeg') || url.pathname.endsWith('.gif'))) {
    // console.log('HAS_URL', url.searchParams.get('url'))
    const imageURI = url.searchParams.get('url')?.replace(/\?.*/, '')
    event.respondWith(
      caches.match(imageURI)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fetch and cache the image if it's not in the cache
          return fetch(event.request).then((networkResponse) => {
            caches.open(awsImageCache).then((cache) => {
              cache.put(imageURI, networkResponse.clone()).then(() => {
                // console.log('cached image', imageURI)
              })
            });
            return networkResponse.clone();
          });
        })
    );
  } else if (url.host === "sweeplcomassets.s3.us-west-2.amazonaws.com") {
    // console.log("HOST_MATCHES", url.host)
    const pathname = url.pathname
    event.respondWith(
      caches.match(pathname)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fetch and cache the image if it's not in the cache
          return fetch(event.request).then((networkResponse) => {
            caches.open(awsImageCache).then((cache) => {
              cache.put(pathname, networkResponse.clone()).then(() => {
                // console.log('cached image', imageURI)
              })
            });
            return networkResponse.clone();
          });
        })
    );
  } else {
    let cacheKey = event.request;
    if (url.pathname.endsWith('.js')) {
      cacheKey = new Request(url.origin + url.pathname);
    }
    event.respondWith(
      caches.match(cacheKey).then(function (resp) { // Use cacheKey instead of event.request
        return resp || fetch(event.request).then(function (response) {
          return caches.open(appCache).then(function (cache) {
            if (event.request.method === 'GET') {
              cache.put(cacheKey, response.clone()); // Use cacheKey instead of event.request
            }
            return response.clone();
          });
        });
      })
    );
  }
});

/**
 * Listen for incoming Push events
 */
self.addEventListener('push', (event) => {
  // console.log('[Service Worker] Push Received.');
  // console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  if (!(self.Notification && self.Notification.permission === 'granted'))
    return;

  let data = {};
  if (event.data)
    data = event.data.json();

  let title = data.title || "Web Push Notification";
  let message = data.message || "New Push Notification Received";
  let icon = "https://sweeplcomassets.s3.us-west-2.amazonaws.com/public/images/optimized/sweepl_logo_250px.webp";
  let badge = "https://sweeplcomassets.s3.us-west-2.amazonaws.com/public/images/optimized/sweeple_logo_horizontal_250px.webp";
  let options = {
    body: message,
    icon: icon,
    badge: badge
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

/**
 * Handle a notification click
 */
self.addEventListener('notificationclick', (event) => {
  // console.log('[Service Worker] Notification click: ', event);
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://sweepl.com')
  );
});