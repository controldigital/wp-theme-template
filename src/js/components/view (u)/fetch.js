/**
 * @module		./components/view/fetch
 */

import Cache from 'Utilities/cache.js';
import { isResponseOk } from 'Utilities/ajax.js';

// Create a new cache instance.
const cache = new Cache();

/**
 * Fetches the URL and fires a fetchstart and fetchdone
 * event when starting and completing the fetch request.
 * 
 * @function	fetchURL
 * @param 		{String} resource URL to fetch.
 * @returns		{String} Response in a string.
 */
export const fetchURL = async function fetchURL(resource) {

	// Check if the resource has already been fetched before.
	if (cache.has(resource)) {
		return cache.get(resource);
	}
	
	// Create a new url.
	const url = new URL(resource);

	// Fetch the url.
	const response = await fetch(url);

	// Check the response.
	if (isResponseOk(response)) {
		const html = await response.text();
		return html;
	}
	
	// Throw error if fetch failes.
	throw new Error(`Fetch request has failed: ${response.status}`);

};