/**
 * @module		./Config
 */

import Cookie from './Cookie';

/**
 * @class
 * @description
 * The Config object can be used to store data into a cookie.
 */
export default class Config {

	/**
	 * Creates a new Config instance.
	 * Needs a name to create a new cookie to store all the config data.
	 * 
	 * @constructor
	 * @param 		{String} name Name of the cookie to use for the config
	 */
	constructor(name) {
		if ('undefined' === typeof name || 'string' !== typeof name) {
			throw new Error('Name is not defined or is not a string');
		};
		this.cookie = new Cookie(name);
	}

	/**
	 * Returns the value of the selected key.
	 * Retrieves the data form the cookie.
	 * 
	 * @method		get
	 * @param		{String} key Key of property to get
	 * @returns		{*} A value if the key is succesfully retrieved or null when it is not found.
	 */
	get(key) {
		const cookie = this.cookie.get();
		if (cookie !== false) {
			const settings = JSON.parse(cookie);
			if (settings.hasOwnProperty(key)) {
				return settings[key];
			}
			return null;
		}
		return null;
	}

	/** 
	 * Set a key and value in the configurations.
	 * Updates the cookie of this instance with a new key and value.
	 * 
	 * @method		set
	 * @param		{String} key Key of property to set
	 * @param		{*} value New value of the property
	 * @returns		{void}
	 */
	set(key, value) {
		const cookie = this.cookie.get();
		let settings = {};
		if (cookie !== false) {
			settings = JSON.parse(cookie);
		} 
		settings[key] = value;
		this.cookie.set(this.name, JSON.stringify(settings), 365);
	}

	/**
	 * Returns a boolean which checks if a value is present.
	 * 
	 * @method		has
	 * @param		{String} key Key of property to get
	 * @returns		{Boolean} True on found. False on not found.
	 */
	has(key) {
		const value = this.get(key);
		if (value !== null) {
			return true;
		}
		return false;
	}

	/**
	 * Returns an array with only the keys.
	 * 
	 * @method		keys
	 * @returns		{Array}
	 */
	keys() {
		const cookie = this.cookie.get();
		if (cookie !== false) {
			const settings = JSON.parse(cookie);
			return Object.keys(settings);
		}
	}

	/**
	 * Returns an array with only the values.
	 * 
	 * @method		values
	 * @returns		{Array}
	 */
	values() {
		const cookie = this.cookie.get();
		if (cookie !== false) {
			const settings = JSON.parse(cookie);
			return Object.values(settings);
		}
	}

}