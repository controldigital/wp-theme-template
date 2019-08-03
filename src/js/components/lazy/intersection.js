/**
 * @module		./components/lazy/intersection
 */

import { 
	lazyLoadImage,
	lazyLoadPicture,
	lazyLoadMedia
} from 'Utilities/lazy.js';

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
export const onIntersect = function onIntersect(entries, observer) {
	entries.forEach((entry) => {
		const { target, isIntersecting, intersectionRatio } = entry;
		const { tagName } = target;
		if (isIntersecting || intersectionRatio > 0) {
			if (tagName === 'IMG') {
				lazyLoadImage(target);
			} else if (tagName === 'PICTURE') {
				lazyLoadPicture(target);
			} else if (tagName === 'VIDEO' || tagName === 'AUDIO') {
				lazyLoadMedia(target);
			}
			observer.unobserve(target);
		}
	});
};