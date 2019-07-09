/**
 * @module		./utilities/Cache
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
	 * @param		{Number} limit Limit of the amount of entries.
	 */
	constructor(limit = -1) {
		this.limit = limit;
		this.entries = {};
		this.length = 0;
	}

	/**
	 * Returns the value of the selected id.
	 * 
	 * @method	get
	 * @param	{String} id
	 * @returns	{*}
	 */
	get(id) {
		if (this.has(id)) {
			return this.entries[id];
		}
	}

	/**
	 * Adds a new entry to the list when the limit is unlimited
	 * or when there room left in the entries object.
	 * 
	 * @method	set
	 * @param	{String} id
	 * @param	{*} fragment
	 * @returns	{*}
	 */
	set(id, fragment) {
		if (this.limit === -1 || this.length < this.limit ) {
			this.entries[id] = fragment;
			this.length++;
			return fragment;
		}
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
		this.length--;
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
		this.length = 0;
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