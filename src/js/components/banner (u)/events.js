/**
 * @module      ./components/banner/events
 */

/**
 * @function	onScroll
 * @param		{Event} event
 * @returns		{void}
 */
export const onScroll = function onScroll() {
    requestAnimationFrame(() => {
        const top = document.scrollingElement.scrollTop || document.documentElement.scrollTop;
        if (top >= this.threshold) {
            if (this.room !== null) {
                if (top > this.lastScrollTop) {
                    if (this.down !== null) {
                        this.down = false;
                    }
                    this.up = true;
                } else if (top < this.lastScrollTop) {
                    if (this.up !== null) {
                        this.up = false;
                    }
                    this.down = true;
                }
            }
            if (this.scrolled === null) {
                this.scrolled = true;
            }
        } else {
            if (this.room !== null) {
                if (this.up !== null) {
                    this.up = false;
                }
                if (this.down !== null) {
                    this.down = false;
                }
            }
            if (this.scrolled !== null) {
                this.scrolled = false;
            }
        }
        this.lastScrollTop = top;
    });
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

};