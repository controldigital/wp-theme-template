/**
 * @module		./components/card/Card
 */

import { attachShadowToElement } from 'Components/shadow.js';
import { createTemplate } from './template.js';
import { onScroll } from './events.js';

// Create a template.
const template = createTemplate();

/**
 * Element that represents a scrollbar.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLScrollBarElement extends HTMLElement {

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
        
        // Add the shadow dom.
        const shadow = attachShadowToElement.call(this, template);

        // Save the bar element.
        this.bar = shadow.querySelector('.bar');

        // Bind the events to this element.
        this.onScroll = onScroll.bind(this);

	}

	/**
	 * Gets and sets the axis attribute.
	 * @property
	 */
	get axis() {
		return this.getAttribute('axis');
	}

	set axis(value) {
		if ('string' === typeof value) {
			if (value === 'horizontal' || value === 'vertical') {
				this.setAttribute('axis', value);
			}
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

		// Default axis setting.
		if (this.axis === null) {
			this.axis = 'horizontal';
		}

        // Add the event listeners.
        document.addEventListener('scroll', this.onScroll);

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

        // Remove the event listeners.
        document.removeEventListener('scroll', this.onScroll);


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