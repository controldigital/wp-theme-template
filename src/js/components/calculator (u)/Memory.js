/**
 * @module		./utilities/Memory
 */

import { isIndexBetween } from 'Utilities/tools.js';

/**
 * Memory object that stores sequence objects.
 *
 * @class
 */
export default class Memory {

	/**
	 * Create an entries array.
	 */
	constructor() {
		this.entries = [];
	}

	/**
	 * Adds a sequence to the entries array.
	 * Returns the instance.
	 * 
	 * @method	add
	 * @param 	{Sequence} sequence The sequence to add.
	 * @returns	{this}
	 */
	add(sequence) {
		if (sequence instanceof Sequence) {
			this.entries.push(sequence);
		}
		return this;
	}

	/**
	 * Returns the sequence out the entries array with a given index. 
	 * Throws an error if index is lower than zero or higher than the entries array length.
	 * 
	 * @method	get
	 * @param	{String} index
	 * @returns	{Sequence}
	 */
	get(index) {
		if (isIndexBetween(index, 0, this.entries.length)) {
			return this.entries[index];
		}
		throw new Error('Given index argument is not between 0 and the length of the entries array');
	}

	/**
	 * Returns an generator function that yields the sequences until it reaches the 0 index.
	 * Then the function returns an object with a property done and value of true.
	 * 
	 * @generator
	 * @method	countdown
	 * @yields	{Sequence}
	 * @returns	{Sequence}
	 */
	* countdown () {
		let index = this.entries.length - 1;
		if (index > 0) {
			yield this.entries[index];
			index--;
		}
		return this.entries[index];
	}

	/**
	 * Returns the index of the index if the given sequence matches any of the sequences. 
	 * Throws an error if the sequence argument is not a instance of the Sequence object.
	 * 
	 * @method	indexOf
	 * @param 	{Sequence} sequence
	 * @returns	{number} 
	 */
	indexOf(sequence) {
		if (sequence instanceof Sequence) {
			return this.entries.indexOf(sequence);
		}
		throw new Error('Given sequence argument is not an instanceof a Sequence object');
	}

	/**
	 * Removes all entries from the memory.
	 * 
	 * @method	clear
	 * @returns	{this}
	 */
	clear() {
		this.entries.length = 0;
		return this;
	}

	/**
	 * Returns the length of the entries array.
	 * 
	 * @method	size
	 * @returns	{number} The length of the entries array.
	 */
	size() {
		return this.entries.length;
	}
	
}