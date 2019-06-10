/**
 * @module		./components/view/fetch
 */

/**
 * Get the data from the URL and replace it
 * in the element.
 * 
 * @async
 * @function	fetchUrlAndReplaceInnerHTML
 * @param 		{string} url
 * @returns		{string} The string that replaced the innerHTML.
 */
export const fetchUrlAndReplaceInnerHTML = async function fetchUrlAndReplaceInnerHTML(url) {

	// Create a new url.
	const url = new URL(newValue);

	// Dispatch fetch start event.
	const fetchStartEvent = new CustomEvent('fetchstart', {
		detail: {
			url: url
		}
	});
	this.dispatchEvent(fetchStartEvent);

	// Set fetching attribute.
	this.fetching = true;

	// Fetch the url.
	const response = await fetch(url);

	// Check the response, dispatch done event and replace the innerHTML.
	if (!response.ok || response.status !== 200) {
		throw new Error(`Fetch request has failed: ${response.status}`);
	}

	// Get the text response and 
	const textResponse = await response.text();
	const fetchDoneEvent = new CustomEvent('fetchdone', { 
		detail: {
			response: textResponse
		}
	});
	this.dispatchEvent(fetchDoneEvent);
	this.innerHTML = textResponse;

	// Remove fetching attribute
	this.fetching = false;

	// Return the text response.
	return textResponse;

};