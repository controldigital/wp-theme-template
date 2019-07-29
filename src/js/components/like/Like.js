/**
 * @module		./components/like/Like
 */

import { attachShadowToElement } from 'Components/shadow.js';
import { createTemplate } from './template.js';
import { onChange } from './events.js';
import {
	createStorage,
	addIdToStorage,
	removeIdFromStorage,
	checkStorageForId
} from './storage.js';

// Template for Shadow DOM.
const template = createTemplate();

// The accepted values of  the type attribute.
const acceptedTypes = ['thumb', 'heart', 'star'];

/**
 * Like
 * @class
 * @extends	HTMLElement
 */
export default class HTMLLikeElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['type', 'clicked', 'value'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		attachShadowToElement.call(this, template);

		// Bind the event listener.
		this.onChange = onChange.bind(this);
		
	}

	/**
	 * Gets and sets the type attribute.
	 * @property
	 */
	get type() {
		return this.getAttribute('type');
	}

	set type(value) {
		if ('string' === typeof value) {
			this.setAttribute('type', value);
		} 
	}

	/**
	 * Gets and sets the value attribute.
	 * @property
	 */
	get value() {
		return this.getAttribute('value');
	}

	set value(value) {
		if ('string' === typeof value) {
			this.setAttribute('value', value);
		} 
	}

	/**
	 * Gets and sets the name attribute.
	 * @property
	 */
	get storageName() {
		return this.getAttribute('storage-name');
	}

	set storageName(value) {
		if ('string' === typeof value) {
			this.setAttribute('storage-name', value);
		} 
	}

	/**
	 * Gets and sets the clicked attribute.
	 * @property
	 */
	get clicked() {
		return this.getAttribute('clicked');
	}

	set clicked(value) {
		if (value === true) {
			this.setAttribute('clicked', '');
		} else {
			this.removeAttribute('clicked');
		}
	}

	/**
	 * Gets and sets the useLocalStorage attribute.
	 * @property
	 */
	get useLocalStorage() {
		return this.getAttribute('use-local-storage');
	}

	set useLocalStorage(value) {
		if (value === true) {
			this.setAttribute('use-local-storage', '');
		} else {
			this.removeAttribute('use-local-storage');
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

		if (attrName === 'clicked') {
			if (newValue !== null) {
				addIdToStorage(this.storage, this.storageName, this.id);
			} else {
				removeIdFromStorage(this.storage, this.storageName, this.id);
			}
		} 

		else if (attrName === 'type') {
			if (newValue !== null) {

				if (acceptedTypes.some(type => type === newValue)) {

				}

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

		const form = this.querySelector('form');
		form.addEventListener('change', this.onChange);

		// Set default type.
		if (this.type === null) {
			this.type = 'like';
		}

		// Create the proper storage methods.
		this.storage = this.useLocalStorage !== null ? 
			createStorage('local') : 
			createStorage('cookie');

		// Check if the id is in the storage.
		const storageContainsId = checkStorageForId(this.storage, this.storageName, this.id);
		if (storageContainsId) {
			this.clicked = true;
		}

		if (this.clicked === true) {
			const checkbox = this.querySelector('input');
			checkbox.checked = true;
		}

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

}