/**
 * @module		./components/like/events
 */


/**
 * @function	onChange
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onChange = function onChange(event) {
	const { target } = event;
	if (target.checked === true) {
		this.clicked = true;
	} else {
		this.clicked = false;
	}
};