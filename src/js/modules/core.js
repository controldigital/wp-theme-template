/**
 * @modules		./modules/core
 */

// Import Web Component definer
import definer from 'Components/define.js';
import { 
	getElement,
	getElements 
} from 'Utilities/elements.js';

/**
 * Service Worker module.
 * 
 * @function	serviceWorker
 * @param 		{String} scriptURL The URL of the service worker script.
 * @param		{Object} options An object containing registration options.
 * @param		{String} options.scope A USVString representing a URL that defines a service worker's registration scope.
 * @returns		{Promise}
 */
export const serviceWorker = (scriptURL, options  = {scope: '/wp-content/'}) => registerServiceWorker(scriptURL, options);

/**
 * Custom elements module.
 * 
 * @function	customElements
 * @returns		{Promise}
 */
export const customElements = () => definer.defineAll();

/**
 * Menu module
 * 
 * @function	menu
 * @returns		{void}
 */
export const menu = () => {

	// Get elements
	const menu = getElement('.js-menu');
	const buttons = getElements('.js-toggle-menu');

	/**
	 * Loop over buttons and set the aria-expanded
	 * attribute value.
	 * 
	 * @function	setButtonsAria
	 * @param 		{String} value Value of the aria-expanded attribute
	 * @returns		{Array} Array of buttons
	 */
	const setButtonsAria = value => buttons.forEach(button => button.setAttribute('aria-expanded', value));

	/**
	 * click event handler.
	 * 
	 * @function	onClick
	 * @param 		{Event} event 
	 * @returns		{void}
	 */
	const onClick = event => {
		if (menu) {
			if (menu.open === null) {
				setButtonsAria('true');
				menu.open = true;
			} else {
				setButtonsAria('false');
				menu.open = false;
			}
		}
		event.preventDefault();
	};

	// Add the event listeners to the buttons.
	buttons.forEach(button => button.addEventListener('click', onClick));

};
