/**
 * @module      ./components/list
 */

/**
 * Class to create a list 
 * 
 * @class
 */
export default class CustomElementsList {

	/**
	 * Creates a new list.
     * 
     * @constructor
	 */
	constructor() {
		this.items = [];
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

}