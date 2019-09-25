/**
 * @module		./components/lazy/intersection
 */

import { 
	lazyLoadImage,
	lazyLoadPicture,
	lazyLoadMedia
} from 'Utilities/lazy.js';

/**
 * Onintersection callback.
 * 
 * @function	onIntersection
 * @param 		{IntersectionObserverEntry[]} entries 
 * @returns		{void}
 */
export const onIntersection = function onIntersection(entries, observer) {
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