/**
 * @module	./form/PostsQuery
 */

/**
 * Gets posts in text format based on the data given
 * through a FormData instance. Returns a Promise with
 * a String on resolve and Error on reject.
 * 
 * @static
 * @async
 * @method		fetch
 * @param 		{FormData} formData A FormData instance.
 * @returns		{Promise<(String|Error)>}
 */
const fetchPosts = async (formData) => {

	// Get the URL of the wp-ajax.php file
	const url = new URL(wp.ajax);

	// Get the action field.
	const action = formData.get('action');
	url.search = `action=${action}`;

	// Fetch the query.
	const response = await fetch(url, {
		method: 'POST',
		body: formData
	});

	// If response succeeds return the text.
	if (response.ok && response.status === 200) {
		const text = await response.text();
		return text;
	}

	// Output error
	throw new Error(response.status); 
};

/**
 * Submit event handler for the forms.
 * 
 * @async
 * @function	onSubmit
 * @listens 	submit
 * 
 * @param 		{Event} event The submit event
 * @returns		{void}
 */
const onSubmit = async function onSubmit(event) {
	const { target } = event;
	const formData = new FormData(target);
	const response = await fetchPosts(formData);

	// If the response is good.
	if (response) {
		const appended = await this.appendResponse(response);
		if (appended === true) {
			const updated = await this.updateForm();
			return updated;
		}
	}
	event.preventDefault();
};

/**
 * PostsQuery
 * @class
 */
export class PostsQuery extends HTMLFormElement {

	/**
	 * Attributes to trigger the 
	 * attributeChangedCallback on.
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

		this.addEventListener('submit', onSubmit.bind(this));

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		this.removeEventListener('submit', onSubmit.bind(this));

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