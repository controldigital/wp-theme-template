/**
 * @module		./components/slider/events
 */

import { 
	createDirections,
	getRailsOffset
} from './functions.js';

/**
 * @function	onTouchStart
 * @param		{Event} event
 * @returns		{void}
 */
export const onTouchStart = function onTouchStart(event) {
	const { screenX, screenY } = event.changedTouches[0];
	this.touch.start = { 
		x: screenX,
		y: screenY 
	};
	this.touch.move = null;
	this.touch.end = null;
	this.touch.distance = null;
};

/**
 * @function	onTouchMove
 * @param		{Event} event
 * @returns		{void}
 */
export const onTouchMove = function onTouchMove(event) {
	if (this.moving === '') {
		return false;
	}
	const { screenX, screenY } = event.changedTouches[0];
	this.touch.move = { 
		x: screenX, 
		y: screenY
	};
	this.touch.distance = createDirections(
		this.touch.start.x - this.touch.move.x,
		this.touch.start.y - this.touch.move.y
	);
	const offset = getRailsOffset.call(this);
	const distance = createDirections(
		offset.x + this.touch.distance.horizontal, 
		offset.y + this.touch.distance.vertical,
		Math.round
	);
	this.moveTo(`${-distance[this.axis]}px`);
};

/**
 * @function 	onTouchEnd
 * @param		{Event} event
 * @returns		{void}
 */
export const onTouchEnd = function onTouchEnd(event) {
	if (this.touch.distance === null || this.moving === '') { 
		return false;
	}
	const { screenX, screenY } = event.changedTouches[0];
	const absTouchDistances = createDirections(
		this.touch.distance.horizontal, 
		this.touch.distance.vertical, 
		Math.abs
	);
	this.touch.end = {
		x: screenX,
		y: screenY
	};
	if (absTouchDistances[this.axis] >= this.touchThreshold) {
		if (this.touch.distance[this.axis] < 0) {
			this.prevSlide(); // Prev
		} else {
			this.nextSlide(); // Next
		} 
	} else {
		this.slideToIndex(this.index);
	}
};

/**
 * @function	onWheel
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onWheel = function onWheel({ deltaY }) {
	const absoluteDelta = Math.abs(deltaY);
	if (this.moving === null && absoluteDelta >= this.wheelThreshold) {
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
export const onKeyDown = function onKeyDown({ keyCode }) {
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
export const onMouseEnter = function onMouseEnter() {
	this.hover = true;
};

/**
 * @function	onMouseLeave
 * @param		{Event} event
 * @returns		{void}
 */
export const onMouseLeave = function onMouseLeave() {
	this.hover = false;
};

/**
 * @function	onClick
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onClick = function onClick(event) {

	// Get clicked slide.
	const { target } = event;
	const slide = target.closest('[slot="slide"]');

	// If a slide is clicked.
	if (slide !== null) {

		// If the slide was not active when clicked.
		if (slide.active === false) {

			// Slide to it.
			this.index = slide.index;
			event.preventDefault();

		}
	}
};

/**
 * @function	onSlotChange
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onSlideSlotChange = function onSlideSlotChange() {

	// Get slide slot.
	const slide = this.shadowRoot.querySelector('slot[name="slide"]');
	this.slides = slide.assignedNodes();

	// Set tabindex
	this.slides.forEach((slide, i) => {
		slide.index = i;
		slide.setAttribute('tabIndex', i);
	});

	// Set starting index.
	if (Number.isNaN(this.index)) {
		this.index = 0;
	}

	// Set default amount.
	if (Number.isNaN(this.amount)) {
		this.amount = 1;
	}

};

/**
 * @function	onPrevSlotChange
 * @returns		{void}
 */
export const onPrevSlotChange = function onPrevSlotChange() {

	// Get prev slot.
	const prev = this.shadowRoot.querySelector('slot[name="prev"]');
	const assignedNodes = prev.assignedNodes();

	/**
     * @function    clickPrev
     * @param       {Event} event
     * @returns     {void}
     */
    const clickPrev = event => {
        this.prevSlide();
        event.preventDefault();
	}

	// Add click event listener to assigned nodes.
	assignedNodes.forEach(node => node.firstElementChild.addEventListener('click', clickPrev));

};

/**
 * @function	onNextSlotChange
 * @returns		{void}
 */
export const onNextSlotChange = function onNextSlotChange() {

	// Get next assigned nodes.
	const next = this.shadowRoot.querySelector('slot[name="next"]')
	const assignedNodes = next.assignedNodes();

	/**
     * @function    clickPrev
     * @param       {Event} event
     * @returns     {void}
     */
    const clickNext = event => {
        this.nextSlide();
        event.preventDefault();
	}
	
	// Add click event listener to assigned nodes.
	assignedNodes.forEach(node => node.addEventListener('click', clickNext));

};