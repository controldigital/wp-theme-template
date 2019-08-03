/**
 * @module		./components/lazy/Lazy
 */

import {
	intersectionOptions,
	onIntersect
} from './intersection.js';
import { createOptions } from './options.js';


/**
 * Element that lazy loads all the images, pictures and / or videos that exist within itself.
 * Uses an IntersectionObserver to see if a target comes into the view.
 * The triggers can be set manually by changing the root, root-margin and threshold properties.
 * 
 * See the docs for the IntersectionObserver on changing the properties mentioned above.
 * @link	https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
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
	}

	/**
	 * Gets and sets the targets attribute.
	 * @property
	 */
	get targets() {
		return this.getAttribute('targets').split(',');
	}

	set targets(value) {
		if (typeof value === 'string' || Array.isArray(value)) {
			this.setAttribute(value);
		}
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

			// Create an observer and observe the targets.
			this.createObserver();
			this.observeTargets(this.targets);
				
		}

	}

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

		// Add a default target.
		if (this.targets === null) {
			this.targets = ['img'];
		}

		// Create an observer and observe the targets.
		this.createObserver();
		this.observeTargets(this.targets);

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

		// Bind the instance to the intersection function.
		const boundOnIntersect = onIntersect.bind(this);

		// Create a new IntersectionObserver instance.
		this.observer = new IntersectionObserver(boundOnIntersect, intersectionOptions);

	}

	/**
	 * Queries all the elements that correspond with the targets attribute
	 * of the element and adds them to the IntersectionObserver.
	 * 
	 * @method	observeTargets
	 * @param	{string} selector Selector query for targets to select.
	 * @returns	{void}
	 */
	observeTargets(selector) {

		// Get all the targets.
		const targets = [...this.querySelectorAll(selector)];

		// Observe the target.
		targets.forEach((target) => this.observer.observe(target));

	}

}