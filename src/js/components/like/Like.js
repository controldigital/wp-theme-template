/**
 * @module		./components/like/Like
 */

import Cookie from '../../modules/Cookie.js';

// ID of HTML template for Shadow DOM.
// const templateId = 'template-like';

/**
 * Like
 * @class
 * @extends	HTMLElement
 */
export default class HTMLLikeElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['type', 'clicked'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create a new shadowDOM layer.
		const shadow = this.attachShadow({mode: 'open'});
		
		// Create a template, add the styles and children.
		const template = document.getElementById(templateId);
		if (!template) {
			throw new Error(`
				The template with the id \"${templateId}\" has not been found.
				Please append it to the body of the DOM.
			`);
		}

		// Append the template to the shadowDOM.
		shadow.appendChild(template.content.cloneNode(true));
		
	}

	/**
	 * Gets and sets the type attribute.
	 * @property
	 */
	get type() {
		return this.getAttribute('type');
	}

	set type(value) {
		if ('string' === typeof value) {
			if (value === 'heart' || value === 'like' || value === 'favorite') {
				this.setAttribute('type', value);
			}
		} 
	}

	/**
	 * Gets and sets the name attribute.
	 * @property
	 */
	get cookieName() {
		return this.getAttribute('cookie-name');
	}

	set cookieName(value) {
		if ('string' === typeof value) {
			this.setAttribute('cookie-name', value);
		} 
	}

	/**
	 * Gets and sets the clicked attribute.
	 * @property
	 */
	get clicked() {
		return this.getAttribute('clicked');
	}

	set clicked(value) {
		if (value === true) {
			this.setAttribute('clicked', '');
		} else {
			this.removeAttribute('clicked');
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

		if (attrName === 'clicked') {
			if (newValue !== null) {
				
			}
		}

	}

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

		const name = this.cookieName;
		const cookie = Cookie.get(name);

		if (cookie) {
			const values = JSON.parse(cookie);
			if (values.indexOf(this.id) > -1) {
				this.clicked = true;
			}
		} else {
			Cookie.set(name, JSON.stringify([]), 365, '/');
		}

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

	}

	/**
	 * Fires when the element has been adopted on a new page.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

	}

}