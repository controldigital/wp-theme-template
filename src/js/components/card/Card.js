/**
 * @module		./components/card/Card
 */


/**
 * Card
 * @class
 */
export class Card extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return [];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create a new shadowDOM layer.
		const shadow = this.attachShadow({mode: 'open'});
		
		// Create a template, add the styles and children.
		const template = document.getElementById('template-card');
		if (!template) {
			throw new Error(`
				The template with the id "template-card" has not been found.
				Please append it to the body of the DOM.
			`);
		}

		// Append the template to the shadowDOM.
		shadow.appendChild(template.content.cloneNode(true));
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