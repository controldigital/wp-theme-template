/**
 * @module		./components/slider/Slider
 */

import { 
	isIndexBetween,
	hasFeatures,
	isTouchDevice,
	createDirections
} from '../../modules/tools';
import HTMLSlidesCollection from './Collection';



/**
 * HTMLSliderElement
 * @class
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
		return ['moving', 'index'];
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
				this.setAttribute('active', value);
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
			this.setAttribute('amount', value);
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
	 * Gets and sets the moving attribute.
	 * @property
	 */
	get moving() {
		return this.getAttribute('moving');
	}

	set moving(value) {
		if (value === true) {
			this.setAttribute('moving', '');
		} else {
			this.removeAttribute('moving');
		}
	}

	/**
	 * Gets and sets the layout attribute.
	 * @property
	 */
	get layout() {
		return this.getAttribute('layout');
	}

	set layout(value) {
		if ('string' === typeof value) {
			if (value === 'boxed' || value === 'full') {
				this.setAttribute('layout', value);
			}
		} else {
			this.removeAttribute('layout');
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

		if (attrName === 'amount' || attrName === 'index') {
			if (newValue !== null && this.slides) {
				this.slides.setInactiveAll();
				let value = parseInt(this.index);
				let length = value + this.amount;
				for (let i = value; i < length; i ++) {
					this.slides.setActive(i);
				}
				this.slideToIndex(this.index);
			}
		} else if  (attrName === 'moving') {
			if (newValue !== null) {
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

		// Touchstates.
		const touch = {
			start: null,
			move: null,
			end: null,
			distance: null,
			threshold: 4
		};

		// Setup the slides when they are defined.
		customElements.whenDefined('control-slide').then(() => {

			// Get the rails.
			this.rails = this.shadowRoot.querySelector('.rails');
			
			// Create new slides collection.
			const slideChildren = [...this.children].filter((child) => child.tagName === 'CONTROL-SLIDE');
			this.slides = new HTMLSlidesCollection(...slideChildren);

			// Set tabindex.
			this.slides.forEach((slide, i) => slide.setAttribute('tabindex', i));

			// Setup starting index.
			if (Number.isNaN(this.index)) {
				this.index = 0;
			}

		});

		// Get the buttons.
		const buttons = this.querySelectorAll('button');
		this.buttons = [...buttons];

		// Set timeout.
		this.timeout = null

		/**
		 * Returns the offset position of the rails.
		 * 
		 * @function  	getRailsOffset
		 * @returns		{Object} Height and width times the index.
		 */
		const getRailsOffset = () => {
			return {
				x: (this.rails.offsetWidth / this.amount) * this.index,
				y: (this.rails.offsetHeight / this.amount) * this.index
			};
		};

		/**
		 * @typedef		directionsObject
		 * @type 		{Object} obj
		 * @param		{string} horizontal  
		 * @param		{string} vertical
		 */

		/**
		 * @function	onTouchStart
		 * @param		{Event} event
		 * @returns		{void}
		 */
		const onTouchStart = (event) => {
			const { screenX, screenY } = event.changedTouches[0];
			touch.start = { 
				x: screenX,
				y: screenY 
			};
			touch.move = null;
			touch.end = null;
			touch.distance = null;
		};

		/**
		 * @function	onTouchMove
		 * @param		{Event} event
		 * @returns		{void}
		 */
		const onTouchMove = (event) => {
			if (this.moving === '') {
				return false;
			}
			const { screenX, screenY } = event.changedTouches[0];
			touch.move = { 
				x: screenX, 
				y: screenY
			};
			touch.distance = createDirections(
				touch.start.x - touch.move.x,
				touch.start.y - touch.move.y
			);
			const offset = getRailsOffset();
			const distance = createDirections(
				offset.x + touch.distance.horizontal, 
				offset.y + touch.distance.vertical,
				Math.round
			);
			this.moveTo(`${-distance[this.axis]}px`);
		};

		/**
		 * @function 	onTouchEnd
		 * @param		{Event} event
		 * @returns		{void}
		 */
		const onTouchEnd = (event) => {
			if (touch.distance === null || this.moving === '') { 
				return false;
			}
			const { screenX, screenY } = event.changedTouches[0];
			const absTouchDistances = createDirections(
				touch.distance.horizontal, 
				touch.distance.vertical, 
				Math.abs
			);
			touch.end = {
				x: screenX,
				y: screenY
			};
			if (absTouchDistances[this.axis] >= touch.threshold) {
				if (touch.distance[this.axis] < 0) {
					this.prevSlide(); // Prev
				} else {
					this.nextSlide(); // Next
				} 
			} else {
				this.slideToIndex(this.index);
			}
		};

		// Wheel event threshold.
		const wheelThreshold = 50;

		/**
		 * @function	onWheel
		 * @param 		{Event} event 
		 * @returns		{void}
		 */
		const onWheel = (event) => {
			const { deltaY } = event;
			const absoluteDelta = Math.abs(deltaY);
			if (this.moving === null && absoluteDelta >= wheelThreshold) {
				if (deltaY < 0) {
					this.prevSlide();
				} else if (deltaY > 0) {
					this.nextSlide();
				}
			}
		};

		/**
		 * @function	onKeyDown
		 * @param 		{Event} event 
		 * @returns		{void}
		 */
		const onKeyDown = (event) => {
			const { keyCode } = event;
			if (this.axis === 'horizontal') {
				switch(keyCode) {
					case 37: // Arrow left
						this.prevSlide();
						break;
					case 39: // Arrow right
						this.nextSlide();
						break;
				}
			} else if (this.axis === 'vertical') {
				switch(keyCode) {
					case 38: // Arrow up
						this.prevSlide();
						break;
					case 40: // Arrow down
						this.nextSlide();
						break;
				}
			}
		};

		/**
         * @function	onMouseEnter
         * @param		{Event} event
         * @returns		{void}
         */
		const onMouseEnter = (event) => {
			this.hover = true;
		};

		/**
         * @function	onMouseLeave
         * @param		{Event} event
         * @returns		{void}
         */
		const onMouseLeave = (event) => {
			this.hover = false;
		};

		/**
		 * @function	onButtonClick
		 * @param		{Event} event
		 * @returns		{void}
		 */
		const onButtonClick = (event) => {
			const { target } = event;
			const { slot } = target;
			if (slot) {
				if (slot === 'prev') {
					this.prevSlide();
				} else if (slot === 'next') {
					this.nextSlide();
				}
				event.preventDefault();
			}
		};

		// If there is passive events support.
		const features = hasFeatures('Passive Events');

		// Touch event listeners.
		if (isTouchDevice) {
			this.addEventListener('touchstart', onTouchStart, features ? {passive: true} : false);
			this.addEventListener('touchmove', onTouchMove, features ? {passive: true} : false);
			this.addEventListener('touchend', onTouchEnd, features ? {passive: true} : false);
		}

		// Add other event listeners.
		this.addEventListener('wheel', onWheel, features ? {passive: true} : false);
		this.addEventListener('keydown', onKeyDown);
		this.addEventListener('mouseenter', onMouseEnter);
		this.addEventListener('mouseleave', onMouseLeave);

		// Add button event listeners.
		this.buttons.map(button => button.addEventListener('click', onButtonClick));

	}

	/**
	 * Fires when the element has been disconnected.
	 * 
	 * @method	disconnectedCallback
	 * @returns	{void}
	 */
	disconnectedCallback() {

		//TODO: Disable all events.

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
		if (isNumberBetween(index, 0, this.slides.length)) {
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