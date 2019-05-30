/**
 * @module		./components/cookie/events
 */

import Cookie from '../../modules/Cookie.js';
import { appendScript } from './scripts.js';

/**
 * @function	onSubmit
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onSubmit = function onSubmit(event) {

	// Get the values from the form.
	const form = event.target;
	const formData = new FormData(form);

	const name = formData.get('cookie_name');
	const expirationDate = formData.get('cookie_expiration_date');
	const scripts = Cookie.getScripts();

	// If is accepted.
	if (formData.has('accept')) {
		Cookie.set(name, 'true', expirationDate, '/');
		const keys = Object.keys(scripts);
		Promise.all(keys.map((key) => appendScript(key, scripts[key]))).then(() => { 
			this.destroy();
			console.info('Cookie accepted. Scripts have been added.');
		});
	}

	// If is rejected.
	else if (formData.has('reject')) {
		Cookie.set(name, 'false', expirationDate, '/');
		this.destroy();
		console.info('Cookie refused. Scripts have not been added.');
	}

	// If is revoked.
	else if (formData.has('revoke')) {
		Cookie.delete(name);
		window.location.reload();
	}

	event.preventDefault();
	
};