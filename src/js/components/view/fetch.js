/**
 * @module		./components/view/fetch
 */

import Cache from 'Modules/Cache.js';

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
	const url = new URL(newValue);

	// Fetch the url.
	const response = await fetch(url);

	// Check the response, dispatch done event and replace the innerHTML.
	if (!response.ok || response.status !== 200) {
		throw new Error(`Fetch request has failed: ${response.status}`);
	}

	// Get the text response.
	const textResponse = await response.text();

	// Return the response.
	return textResponse;

};