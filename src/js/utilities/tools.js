/**
 * @module		./utilities/tools
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
 * @param   	{Function} callback Function to execute.
 * @param   	{Number} wait Time to wait before firing in milliseconds.
 * @param   	{Boolean} [immediate=false] Fire immediately or not.
 * @returns		{Function} Closure function.
 */
export const debounce = (callback, wait, immediate = false) => {
	let timeout;
	return (...args) => {
		const later = () => {
			timeout = null;
			if (!immediate) callback(...args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) callback(...args);
	};
};

/**
 * Converts the keys of an object to a new format.
 * 
 * @function	convertKeysOfObject
 * @param 		{Object} object Object to convert.
 * @param		{Function} converterCallback The converter function that converts each key.
 * @returns		{Object}
 */
export const convertKeysOfObject = (object, converterCallback) => {
	const keys = Object.keys(object);
	keys.forEach((key) => {
		const convertedKey = converterCallback(key);
		if (convertedKey !== key) {
			Object.defineProperty(
				object, 
				convertedKey,
				Object.getOwnPropertyDescriptor(object, key)
			);
			delete object[key];
		}
	});
	return object;
};

/**
 * Generates a random number between a min and a max value.
 * 
 * @function	getRandomInt
 * @param   	{Number} min Min value.
 * @param   	{Number} max Max value.
 * @returns 	{Number} Random number.
 */
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Checks if a number is between two numbers. 
 * Returns a true or false value.
 * 
 * @function	isIndexBetween
 * @param 		{Number} index Number to compare.
 * @param 		{Number} from More than and equal number.
 * @param 		{Number} to Less than number.
 * @returns		{Boolean}
 */
export const isIndexBetween = (index, from, to) => {
	return from <= index && index < to;
}

/**
 * Converts the comma's in a string to dots.
 * 
 * @function	stringCommaToDot
 * @param   	{String} string String with comma's.
 * @returns 	{String} Modified string with dots instead of comma's.
 */
export const stringCommaToDot = string => string.replace(/,/g, '.');

/**
 * Converts the comma's in a string to dots.
 * 
 * @function	stringDotToComma
 * @param   	{String} string String with dots.
 * @returns 	{String} Modified string with comma's instead of dots.
 */
export const stringDotToComma = string => string.replace(/./g, ',');

/**
 * Converts a camel-cased string to a snake-cased string and returns it.
 * 
 * @function	stringCamelToSnake
 * @param 		{String} string 
 * @returns		{String}
 */
export const stringCamelToSnake = string => string.replace(/[A-Z\s]+/g, match => `_${match.toLowerCase()}`);

/**
 * Converts a snake-cased string to a camel-cased string and returns it.
 * 
 * @function	stringSnakeToCamel
 * @param 		{String} string 
 * @returns		{String}
 */
export const stringSnakeToCamel = string => string.replace(/_\w/g, match => match[1].toUpperCase());

/**
 * Converts an array into a comma seperated value (CSV) string.
 * 
 * @function	arrayToCSV
 * @param		{Array} data Array to convert to CSV string.
 * @returns		{(String|Array)} Original data or CSV string.
 */
export const arrayToCSV = (data = []) => {
	if (!Array.isArray(data)) return data;
	const csvString = data.join(',');
	return csvString;
};

/**
 * Converts an object into a comma seperated value (CSV) string.
 * 
 * @function	objectToCSV
 * @param 		{Object} data Object to convert to CSV string.
 * @returns		{(String|Object)}	Original data or CSV string.
 */
export const objectToCSV = (data = {}) => {
	if ('object' !== typeof data) return data;
	const keys = Object.keys(data);
	const csvString = keys.map(key => `${key}=${data[key]}`).join(',');
	return csvString;
};

/**
 * Converts the keys of an object to snake-cased format.
 * This is useful to create PHP friendly keys to use in a queriable string format.
 * 
 * @function	keysOfObjectToSnakeCase
 * @uses		stringCamelToSnake()
 * @param 		{Object} object
 * @returns		{Object}
 */
export const keysOfObjectToSnakeCase = object => convertKeysOfObject(object, stringCamelToSnake); 

/**
 * Converts the keys of an object to camel-cased format.
 * This is useful for creating a JS friendly object coming from a PHP object or associative array.
 * 
 * @function	keysOfObjectToCamelCase
 * @uses		stringSnakeToCamel()
 * @param 		{Object} object
 * @returns		{Object}
 */
export const keysOfObjectToCamelCase = object => convertKeysOfObject(object, stringSnakeToCamel); 

/**
 * Converts an array with strings into a string that can be used in a query.
 * 
 * @function	serializeArray
 * @uses		arrayToCSV()
 * @param   	{String} key The name of the values.
 * @param		{String[]} data The values in a array format with strings.
 * @param		{Boolean} question Append a questionmark before the string.
 * @returns 	{String} Queryable string.
 * 
 * @example
 * const key = 'post_type';
 * const data = ['post', 'page']
 * 
 * const query = serializeArray(key, data, true); // = "?post_type[]=post&post_type[]=page"
 */
export const serializeArray = (key, data = [], question = false) => {
	if (!Array.isArray(data)) throw new Error('data argument is not given or type of array');
	const query = data.map(value => `${key}[]=${value}`).join('&');
	return question === true ? `?${query}` : query;
};

/**
 * Converts an object with keys and values into a string that can 
 * be used as a querieable string.
 * 
 * @function	serializeObject
 * @uses		serializeArray()
 * @param 		{Object} data Object to convert to string.
 * @param		{Boolean} question Append a questionmark before the string.
 * @returns		{String} Queryable string.
 * 
 * @example
 * const data = {
 *      action: 'get_posts',
 *      post_type: ['post', 'page'],
 * 		post_status: ['publish']
 * };
 * 
 * const query = serializeObject(data, true); // = "?action=value&post_type[]=post&post_type[]=page&post_status[]=publish"
 */
export const serializeObject = (data = {}, question = false) => {
	if (!data || 'object' !== typeof data) throw new Error('data argument is not given or type of object');
	const keys = Object.keys(data);
	const query = keys.map(key => Array.isArray(data[key]) ? serializeArray(key, data[key]) : `${key}=${data[key]}`).join('&');
	return question === true ? `?${query}` : query;
};

/**
 * Replaces only the last occurance of a string in a given string.
 * 
 * @function	replaceLastStringOccurence
 * @param 		{String} source String to modify.
 * @param 		{String} target Character to replacement.
 * @param 		{String} replacement Replacement string.
 * @returns		{String} Modified string.
 */
export const replaceLastStringOccurence = (source = '', target = '', replacement = '') => {
	const array = source.split('');
	array[source.lastIndexOf(target)] = replacement;
	return array.join("");
};

/**
 * @typedef		isTouchDevice
 * @type		{Boolean}
 */
export const isTouchDevice = 'ontouchstart' in document.documentElement;

/**
 * Checks if the browser supports a property.
 * Returns a boolean
 *
 * @function	cssPropertyValueSupported
 * @param		{String} property Property to evaluate.
 * @param		{String} value Value of property to check.
 * @returns		{Boolean}
 */
export const cssPropertyValueSupported = (property, value) => {
    const div = document.createElement('div');
    div.style[property] = value;
    return div.style[property] === value;
};

/**
 * Select all the a tags with an rel="external" attribute and set 
 * the target attribute to '_blank'. This makes sure that all
 * theses links will open in a new tab.
 *
 * @function	externalLinksTargetBlank
 * @param   	{String} [query=a[rel="external"]] Query to get the external links.
 * @returns		{Array}
 */
export const externalLinksTargetBlank = (query = 'a[rel="external"]') => {
    let links = document.querySelectorAll(query);
    return [...links].map(link => link.setAttribute('target', '_blank'));
};

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
		} else if (feature === 'Intersection Observer' || feature.toLowerCase() === 'intersectionobserver') {
			return ('IntersectionObserver' in window);
		} else if (feature === 'Mutation Observer' || feature.toLowerCase() === 'mutationobserver') {
			return ('MutationObserver' in window);
		} else if (feature === 'Resize Observer' || feature.toLowerCase() === 'resizeobserver') {
			return ('ResizeObserver' in window);
		} else if (feature === 'Custom Event' || feature.toLowerCase() === 'customevent') {
			return ('CustomEvent' in window);
		} else if (feature === 'Push State' || feature.toLowerCase() === 'pushstate') {
			return ('pushState' in history);
		} else if (feature === 'Service Worker' || feature.toLowerCase() === 'serviceworker') {
			return ('serviceWorker' in navigator);
		} else if (feature === 'Web Audio API' || feature.toLowerCase() === 'audiocontext') {
			return ('AudioContext' in window || 'webkitAudioContext' in window);
		} else if (feature === 'Local Storage' || feature.toLowerCase() === 'localstorage') {
			return ('localStorage' in window);
		} else if (feature === 'Session Storage' || feature.toLowerCase() === 'sessionstorage') {
			return ('sessionStorage' in window);
		} else if (feature === 'Passive Events' || feature.toLowerCase() === 'passive') {
			let supportsPassive = false;
			try {
				let options = Object.defineProperty({}, 'passive', {
					get: function() {
						supportsPassive = true;
					}
				});
				window.addEventListener('testPassive', null, options);
				window.removeEventListener('testPassive', null, options);
			} catch (e) {}
			return supportsPassive;
		} else if (feature === 'Scroll Behavior' || feature.toLowerCase() === 'scrollbehavior' || feature === 'behavior: smooth') {
			return 'scrollBehavior' in document.documentElement.style;
		} else {
			return false;
		}
	});