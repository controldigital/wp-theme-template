/**
 * @module		./components/card/Card
 */

import { attachShadowToElement } from 'Components/shadow.js';
import { createTemplate } from './template.js';
import * as operators from './operators.js'
import { onClick } from './events.js';
import Memory from './Memory.js';
import * as sequences from './helpers.js';

// Create a template.
const template = createTemplate();

/**
 * Element that represents a calculator.
 * 
 * @class
 * @extends	HTMLElement
 */
export default class HTMLCalculatorElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['action', 'value'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		attachShadowToElement.call(this, template);

		this.memory = new Memory();

		sequences.setCurrentSequence.call(this);

		this.onClick = onClick.bind(this);
		
	}

	/**
	 * Gets and sets the action attribute.
	 * @property
	 */
	get action() {
		return this.getAttribute('action');
	}

	set action(value) {
		if ('string' === typeof value) {
			this.setAttribute('action', value);
		} 
	}

	/**
	 * Gets and sets the value attribute.
	 * @property
	 */
	get value() {
		return parseFloat(this.getAttribute('value'));
	}

	set value(value) {
		if ('number' === typeof value) {
			this.setAttribute('value', value);
		} else {
			this.removeAttribute('value');
		}
	}

	/**
	 * Fires when an attribute has been changed.
	 * 
	 * @method	attributeChangedCallback
	 * @param 	{String} attrName Name of attribute.
	 * @param 	{*} oldValue Old value of attribute.
	 * @param 	{*} newValue New value of attribute.
	 */
	attributeChangedCallback(attrName, oldValue, newValue) {

		// Get the current phase of the current sequence.
		const phase = this.currentSequence.getCurrentPhase();

		const missedFirstValue = attrName === 'action' && phase === 'firstValue';
		const isFirstValue = attrName === 'value' && phase === 'firstValue';
		const isOperator = attrname === 'action' && phase === 'operator';
		const isLastValue = attrname === 'value' && phase === 'lastValue';

		if (missedFirstValue) {
			this.currentSequenceSetSteps.next(this.value);
		}

		if (isFirstValue || isOperator || isLastValue) {
			this.currentSequenceSetSteps.next(newValue);
		}

		if (isLastValue) {
			this.currentSequence = new Sequence('firstValue', 'operator', 'lastValue');
			this.currentSequenceSetSteps = this.currentSequence.setSteps();
		}

	}

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

		// Add the event listeners.
		this.addEventListener('click', this.onClick);

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		// Remove the event listeners.
		this.removeEventListener('click', this.onClick);

	}

	/**
	 * Fires when the element has been adopted in a new document.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

	}

	/**
	 * Add a and b together.
	 * 
	 * @method	add
	 * @param	{number} a Number represented as a.
	 * @returns	{number}
	 */
	addBy(a) {
		return this.calculate(this.value, a, operators.add);
	}

	/**
	 * Subtract b from a.
	 * 
	 * @method	subtract
	 * @param	{number} a Number represented as a.
	 * @returns	{number}
	 */
	subtractBy(a) {
		return this.calculate(this.value, a, operators.subtract);
	}

	/**
	 * Multiply a by b.
	 * 
	 * @method	multiply
	 * @param	{number} a Number represented as a.
	 * @returns	{number}
	 */
	multiplyBy(a) {
		return this.calculate(this.value, a, operators.multiply);
	}

	/**
	 * Divide a by b.
	 * 
	 * @method	divide
	 * @param	{number} a Number represented as a.
	 * @returns	{number}
	 */
	divideBy(a) {
		return this.calculate(this.value, a, operators.divide);
	}

	/**
	 * 
	 * @param 	{number} a 
	 * @param 	{number} b 
	 * @param 	{Function} operator 
	 */
	calculate(a, b, operator) {
		return operator(a, b);
	}

}