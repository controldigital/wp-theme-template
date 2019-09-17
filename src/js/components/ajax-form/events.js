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

/**
 * slotchange event handler.
 * 
 * @function	onSlotChange
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onSlotChange = function onSlotChange(event) {

	// Get the slot and the events
	const { target } = event;
	const elements = target.assignedElements();
	const events = this.events.getByType('submit');

	// Set the events to the assignedElements.
	events.foreach(event => elements.forEach(element => element.addEventListener('submit', event.listener)));
	
};