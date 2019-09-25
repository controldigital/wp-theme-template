/**
 * @module		./utilities/ajax
 */

import Cache from 'Utilities/cache.js';
import { 
	keysOfObjectToSnakeCase,
	serializeObject
} from 'Utilities/tools.js';

// Create a new cache instance.
const cache = new Cache();

/**
 * Checks if a response object has the status of 200 and an OK respone.
 * Returns a boolean.
 * 
 * @function	isResponseOk
 * @param 		{Response} response 
 * @returns		{boolean}
 */
export const isResponseOk = response => response.status === 200 && response.ok === true;

/**
 * Fetches posts from the get_posts_ajax function in the ajax.php file.
 * Arguments available can be seen in the get_posts_ajax function.
 * Returns a Promise when a request is successful.
 * 
 * @function	getPosts
 * @param 		{Object} args A FormData instance with data for the request.
 * @param 		{string} [action='get_posts_ajax'] The function to fire in the admin-ajax file.
 * @param 		{string} [resource=wp.ajax] The URL to fetch from.
 * @returns		{Promise} Returns a promise with a string on resolve.
 * @example
 * getPosts({
 *    postType: ['post', 'page'],
 *    postStatus: 'publish',
 *    postsPerPage: -1,
 *    orderby: 'menu_order',
 *    order: 'ASC'
 * }).then(posts => {
 *    // Do something with posts.
 * })
 */
export const getPosts = async (args = {}, action = 'get_posts_ajax', resource = wp.ajax) => {

	// Check if args parameter is an object.
	if ('object' !== typeof args) {
		throw new Error('Args not set or not an object');
	}

	// Set the action property.
	args.action = action;

	// Create endpoint with arguments for request.
	const snakeArgs = keysOfObjectToSnakeCase(args);
	const query = serializeObject(snakeArgs);
	const url = new URL(resource);
	url.search = query;

	// Check if the query has already been fetched before.
	if (cache.has(query)) {
		return cache.get(query);
	}

	// Fetch the request.
	const response = await fetch(url);

	// If response succeeds return the html.
	if (isResponseOk(response)) {
		const clonedResponse = response.clone();
		const html = await response.text();
		cache.set(query, clonedResponse);
		return html;
	}

	// Return the error.
	const error = new Error(response.statusText);
	error.response = response;
	throw error;

};

/**
 * Fetches posts based on a FormData instance containing the parameters
 * for retrieving the posts of choice from the admin-ajax.php template.
 * 
 * @function	postFormData
 * @param 		{FormData} data A FormData instance with data for the request.
 * @param 		{string} [resource=wp.ajax] The URL to fetch from.
 * @returns		{Promise} Returns a promise with a string on resolve.
 */
export const postFormData = async (data, resource = wp.ajax) => {

	// Stop the function if no FormData instance is given.
	if (typeof data === 'undefined' || !(data instanceof FormData)) {
		throw new Error('data parameter is not an instance of FormData');
	}

	// Create a new URL instance.
	const url = new URL(resource);
	const action = data.get('action');
	url.search = `action=${action}`;

	// Set the body to the options.
	const options = {
		method: 'POST',
		body: data
	};

	// Fetch the request.
	const response = await fetch(url, options);

	// If response succeeds return the html.
	if (isResponseOk(response)) {
		const html = await response.text();
		return html;
	}

	// Return the error.
	const error = new Error(response.statusText);
	error.response = response;
	throw error;

};

/**
 * HTTP POST Request for sending json using the Fetch API.
 * 
 * @function	postJson
 * @param		{Object[]} data Object with data to send.
 * @param 		{String} [resource=wp.ajax] The URL to fetch from.
 * @returns		{Promise} Returns a promise with JSON.
 */
export const postJson = async (data = {}, resource = wp.ajax) => {

	// Add nonce security property to data
	data = Object.assign(data, {
		action: 'post_json_ajax',
		security: wp.nonce
	});

	// Create URL to get the markers from
	const url = new URL(resource);

	// Set the content-type for the header.
	const headers = new Headers({
		'Content-Type': 'application/json'
	});

	// Set options of request object
	const options = {
		method: 'POST',
		headers: headers,
		mode: 'cors',
		cache: 'default',
		body: JSON.stringify(data)
	};

	// Fetch the request.
	const response = await fetch(url, options);

	// If response succeeds return the json.
	if (isResponseOk(response)) {
		const json = await response.json();
		return json;
	}

	// Return the error.
	const error = new Error(response.statusText);
	error.response = response;
	throw error;

};