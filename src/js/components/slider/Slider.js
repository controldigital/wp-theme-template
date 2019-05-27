/**
 * @module		./components/slider/Slider
 */

import { isNumberBetween } from '../../modules/tools';
import HTMLSlidesCollection from './Collection';

/**
 * HTMLSliderElement
 * @class
 */
export class HTMLSliderElement extends HTMLElement {

	/**
	 * Attributes to trigger the attributeChangedCallback on.
	 * 
	 * @static
	 * @get
	 * @method	observedAttributes
	 * @returns	{String[]}
	 */
	static get observedAttributes() {
		return ['amount', 'axis', 'delay', 'speed', 'loop', 'hover', 'moving'];
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Create a new shadowDOM layer.
		const shadow = this.attachShadow({mode: 'open'});
		
		// Create a template, add the styles and children.
		const template = document.getElementById('template-slider');
		if (!template) {
			throw new Error(`
				The template with the id "template-card" has not been found.
				Please append it to the body of the DOM.
			`);
		}

		// Append the template to the shadowDOM.
		shadow.appendChild(template.content.cloneNode(true));

		// Setup starting index.
		this.activeSlideIndex = 0;

	}

	/**
	 * Gets and sets the amount attribute.
	 * @property
	 */
	get amount() {
		return this.getAttribute('amount');
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
				this.setAttribute('active', value);
			}
		} 
	}

	/**
	 * Gets and sets the delay attribute.
	 * @property
	 */
	get delay() {
		return this.getAttribute('delay');
	}

	set delay(value) {
		if (value !== Number.isNaN(value)) {
			this.setAttribute('amount', value);
		} 
	}

	/**
	 * Gets and sets the speed attribute.
	 * @property
	 */
	get speed() {
		return this.getAttribute('speed');
	}

	set speed(value) {
		if (value !== Number.isNaN(value)) {
			this.setAttribute('amount', value);
		} 
	}

	/**
	 * Gets and sets the loop attribute.
	 * @property
	 */
	get loop() {
		return this.getAttribute('loop');
	}

	set loop(value) {
		if (value === true) {
			this.setAttribute('loop', '');
		} else {
			this.removeAttribute('loop');
		}
	}

	/**
	 * Gets and sets the hover attribute.
	 * @property
	 */
	get hover() {
		return this.getAttribute('hover');
	}

	set hover(value) {
		if (value === true) {
			this.setAttribute('hover', '');
		} else {
			this.removeAttribute('hover');
		}
	}

	/**
     * Returns and sets the active slide element.
	 * Moves the slider to slide when a new index value is set.
     * 
     * @property
     */
    get activeSlide() {
        return this.slides[this.activeSlideIndex];
    }

    set activeSlide(index) {

		// If the index is a good index.
        if (isIndexBetween(index, 0, this.slides.length)) {
			this.activeSlideIndex = index;
		}

		// Set the right active slide.
		this.slides.setInactiveAll();
		this.slides.setActive(this.activeSlideIndex);

		// Now slide to it.
		this.slideToIndex(this.activeSlideIndex);

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

		if (attrName === 'moving') {
			if (newValue === '') {
				const transition = `transform ${this.speed}ms ease-in-out`;
				this.rails.style.webkitTransition = transition;
				this.rails.style.transition = transition;
			} else {
				this.rails.style.webkitTransition = '';
				this.rails.style.transition = '';
			}
		}

	}

	/**
	 * Fires when the element has been connected.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	connectedCallback() {

		/**
		 * Touchstates
		 */
		const touch = {
			start: null,
			move: null,
			end: null,
			distance: null,
			threshold: 4
		};

		// Get the rails.
		this.rails = this.shadowRoot.querySelector('.rails');
		
		// Create new slides collection
		this.slides = new HTMLSlidesCollection(...this.children);

		this.ontouchstart = (event) => {
			const { screenX, screenY } = event.changedTouches[0];
			touch.start = { 
				x: screenX,
				y: screenY 
			};
			touch.move = null;
			touch.end = null;
			touch.distance = null;
		};

		this.ontouchmove = (event) => {
			const { screenX, screenY } = event.changedTouches[0];
			touch.move = { 
				x: screenX, 
				y: screenY
			};
			touch.distance = { 
				x: touch.start.x - touch.move.x, 
				y: touch.start.y - touch.move.y 
			};
		};

		this.ontouchend = (event) => {
			if (touch.distance !== null) { 

			}
		};

		this.onwheel = (event) => {

		};

		this.onmouseenter = (event) => {
			this.hover = true;
		};

		this.onmouseleave = (event) => {
			this.hover = false;
		};

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		// Disable all events.
		this.ontouchstart = null;
		this.ontouchmove = null;
		this.ontouchend = null;
		this.onwheel= null;
		this.onmouseenter = null;
		this.onmouseleave = null;

	}

	/**
	 * Fires when the element has been adopted on a new page.
	 * 
	 * @method	connectedCallback
	 * @returns	{void}
	 */
	adoptedCallback() {

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
     * Makes the slider continue 
     * to the next slide.
     * 
     * @method  nextSlide
     * @returns	{this} The SliderElement instance.
     */
    nextSlide() {
        this.activeSlide = this.activeSlideIndex + 1;
    }

    /**
     * Makes the slider go to 
     * the previous slide.
     * 
     * @method  prevSlide
     * @returns	{this} The SliderElement instance.
     */
    prevSlide() {
        this.activeSlide = this.activeSlideIndex - 1;
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

		}
	}

	/**
	 * Moves the slider with transition to position
	 * in pixels;
	 * 
	 * @method	slideTo
	 * @uses	moveTo
	 * @param	{string} position Position of rails in px.
	 * @returns	{this} The SliderElement instance.
	 */
	slideTo(position) {
		this.moving = true;
		this.moveTo(position);
		setTimeout(() => {
			this.moving = false;
		}, this.duration);
	}

	/**
	 * Moves to slide to a slide selected by the 
	 * index of that slide.
	 * 
	 * @method	slideToIndex
	 * @uses	slideTo
	 * @param 	{number} index Index of slide.
	 * @returns	{this} The SliderElement instance.
	 */
	slideToIndex(index) {
		if (isIndexBetween(index, 0, this.slides.length)) {
			this.moving = true;
			this.moveToIndex(index);
			setTimeout(() => {
				this.moving = false;
			}, this.duration);
		}
	}

}