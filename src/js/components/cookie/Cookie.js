/**
 * @module		./components/cookie/Cookie
 */

import { attachShadowToElement } from '../shadow.js';
import { onSubmit } from './events.js';

// ID of HTML template for Shadow DOM.
const templateId = 'template-cookie';

/**
 * Cookie
 * @class
 * @extends	HTMLElement
 */
export default class HTMLCookieElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['name'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		attachShadowToElement.call(this, templateId);

		// Set the default role attribute, tab-index and  to modal.
		this.setAttribute('role', 'dialog');
		this.setAttribute('aria-modal', true);
		this.setAttribute('aria-label', 'cookie consent');
		this.tabIndex = '-1';

		// Bind the events.
		this.onSubmit = onSubmit.bind(this);

		// The cookie form.
		this.form = this.querySelector('form');

	}

	/**
	 * Gets and sets the name attribute.
	 * @property
	 */
	get name() {
		return this.getAttribute('name');
	}

	set name(value) {
		if ('string' === typeof value) {
			this.setAttribute('name', value);
		} 
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

		// Listen to the events.
		this.form.addEventListener('submit', this.onSubmit);

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		// Remove the event listeners.
		this.form.removeEventListener('submit', this.onSubmit);

	}

	/**
	 * Fires when the element has been adopted on a new page.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

	}

	/**
	 * Removes this element from the DOM.
	 * 
	 * @method	destroy
	 * @returns	{void}
	 */
	destroy() {
		
		this.parentElement.removeChild(this);
		
	}

}