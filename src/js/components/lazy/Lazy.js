/**
 * @module		./components/lazy/Lazy
 */

import { onIntersection } from './intersection.js';
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
		const attr = this.getAttribute('targets');
		if (attr === null) {
			return attr;
		}
		return attr.split(',');
	}

	set targets(value) {
		if ('string' === typeof value || Array.isArray(value)) {
			this.setAttribute('targets', value);
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
		return attr.split(',').map(item => parseFloat(item));
	}

	set threshold(value) {
		if (Array.isArray(value)) {
			this.setAttribute('threshold', value);
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
		switch(attrName) {
			case 'root':
			case 'root-margin':
			case 'threshold':

				// Create an observer and observe the targets.
				this.createObserver();
				this.observeTargets(this.targets);

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

		// Add a default target.
		if (this.targets === null) {
			this.targets = ['img'];
		}

		// Add a default root.
		if (this.root === null) {
			this.root = 'null';
		}

		// Add a default root margin
		if (this.rootMargin === null) {
			this.rootMargin = '0px'
		}

		// Add a default threshold
		if (this.threshold === null) {
			this.threshold = [0];
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
		const intersectionOptions = createOptions.call(this);

		// Create a new IntersectionObserver instance.
		this.observer = new IntersectionObserver(onIntersection, intersectionOptions);

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