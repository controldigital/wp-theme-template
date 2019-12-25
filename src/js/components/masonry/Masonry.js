import EventCollection from './Utilities.events.js';
import { hasFeatures } from 'Utilities/tools.js';
import { lazyLoadAllImages } from 'Utilities/lazy.js';
import { onResize } from './events.js';
import { resizeMasonryItem } from './functions.js';

// Has resize observer.
const hasResizeObserver = hasFeatures('Resize Observer');
const hasMutationObserver = hasFeatures('Mutation Observer');

/**
 * Banner element that responds on the scrolling of the document.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLMasonryElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{string[]}
	 */
	static get observedAttributes() {
		return ['row-height', 'gap'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Bind events.
		this.events = new EventCollection()
			.set(window, 'resize', onResize.bind(this));

	}

	/**
	 * Gets and sets the row-height attribute.
	 * @property
	 */
	get rowHeight() {
		this.getAttribute('row-height');
	}

	set rowHeight(value) {
		const str = String(value);
		this.setAttribute('row-height', str);
	}

	/**
	 * Gets and sets the gap attribute.
	 * @property
	 */
	get gap() {
		getAttribute('row-height');
	}

	set gap(value) {
		const str = String(value);
		this.setAttribute('gap', str);
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
			case 'row-height':
				this.style.gridAutoRows = newValue;
				break;
			case 'gap':
				this.style.gap = newValue;
				break;
		}

		this.render();

	}

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	async connectedCallback() {

		// Select all images in this element.
		const images = this.querySelectorAll('img');

		/**
		 * Listen for changes in size.
		 * Either with a Resize Observer or a resize event on the window.
		 */
		if (hasResizeObserver) {

			const observer = new ResizeObserver(entries => {
				this.render();
			});

			observer.observe(this);

		} else {
			this.events.add();
		}

		/**
		 * Setup a Mutation Observer.
		 * Rerenders the grid when a change in elements has happened.
		 */
		if (hasMutationObserver) {

			const observer = new MutationObserver(entries => {
				this.render();
			});

			const config = {
				childList: true
			}

			observer.observe(this, config);

		}

		/**
		 * Wait for all images to load before resizing.
		 * Otherwise the layout would be rendered before the images have loaded.
		 */ 
		if (images.length > 0) {
			await lazyLoadAllImages(images);
		}
		
		this.render();

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		if (!hasResizeObserver) {
			this.events.remove();
		}

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
	 * Resizes items to fit in the grid properly.
	 * 
	 * @method  render
	 * @uses	resizeMasonryItem
	 * @returns {void}
	 */
	async render() {

		/**
		 * Resize each child.
		 */
		const children = Array.from(this.children);
		const resizes = children.map(child => resizeMasonryItem(this, child));
		try {
			await Promise.all(resizes);
		} catch(error) {
			throw error;
		}		

	}

}