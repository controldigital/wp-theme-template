/**
 * @module		./components/service/Service
 */

import { attachShadowToElement } from 'Components/shadow.js';

// ID of HTML template for Shadow DOM.
const templateId = 'template-pricing-table';

/**
 * Element to display a pricing table.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLPricingTableElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['featured'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create a Shadow DOM.
		attachShadowToElement.call(this, templateId);
		
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
		
		if (attrName === 'featured') {
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