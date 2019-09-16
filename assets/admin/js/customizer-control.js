/**
 * customizer-control.js
 * 
 * Modify the controls of the customizer.
 */

(function ($) {
	'use strict';

	wp.customize.bind('ready', function() {
		var customize = this;
		
		// Privacy policy active / inactive
        customize('cookie_read_more_active', function(value) {

			// Get privacy policy fields
			var cookiePolicyButton = customize.control('cookie_read_more_label').container.find('input');
			var cookiePolicyPage = customize.control('cookie_read_more_page').container.find('select');

			// Disabled fields on default
			cookiePolicyButton.prop('disabled', !value.get());
			cookiePolicyPage.prop('disabled', !value.get());

			// Enable fields when checkbox is checked
			value.bind(function(to) {
				cookiePolicyButton.prop('disabled', !to);
				cookiePolicyPage.prop('disabled', !to);
			});
		});

		// Privacy policy active / inactive
        customize('cookie_refuse_active', function(value) {

			// Get privacy policy fields
			var cookieRefuseButton = customize.control('cookie_refuse_label').container.find('input');

			// Disabled fields on default
			cookieRefuseButton.prop('disabled', !value.get());

			// Enable fields when checkbox is checked
			value.bind(function(to) {
				cookieRefuseButton.prop('disabled', !to);
			});
		});

		// Privacy policy active / inactive
        customize('cookie_revoke_active', function(value) {

			// Get privacy policy fields
			var cookieRevokeButton = customize.control('cookie_revoke_label').container.find('input');

			// Disabled fields on default
			cookieRevokeButton.prop('disabled', !value.get());

			// Enable fields when checkbox is checked
			value.bind(function(to) {
				cookieRevokeButton.prop('disabled', !to);
			});
		});

    } );

})(jQuery);