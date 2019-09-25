/**
 * @module		./components/card/Card
 */

import { createTemplate } from './template.js';

// ID of HTML template for Shadow DOM.
const template = createTemplate();

/**
 * Card
 * @class
 * @extends	HTMLElement
 */
export default class HTMLCardElement extends HTMLElement {

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

		// Create the Shadow DOM.
		const shadow = this.attachShadow({mode: 'open'});
		shadow.appendChild(template.content.cloneNode(true));
		
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
	 * Fires when the element has been adopted in a new document.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

	}

}