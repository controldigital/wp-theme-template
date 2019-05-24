/**
 * @module		./modules/tools
 */

/**
 * Returns a function, that, as long as it continues to be invoked, will not 
 * be triggered. The function will be called after it stops being called for 
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * 
 * @function	debounce
 * @since   	1.0
 * 
 * @param   	{Function} func Function to execute
 * @param   	{Number} wait Time to wait before firing
 * @param   	{Boolean} immediate Fire immediately or not
 * @returns		{Function} Closure function.
 */
export const debounce = (func, wait, immediate) => {
	let timeout;
	return function() {
        const context = this;
        const args = arguments;
		const later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/**
 * Generates a random number between a
 * min and a max value.
 * 
 * @function	getRandomInt
 * @since   	1.0
 * 
 * @param   	{Number} min Min value
 * @param   	{Number} max Max value
 * @returns 	{Number} Random number
 */
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * @function	stringCommaToPoint
 * @since   	1.0
 * 
 * @param   	{String} str String with comma's.
 * @returns 	{String} Modified string with points instead of comma's.
 */
export const stringCommaToPoint = (str) => str.replace(/,/g, '.');

/**
 * @function	stringPointToComma
 * @since   	1.0
 * 
 * @param   	{String} str String with points.
 * @returns 	{String} Modified string with comma's instead of points.
 */
export const stringPointToComma = (str) => str.replace(/./g, ',');

/**
 * @typedef		isTouchDevice
 * @type		{Boolean}
 * @since		1.0
 */
export const isTouchDevice = 'ontouchstart' in document.documentElement;

/**
 * Checks if the browser supports a property
 * Returns a boolean
 *
 * @function	cssPropertyValueSupported
 * @since		1.0
 * 
 * @param		{String} prop Property to evaluate
 * @param		{String} value Value of property to check
 * @returns		{Boolean}
 */
export const cssPropertyValueSupported = (prop, value) => {
    const d = document.createElement('div');
    d.style[prop] = value;
    return d.style[prop] === value;
};

/**
 * Select all the a tags with an 
 * rel="external" attribute and set 
 * the target attribute to '_blank'
 *
 * @function	linkTargetsBlank
 * @since		1.0
 * 
 * @param   	{String} [query=a[rel="external"]]
 * @returns		{Array}
 */
export const linkTargetsBlank = (query = 'a[rel="external"]') => {
    let links = document.querySelectorAll(query);
    return [...links].map(link => link.setAttribute('target', '_blank'));
};

/**
 * This function accepts multiple types of a
 * selector argument to get the element from
 * the DOM or insert the element to use them.
 * The found element is then returned.
 * 
 * @function	getElement
 * 
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
 * 
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
 * 
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
 * Checks if an image has a data-src attribute and returns
 * a boolean based on that fact.
 * 
 * @function	imageIsLazyLoadable
 * 
 * @param 		{HTMLImageElement} image The image to check
 * @returns		{Boolean}
 */
export const imageIsLazyLoadable = (image) => image.hasAttribute('data-src');

/**
 * Lazy load an image by adding a src attribute 
 * with the value from the data-src attribute.
 * 
 * @function	lazyLoadImage
 * 
 * @param 		{HTMLImageElement} image The image that has to be loaded.
 * @returns		{HTMLImageElement} The loaded image.
 */
export const lazyLoadImage = (image) => {
	const protoImg = new Image();
	const src = image.getAttribute('data-src');
	const onLoad = () => {
		image.src = src;
		image.classList.remove('is--loading');
		image.classList.add('has--loaded');
		image.removeAttribute('data-src');
	};
	image.classList.add('is--loading');
	protoImg.addEventListener('load', onLoad, {once: true});
	protoImg.src = src;
	return image;
}

/**
 * Lazy load images that contain a data-src attribute
 * and shows them when they have loaded.
 * 
 * @function	lazyLoadImages
 * @uses		imageIsLazyLoadable
 * @uses		lazyLoadImage
 * 
 * @param 		{HTMLImageElement[]} images List of images to load.
 * @returns		{HTMLImageElement[]}
 */
export const lazyLoadImages = (images = document.images) => 
	[...images]
		.filter(imageIsLazyLoadable)
		.map((image) => lazyLoadImage(image));