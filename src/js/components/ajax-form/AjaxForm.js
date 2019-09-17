/**
 * @module		./components/form/Form
 */

import { attachShadowToElement } from 'Components/shadow.js';
import EventCollection from 'Utilities/events.js';
import { createFormTemplate } from './template.js';
import { 
	onSubmit,
	onSlotChange
} from './events.js';

// Create a template.
const template = createFormTemplate();

/**
 * Form wrapper element that creates an HTTP Post request
 * on the submission of the form inside. Response can be
 * caught by adding a 'response' listener to the ajax-form element.
 *
 * @class
 * @extends	HTMLElement
 * 
 * @example
 * const ajaxForm = document.querySelector('ajax-form');
 * ajaxForm.addEventListener('response', ({ detail }) => {
 *     console.log(detail.response);
 * });
 */
export default class HTMLAJAXFormElement extends HTMLElement {

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Attach Shadow DOM.
		const shadow = attachShadowToElement.call(this, template);

		// Create event property.
		this.onresponse = null;

		// Bind events to instance.
		this.events = new EventCollection();
		this.events.set(this, 'submit', onSubmit.bind(this));

		// Get slot and listen for change.
		const slot = shadow.querySelector('slot');
		slot.addEventListener('slotchange', onSlotChange.bind(this));

	}

}