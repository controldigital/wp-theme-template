/**
 * @modules		./modules/core
 */

// Import Web Component definer
import { registerServiceWorker } from 'Utilities/sw.js';
import Cookie from 'Utilities/Cookie.js';
import { 
	getElement,
	getElements 
} from 'Utilities/elements.js';
import definer from 'Components/define.js';

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

/**
 * The cookie module
 * 
 * @function	cookie
 * @returns		{void}
 */
export const cookie = () => {

	/**
	 * Returns the cookie name set in WP Customizer
	 * or else returns a default cookie.
	 * 
	 * @function	getCookieName
]	 * @returns		{String}
	 */
	const getCookieName = () => {
		return cookieData.name ? cookieData.name : 'wp-cookie-consent';
	};

	/**
	 * Returns the amount of days for the cookie to expire in a floating point
	 * format or default year in days.
	 * 
	 * @function	getCookieExpirationDate
	 * @returns		{Number}
	 */
	const getCookieExpirationDate = () => {
		return cookieData.expire ? parseFloat(cookieData.expire) : 365;
	};

	/**
	 * Gets the scripts from the global cookie variable.
	 * 
	 * @function	getCookieScripts
	 * @returns		{Object}
	 */
	const getCookieScripts = () => {
		return cookieData.scripts ? cookieData.scripts : {};
	}

	/**
	 * Shows the cookie.
	 * 
	 * @function	removeCookieModal
	 * @param 		{HTMLElement} notice Element of cookie notice to hide
	 * @returns		{void}
	 */
	const showCookieModal = (modal) => {
		modal.classList.remove('cookie--hidden');
	}

	/**
	 * Removes the cookie notice from the DOM.
	 * 
	 * @function	removeCookieModal
	 * @param 		{HTMLElement} notice Element of cookie notice to hide
	 * @returns		{void}
	 */
	const removeCookieModal = (modal) => {
		modal.classList.add('cookie--hidden');
		setTimeout(() => {
			modal.remove();
		}, 350);
	};

	/**
	 * Helper function to append a script string to
	 * the head or the body tag in the appropriate place.
	 * 
	 * @function	insertScript
	 * @param 		{String} destination The head or body.
	 * @param 		{String} script Script to append.
	 * @returns		{Promsise<HTMLElement>}
	 */
	const insertScript = (script, element, position) => 
		new Promise((resolve, reject) => {
			const destination = document.querySelector(element);
			if (destination) {
				destination.insertAdjacentHTML(position, script);
				resolve(element);
			}
			reject(new Error('element to insert to is null'));
		});

	/**
	 * Submit event handler for the cookie form.
	 * 
	 * @function	onFormSubmit
	 * @param 		{Event} event 
	 */
	const onFormSubmit = (event) => {
		event.preventDefault();
	};

	/**
	 * Click event hanlder for accepting the cookie. 
	 * Sets the cookie with a true value and appends any head or body scripts.
	 * 
	 * @function	onAccept
	 * @param		{Event} event 
	 */
	const onAccept = function onAccept(event) {
		const { head, bodyStart, bodyEnd } = getCookieScripts();
		const inserts = [
			insertScript(head, 'head', 'beforeend'),
			insertScript(bodyStart, 'body', 'afterbegin'),
			insertScript(bodyEnd, 'body', 'beforeend')
		];
		this.set('true', getCookieExpirationDate(), '/');
		removeCookieModal(notice);
		Promise.all(inserts).then(() => console.info('Cookie accepted. Scripts added.'));
		event.preventDefault();
	};

	/**
	 * Click event handler for refusing the cookie. 
	 * Sets the cookie with a false value
	 * 
	 * @function	onRefuse
	 * @param		{Event} event 
	 */
	const onRefuse = function onRefuse(event) {
		this.set('false', getCookieExpirationDate(), '/');
		removeCookieModal(notice);
		event.preventDefault();
	};

	/**
	 * Click event handler for revoking the cookie. 
	 * Removes the cookie and prompts the user to accept or refuse the cookie.
	 * 
	 * @function	onRevoke
	 * @param 		{Event} event 
	 * @returns		{void}
	 */
	const onRevoke = function onRevoke(event) {
		this.delete();
		window.location.reload();
		event.preventDefault();
	};

	// Cookie notice element
	const cookie = new Cookie(getCookieName());
	const notice = document.querySelector('.js-cookie');

	// If there is neither a notice or revoke form, stop.
	if (!notice) {
		return;
	}

	// Stop if cookie is not present
	if (!notice || cookie.get() !== false) {
		return
	};

	// Show the cookie
	showCookieModal(notice);

	// Disable default submit behaviour
	const cookieForm = document.querySelector('.js-cookie-form');
	if (cookieForm) {
		cookieForm.addEventListener('submit', onFormSubmit);
	}

	// Add click events to accept and refuse buttons
	const accept = document.querySelector('.js-cookie-accept');
	const refuse = document.querySelector('.js-cookie-refuse');
	const revoke = document.querySelector('.js-cookie-revoke');

	// Add submit and click events to form and button
	if (accept) {
		accept.addEventListener('click', onAccept.bind(cookie));
	}
	
	if (refuse) {
		refuse.addEventListener('click', onRefuse.bind(cookie));
	}

	if (revoke) {
		revoke.addEventListener('click', onRevoke.bind(cookie));
	}

};