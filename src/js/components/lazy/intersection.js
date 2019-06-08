/**
 * @module		./components/lazy/intersection
 */

import { lazyLoadImage } from '../../modules/tools.js';

/**
 * @typedef		intersectionOptions
 * @type		{Object}
 */
export const intersectionOptions = {
	root: null,
	rootMargin: '0px',
	threshold: [0]
};

/**
 * Onintersection callback.
 * 
 * @function	onIntersect
 * @param 		{IntersectionObserverEntry[]} entries 
 * @returns		{void}
 */
export const onIntersect = function(entries, observer) {
	entries.forEach((entry) => {
		const { target, isIntersecting, intersectionRatio } = entry;
		if (isIntersecting || intersectionRatio > 0) {
			lazyLoadImage(target);
			observer.unobserve(target);
		}
	});
};