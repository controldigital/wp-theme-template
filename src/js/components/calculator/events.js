/**
 * @module		./components/calculator/events
 */

export const onKeyDown = function onKeyDown(event) {

	const { keyCode } = event;
	switch(keyCode) {
		case 49:
			
			break;
	}

};

/**
 * Click event handler.
 * 
 * @function	onClick
 * @param 		{Event} event The click event.
 * @returns		{void}
 */
export const onClick = function onClick(event) {
	const { target } = event;

	const isAction = target.hasAttribute('data-action');
	const isValue = target.hasAttribute('data-value');
	const correctTarget = isAction || isValue;

	if (!correctTarget) {
		return;
	}

	if (isAction) {

		const action = target.getAttribute('data-action');
		const selectedAction = this.actions[action];

		if (typeof selectedAction === 'undefined') {
			return false;
		}

		this.action = action;
		selectedAction(this.value);

		event.preventDefault();

	} else if (isValue) {

		const value = target.getAttribute('data-value');
		this.action = '';

		event.preventDefault();

	}

};