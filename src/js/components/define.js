/**
 * @module	./components/define
 */

import HTMLSliderElement from './slider/Slider.js';
import HTMLSlideElement from './slider/Slide.js';
import HTMLCardElement from './card/Card.js';
import HTMLTabsElement from './tabs/Tabs.js';
import HTMLTabElement from './tabs/Tab.js';
import HTMLPanelElement from './tabs/Panel.js';
import HTMLModalElement from './modal/Modal.js';
import HTMLLazyElement from './lazy/Lazy.js';

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
	construct: HTMLSliderElement,
});

// Add ctrl-slide element.
customElementsList.push({
	name: 'ctrl-slide',
	construct: HTMLSlideElement,
});

// Add ctrl-card element.
customElementsList.push({
	name: 'ctrl-card',
	construct: HTMLCardElement
});

// Add ctrl-tabs element.
customElementsList.push({
	name: 'ctrl-tabs',
	construct: HTMLTabsElement
});

// Add ctrl-tab element.
customElementsList.push({
	name: 'ctrl-tab',
	construct: HTMLTabElement
});

// Add ctrl-panel element.
customElementsList.push({
	name: 'ctrl-panel',
	construct: HTMLPanelElement
});

// Add ctrl-modal element.
customElements.push({
	name: 'HTMLModalElement',
	construct: HTMLModalElement
});

// Add ctrl-lazy element.
customElements.push({
	name: 'ctrl-lazy',
	construct: HTMLLazyElement
});

/**
 * Defines the custom elements.
 * 
 * @function	defineCustomElements
 * @param 		{customElementsList} elements
 * @returns		{customElementsList}
 */
const defineCustomElements = (elements) => 	
	elements.forEach(({ name, construct, options }) => {
		customElements.define(name, construct, options !== undefined ? options : {});
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