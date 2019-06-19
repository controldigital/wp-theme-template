/**
 * @module		./components/ajax/Ajax
 */

import { attachShadowToElement } from 'Components/shadow.js';
import { fetchURL } from './fetch.js';
import {
	onFetchStart,
	onFetchDone,
	onPopState
} from './events.js';

// ID of HTML template for Shadow DOM.
const templateId = 'template-view';

/**
 * Element that fetches and inserts variable content based
 * on the given url in the attribute. Can be used to have
 * dynamic content when needed.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLViewElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['url'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		attachShadowToElement.call(this, templateId);

		// Bind the event listeners.
		this.onFetchStart = onFetchStart.bind(this);
		this.onFetchDone = onFetchDone.bind(this);
		this.onPopState = onPopState.bind(this);

	}

	/**
	 * Gets and sets the fetching attribute.
	 * @property
	 */
	get fetching() {
		return this.getAttribute('fetching');
	}

	set fetching(value) {
		if (value === true) {
			this.setAttribute('fetching', '');
		} else {
			this.removeAttribute('fetching');
		}
	}

	/**
	 * Gets and sets the transition attribute.
	 * @property
	 */
	get transition() {
		return parseInt(this.getAttribute('transition'));
	}

	set transition(value) {
		if ('number' === typeof value) {
			this.setAttribute('transition', value);
		} 
	}

	/**
	 * Gets and sets the url attribute.
	 * @property
	 */
	get url() {
		return this.getAttribute('url');
	}

	set url(value) {
		if ('string' === typeof value) {
			this.setAttribute('url', value);
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
	async attributeChangedCallback(attrName, oldValue, newValue) {

		switch(attrName) {
			case 'url':
				if (!!newValue === false) {
					await this.load(newValue);
				}
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

		// Set transition if it isn't set yet.
		if (!!this.transition === false) {
			this.transition = 0;
		}

		// Add event listeners.
		this.addEventListener('fetchstart', this.onFetchStart);
		this.addEventListener('fetchdone', this.onFetchDone);
		this.addEventListener('popstate', this.onPopState);

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		// Remove event listeners.
		this.removeEventListener('fetchstart', this.onFetchStart);
		this.removeEventListener('fetchdone', this.onFetchDone);
		this.removeEventListener('popstate', this.onPopState);

	}

	/**
	 * Fires when the element has been adopted on a new page.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

	}

	async load(resource) {

		// Dispatch fetch start event.
		const fetchStartInit = {
			detail: {
				resource
			}
		};
		const fetchStartEvent = new CustomEvent('fetchstart', fetchStartInit);
		this.dispatchEvent(fetchStartEvent);

		// Get the response.
		const response = await fetchURL.call(this, resource);

		// Dispatch fetchdone event with the url and the response.
		const fetchDoneInit = { 
			detail: {
				url,
				response
			}
		};
		const fetchDoneEvent = new CustomEvent('fetchdone', fetchDoneInit);
		this.dispatchEvent(fetchDoneEvent);

	}

}