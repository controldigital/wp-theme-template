/**
 * @module		./components/time/Time
 */

import * as moment from 'moment';
import { attachShadowToElement } from 'Components/shadow.js';
import {
	createCountdown,
	createClock
} from './create.js';

// ID of HTML template for Shadow DOM.
const templateId = 'template-time';

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
		return ['type', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'from', 'to'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		attachShadowToElement.call(this, templateId);
		
	}

	/**
	 * Gets and sets the from attribute.
	 * @property
	 */
	get from() {
		return this.getAttribute('from');
	}

	set from(value) {
		if ('string' === typeof value) {
			this.setAttribute('from', value);
		} 
	}

	/**
	 * Gets and sets the to attribute.
	 * @property
	 */
	get to() {
		return this.getAttribute('to');
	}

	set to(value) {
		if ('string' === typeof value) {
			this.setAttribute('to', value);
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

		if (attrName === 'type') {
			if (newValue !== null && acceptedTypes.some(type => type === newValue)) {
				if (newValue === 'clock') {

				} else if (newValue === 'countdown') {

				}
			}
		} else if (attrName === 'from' || attrName === 'to') {
			if (newValue !== null && this.type === 'countdown') {

				createCountdown.call(this, this.to);

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