/**
 * @module      ./components/menu/events
 */

/**
 * On click handler for menu element.
 * 
 * @function    onClick
 * @param       {Event} event 
 * @returns     {void}
 */
export const onClick = function onClick(event) {
    const { target } = event;
    const { targetElement } = target;
    if (targetElement !== null) {
        
    }
    event.preventDefault();
};