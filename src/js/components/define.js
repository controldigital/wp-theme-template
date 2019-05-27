/**
 * @module	./components/define
 */

import { PostsQuery } from './form/PostsQuery';

/**
 * A list with names and constructors for custom elements.
 * 
 * @typedef		customElementsList
 * @type		{Object[]}
 */
const customElementsList = [];

// Add posts-query element
customElementsList.push({
	name: 'posts-query',
	constructor: PostsQuery,
	options: {
		extends: 'form'
	}
});

/**
 * Defines the custom elements.
 * 
 * @function	defineCustomElements
 * @param 		{customElementsList} elements
 * @returns		{customElementsList}
 */
const defineCustomElements = (elements) => 	
	elements.forEach(({ name, constructor, options }) => {
		customElements.define(name, constructor, options !== undefined ? options : {});
	});

/**
 * Checks if all elements have been registered
 * and returns a Promise when they do.
 * 
 * @function	whenAllCustomElementsDefined
 * @param 		{customElementsList} elements 
 * @returns		{Promise<void[]>}
 */
const whenAllCustomElementsDefined = async (elements) => {
	const keys = elements.keys();
	const promises = [];
	for (let key of keys) {
		let promise = customElements.whenDefined(key);
		promises.push(promise);
	}
	return Promise.all(promises);
};

export { 
	customElementsList, 
	defineCustomElements, 
	whenAllCustomElementsDefined
};