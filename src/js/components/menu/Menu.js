/**
 * @module		./components/menu/Menu
 */

/**
 * Menu panel element that has the ability to open and close.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLMenuElement extends HTMLElement {

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
		} else if (value === false) {
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
                const event = new Event('open');
                this.dispatchEvent(event);
                this.setAttribute('aria-expanded', true);
            } else {
                const event = new Event('close');
                this.dispatchEvent(event);
                this.setAttribute('aria-expanded', false);
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

        if (this.open === null) {
			this.setAttribute('aria-expanded', false);
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
	 * Fires when the element has been adopted on a new page.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

	}

	/**
	 * Toggles between the open and closed states.
	 * 
	 * @method	toggle
	 * @returns	{this}
	 */
	toggle() {

		if (this.open === null) {
			this.open = true;
		} else {
			this.open = false;
		}
		return this;

	}

}