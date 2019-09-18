/**
 * @module      ./utilities/custom-elements
 */

import { defineElements } from './elements.js';

/**
 * Class to create a list. This list will hold all the custom elements
 * that have to be defined using the customElements.define() method.
 * 
 * @class
 */
export default class CustomElementsDefiner {

	/**
	 * Creates a new list and makes the instance of
	 * the class immutable.
     * 
     * @constructor
	 */
	constructor(prefix = 'ctrl') {
		if ('string' !== typeof prefix) {
			throw new Error('prefix argument is not a string');
		}
		this.prefix = prefix;
		this.items = [];
		if (new.target === CustomElementsDefiner) {
			Object.freeze(this);
		}
	}

	/**
	 * Adds an item with a name, the element class and an optional options object.
	 * 
	 * @method	add
	 * @param 	{String} name 
	 * @param 	{HTMLElement} object 
	 * @param 	{Object} options 
	 */
	add(name, object, options) {
		this.items.push({ name, object, options });
	}

	/**
	 * Gets the selected object from the list if it is there.
	 * 
	 * @method	get
	 * @param 	{String} name The name of the element to get.
	 * @returns	{Object}
	 */
	get(name) {
		const index = this.getIndexOf(name);
		if (index > -1) {
			return this.items[index];
		}
	}

	/**
	 * Retrieves the index of the element in the list.
	 * 
	 * @method	getIndexOf
	 * @param 	{String} name The name of the element to get the index of.
	 * @returns	{Number}
	 */
	getIndexOf(name) {
		return this.items.findIndex((item) => item.name === name);
	}

	/**
	 * Removes an item from the list.
	 * 
	 * @method	remove
	 * @param 	{String} name The name of the element to remove from the list.
	 * @returns	{Object[]} The removed element object.
	 */
	remove(name) {
		const index = this.getIndexOf(name);
		if (index > -1) {
			return this.items.splice(index, 1);
		}
	}

	/**
	 * Clears out the list property.
	 * 
	 * @method	clear
	 * @returns	{this} The instance.
	 */
	clear() {
		this.items.length = 0;
		return this;
	}

	/**
	 * Define a single item in the list
	 */
	define(...names) {
		const items = this.items.filter(({ name }) => names.indexOf(name) > -1);
		return defineElements(items, this.prefix);
	}

	/**
	 * Defines all the items in the list.
	 * 
	 * @method	define
	 * @returns	{Promise<String>} A promise with an message string.
	 */
	defineAll() {
		return defineElements(this.items, this.prefix);
	}

}