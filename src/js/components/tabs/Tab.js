/**
 * @module		./components/tabs/Tab
 */


/**
 * Tab
 * @class
 * @extends	HTMLElement
 */
export default class HTMLTabElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['selected'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Set the default role attribute to tab.
		this.setAttribute('role', 'tab');
	}

	/**
	 * Gets and sets the selected attribute.
	 * @property
	 */
	get selected() {
		return this.getAttribute('selected');
	}

	set selected(value) {
		if (value === true) {
			this.setAttribute('selected', '');
		} else {
			this.removeAttribute('selected');
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

		if (attrName === 'selected') {
			if (newValue === '') {
				this.setAttribute('aria-selected', true);
				this.setAttribute('tabindex', 0);
			} else {
				this.setAttribute('aria-selected', false);
				this.setAttribute('tabindex', -1);
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
	 * Fires when the element has been adopted in a new document.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

	}

}