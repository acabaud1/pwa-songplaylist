let cacheName = "cache-v1";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
      .register("service-worker.js")
      .then((registration) => console.log(registration))
      .catch((error) => console.error("SW error : " + error));
}

self.addEventListener("install", function (event) {
  event.waitUntil(
      caches.open(cacheName).then(function (cache) {
        return cache.addAll([
          "/",
          "/bundle.js",
          "/style.css",
          "/images/icon.png",
          "/images/news.svg",
        ]);
      })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
  );
});