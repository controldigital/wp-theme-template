/**
 * @module	./components/define
 */

import HTMLSliderElement from './slider/Slider';
import HTMLSlideElement from './slider/Slide';
import HTMLCardElement from './card/Card';

/**
 * A list with names and constructors for custom elements.
 * 
 * @typedef		customElementsList
 * @type		{Object[]}
 */
const customElementsList = [];

// Add control-slider element.
customElementsList.push({
	name: 'control-slider',
	constructor: HTMLSliderElement,
});

// Add control-slide element.
customElementsList.push({
	name: 'control-slide',
	constructor: HTMLSlideElement,
});

// Add control-card element.
customElementsList.push({
	name: 'control-card',
	constructor: HTMLCardElement
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
	const promises = elements.map(({ name }) => 
		customElements.whenDefined(name));
	return Promise.all(promises);
};

export { 
	customElementsList, 
	defineCustomElements, 
	whenAllCustomElementsDefined
};