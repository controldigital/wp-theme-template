/**
 * @module		./components/lazy/Lazy
 */

import { imageIsLazyLoadable } from 'Modules/tools.js';
import {
	intersectionOptions,
	onIntersect
} from './intersection.js';
import { createOptions } from './options.js';


/**
 * Element that lazy loads all the images that exist within itself.
 * Checks if the images have a data-src attribute and load it when
 * the element comes within the margin of the root element (See IntersectionObserver).
 * 
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
		return ['root', 'root-margin', 'threshold'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Bind the instance to the intersection function.
		this.onIntersect = onIntersect.bind(this);
		
	}

	/**
	 * Gets and sets the root attribute.
	 * @property
	 */
	get root() {
		return this.getAttribute('root');
	}

	set root(value) {
		if ('string' === typeof value) {
			this.setAttribute('root', value);
		} 
	}

	/**
	 * Gets and sets the root-margin attribute.
	 * @property
	 */
	get rootMargin() {
		return this.getAttribute('root-margin');
	}

	set rootMargin(value) {
		if ('string' === typeof value) {
			this.setAttribute('root-margin', value);
		} 
	}

	/**
	 * Gets and sets the threshold attribute.
	 * @property
	 */
	get threshold() {
		const attr = this.getAttribute('threshold');
		if (attr === null) {
			return attr;
		}
		return attr.split(',').map(item => parseInt(item));
	}

	set threshold(value) {
		if (value instanceof Array) {
			this.setAttribute('threshold', value.join(','));
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

		// Rewrite and create 
		if (attrName === 'root' || attrName === 'root-margin' || attrName === 'threshold' ) {

			this.createObserver();
			this.observeImages();
				
		}

	}

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

		this.createObserver();
		this.observeImages();

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
	 * Creates options form the attributes and default options
	 * and creates a new instance of an IntersectionObserver.
	 * 
	 * @method	createObserver
	 * @returns	{void}
	 */
	createObserver() {

		// Check for options.
		const options = createOptions.call(this);

		// Overwrite the intersection options.
		Object.assign(intersectionOptions, options);

		// Create a new IntersectionObserver instance.
		this.observer = new IntersectionObserver(this.onIntersect, intersectionOptions);

	}

	/**
	 * Queries all the <img> tags within the <ctrl-lazy> element
	 * and adds them to the IntersectionObserver.
	 * 
	 * @method	observeImages
	 * @returns	{void}
	 */
	observeImages() {

		// Get all the images.
		const images = [...this.querySelectorAll('img')];

		// Observe only images with a data-src attribute.
		images.filter(imageIsLazyLoadable).forEach((image) => this.observer.observe(image));

	}

}