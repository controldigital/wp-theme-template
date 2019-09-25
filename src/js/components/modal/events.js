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
export const onKeyDown = function onKeyDown({ keyCode }) {
	switch(keyCode) {
		case 27: // Escape
			this.open = false;
			break;
	}
};