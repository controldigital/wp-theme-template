/**
 * @module      ./vendor/gravity-forms
 */

/**
 * Adds a focus class to the label of an input element in Gravity Forms.
 * This enables the label to be manipulated on focus.
 * 
 * @example
 * HTMLFormElement.addEventListener('focusin', gfFocusLabel, false);
 * 
 * @function
 * @since	1.0
 * @param 	{Event} event 
 */
export const gfFocusLabel = (event) => {
	if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
		let parent = event.target.parentNode;
		if (parent.classList.contains('ginput_container')) {
			let label = parent.previousSibling;
			if (label.classList.contains('gfield_label')) {
				label.classList.add('gfield_label--focus');
			}
		}
	}
};

/**
 * Removes a focus class to the label of an input element in Gravity Forms
 * This enables the label to be manipulated on blur.
 * 
 * @example
 * HTMLFormElement.addEventListener('focusout', gfBlurLabel, false);
 * 
 * @function
 * @since	1.0
 * @param 	{Event} event 
 */
export const gfBlurLabel = (event) => {
	if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
		if (event.target.value === '') {
			let parent = event.target.parentNode;
			if (parent.classList.contains('ginput_container')) {
				let label = parent.previousSibling;
				if (label.classList.contains('gfield_label')) {
					label.classList.remove('gfield_label--focus');
				}
			}
		}
	}
};