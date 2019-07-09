/**
 * @module		./utilities/memoization
 */

import Cache from 'Utilities/Cache.js';

/**
 * Memoization function. It executes the callback and stores the result in 
 * a cache instance. When the the callback is called again with the same
 * arguments, the memo function will check the cache and see if the result
 * is already there. If so the result will be returned and else it will
 * execute the callback and store the result. 
 * 
 * @function	memo
 * @param 		{Function} callback The function to execute and store the result from.
 * @returns		{Function} Function that checks if the result is already stored and returns the result.
 * 
 * In this example we create a function called add with the memo function.
 * Now every time we call add, it will remember what numbers are used for a & b.
 * When the same numbers are used a second time, the result will not have to
 * be calculated, but can be retrieved from memory. Which is much faster.
 * 
 * @example		const add = memo((a, b) => a + b);
 */
export const memo = (callback) => {

	// Create a new cache.
	const cache = new Cache();

	// Check for result and execute the callback.
	return (...args) => {
		const key = JSON.stringify(args);
		if (cache.has(key)) {
			return cache.get(key);
		}
		const value = callback(...args);
		cache.set(key, value);
		return value;
	};

};