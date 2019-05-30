/**
 * @module		./components/modal/events
 */


/**
 * @function	onClick
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onClick = function onClick(event) {
	const { target } = event;
	if (target === this || target.closest('button') !== null) {
		this.open = false;	
		event.preventDefault();
	}
};

/**
 * @function	onKeyDown
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onKeyDown = function onKeyDown(event) {
	const { keyCode } = event;
	switch(keyCode) {
		case 27: // Escape
			this.open = false;
	}
};

/**
 * @function	onLabelSlotChange
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onLabelSlotChange = function onLabelSlotChange() {
	const label = this.querySelector('[slot=label]');
	if (label.id) {
		this.setAttribute('aria-labelledby', label.id);
	}
};

/**
 * @function	onDescriptionSlotChange
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onDescriptionSlotChange = function onDescriptionSlotChange() {
	const description = this.querySelector('[slot=description]');
	if (description.id) {
		this.setAttribute('aria-describedby', description.id);
	}
};