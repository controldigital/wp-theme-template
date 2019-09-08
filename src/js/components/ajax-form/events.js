/**
 * @module		./components/form/events
 */

import { postFormData } from 'Utilities/ajax.js';

/**
 * Sends a HTTP Post request when submitting the form.
 * An input with name action has to be defined to call the correct PHP function.
 * 
 * @function	onSubmit
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onSubmit = async function onSubmit(event) {

	// Get the data from the form and send a request.
	const data = new FormData(event.target);
	const response = await postFormData(data);

	// Dispatch a response event with the returned data.
	const responseEvent = new CustomEvent('response', {
		detail: { response }
	});
	this.dispatchEvent(responseEvent);

	// Call onresponse property method.
	if ('function' === typeof this.onresponse) {
		this.onresponse(response);
	}

	// Prevent default submit.
	event.preventDefault();
};