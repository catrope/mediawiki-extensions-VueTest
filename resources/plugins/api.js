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
var apiPlugin = {
	/**
	 * @param {Object} app Vue app
	 * @param {Object} options
	 */
	install: function ( app, options ) {
		options = options || {};

		// Create a mediawiki API object with appropriate options and stash it
		// as a global property
		app.mwApi = new mw.Api( options );

		app.provide( 'api', app.mwApi );
	}
};

module.exports = apiPlugin;
