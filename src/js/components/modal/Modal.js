/**
 * @module		./components/modal/Modal
 */

import { attachShadowToElement } from 'Components/shadow.js';
import EventsCollection from 'Utilities/events.js';
import { createTemplate } from './template.js';
import { 
	onClick,
	onKeyDown,
} from './events';

// ID of HTML template for Shadow DOM.
const template = createTemplate();

/**
 * Modal
 * @class
 * @extends	HTMLElement
 */
export default class HTMLModalElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['open'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		attachShadowToElement.call(this, template);

		// Bind the event handlers.
		this.events = new EventsCollection();
		this.events.set(this, 'click', onClick.bind(this))
		this.events.set(this, 'keydown', onKeyDown.bind(this))

		this.focussedBeforeOpenElement = null;

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
	 * Gets and sets the use-focus attribute.
	 * @property
	 */
	get useFocus() {
		return this.getAttribute('use-focus');
	}

	set useFocus(value) {
		if (value === true) {
			this.setAttribute('use-focus', '');
		} else {
			this.removeAttribute('use-focus');
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
			case 'open':

				if (newValue !== null) {

					// Dispatch open event.
					const openEvent = new Event('open');
					this.dispatchEvent(openEvent);
	
					// Use focus feature
					if (this.useFocus) {
	
						// Get the focusable elements.
						const focusable = this.querySelectorAll('button, [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])');
	
						// Focus the first element.
						if (focusable.length) {
							focusable[0].focus();
						}
	
					}
						
				} else {
	
					// Dispatch close event.
					const openEvent = new Event('close');
					this.dispatchEvent(openEvent);
	
					// Use focus feature
					if (this.useFocus) {
	
						// Focus the last focussed element before opening the modal.
						this.focussedBeforeOpenElement.focus();
	
					}
	
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

		// Set the default role attribute, tab-index and  to modal.
		this.setAttribute('role', 'dialog');
		this.setAttribute('aria-modal', true);
		this.tabIndex = '-1';

		// Get the last focussed element.
		this.focussedBeforeOpenElement = document.activeElement;

		// Listen to the events.
		this.events.add();

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		// Remove the event listeners.
		this.events.remove();

		// Focus the last focussed element before opening the modal.
		if (this.focussedBeforeOpenElement !== null) {
			this.focussedBeforeOpenElement.focus();
		}

	}

	/**
	 * Fires when the element has been adopted in a new document.
	 * 
	 * @method	adoptedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

		this.disconnectedCallback();
		this.connectedCallback();

	}

	/**
	 * Removes this element from the DOM.
	 * 
	 * @method	destroy
	 * @returns	{void}
	 */
	destroy() {
		this.open = false;
		setTimeout(() => {
			this.remove();
		}, 350);
	}

}