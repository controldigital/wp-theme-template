/**
 * @module      ./utilities/elements
 */

/**
 * @typedef	{Object} CustomElementInit
 * @param	{String} name Name of the custom element.
 * @param	{HTMLElement} object HTMLElement class.
 * @param	{Object} options Options for customElements.define()
 */

import { replaceLastStringOccurence } from './tools.js';

/**
 * This function accepts multiple types of a
 * selector argument to get the element from
 * the DOM or insert the element to use them.
 * The found element is then returned.
 * 
 * @function	getElement
 * @param		{(String|HTMLElement|Element)} selector String or the element itself.
 * @returns 	{(HTMLElement|Null)} Returns the element is found or null if not.
 */
export const getElement = (selector) => {
	if (typeof selector === 'undefined') {
		return null;
	}
	if (typeof selector === 'string') {
		return document.querySelector(selector);
	} else if (
		typeof selector === 'object' && (
		selector instanceof HTMLElement || 
		selector.nodeType === 1)
	) {
		return selector;
	} else {
		return null;
	}
};

/**
 * This function accepts multiple types of a
 * selector argument to get the elements from
 * the DOM or insert the elements to use them.
 * It returns the found elements in an Array.
 * 
 * @function	getElements
 * @param		{(String|HTMLCollection|NodeList|Array)} selector String or iterable object/array with the elements.
 * @returns		{(HTMLElement[]|[])} Returns an array with either the found elements or an empty array.
 */
export const getElements = (selector) => {
	if (typeof selector === 'undefined') {
		return [];
	} 
	if (typeof selector === 'string') {
		return [...document.querySelectorAll(selector)];
	} else if (
		typeof selector === 'object' && (
		selector instanceof HTMLCollection || 
		selector instanceof NodeList || 
		Array.isArray(selector))
	) {
		return [...selector];
	} else {
		return [];
	}
};

/**
 * Function to create a new HTMLElement with options to add
 * to the newly created element. Returns the element if it 
 * succesful or null when tagName is not set.
 * 
 * @function    createElement
 * @param       {String} tagName The type of element to create.
 * @param       {Object} options The options object.
 * @param       {Object} options.attributes Object of attributes to add.
 * @param       {HTMLElement[]} options.children List of children to append.
 * @param       {String[]} options.classes List of classes to add.
 * @param       {String} options.id Id of the element.
 * @param       {String} options.html The innerHTML value.
 * @param       {String} options.text The innerText node value.
 * @returns     {(HTMLElement|null)}
 */
export const createElement = (tagName, { attributes, children, classes, id, html, text }) => {
    if (typeof tagName === 'undefined') {
        return null;
    }
    const element = document.createElement(tagName);
    if (typeof attributes === 'object') {
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    }
    if (Array.isArray(children)) {
        children.forEach(el => {
            if (el instanceof HTMLElement) {
                element.appendChild(el);
            }
        });
    }
    if (Array.isArray(classes)) {
        classes.forEach(cls => {
            if (typeof cls === 'string') {
                element.classList.add(cls)
            }
        });
    }
    if (typeof id === 'string') {
        element.id = id;
    }
    if (typeof html === 'string') {
        element.innerHTML = html;
    }
    if (typeof text  === 'string') {
        const content = document.createTextNode(text);
        element.appendChild(content);
    }
    return element;
};

/**
 * Defines the elements in a list of CustomElementInit objects.
 * 
 * @param 	{CustomElementInit[]} elements 
 * @returns	{Promise<String>}
 */
export const defineElements = (elements) => Promise.all(elements.map(({ name, object, options }) => {
	customElements.define(name, object, options !== undefined ? options : {});
	return customElements.whenDefined(name).then(() => 
		`${replaceLastStringOccurence(elements.map((element) => element.name).join(', '), ' & ')} have been defined`
	);
}));