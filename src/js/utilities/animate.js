/**
 * @module      ./utilities/animate
 */

import { getElement } from 'Utilities/elements.js';
import { hasFeatures } from 'Utilities/tools.js';

// Check if animation support is there.
export const hasAnimationSupport = hasFeatures('Web Animations API');

// Animations default object.
const keyframeOptionsDefault = {
	delay: 0,
	direction: 'normal',
	duration: 1000,
	easing: 'cubic-bezier(0.6, 0, 0.3, 1)',
	endDelay: 0,
	fill: 'both',
	iterationStart: 0.0,
	iterations: 1,
};

/**
 * Get the animation distance and 
 * difference between 2 elements.
 * 
 * @function 	getDeltaVectorsBetween
 * @param		{HTMLElement} from From element
 * @param		{HTMLElement} to To element
 * @returns		{Object} Object with x, y, width and height vectors.
 */
export const getDeltaVectorsBetween = (from, to) => {
	if (from instanceof HTMLElement && to instanceof HTMLElement) {
		const fromBounds = from.getBoundingClientRect();
		const toBounds = to.getBoundingClientRect();
		return {
			deltaX: toBounds.left - fromBounds.left,
			deltaY: toBounds.top - fromBounds.top,
			deltaW: toBounds.width / fromBounds.width,
			deltaH: toBounds.height / fromBounds.height
		};
	}
}

/**
 * Animates an element from one to another position with the Web Animations API.
 * 
 * @function	transitionElementFromTo
 * @uses		getDeltaVectorsBetween
 * @param		{(HTMLElement|string)} selector Element to animate.
 * @param 		{(HTMLElement|string)} from  Element which dimensions and position to animate from.
 * @param 		{(HTMLElement|string)} to Element which dimensions and position to animate to.
 * @param 		{(HTMLElement|string)} options KeyframeEffectInit options.
 * @returns		{Promise<Object>} Promise with from and to on resolve.
 */
export const transitionElementFromTo = (selector, from, to, options = {}) => {
	return new Promise(resolve => {

		// Setup from, to and options.
		const animationElement = getElement(selector);
		const fromElement = getElement(from);
		const toElement = getElement(to);
		const keyframeOptions = Object.assign(keyframeOptionsDefault, options);

		/**
		 * Fires the callback when the animation has finished.
		 * 
		 * @function	onFinish
		 * @returns		{void}
		 */
		const onFinish = () => resolve({ fromElement, toElement });

		// Get the the vectors we need to transform to.
		const { 
			deltaX, 
			deltaY, 
			deltaW, 
			deltaH 
		} = getDeltaVectorsBetween(fromElement, toElement);

		// Create the keyframeSet.
		const keyframeSet = [
			{
				transformOrigin: 'top left',
				transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${deltaW}, ${deltaH})`
			},
			{
				transformOrigin: 'top left',
				transform: 'none'
			}
		];

		// Create a new KeyframeEffect instance with the element, the keyframeSet and the options.
		const animation = animationElement.animate(keyframeSet, keyframeOptions)
		animation.addEventListener('finish', onFinish, false);

		// Play animation.
		animation.play();

	});
};