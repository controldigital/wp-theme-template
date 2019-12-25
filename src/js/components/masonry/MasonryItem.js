import createMasonryItemTemplate from './template.js';

// Create a template.
const template = createMasonryItemTemplate();

/**
 * Banner element that responds on the scrolling of the document.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLMasonryItemElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{string[]}
	 */
	static get observedAttributes() {
		return ['grid-row-end'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		const shadow = this.attachShadow({mode: 'open'});
		shadow.appendChild(template.content.cloneNode(true));

	}

	/**
	 * Gets the content div.
	 * @property 
	 */
	get contentElement() {
		return this.shadowRoot.querySelector('.content');
	}

	/**
	 * Gets and sets the grid-row-end attribute value.
	 * @property 
	 */
	get gridRowEnd() {
		return this.style.gridRowEnd;
	}

	set gridRowEnd(value) {
		const str = String(value);
		this.setAttribute('grid-row-end', str);
	}
	

	/**
	 * Fires when an attribute has been changed.
	 * 
	 * @method	attributeChangedCallback
	 * @param 	{string} attrName Name of attribute.
	 * @param 	{*} oldValue Old value of attribute.
	 * @param 	{*} newValue New value of attribute.
	 */
	attributeChangedCallback(attrName, oldValue, newValue) {

		switch(attrName) {
			case 'grid-row-end':
				this.style.gridRowEnd = newValue !== null ? newValue : '';
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