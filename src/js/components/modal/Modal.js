/**
 * @module		./components/modal/Modal
 */

import { 
	onClick,
	onKeyDown,
	onLabelSlotChange,
	onDescriptionSlotChange
} from './events';

// ID of HTML template for Shadow DOM.
const templateId = 'template-modal';

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

		// Create a new shadowDOM layer.
		const shadow = this.attachShadow({mode: 'open'});
		
		// Create a template, add the styles and children.
		const template = document.getElementById(templateId);
		if (!template) {
			throw new Error(`
				The template with the id \"${templateId}\" has not been found.
				Please append it to the body of the DOM.
			`);
		}

		// Append the template to the shadowDOM.
		shadow.appendChild(template.content.cloneNode(true));

		// Set the default role attribute, tab-index and  to modal.
		this.setAttribute('role', 'dialog');
		this.setAttribute('aria-modal', true);
		this.tabIndex = '-1';

		// Get the last focussed element.
		this.focussedBeforeOpenElement = document.activeElement;

		// Bind the event handlers.
		this.onClick = onClick.bind(this);
		this.onKeyDown = onKeyDown.bind(this);
		this.onLabelSlotChange = onLabelSlotChange.bind(this);
		this.onDescriptionSlotChange = onDescriptionSlotChange.bind(this);

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
	 * Fires when an attribute has been changed.
	 * 
	 * @method	attributeChangedCallback
	 * @param 	{String} attrName Name of attribute.
	 * @param 	{*} oldValue Old value of attribute.
	 * @param 	{*} newValue New value of attribute.
	 */
	attributeChangedCallback(attrName, oldValue, newValue) {

		if (attrName === 'open') {
			if (newValue !== null) {

				// Get the focusable elements.
				const focusable = this.querySelectorAll('button, [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])');

				// Focus the first element.
				if (focusable.length) {
					focusable[0].focus();
				}
				
			} else {

				// Focus the last focussed element before opening the modal.
				this.focussedBeforeOpenElement.focus();

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

		// Get the tab an panel slot
		const label = this.shadowRoot.querySelector('slot[name=label]');
		const description = this.shadowRoot.querySelector('slot[name=description]');

		// Add event listeners for when a slot is used.
		label.addEventListener('slotchange', this.onLabelSlotChange);
		description.addEventListener('slotchange', this.onDescriptionSlotChange);

		// Listen to the events.
		this.addEventListener('click', this.onClick);
		this.addEventListener('keydown', this.onKeyDown);

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		// Remove the event listeners.
		this.removeEventListener('click', this.onClick);
		this.removeEventListener('keydown', this.onKeyDown);

		// Focus the last focussed element before opening the modal.
		this.focussedBeforeOpenElement.focus();

	}

	/**
	 * Fires when the element has been adopted on a new page.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

	}

	/**
	 * Removes this element from the DOM.
	 * 
	 * @method	destroy
	 * @returns	{void}
	 */
	destroy() {
		this.parentElement.removeChild(this);
	}

}