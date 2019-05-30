/**
 * @module		./components/lazy/Lazy
 */

import { imageIsLazyLoadable } from '../../modules/tools.js';
import {
	intersectionOptions,
	onIntersect
} from './intersection.js';

/**
 * Lazy
 * @class
 * @extends	HTMLElement
 */
export default class HTMLLazyElement extends HTMLElement {

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

		// Create a new IntersectionObserver instance.
		this.observer = new IntersectionObserver(onIntersect, intersectionOptions);
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

		// Get all the images.
		const images = [...this.querySelectorAll('img')];

		// Observe only images with a data-src attribute.
		images.filter(imageIsLazyLoadable).forEach((image) => {
			this.observer.observe(image);
		});

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