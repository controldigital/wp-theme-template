/**
 * @module	./utilities/query
 */

import { getElement } from './elements.js';

/**
 * FormQuery
 * 
 * @class
 */
export default class FormQuery {

	/**
	 * Create a new instance of the FormQuery.
	 * 
	 * @constructor
	 * @param 		{(String|HTMLCollection|NodeList)} forms 
	 */
	constructor(form) {

		// Get the forms.
		this.form = getElement(form);
		if (form === nul) return;

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
		const onSubmit = async (event) => {
			const { target } = event;
			const formData = new FormData(target);
			const response = await FormQuery.fetch(formData);
			if (response) {
				const appended = await this.appendResponse(response);
				if (appended === true) {
					const updated = await this.updateForm();
					return updated;
				}
			}
			event.preventDefault();
		};

		// Listen for the submit event
		this.form.addEventListener('submit', onSubmit);
	}

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
	static async fetch(formData) {

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
	 * Appends the response 
	 * 
	 * @method		appendResponse
	 * @param		{String} html The HTML string to append.
	 * @returns		{Boolean} True on succes and false on fail.
	 */
	async appendResponse(html) {
		const container = this.form.querySelector('.js-post-query-container');
		if (container !== null) {
			container.insertAdjacentHTML('beforeend', html);
			return true;
		}
		return false;
	}

	/**
	 * Updates the paged value
	 * 
	 * @method		updateForm
	 * @returns		{HTMLFormElement} The form element
	 */
	async updateForm() {
		const { paged, max_pages, submit } = this.form.elements;
		if (paged && max_pages && submit) {
			if (paged.value === max_pages.value) {
				submit.disabled = true;
			}
			paged.value = parseInt(paged.value) + 1;
		}
		return this.form; 
	}

}