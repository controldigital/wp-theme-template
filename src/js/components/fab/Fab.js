/**
 * @module		./components/fab/Fab
 */

import { attachShadowToElement } from '../shadow.js';
import {
	onMouseEnter,
	onMouseLeave,
	onClick
} from './events.js';

// ID of HTML template for Shadow DOM.
const templateId = 'template-fab';

/**
 * Element that resembles a "floating action button". This element
 * will stay in the field of view to give the user additional navigation
 * or interaction options.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLFabElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['disable-hover', 'icon', 'position'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		attachShadowToElement.call(this, templateId);

		// Bind the events.
		this.onMouseEnter = onMouseEnter.bind(this);
		this.onMouseLeave = onMouseLeave.bind(this);
		this.onClick = onClick.bind(this);
		
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
	 * Gets and sets the disable-hover attribute.
	 * @property
	 */
	get disableHover() {
		return this.getAttribute('disable-hover');
	}

	set disableHover(value) {
		if (value === true) {
			this.setAttribute('disable-hover', '');
		} else {
			this.removeAttribute('disable-hover');
		}
	}
	
	/**
	 * Gets and sets the open attribute.
	 * @property
	 */
	get open() {
		return this.getAttribute('open');
	}

	set open(value) {
		if (value === true) {
			this.setAttribute('open', '');
		} else {
			this.removeAttribute('open');
		}
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
			if (value === 'top-right' || value === 'top-left' || value === 'bottom-right' || value === 'bottom-left') {
				this.setAttribute('position', value);
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

		if (attrName === 'disable-hover') {
			if (newValue !== null) {
				this.removeEventListener('mouseenter', this.onMouseEnter);
				this.removeEventListener('mouseleave', this.onMouseLeave);
				this.addEventListener('click', this.onClick);
			} else {
				this.addEventListener('mouseenter', this.onMouseEnter);
				this.addEventListener('mouseleave', this.onMouseLeave);
				this.removeEventListener('click', this.onClick);
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

		if (this.disableHover !== null) {
			this.addEventListener('click', this.onClick);
		} else {
			this.addEventListener('mouseenter', this.onMouseEnter);
			this.addEventListener('mouseleave', this.onMouseLeave);
		}

		// Set default axis.
		if (this.axis === null) {
			this.axis = 'vertical';
		}

		// Set default position.
		if (this.position === null) {
			this.position = 'bottom-right';
		}

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		// Remove the event listeners.
		this.removeEventListener('mouseenter', this.onMouseEnter);
		this.removeEventListener('mouseleave', this.onMouseLeave);
		this.removeEventListener('click', this.onClick);

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