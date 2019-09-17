/**
 * @module		./components/calculator/functions
 */

import Sequence from 'Utilities/Sequence.js';

/**
 * @function	setCurrentSequence
 * @returns		{void}
 */
export const setCurrentSequence = function setCurrentSequence() {
	this.currentSequence = new Sequence('firstValue', 'operator', 'lastValue');
	this.currentSequenceSetSteps = this.currentSequence.setSteps();
}