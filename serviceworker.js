/**
 * Service Worker file for offline usage and faster loading
 * 
 * @file 			serviceworker.js
 * @description 	Service Worker registration file
 * @version 		1.0
 * 
 * When an error occures saying that the scope of the 
 * service worker could not be set because of missing headers,
 * paste this in the .htaccess file.
 * 
 	<Files "serviceworker.js">
		Header Set Service-Worker-allowed "/"
	</Files>
 * 
 * This will give the .htaccess the proper access
 * to the scope of the service worker.
 */

// Name of the cache
const cacheName = 'control-cache-v1';

// Static files to cache.
const cacheURLs	= [
	'dist/css/style.css',
	'dist/js/script.js',
];

/**
 * SW Install event
 * 
 * Creates a cache directory
 * and stores the links in the cacheURLs array
 * 
 * @listens install
 */
self.addEventListener('install', event => {
	event.waitUntil(async function() {
		const cache = await caches.open(cacheName);
		cache.addAll(cacheURLs);
	}());
});

/**
 * SW Fetch event
 * 
 * Checks what resources are being fetched
 * and checks the cache if these are already present
 * 
 * If so they are sent to the client without having to reach the server
 * and if not they are fetched and stored into the cache.
 * 
 * @listens fetch
 */
self.addEventListener('fetch', event => {

	// Get the request of the event.
	const { request } = event;
	const url = new URL(request.url);
	const { pathname, origin } = url;

	// Look for file types.
	const regex = /\.(?:jpg|mp3|mp4)$/i;

	// If the origin of the file is the same as the site.
	if (origin === location.origin) {

		// If its match with the regex.
		const matches = pathname.match(regex);
		if (matches !== null) {

			// Bypass default event. 
			event.respondWith(async function() {

				// Check in cache if the files are already there.
				const cache = await caches.open(cacheName);
				const cachedResponse = await cache.match(event.request.url);
				
				// If it's there, return it.
				if (cachedResponse) {
					return cachedResponse;
				}

				// Otherwise fetch the file and store it in the cache.
				const response = await fetch(request);
				if (response.ok && response.status === 200) {
					const clonedResponse = response.clone();
					const stored = await cache.put(request, response);

					// If storing is succesful.
					if (stored) {
						console.log(request.url, ' stored in cache');
					}

					// Return response result.
					return clonedResponse;
				}

				// Return the error.
				throw new Error(response.status);

			}());

		}
	}
});

/**
 * SW Activate event
 * 
 * Removes all of the caches that arent whitelisted
 * 
 * @listens activate
 */
self.addEventListener('activate', (event) => {
	const cacheWhiteList = [ cacheName ];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheWhiteList.indexOf(cacheName) === -1) return caches.delete(cacheName);
				})
			);
		})
	);
});