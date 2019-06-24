/**
 * @module		./components/toggle/events
 */

/**
 * slotchange event handler for the toggle element.
 * 
 * @function	onSlotChange
 * @returns		{void}
 */
export const onSlotChange = function onSlotChange() {

	// Get the slotted input element and the label.
	const slot = this.shadowRoot.querySelector('slot[name="input"]');
	const input = slot.assignedElements();
	const label = this.shadowRoot.querySelector('label');

	// The input element needs an id.
	if (!input.hasAttribute('id')) {
		throw new Error('input element is missing an id attribute.');
	}

	// The input element needs a name.
	if (!input.hasAttribute('name')) {
		throw new Error('input element is missing a name attribute');
	}

	// Connect the label to the id.
	label.setAttribute('for', input.id);

};