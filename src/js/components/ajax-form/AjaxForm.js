/**
 * @module		./components/form/Form
 */

import { onSubmit } from './events.js.js';

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
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return [];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create event property.
		this.onresponse = function() {};

		// Bind events to instance.
		this.onSubmit = onSubmit.bind(this);
	}

	/**
	 * Fires when an attribute has been changed.
	 * 
	 * @method	attributeChangedCallback
	 * @param 	{String} attrName Name of attribute.
	 * @param 	{*} oldValue Old value of attribute.
	 * @param 	{*} newValue New value of attribute.
	 */
	attributeChangedCallback(attrName, oldValue, newValue) {

	}

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

		// Select the form inside this element.
		const form = this.querySelector('form');
		if (form === null) {
			return;
		}

		// Add the submit event listener to the form.
		form.addEventListener('submit', this.onSubmit);

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		// Select the form inside this element.
		const form = this.querySelector('form');
		if (form === null) {
			return;
		}

		// Remove the submit event listener from the form.
		form.removeEventListener('submit', this.onSubmit);

	}

	/**
	 * Fires when the element has been adopted in a new document.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

		this.disconnectedCallback();
		this.connectedCallback();

	}

}