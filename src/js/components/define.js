/**
 * @module	./components/define
 */

// Import list.
import CustomElementsList from './list.js';

// Import custom elements.
import HTMLCardElement from './card/Card.js';
import HTMLFabElement from './fab/Fab.js';
import HTMLLazyElement from './lazy/Lazy.js';
import HTMLLikeElement from './like/Like.js';
import HTMLMenuElement from './menu/Menu.js';
import HTMLMessageElement from './message/Message.js';
import HTMLModalElement from './modal/Modal.js';
import HTMLPanelElement from './tabs/Panel.js';
import HTMLScrollBarElement from './scrollbar/Scrollbar.js';
import HTMLSliderElement from './slider/Slider.js';
import HTMLSlideElement from './slider/Slide.js';
import HTMLTabsElement from './tabs/Tabs.js';
import HTMLTabElement from './tabs/Tab.js';
import HTMLTimeElement from './time/Time.js';
import HTMLToggleElement from './toggle/Toggle.js';
import HTMLTooltipElement from './tooltip/Tooltip.js';
import HTMLViewElement from './view/View.js';

/**
 * A list with names and constructors for custom elements.
 * 
 * @typedef		customElementsList
 * @type		{CustomElementsList<Array>}
 */
const customElementsList = new CustomElementsList();

// Add ctrl-card element.
customElementsList.add('ctrl-card', HTMLCardElement);

// Add ctrl-fab element.
customElementsList.add('ctrl-fab', HTMLFabElement);

// Add ctrl-lazy element.
customElementsList.add('ctrl-lazy', HTMLLazyElement);

// Add ctrl-menu element.
customElementsList.add('ctrl-menu', HTMLMenuElement);

// Add ctrl-like element.
customElementsList.add('ctrl-like', HTMLLikeElement);

// Add ctrl-message element.
customElementsList.add('ctrl-message', HTMLMessageElement);

// Add ctrl-modal element.
customElementsList.add('ctrl-modal', HTMLModalElement);

// Add ctrl-panel element.
customElementsList.add('ctrl-panel', HTMLPanelElement);

// Add ctrl-scrollbar element.
customElementsList.add('ctrl-scrollbar', HTMLScrollBarElement);

// Add ctrl-slider element.
customElementsList.add('ctrl-slider', HTMLSliderElement,);

// Add ctrl-slide element.
customElementsList.add('ctrl-slide', HTMLSlideElement,);

// Add ctrl-tabs element.
customElementsList.add('ctrl-tabs', HTMLTabsElement);

// Add ctrl-tab element.
customElementsList.add('ctrl-tab', HTMLTabElement);

// Add ctrl-time element.
customElementsList.add('ctrl-time', HTMLTimeElement);

// Add ctrl-toggle element.
customElementsList.add('ctrl-toggle', HTMLToggleElement);

// Add ctrl-tooltip element.
customElementsList.add('ctrl-tooltip', HTMLTooltipElement);

// Add ctrl-view element.
customElementsList.add('ctrl-view', HTMLViewElement);

/**
 * Defines the custom elements.
 * 
 * @function	defineCustomElements
 * @param 		{customElementsList} elements The element object names and constructor classes.
 * @returns		{Promise<void[]>} A Promise that resolves when all the customElements have been defined.
 */
const defineCustomElements = (elements) => 	
	Promise.all(elements.list.map(({ name, construct, options }) => {
		customElements.define(name, construct, options !== undefined ? options : {});
		return customElements.whenDefined(name);
	}));

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