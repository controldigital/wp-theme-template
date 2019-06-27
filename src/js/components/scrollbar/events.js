/**
 * @module          ./components/scrollbar/events
 */

// The properties to transform.
const properties = ['webkitTransform', 'mozTransform', 'transform'];

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

    // Apply the transformation to the scrollbar.
    properties.forEach((prop) => {
        if (this.bar.style.hasOwnProperty(prop)) {
            this.bar.style[prop] = `translate3d(${percentage}%, 0, 0)`;
        }
    });

};