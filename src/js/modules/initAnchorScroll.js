/**
 * anchorScroll
 * 
 * Setup the anchor scrolling functionality.
 * 
 * @function
 * @since	1.0
 * @returns	{void}
 */

export const initAnchorScroll = () => {

    /**
     * Get all anchors in the document.
     * @type	{HTMLCollection}
     */
    const anchors = document.querySelectorAll('.js-anchor');

     /**
     * Get all sections but excluding the hero element
     * @type	{HTMLCollection}
     */
    const sections = document.querySelectorAll('section:not(.hero)');

    /**
     * Scroll options for scrollIntoView
     * @type	{Object}
     */
    const scrollOptions = {
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
    };

    /**
     * scrollTo
     * 
     * Makes the target of the href 
     * scroll into view.
     * 
     * @param 	{Event} event
     * @returns	{void}
     */
    const scrollTo = function scrollTo(event) {
        let el = this;
        if (el.hasAttribute('href')) {
            let hash = el.hash;
            let target = document.querySelector(hash);
            target.scrollIntoView(scrollOptions);    
            event.preventDefault();
        }
    };

    /**
     * addScrollHandler
     * 
     * Binds the scrollTo function to
     * the anchor element.
     * 
     * @param 	{HTMLElement} anchor
     * @returns	{void}
     */
    const addScrollHandler = (anchor) => {
        anchor.addEventListener('click', scrollTo);
    };

    /**
     * Add click event to each anchor.
     */
    // Array.prototype.forEach.call([...anchors], addScrollHandler());
    [...anchors].forEach(addScrollHandler);

    /**
     * Add id to first section on the page 
     */
    if (sections.length > 0) {
        sections[0].setAttribute("id", "section-first");
    }

};