/**
 * @module		./components/slider/Slide
 */

import { attachShadowToElement } from 'Components/shadow.js';
import { createSlideTemplate } from './template.js';

// Template for Shadow DOM.
const template = createSlideTemplate();

/**
 * Slider
 * @class
 * @extends	HTMLElement
 */
export default class HTMLSlideElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['active'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		attachShadowToElement.call(this, template);
	}

	/**
	 * Gets and sets the active attribute.
	 * @property
	 */
	get active() {
		return this.getAttribute('active');
	}

	set active(value) {
		if (value === true) {
			this.setAttribute('active', '');
		} else {
			this.removeAttribute('active');
		}
	}

	/**
	 * Gets and sets the focus attribute.
	 * @property
	 */
	get focus() {
		return this.getAttribute('focus');
	}

	set focus(value) {
		if (value === true) {
			this.setAttribute('focus', '');
		} else {
			this.removeAttribute('focus');
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

		// Change the aria attribute
		if (attrName === 'active') {
			let detail;
			if (newValue === '') {
				detail = { detail: false };
				this.setAttribute('aria-hidden', false);
			} else {
				detail = { detail: true };
				this.setAttribute('aria-hidden', true);
			}
			const activeChangeEvent = new CustomEvent('activechange', detail);
			this.dispatchEvent(activeChangeEvent);
		}

	}

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

		if (!this.hasAttribute('aria-hidden')) {
			this.setAttribute('aria-hidden', true);
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
	 * Fires when the element has been adopted in a new document.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

	}

}