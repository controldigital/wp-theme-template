/**
 * @module		./components/fab/events
 */

/**
 * @function	onMouseEnter
 * @param		{Event} event
 * @returns		{void}
 */
export const onMouseEnter = function onMouseEnter() {
	this.open = true;
};

/**
 * @function	onMouseLeave
 * @param		{Event} event
 * @returns		{void}
 */
export const onMouseLeave = function onMouseLeave() {
	this.open = false;
};

/**
 * @function	onClick
 * @param		{Event} event
 * @returns		{void}
 */
export const onClick = function onClick() {
	if (this.open !== null) {
		this.open = false;
	} else {
		this.open = true;
	}
};