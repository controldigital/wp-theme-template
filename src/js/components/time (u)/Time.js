/**
 * @module		./components/time/Time
 */

import { createTemplate } from './template.js';
import {
	createCountdown,
	createClock
} from './create.js.js';

// Template for Shadow DOM.
const template = createTemplate();

// Accepted types
const acceptedTypes = ['clock', 'countdown'];

/**
 * Element that displays a timer that counts up or down.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLTimeElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['type', 'end'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		const shadow = this.attachShadow({mode: 'open'});
		shadow.appendChild(template.content.cloneNode(true));

		// Create interval property
		this.interval = null;
		
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
	 * Gets and sets the end attribute.
	 * @property
	 */
	get end() {
		return this.getAttribute('end');
	}

	set end(value) {
		if ('string' === typeof value) {
			this.setAttribute('end', value);
		} 
	}

	/**
	 * Gets and sets the years attribute.
	 * @property
	 */
	get years() {
		return this.getAttribute('years');
	}

	set years(value) {
		if (value === true) {
			this.setAttribute('years', '');
		} else {
			this.removeAttribute('years');
		}
	}

	/**
	 * Gets and sets the months attribute.
	 * @property
	 */
	get months() {
		return this.getAttribute('months');
	}

	set months(value) {
		if (value === true) {
			this.setAttribute('months', '');
		} else {
			this.removeAttribute('months');
		}
	}

	/**
	 * Gets and sets the days attribute.
	 * @property
	 */
	get days() {
		return this.getAttribute('days');
	}

	set days(value) {
		if (value === true) {
			this.setAttribute('days', '');
		} else {
			this.removeAttribute('days');
		}
	}

	/**
	 * Gets and sets the hours attribute.
	 * @property
	 */
	get hours() {
		return this.getAttribute('hours');
	}

	set hours(value) {
		if (value === true) {
			this.setAttribute('hours', '');
		} else {
			this.removeAttribute('hours');
		}
	}

	/**
	 * Gets and sets the minutes attribute.
	 * @property
	 */
	get minutes() {
		return this.getAttribute('minutes');
	}

	set minutes(value) {
		if (value === true) {
			this.setAttribute('minutes', '');
		} else {
			this.removeAttribute('minutes');
		}
	}

	/**
	 * Gets and sets the seconds attribute.
	 * @property
	 */
	get seconds() {
		return this.getAttribute('seconds');
	}

	set seconds(value) {
		if (value === true) {
			this.setAttribute('seconds', '');
		} else {
			this.removeAttribute('seconds');
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

		switch(attrName) {
			case 'type':
				if (newValue !== null && acceptedTypes.some(type => type === newValue)) {
					if (newValue === 'clock') {
						createClock.call(this);
					} else if (newValue === 'countdown') {
						createCountdown.call(this, this.to);
					}
				}
				break;
			case 'end':
				if (newValue !== null && this.type === 'countdown') {
					createCountdown.call(this, this.end);
				}
				break;
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
	 * Fires when the element has been adopted in a new document.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

	}

}