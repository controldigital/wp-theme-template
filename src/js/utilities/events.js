/**
 * @module		./utilities/events
 */

/**
 * Collection of event listener parameters to add or remove multiple listeners. 
 * This can be used in classes or custom elements where the binding is important.
 * 
 * @class
 */
export default class EventsCollection {

	/**
	 * Creates a new array of event listener entries.
	 * These entries are objects with a target, type, listener and options values.
	 * 
	 * @constructor
	 */
	constructor() {
		this.entries = [];
	}

	/**
	 * Set a event listener with a target, type, listener and optional options.
	 * The arguments will be added to the entries array which can later be used to add or remove event listeners.
	 * 
	 * @method	set
	 * @param 	{(EventTarget|HTMLElement)} target 
	 * @param 	{string} type 
	 * @param 	{Function} listener 
	 * @param 	{(Object|boolean)} options 
	 * @returns	{Object[]} Returns the array with all the event parameters in objects.
	 */
	set(target, type, listener, options = false) {

		if (!(target instanceof EventTarget) && !(target instanceof HTMLElement)) {
			throw new Error('target is not set or does not have the addEventListener method');
		}

		if ('string' !== typeof type) {
			throw new Error('type is not a string');
		}

		if ('function' !== typeof listener) {
			throw new Error('listener is not a function');
		}

		this.entries.push({ target, type, listener, options });
		return this.entries;
	}

	/**
	 * Adds all the event listeners specified in the entries array.
	 * Returns the instance.
	 * 
	 * @method	add
	 * @returns	{this}
	 */
	add() {
		this.entries.forEach(({ target, type, listener, options }) => {
			target.addEventListener(type, listener, options);
		});
		return this;
	}

	/**
	 * Removes all the event listeners specified in the entries array.
	 * Returns the instance.
	 * 
	 * @method	remove
	 * @returns	{this} 
	 */
	remove() {
		this.entries.forEach(({ target, type, listener, options }) => {
			target.removeEventListener(type, listener, options);
		});
		return this;
	}

}