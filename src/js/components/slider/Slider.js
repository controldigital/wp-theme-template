/**
 * @module		./components/slider/Slider
 */

import { attachShadowToElement } from 'Components/shadow.js';
import EventsCollection from 'Utilities/events.js';
import { createSliderTemplate } from './template.js';
import {
	onTouchStart,
	onTouchMove,
	onTouchEnd,
	onWheel,
	onKeyDown,
	onMouseEnter,
	onMouseLeave,
	onClick,
	onSlideSlotChange,
	onPrevSlotChange,
	onNextSlotChange
} from './events.js';
import { 
	isIndexBetween,
	hasFeatures,
	isTouchDevice,
} from 'Utilities/tools.js';

// Create template for Shadow DOM.
const template = createSliderTemplate();

// If there is passive events support.
const passive = hasFeatures('Passive Events') ? {passive: true} : false;

/**
 * HTMLSliderElement
 * @class
 * @extends	HTMLElement
 */
export default class HTMLSliderElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['amount', 'index', 'moving'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create the Shadow DOM.
		const shadow = attachShadowToElement.call(this, template);

		// Get the rails.
		this.rails = shadow.querySelector('.rails');
		this.slides = [];
		
		// Create a list of all events and their listeners.
		this.events = new EventsCollection();
		this.events.set(this, 'touchstart', onTouchStart.bind(this), passive);
		this.events.set(this, 'touchend', onTouchMove.bind(this), passive);
		this.events.set(this, 'touchmove', onTouchEnd.bind(this), passive);
		this.events.set(this, 'wheel', onWheel.bind(this), passive);
		this.events.set(this, 'keydown', onKeyDown.bind(this), false);
		this.events.set(this, 'mouseenter', onMouseEnter.bind(this), false);
		this.events.set(this, 'mouseleave', onMouseLeave.bind(this), false);
		this.events.set(this, 'click', onClick.bind(this), false);

		// Get the slide slot and listen for the onSlotChange event.
		const slide = shadow.querySelector('slot[name=slide]');
		const prev = shadow.querySelector('slot[name=prev]');
		const next = shadow.querySelector('slot[name=next]');

		// Set slotchange events.
		slide.addEventListener('slotchange', onSlideSlotChange.bind(this));
		prev.addEventListener('slotchange', onPrevSlotChange.bind(this));
		next.addEventListener('slotchange', onNextSlotChange.bind(this));

	}

	/**
	 * Gets and sets the amount attribute.
	 * @property
	 */
	get amount() {
		return parseInt(this.getAttribute('amount'));
	}

	set amount(value) {
		if (value !== Number.isNaN(value)) {
			this.setAttribute('amount', value);
		} 
	}

	/**
	 * Gets and sets the axis attribute.
	 * @property
	 */
	get axis() {
		return this.getAttribute('axis');
	}

	set axis(value) {
		if ('string' === typeof value) {
			if (value === 'horizontal' || value === 'vertical') {
				this.setAttribute('axis', value);
			}
		} 
	}

	/**
	 * Gets and sets the delay attribute.
	 * @property
	 */
	get delay() {
		return parseInt(this.getAttribute('delay'));
	}

	set delay(value) {
		if (value !== Number.isNaN(value)) {
			this.setAttribute('delay', value);
		} 
	}

	/**
	 * Gets and sets the hover attribute.
	 * @property
	 */
	get hover() {
		const value = this.getAttribute('hover');
		if (value !== null) {
			return true;
		}
		return false;
	}

	set hover(value) {
		if (value === true) {
			this.setAttribute('hover', '');
		} else {
			this.removeAttribute('hover');
		}
	}

	/**
	 * Gets and sets the index attribute.
	 * @property
	 */
	get index() {
		return parseInt(this.getAttribute('index'));
	}

	set index(value) {
		if (value !== Number.isNaN(value)) {
			if (isIndexBetween(value, 0, this.slides.length - this.amount + 1)) {
				this.setAttribute('index', value);
			} else {
				this.slideToIndex(this.index);
			}
		} 
	}

	/**
	 * Gets and sets the loop attribute.
	 * @property
	 */
	get loop() {
		const value = this.getAttribute('loop');
		if (value !== null) {
			return true;
		}
		return false;
	}

	set loop(value) {
		if (value === true) {
			this.setAttribute('loop', '');
		} else {
			this.removeAttribute('loop');
		}
	}

	/**
	 * Gets and sets the moving attribute.
	 * @property
	 */
	get moving() {
		const value = this.getAttribute('moving');
		if (value !== null) {
			return true;
		}
		return false;
	}

	set moving(value) {
		if (value === true) {
			this.setAttribute('moving', '');
		} else {
			this.removeAttribute('moving');
		}
	}

	/**
	 * Gets and sets the speed attribute.
	 * @property
	 */
	get speed() {
		return parseInt(this.getAttribute('speed'));
	}

	set speed(value) {
		if (value !== Number.isNaN(value)) {
			this.setAttribute('speed', value);
		} 
	}

	/**
	 * Gets and sets the touch-threshold attribute.
	 * @property
	 */
	get touchThreshold() {
		return parseInt(this.getAttribute('touch-threshold'));
	}

	set touchThreshold(value) {
		if (value !== Number.isNaN(value)) {
			this.setAttribute('touch-threshold', value);
		} 
	}

	/**
	 * Gets and sets the wheel-threshold attribute.
	 * @property
	 */
	get wheelThreshold() {
		return parseInt(this.getAttribute('wheel-threshold'));
	}

	set wheelThreshold(value) {
		if (value !== Number.isNaN(value)) {
			this.setAttribute('wheel-threshold', value);
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

		switch(attrName) {
			case 'amount':
			case 'index':
				if (newValue !== null && this.slides.length) {
					const index = this.index;
					const length = index + this.amount;
					const detail = { detail: { index } };
					const slidesChangeEvent = new CustomEvent('slideschange', detail);
					this.slides.forEach((slide, i) => {
						if (index >= i && i < length) {
							slide.active = true;
						} else {
							slide.active = false;
						}
					});
					this.slideToIndex(index);
					this.dispatchEvent(slidesChangeEvent);
				}
				break;
			case 'moving':
				if (newValue !== null) {
					const moveStartEvent = new Event('movestart');
					const transition = `transform ${this.speed}ms ease-in-out`;
					this.rails.style.webkitTransition = transition;
					this.rails.style.transition = transition;
					this.dispatchEvent(moveStartEvent);
				} else {
					const moveEndEvent = new Event('moveend');
					this.rails.style.webkitTransition = '';
					this.rails.style.transition = '';
					this.dispatchEvent(moveEndEvent);
				}
				break;
		}

	}

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

		// Set default axis.
		if (this.axis === null) {
			this.axis = 'horizontal';
		}

		// Set default speed.
		if (Number.isNaN(this.speed)) {
			this.speed = 350;
		}

		// Set default wheelThreshold.
		if (Number.isNaN(this.touchThreshold)) {
			this.touchThreshold = 4;
		}

		// Set default wheelThreshold.
		if (Number.isNaN(this.wheelThreshold)) {
			this.wheelThreshold = 50;
		}

		// Set timeout.
		this.timeout = null;

		// Touchstates.
		this.touch = {
			start: null,
			move: null,
			end: null,
			distance: null,
			threshold: 4
		};

		// Add event listeners
		this.events.add();

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		// Remove event listeners.
		this.events.remove();

	}

	/**
	 * Fires when the element has been adopted in a new document.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

		this.disconnectedCallback();
		this.connectedCallback();

	}

	/**
	 * Returns the first slide of the slider.
	 * 
	 * @method	firstSlide
	 * @returns	{SlideElement}
	 */
	firstSlide() {
		if (this.slides.length !== 0) {
			return this.slides[0];
		}
	}

	/**
	 * Returns the last slide of the slider.
	 * 
	 * @method	lastSlide
	 * @returns	{SlideElement}
	 */
	lastSlide() {
		if (this.slides.length !== 0) {
			return this.slides[this.slides.length - 1];
		}
	}

   /**
     * Makes the slider continue to the next slide.
	 * Shorthand for changing the index directly.
     * 
     * @method  nextSlide
     * @returns	{this} The SliderElement instance.
     */
    nextSlide() {
        this.index += 1;
    }

    /**
     * Makes the slider go to the previous slide.
	 * Shorthand for changing the index directly.
     * 
     * @method  prevSlide
     * @returns	{this} The SliderElement instance.
     */
    prevSlide() {
        this.index -= 1;
	}

	/**
	 * Move the rails to a position.
	 * 
	 * @method	moveTo
	 * @param 	{string} position 
	 * @returns	{this}
	 */
	moveTo(position) {

		// Value for storing the transform value.
		let value;

		// Move rails based on the axis.
		if (this.axis === 'horizontal') {
			value = `translate3d(${position}, 0, 0)`;
		} else if (this.axis === 'vertical') {
			value = `translate3d(0, ${position}, 0)`;
		}

		// Transform the rails element.
		requestAnimationFrame(() => {
			this.rails.style.webkitTransform = value;
			this.rails.style.transform = value;
		});

		return this;

	}

	/**
	 * Move the rails to a position.
	 * 
	 * @method	moveTo
	 * @param 	{string} position 
	 * @returns	{this}
	 */
	moveToIndex(index) {
		if (isIndexBetween(index, 0, this.slides.length)) {
			const position = `-${(100 / this.amount) * this.index}%`;
			this.moveTo(position);
		}
		return this;
	}

	/**
	 * Moves the slider with transition to position
	 * in pixels;
	 * 
	 * @method	slideTo
	 * @uses	moveTo
	 * @param	{string} position Position of rails in a string.
	 * @returns	{Promise<this>} The SliderElement instance on resolve.
	 */
	slideTo(position) {
		return new Promise(resolve => {
			this.moving = true;
			this.moveTo(position);
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.moving = false;
				resolve(this);
			}, this.speed);
		});
	}

	/**
	 * Moves to slide to a slide selected by the 
	 * index of that slide.
	 * 
	 * @method	slideToIndex
	 * @uses	slideTo
	 * @param 	{number} index Index of the slide.
	 * @returns	{Promise<this>} The SliderElement instance on resolve.
	 */
	slideToIndex(index) {
		return new Promise(resolve => {
			this.moving = true;
			this.moveToIndex(index);
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.moving = false;
				resolve(this);
			}, this.speed);
		});
	}

}