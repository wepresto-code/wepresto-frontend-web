/* eslint-disable no-console */

const installEvent = () => {
  self.addEventListener("install", () => {
    console.log("service worker installed");
  });
};
installEvent();

const activateEvent = () => {
  self.addEventListener("activate", () => {
    console.log("service worker activated");
  });
};
activateEvent();

// update this value every time you release a new version of your PWA (major/minor changes)
/*

const cacheName = "v2";

const cacheClone = async (e) => {
  const res = await fetch(e.request);
  const resClone = res.clone();

  const cache = await caches.open(cacheName);
  await cache.put(e.request, resClone);
  return res;
};

const fetchEvent = () => {
  self.addEventListener("fetch", (e) => {
    e.respondWith(
      cacheClone(e)
        .catch(() => caches.match(e.request))
        .then((res) => res)
    );
  });
};

fetchEvent();

*/

self.addEventListener("push", (event) => {
  // console.log("Push message received: ", event);

  const data = event.data.json();

  // console.log("Push message data: ", data);

  const { notification } = data;

  const title = notification.title;
  const options = {
    ...notification,
  };

  self.registration.showNotification(title, options);

});

// Not necessary, but if you want to handle clicks on notifications
self.addEventListener("notificationclick", (event) => {
  // console.log("Notification click received: ", event);

  event.notification.close();

  const action = event.action;

  const pathname = event.notification.data?.[`${action}_link`] || event.notification.data?.link;  
  if (!pathname) return;
  const url = new URL(pathname, self.location.origin).href;

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientsArr) => {
        const hadWindowToFocus = clientsArr.some((windowClient) =>
          windowClient.url === url ? (windowClient.focus(), true) : false
        );

        if (!hadWindowToFocus)
          self.clients
            .openWindow(url)
            .then((windowClient) =>
              windowClient ? windowClient.focus() : null
            );
      })
  );
});
