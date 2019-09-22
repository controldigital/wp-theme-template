/**
 * @module      ./components/banner/events
 */

/**
 * @function	onScroll
 * @param		{Event} event
 * @returns		{void}
 */
export const onScroll = function onScroll() {
    const top = document.scrollingElement.scrollTop || document.documentElement.scrollTop;
    if (top >= this.threshold) {
        if (this.scrolled === null) {
            this.scrolled = true;
        }
    } else {
        if (this.scrolled !== null) {
            this.scrolled = false;
        }
    }
};

/**
 * @function	onSlotChange
 * @returns		{void}
 */
export const onSlotChange = function onSlotChange(event) {
    
    // Get next assigned nodes.
    const { target } = event;
    const { name } = target;
    const elements = target.assignedElements();
    
    if (name === 'menu') {
        this.menus = element;
    } else if (name === 'toggle') {
        this.toggles = elements;
    }

	/**
     * @function    clickPrev
     * @param       {Event} event
     * @returns     {void}
     */
    const toggleMenu = function toggleMenu(event) {
        
        if (!this.hasAttribute('aria-controls')) {
            console.error
        }

        event.preventDefault();
	}
	
	// Add click event listener to assigned nodes.
	elements.forEach(node => node.addEventListener('click', clickNext));

};