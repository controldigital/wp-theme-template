/**
 * @module		./utilities/events
 */

/**
 * EventEntry object constructor.
 * 
 * @class
 */
export class EventEntry {

	/**
	 * Set a event listener with a target, type, listener and optional options.
	 * 
	 * @constructor
	 * @param 	{(EventTarget|HTMLElement)} target 
	 * @param 	{string} type 
	 * @param 	{Function} listener 
	 * @param 	{(Object|boolean)} options 
	 */
	constructor(target, type, listener, options = false) {

		// If target is not a suitable candidate for an event listener.
		if (!(target instanceof EventTarget) && 
			!(target instanceof HTMLElement) &&
			!('addEventListener' in target)) {
			throw new Error('target is not set or does not have the addEventListener method');
		}
		
		// Type must be a string.
		if ('string' !== typeof type) {
			throw new Error('type is not a string');
		}
		
		// Listener must be a function.
		if ('function' !== typeof listener) {
			throw new Error('listener is not a function');
		}
		
		// Add properties.
		this.target = target;
		this.type = type;
		this.listener = listener;
		this.options = options;

	}

	/**
	 * @method	add
	 * @returns	{this}
	 */
	add() {
		this.target.addEventListener(this.type, this.listener, this.options);
		return this;
	}

	/**
	 * @method	remove
	 * @returns	{this}
	 */	
	remove() {
		this.target.removeEventListener(this.type, this.listener, this.options);
		return this;
	}

}

/**
 * Collection of event listener parameters to add or remove multiple listeners. 
 * This can be used in classes or custom elements where the binding is important.
 * 
 * @class
 */
export default class EventCollection {

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
	 * @returns	{this} Returns the instance for method chaining.
	 */
	set(target, type, listener, options = false) {
		const entry = new EventEntry(target, type, listener, options);
		this.entries.push(entry);
		return this;
	}

	/**
	 * Adds all the event listeners specified in the entries array.
	 * Returns the instance.
	 * 
	 * @method	add
	 * @returns	{this}
	 */
	add() {
		this.entries.forEach(entry => entry.add());
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
		this.entries.forEach(entry => entry.remove());
		return this;
	}

	/**
	 * @method	getByTarget
	 * @param	{string} eventType Event type to find.
	 * @returns	{EventEntry[]} An array of objects. 
	 */
	getByTarget(eventTarget) {
		return this.entries.filter(({ target }) => target === eventTarget);
	}

	/**
	 * @method	getByType
	 * @param	{string} eventType Event type to find.
	 * @returns	{EventEntry[]} An array of objects. 
	 */
	getByType(eventType) {
		return this.entries.filter(({ type }) => type === eventType);
	}

	/**
	 * @method	getByListener
	 * @param 	{Function} eventListener 
	 * @returns	{EventEntry[]} An array of objects. 
	 */
	getByListener(eventListener) {
		return this.entries.filter(({ listener }) => listener === eventListener);
	}

}