/**
 * @module		./components/map/Marker
 */

/**
 * Marker element for using in a HTMLMapElement element.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLMarkerElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['longitude', 'latitude'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 * Gets and sets the latitude attribute.
	 * @property
	 */
	get latitude() {
		return parseFloat(this.getAttribute('latitude'));
	}

	set latitude(value) {
		if ('number' === typeof value) {
			this.setAttribute('latitude', value);
		} else {
			this.removeAttribute('latitude');
		}
	}

	/**
	 * Gets and sets the longitude attribute.
	 * @property
	 */
	get longitude() {
		return parseFloat(this.getAttribute('longitude'));
	}

	set longitude(value) {
		if ('number' === typeof value) {
			this.setAttribute('longitude', value);
		} else {
			this.removeAttribute('longitude');
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