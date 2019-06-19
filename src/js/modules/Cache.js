/**
 * @module		./modules/Cache
 */

/**
 * Class to store routes with their
 * HTML data in a string.
 * 
 * @class
 */
export default class Cache {

	/**
	 * Creates a new instance of Cache.
	 * @constructor
	 * 
	 * @param	{String} id
	 * @param	{String} fragment
	 */
	constructor(id, fragment) {
		this.entries = {};
		if (id !== undefined && fragment !== undefined) {
			this.set(id, fragment);
		}
	}

	/**
	 * Returns the fragment of the selected id.
	 * 
	 * @method	get
	 * @param	{String} id
	 * @returns	{*}
	 */
	get(id) {
		if (this.has(id))
			return this.entries[id];
	}

	/**
	 * Adds a new entry to the list.
	 * 
	 * @method	set
	 * @param	{String} id
	 * @param	{*} fragment
	 * @returns	{*}
	 */
	set(id, fragment) {
		this.entries[id] = fragment;
		return fragment;
	}

	/**
	 * Returns a boolean which checks 
	 * if a fragment is present.
	 * 
	 * @method	has
	 * @param	{String} id
	 * @returns	{Boolean}
	 */
	has(id) {
		return this.entries.hasOwnProperty(id);
	}

	/**
	 * Removes a entry from the cache.
	 * 
	 * @method	delete
	 * @param 	{String} id 
	 * @returns	{Cache}
	 */
	delete(id) {
		delete this.entries[id];
		return this;
	}

	/**
	 * Removes all entries from the cache.
	 * 
	 * @method	clear
	 * @returns	{Cache}
	 */
	clear() {
		for (let id in this.entries) {
			delete this.entries[id];
		}
		return this;
	}

	/**
	 * Converts the entries to a JSON string.
	 * 
	 * @method	encode
	 * @returns	{String}
	 */
	encode() {
		return JSON.stringify(this.entries);
	}

	/**
	 * Converts decoded JSON string to an object
	 * and returns it.
	 * 
	 * @static
	 * @method	decode
	 * @param 	{String} str String to parse.
	 * @returns	{Object} 
	 */
	static decode(str) {
		if ('string' === typeof str){
			return JSON.parse(str);
		}
	}

}