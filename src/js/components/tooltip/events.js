/**
 * @module		components/tooltip/events
 */

/**
 * Slot change event handler.
 * Gets the describing element and sets the
 * aria-describedby attribute, connecting the description
 * to the tooltip.
 * 
 * @function	onSlotChange
 * @param 		{Event} event
 * @returns		{void} 
 */
export const onSlotChange = function onSlotChange() {
	
	// Get the description element.
	const description = this.querySelector('[slot="description"]');
	if (description && description.id !== '') {
		this.setAttribute('aria-describedby', description.id);
	} else {
		this.removeAttribute('aria-describedby');
	}

};

/**
 * Mouse enter event handler.
 * 
 * @function	onMouseEnter
 * @param 		{Event} event
 * @returns		{void} 
 */
export const onMouseEnter = function onMouseEnter(event) {
	const { target } = event;
};

/**
 * Mouse leave event handler.
 * 
 * @function	onMouseLeave
 * @param 		{Event} event
 * @returns		{void} 
 */
export const onMouseLeave = function onMouseLeave(event) {
	const { target } = event;
};