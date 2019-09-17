/**
 * @module		./utilities/Sequence
 */

export default class Sequence {

	constructor(...steps) {
		if (steps.length === 0) {
			throw new Error('steps argument has not been set. Please enter your steps');
		}
		this.phases = steps;
		this.values = [];
	}

	get firstValue() {
		if (this.values.length < 1) {
			return null;
		}
		return this.values[0];
	}

	set firstValue(value) {
		if (typeof value === 'number') {
			this.values.push(value);
		}
		throw new Error(`${value} is not a type of number`);
	}

	get lastValue() {
		if (this.values.length < 1) {
			return null;
		}
		return this.values[this.values.length - 1];
	}

	set lastValue(value) {
		if (typeof value === 'number') {
			this.values.push(value);
		}
		throw new Error(`${value} is not a type of number`);
	}

	getSteps() {
		return this.values;
	}

	* setSteps(value) {
		if (this.values.length > this.steps.length) {
			yield this.values.push(value);
		}
		return this.values.push(value);
	}

	getCurrentPhase() {
		return this.phases[this.values.length];
	}

}