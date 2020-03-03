/* eslint-disable no-irregular-whitespace */
'use strict';

/**
 * This is a basic example of a Vue plugin. Plugins add global functionality to
 * Vue. This can be done in several ways: adding global methods or properties,
 * adding custom directives that can be used in templates ("v-whatever"),
 * adding component options via global mixin, and adding instance methods to
 * all Vue components.
 *
 * More information about Vue plugins is available here:
 * https://vuejs.org/v2/guide/plugins.html
 */
var i18nPlugin = {
	/**
	 * @param {Object} app Vue app
	 */
	install: function ( app ) {

		/**
		 * This adds a custom "v-i18n-html" directive for use in templates.
		 * More infomation about custom directives is available here:
		 * https://vuejs.org/v2/guide/custom-directive.html
		 */
		app.directive( 'i18n-html', {
			mounted: function ( el, binding ) {
				var messageKey;

				// Check first to see if user has provide an arg via
				// v-i18n-html:some-message-key; otherwise assume that
				// they have provided a string value like
				// v-i18n-html="'some-message-key"
				messageKey = binding.arg ? binding.arg : binding.value;
				el.innerHTML = mw.message( messageKey ).parse();
			}
		} );

		/**
		 * This adds an $i18n() instance method that can be used by all
		 * components
		 *
		 * @param {string} msgKey key for the desired message
		 * @param {...*} params An arbitrary number of additional args can be
		 * provided as message params
		 * @return {Object} mw.message object
		 */
		app.provide( 'i18n', function ( msgKey ) {
			// Determine if any additional params are present
			if ( arguments.length > 1 ) {
				return mw.message.apply( mw, arguments );
			} else {
				return mw.message( msgKey );
			}

		} );
	}
};

module.exports = i18nPlugin;
