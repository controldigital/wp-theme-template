/**
 * @module		./components/tabs/events
 */


/**
 * @function	onClick
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onClick = function onClick({ target }) {
	const tab = target.closest('ctrl-tab');
	if (tab) {
		const tabs = this.tabs;
		const index = tabs.indexOf(tab);
		if (index !== -1) {
			this.selected = index;
		}
	}
};

/**
 * @function	onKeyDown
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onKeyDown = function onKeyDown({ keyCode }) {
	switch(keyCode) {
		case 37: // Arrow left
		case 38: // Arrow up
			this.prevTab();
			break;
		case 39: // Arrow right
		case 40: // Arrow down
			this.nextTab();
			break;
		case 36: // Home
			this.firstTab();
			break;
		case 35: // End
			this.lastTab();
			break;
		default:
			return;
	}
};

// Keeping tab of how many instances are created.
let tabInstanceIndex = 0;

/**
 * @function	onSlotChange
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onSlotChange = function onSlotChange() {

	// Get all the tabs in the element.
	const tabs = this.tabs;

	// Loop over the tabs and connect them to the panels.
	tabs.forEach((tab, i) => {

		// Get the panel element.
		const panel = tab.nextElementSibling;

		if (panel.tagName.toLowerCase() !== 'ctrl-panel') {
			throw new Error(`The element after tab #${i} has to be a ctr-panel element.`);
		}

		// Create id or set the id.
		if (tab.id === '') {
			tab.setAttribute('aria-controls', `ctrl-panel-${tabInstanceIndex}-${i}`);
			panel.setAttribute('aria-labelledby', `ctrl-tab-${tabInstanceIndex}-${i}`);
			tabInstanceIndex++;
		} else {
			tab.setAttribute('aria-controls', panel.id);
			panel.setAttribute('aria-labelledby', tab.id);
		}

		// Get the selected tab.
		const index = tabs.findIndex(tab => tab.selected) || 0;
		
		// Set the selected tab.
		this.selected = index;

	});

};