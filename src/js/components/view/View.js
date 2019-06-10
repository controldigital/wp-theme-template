/**
 * @module		./components/ajax/Ajax
 */


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

		// Bind the event listeners.
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

		if (attrName === 'url') {
			if (newValue !== null) {

				// Create a new url.
				const url = new URL(newValue);

				// Dispatch fetch start event.
				const fetchStartEvent = new CustomEvent('fetchstart', {
					detail: {
						url: url
					}
				});
				this.dispatchEvent(fetchStartEvent);

				// Set fetching attribute.
				this.fetching = true;

				// Fetch the url.
				const response = await fetch(url);

				// Check the response, dispatch done event and replace the innerHTML.
				if (response.ok && response.status === 200) {
					const textResponse = await response.text();
					const fetchDoneEvent = new CustomEvent('fetchdone', { 
						detail: {
							response: textResponse
						}
					});
					this.dispatchEvent(fetchDoneEvent);
					this.innerHTML = textResponse;
				}

				// Remove fetching attribute
				this.fetching = false;
				
			}
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
	 * Fires when the element has been adopted on a new page.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

	}

}