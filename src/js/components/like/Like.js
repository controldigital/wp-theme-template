/**
 * @module		./components/like/Like
 */

import { attachShadowToElement } from 'Components/shadow.js';
import { createTemplate } from './template.js';
import { onClick } from './events.js';
import { checkLocalStorageForId } from './storage.js';
import { renderSVGIcon } from './svg.js';

// Template for Shadow DOM.
const template = createTemplate();

// The accepted values of  the type attribute.
const acceptedTypes = ['thumb', 'heart', 'star'];

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
		return ['type', 'value'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		attachShadowToElement.call(this, template);

		// Bind the event listener.
		this.onClick = onClick.bind(this);
		
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
	 * Gets and sets the value attribute.
	 * @property
	 */
	get value() {
		return this.getAttribute('value');
	}

	set value(value) {
		if ('string' === typeof value) {
			this.setAttribute('value', value);
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

		if (attrName === 'type') {
			if (newValue !== null) {

				if (acceptedTypes.some(type => type === newValue)) {
					const icon = renderSVGIcon(newValue);
					const container = this.shadowRoot.querySelector('icon');
					container.innerHTML = icon;
				}

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

		// Set default type.
		if (this.type === null) {
			this.type = 'like';
		}

		// Check if the id is in the storage.
		const hasId = checkLocalStorageForId(this.name, this.id);
		if (hasId) {
			this.clicked = true;
		}

		// Add event listeners.
		this.addEventListener('click', this.onClick);

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		// Remove event listeners.
		this.removeEventListener('click', this.onClick);

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