/**
 * @module		./components/ajax/Ajax
 */

import { attachShadowToElement } from 'Components/shadow.js';
import { fetchURL } from './fetch.js';
import {
	createCustomEvent,
	onFetchStart,
	onFetchDone,
	onContentEnterStart,
	onContentEnterEnd,
	onContentLeaveStart,
	onContentLeaveEnd,
	onPopState
} from './events.js';

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
		const shadow = attachShadowToElement.call(this, templateId);

		// Get the container element.
		this.container = shadow.querySelector('.container');

		// Bind the event listeners.
		this.onFetchStart = onFetchStart.bind(this);
		this.onFetchDone = onFetchDone.bind(this);
		this.onContentEnterStart = onContentEnterStart.bind(this);
		this.onContentEnterEnd = onContentEnterEnd.bind(this);
		this.onContentLeaveStart = onContentLeaveStart.bind(this);
		this.onContentLeaveEnd = onContentLeaveEnd.bind(this);
		this.onPopState = onPopState.bind(this);

		// Create a list of all events and their listeners.
		this.eventListeners = [
			['fetchstart', this.onFetchStart],
			['fetchdone', this.onFetchDone],
			['contententerstart', this.onContentEnterStart],
			['contententerend', this.onContentEnterEnd],
			['contentleaverstart', this.onContentLeaveStart],
			['contentleaveend', this.onContentLeaveEnd],
			['popstate', this.onPopState]
		];

		// Set default ARIA attributes
		this.setAttribute('aria-live', 'polite');

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
	 * Gets and sets the transition-in attribute.
	 * @property
	 */
	get transitionIn() {
		return parseInt(this.getAttribute('transition-in'));
	}

	set transitionIn(value) {
		if ('number' === typeof value) {
			this.setAttribute('transition-in', value);
		} 
	}

	/**
	 * Gets and sets the transition-out attribute.
	 * @property
	 */
	get transitionOut() {
		return parseInt(this.getAttribute('transition-out'));
	}

	set transitionOut(value) {
		if ('number' === typeof value) {
			this.setAttribute('transition-out', value);
		} 
	}

	/**
	 * Gets and sets the enter attribute.
	 * @property
	 */
	get enter() {
		return parseInt(this.getAttribute('enter'));
	}

	set enter(value) {
		if (value === true) {
			this.setAttribute('enter', '');
		} else {
			this.removeAttribute('enter');
		}
	}

	/**
	 * Gets and sets the leave attribute.
	 * @property
	 */
	get leave() {
		return parseInt(this.getAttribute('leave'));
	}

	set leave(value) {
		if (value === true) {
			this.setAttribute('leave', '');
		} else {
			this.removeAttribute('leave');
		}
	}

	/**
	 * Gets and sets the use-history attribute.
	 * @property
	 */
	get useHistory() {
		return parseInt(this.getAttribute('use-history'));
	}

	set useHistory(value) {
		if (value === true) {
			this.setAttribute('use-history', '');
		} else {
			this.removeAttribute('use-history');
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

					// Set the history state.
					if (this.useHistory) {
						history.pushState({
							url: newValue
						}, '', newValue);
					}

					// Get the content and inject it.
					const content = await this.load(newValue);
					this.replaceContent(content);
					
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
		this.eventListeners.forEach(([name, handler]) => {
			this.addEventListener(name, handler);
		});

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		// Remove event listeners.
		this.eventListeners.forEach(([name, handler]) => {
			this.removeEventListener(name, handler);
		});

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
	 * Load the resource.
	 * 
	 * @async
	 * @method	load
	 * @param 	{String} resource The URL we want to get.
	 * @returns	{Promise<string>} The response in a string.
	 */
	async load(resource) {

		// Dispatch fetch start event.
		const fetchStartEvent = createCustomEvent('fetchstart', {
			resource
		});
		this.dispatchEvent(fetchStartEvent);

		// Get the response.
		const response = await fetchURL.call(this, resource);

		// Dispatch fetchdone event with the url and the response.
		const fetchDoneEvent = createCustomEvent('fetchdone', {
			resource,
			response
		});
		this.dispatchEvent(fetchDoneEvent);

		// Return the response.
		return response;

	}

	/**
	 * 
	 * @method	replaceContent
	 * @param 	{String} content
	 * @returns	{Array} 
	 */
	replaceContent(content) {

		// Get the current content.
		const currentContent = this.innerHTML;
		
		// Create the events.
		const contentLeaveStartEvent = createCustomEvent('contentleavestart', {content: currentContent});
		const contentLeaveEndEvent = createCustomEvent('contententerleave', {content: currentContent});
		const contentEnterStartEvent = createCustomEvent('contententerstart', {content: content});
		const contentEnterEndEvent = createCustomEvent('contententerend', {content: content});

		// Start dispatching.
		this.dispatchEvent(contentLeaveStartEvent);

		// After the transition out time, fire the next salvo.
		setTimeout(() => {
			this.dispatchEvent(contentLeaveEndEvent);
			this.dispatchEvent(contentEnterStartEvent);
		}, this.transitionOut);

		// After both transition out and in times combined, fire the last.
		setTimeout(() => {
			this.dispatchEvent(contentEnterEndEvent);
		}, this.transitionOut + this.transitionIn);

	}

}