/**
 * @module          ./components/scrollbar/events
 */

// The properties to transform.
const properties = ['webkitTransform', 'mozTransform', 'transform'];

// A map of the available axis and their transformations.
const transformAxis = {
    horizontal: (percentage) => `translate3d(${-100 + percentage}%, 0, 0)`,
    vertical: (percentage) => `translate3d(0, ${-100 + percentage}%, 0)`
};

/**
 * Scroll event handler function.
 * 
 * @function    onScroll
 * @returns     {void}
 */
export const onScroll = function onScroll() {
    
    // The scrollable height of the document.
    const scrollHeight = document.documentElement.scrollHeight;

    // The current scroll position.
    const scrollTop = document.scrollingElement ? document.scrollingElement.scrollTop : document.documentElement.scrollTop;
    
    // The percentage of the amount scrolled.
    const percentage = scrollTop / (scrollHeight - window.innerHeight) * 100;

    // The selected axis.
    const axis = transformAxis[this.axis];

    // Apply the transformation to the scrollbar.
    properties.forEach((prop) => {
        if (this.bar.style.hasOwnProperty(prop)) {
            requestAnimationFrame(() => this.bar.style[prop] = axis(percentage));
        }
    });

};