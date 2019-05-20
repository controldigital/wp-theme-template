/* jshint esversion: 6 */

/**
 * @author Control <info@controldigital.nl>
 * @file tools.js
 * @version 1.0
 * @license
 * Copyright (c) 2018 Control.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



/**
 * getParent
 * 
 * Get element by walking up in the tree
 * Find the element with a CSS class
 *
 * @function
 * @since   1.0
 * @param   {HTMLElement} start Element to start from
 * @param   {String} cls CSS class to find the element with
 * @returns {HTMLElement}
 */	
export const getParent = (start, cls) => {
    let el = start;
    while (el && !el.classList.contains(cls)) {
        el = el.parentElement;
    }
    return el;
};

/**
 * getSiblings
 * 
 * Get all the siblings of given element
 * Goes to the parent en gets alls the children
 * Then it filters out the start element
 * 
 * @function
 * @since   1.0
 * @param   {HTMLElement} start  Element to start from
 * @returns {Array} Array of found siblings
 */
export const getSiblings = (start) => {
    let children = start.parentElement.children;
    return Array.prototype.filter.call(children, (sib) => {
        return sib !== start;
    });
};

/**
 * getNextSiblingWithClass
 * 
 * Get element by walking over the next siblings
 * Find the element with a CSS class
 *
 * @function
 * @since   1.0
 * @param   {HTMLElement} start Element to start from
 * @param   {String} cls CSS class to find the element with
 * @returns {HTMLElement}
 */	
export const getNextSiblingWithClass = (start, cls) => {
    let el = start;
    while (el && !el.classList.contains(cls)) {
        el = el.nextElementSibling;
    }
    return el;
};

/**
 * getPrevSiblingWithClass
 * 
 * Get element by walking over the previous siblings
 * Find the element with a CSS class
 *
 * @function
 * @since   1.0
 * @param   {HTMLElement} start Element to start from
 * @param   {String} cls CSS class to find the element with
 * @returns {HTMLElement}
 */	
export const getPrevSiblingWithClass = (start, cls) => {
    let el = start;
    while (el && !el.classList.contains(cls)) {
        el = el.previousElementSibling;
    }
    return el;
};

/**
 * removeChildren
 * 
 * Removes all the children of an element 
 * and returns the element.
 * 
 * @example
 * const emptyParent = removeChildren(parentElement);
 * // emptyParent now has no children :(
 * 
 * @function
 * @since   1.0
 * @param   {HTMLElement} element HTMLElement to remove children of
 * @returns {HTMLElement} Returns the element with children removed
 */
export const removeChildren = (element) => {
    while (element && element.firstElementChild) {
        element.removeChild(element.firstElementChild);
    }
    return element;
};

/**
 * parseString
 * 
 * Parses a string to a document
 * with the DOMParser API and returns
 * a XMLDocument, HTMLDocument or SVGDocument.
 * 
 * @function
 * @since 	1.0
 * @param 	{String} data String to convert to workable HTML
 * @param   {String} [mimeType='application/xml'] MimeType to convert the string to
 * @returns {(XMLDocument|HTMLDocument|SVGDocument)}
 */
export const parseString = (data, mimeType = 'application/xml') => {
	if (data && 'string' === typeof data) {
    	if ('DOMParser' in window) {
			let parser = new DOMParser();
            return parser.parseFromString(data, mimeType);
    	} else {
			throw new Error('DOMParser not supported.');
		}
	}
};

/**
 * stringToHTML
 * 
 * Parse string to HTML by adding a string
 * to the innerHTML of a div element
 * 
 * @function
 * @since 	1.0
 * @param 	{String} data - String to convert to workable HTML
 * @returns {HTMLElement}
 */
export const stringToHTML = (data) => {
	if (data && 'string' === typeof data) {
		let container = document.createElement('div');
		container.innerHTML = data;
		return container;
	} else {
		throw new Error('data argument is not present or not a string');
	}
};

/**
 * debounce
 * 
 * Returns a function, that, as long as it continues to be invoked, will not 
 * be triggered. The function will be called after it stops being called for 
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * 
 * @function
 * @since   1.0
 * @param   {Function} func Function to execute
 * @param   {Number} wait Time to wait before firing
 * @param   {Boolean} immediate Fire immediately or not
 */
export const debounce = (func, wait, immediate) => {
	let timeout;
	return function() {
        let context = this;
        let args = arguments;
		let later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/**
 * getRandomInt
 * 
 * Generates a random number between a
 * min and a max value.
 * 
 * @function
 * @since   1.0
 * @param   {Number} min Min value
 * @param   {Number} max Max value
 * @returns {Number} Random number
 */
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * stringCommaToPoint
 * 
 * @function
 * @since   1.0
 * @param   {String} str String with comma's.
 * @returns {String} Modified string with points instead of comma's.
 */
export const stringCommaToPoint = (str) => str.replace(/,/g, '.');

/**
 * stringPointToComma
 * 
 * @function
 * @since   1.0
 * @param   {String} str String with points.
 * @returns {String} Modified string with comma's instead of points.
 */
export const stringPointToComma = (str) => str.replace(/./g, ',');

/**
 * cssPropertyValueSupported
 *
 * Checks if the browser supports a property
 * Returns a boolean
 *
 * @function
 * @since	1.0
 * @param	{String} prop Property to evaluate
 * @param	{String} value Value of property to check
 * @returns	{Boolean}
 */
export const cssPropertyValueSupported = (prop, value) => {
    let d = document.createElement('div');
    d.style[prop] = value;
    return d.style[prop] === value;
};

/**
 * linkTargetsBlank
 *
 * Select all the a tags with an 
 * rel="external" attribute and set 
 * the target attribute to '_blank'
 *
 * @param   {String} [query=a[rel="external"]]
 * @returns	{NodeList}
 */
export const linkTargetsBlank = (query = 'a[rel="external"]') => {
    let links = document.querySelectorAll(query);
    links.forEach(link => link.setAttribute('target', '_blank'));
    return links;
};

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
}

/**
 * This function accepts multiple types of a
 * selector argument to get the elements from
 * the DOM or insert the elements to use them.
 * It returns the found elements in an Array.
 * 
 * @function	getElements
 * @param		{(String|HTMLCollection|NodeList|Array)} selector String or iterable object/array with the elements.
 * @returns		{(HTMLElement[]|[])} Returns an array with either the found elements or a null object.
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
		selector instanceof Array)
	) {
		return [...selector];
	} else {
		return [];
	}
}

/**
 * Checks if a feature is supported
 * and returns a boolean.
 * 
 * @function	hasFeatures
 * @param 		{String[]} feature Feature to check.
 * @returns		{Boolean}
 */
export const hasFeatures = (...features) => 
	features.every((feature) => {
		if (feature === undefined || typeof feature !== 'string') 
			return false;
		if (feature === 'Promise') {
			return (typeof Promise === 'undefined' || Promise.toString().indexOf('[native code]') === -1);
		} else if (feature === 'Intersection Observer' || feature === 'IntersectionObserver') {
			return ('IntersectionObserver' in window);
		} else if (feature === 'Mutation Observer' || feature === 'MutationObserver') {
			return ('MutationObserver' in window);
		} else if (feature === 'Custom Event' || feature === 'CustomEvent') {
			return ('CustomEvent' in window);
		} else if (feature === 'Push State' || feature === 'pushState') {
			return ('pushState' in history);
		} else if (feature === 'Service Worker' || feature === 'serviceworker') {
			return ('serviceWorker' in navigator);
		} else if (feature === 'Web Audio API' || feature === 'AudioContext') {
			return ('AudioContext' in window || 'webkitAudioContext' in window);
		} else if (feature === 'Passive Events' || feature === 'passive') {
			let supportsPassive = false;
			try {
				let opts = Object.defineProperty({}, 'passive', {
					get: function() {
						supportsPassive = true;
					}
				});
				window.addEventListener('testPassive', null, opts);
				window.removeEventListener('testPassive', null, opts);
			} catch (e) {}
			return supportsPassive;
		} else if (feature === 'Scroll Behavior' || feature === 'scrollBehavior' || feature === 'behavior: smooth') {
			return 'scrollBehavior' in document.documentElement.style;
		} else {
			return false;
		}
	});

/**
 * Lazy load an image by adding a src attribute 
 * with the value from the data-src attribute.
 * 
 * @function	lazyLoadImage
 * @param 		{HTMLImageElement} image The image that has to be loaded.
 * @returns		{HTMLImageElement} The loaded image.
 */
export const lazyLoadImage = (image) => {
    if (image.hasAttribute('data-src')) {
        const protoImg = new Image();
        const src = image.getAttribute('data-src');
        const onLoad = () => {
            image.src = src;
            image.classList.remove('is--loading');
            image.classList.add('has--loaded');
            image.removeAttribute('data-srcset');
            image.removeAttribute('data-src');
        };
        image.classList.add('is--loading');
        protoImg.addEventListener('load', onLoad, {once: true});
		protoImg.src = src;
		return image;
    }
}

/**
 * Lazy load images that contain a data-src attribute
 * and shows them when they have loaded.
 * 
 * @function	lazyLoadImages
 * @uses		lazyLoadImage
 * @param 		{HTMLImageElement[]} images List of images to load.
 * @returns		{HTMLImageElement[]}
 */
export const lazyLoadImages = (images = document.images) => 
	[...images].map((image) => lazyLoadImage(image));