/**
 * @module	./components/define
 */

import HTMLSliderElement from './slider/Slider';
import HTMLSlideElement from './slider/Slide';
import HTMLCardElement from './card/Card';
import HTMLTabsElement from './tabs/Tabs';
import HTMLTabElement from './tabs/Tab';
import HTMLPanelElement from './tabs/Panel';
import HTMLModalElement from './modal/Modal';

/**
 * A list with names and constructors for custom elements.
 * 
 * @typedef		customElementsList
 * @type		{Object[]}
 */
const customElementsList = [];

// Add ctrl-slider element.
customElementsList.push({
	name: 'ctrl-slider',
	constructor: HTMLSliderElement,
});

// Add ctrl-slide element.
customElementsList.push({
	name: 'ctrl-slide',
	constructor: HTMLSlideElement,
});

// Add ctrl-card element.
customElementsList.push({
	name: 'ctrl-card',
	constructor: HTMLCardElement
});

// Add ctrl-tabs element.
customElementsList.push({
	name: 'ctrl-tabs',
	constructor: HTMLTabsElement
});

// Add ctrl-tab element.
customElementsList.push({
	name: 'ctrl-tab',
	constructor: HTMLTabElement
});

// Add ctrl-panel element.
customElementsList.push({
	name: 'ctrl-panel',
	constructor: HTMLPanelElement
});

// Add ctrl-modal element.
customElements.push({
	name: 'HTMLModalElement',
	constructor: HTMLModalElement
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
const whenAllCustomElementsDefined = (elements) => {
	const promises = elements.map(({ name }) => 
		customElements.whenDefined(name));
	return Promise.all(promises);
};

export { 
	customElementsList, 
	defineCustomElements, 
	whenAllCustomElementsDefined
};