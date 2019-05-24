/**
 * @module	./components/define
 */

/**
 * A list with names and constructors for custom elements.
 * 
 * @typedef		customElementsList
 * @type		{Map<String, HTMLElement>}
 */
const customElementsList = new Map();

/**
 * Defines the custom elements.
 * 
 * @function	defineCustomElements
 * @param 		{customElementsList} elements
 * @returns		{customElementsList}
 */
const defineCustomElements = (elements) => 	
	elements.forEach((constructor, name) => customElements.define(name, constructor));

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