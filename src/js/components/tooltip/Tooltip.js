/**
 * @module		./components/tooltip/Tooltip
 */

import { attachShadowToElement } from '../shadow.js';
import { 
	onSlotChange,
	onMouseEnter,
	onMouseLeave
} from './events.js';

// The id of the tooltip template.
const templateId = 'template-tooltip';

/**
 * Element to display a tooltip with a custom message.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLTooltipElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['hidden'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create Shadow DOM
		attachShadowToElement.call(this, templateId);

		// Set the default attributes
		this.setAttribute('role', 'tooltip');
		this.setAttribute('aria-hidden', true);

		// Bind the event listeners
		this.onSlotChange = onSlotChange.bind(this);
		this.onMouseEnter = onMouseEnter.bind(this);
		this.onMouseLeave = onMouseLeave.bind(this);

		// Get the slide slot and listen for the onSlotChange event.
		const description = shadow.querySelector('slot[name=description]');
		description.addEventListener('slotchange', this.onSlotChange);

	}

	/**
	 * Gets and sets the hidden attribute.
	 * @property
	 */
	get hidden() {
		return this.getAttribute('hidden');
	}

	set hidden(value) {
		if (value === true) {
			this.setAttribute('hidden', '');
		} else {
			this.removeAttribute('hidden');
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

		if (attrName === 'hidden') {
			if (newValue !== null) {

				if (newValue === 'true') {
					this.setAttribute('aria-hidden', true);
				} else {
					this.setAttribute('aria-hidden', false);
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

		this.addEventListener('mouseenter', this.onMouseEnter);
		this.addEventListener('mouseleave', this.onMouseLeave);

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		this.removeEventListener('mouseenter', this.onMouseEnter);
		this.removeEventListener('mouseleave', this.onMouseLeave);

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