/**
 * @module		./components/toggle/Toggle
 */

import { attachShadowToElement } from 'Components/shadow.js';
import { createTemplate } from './template.js';
import { onSlotChange } from './events.js';

// Create a new template.
const template = createTemplate();

// Set the accepted states.
const acceptedStates = ['on', 'off'];

/**
 * Function that checks if the value given
 * is in the acceptedStates array.
 * 
 * @function 	isAcceptedState
 * @param 		{String} value 
 * @returns		{Boolean}
 */
const isAcceptedState = (value) => acceptedStates.some((state) => value === state);

/**
 * A stylized checkbox element that acts as a toggle.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLtoggleElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['state'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		attachShadowToElement.call(this, template);

		// Select the slot.
		this.slot = shadow.querySelector('slot[name="input"]');

		// Bind the events.
		this.onSlotChange = onSlotChange.bind(this);
		
	}

	/**
	 * Gets and sets the state attribute.
	 * @property
	 */
	get state() {
		return this.getAttribute('state');
	}

	set state(value) {
		if ('string' === typeof value) {
			this.setAttribute('state', value);
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

		// Get the input element
		const input = this.querySelector('input[type="checkbox"]');
		if (!input) {
			return;
		}

		switch(attrName) {
			case 'state':
				if (isAcceptedState(newValue)) {
					if (newValue === 'on') {
						input.checked = true;
					} else {
						input.checked = false;
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

		// Add the event listeners.
		this.slot.addEventListener('slotchange', this.onSlotChange);

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		// Remove the event listeners.
		this.slot.removeEventListener('slotchange', this.onSlotChange);

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