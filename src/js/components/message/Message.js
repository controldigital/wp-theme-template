/**
 * @module		./components/tooltip/Tooltip
 */

import { attachShadowToElement } from 'Components/shadow.js';
import { createTemplate } from './template.js';

// Create a template.
const template = createTemplate();

// The accepted values of the attributes.
const acceptedTypes = ['warning', 'info', 'error'];
const acceptedPositions = ['top', 'right', 'bottom', 'left'];

/**
 * Element to display a message with different styles.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLMessageElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['position', 'type'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create a new shadow.
		attachShadowToElement.call(this, template);

	}

	/**
	 * Gets and sets the position attribute.
	 * @property
	 */
	get position() {
		return this.getAttribute('position');
	}

	set position(value) {
		if ('string' === typeof value) {
			this.setAttribute('position', value);
		} 
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
			this.setAttribute('type', value);
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

	/**
	 * Close the message element.
	 * 
	 * @method	close
	 * @returns	{void}
	 */
	close() {
		this.remove();
	}

}