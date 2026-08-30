// Service worker de Picada.
// Objectiu únic: que la carcassa de l'app (l'HTML, el manifest i les icones)
// carregui encara que no hi hagi cobertura. Les dades de previsió (Open-Meteo)
// i les tessel·les del mapa (Esri) sempre necessiten xarxa: si no n'hi ha,
// l'app ja té el seu propi mode de demostració amb dades simulades.

const CACHE = 'picada-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Només gestionem el mateix origen (la carcassa de l'app).
  // Les crides a marine-api.open-meteo.com, api.open-meteo.com i als
  // servidors de tessel·les d'Esri es deixen anar directes a la xarxa.
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      const network = fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
