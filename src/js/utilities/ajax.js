/**
 * @module		./utilities/ajax
 */

/**
 * Fetches posts based on a FormData instance containing the parameters
 * for retrieving the posts of choice from the admin-ajax.php template.
 * 
 * @function	postFormData
 * @param 		{FormData} data A FormData instance with data for the request.
 * @param 		{string} [resource = wp.ajax] The URL to fetch from.
 * @returns		{Promise} Returns a promise with a string on resolve.
 */
export const postFormData = async (data, resource = wp.ajax) => {

	// Stop the function if no FormData instance is given.
	if (typeof data === 'undefined' || !(data instanceof FormData)) {
		return false;
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
	if (response.status === 200 && response.ok === true) {
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
 * @param 		{String} resource The URL to fetch from.
 * @returns		{Promise} Returns a promise with JSON.
 */
export const postJson = (data = {}, resource = wp.ajax) => {

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
	if (response.status === 200 && response.ok === true) {
		const json = await response.json();
		return json;
	}

	// Return the error.
	const error = new Error(response.statusText);
	error.response = response;
	throw error;

};