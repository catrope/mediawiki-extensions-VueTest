'use strict';
/* eslint-disable no-underscore-dangle */

/**
 * API request mixin.
 *
 * A component using this mixin must define a method called makeApiRequest() that takes a single
 * parameter with query information, and returns a promise. Ideally, the returned promise should
 * have an .abort() method; if this is present, requests will be aborted if a new request is made
 * before they finish.
 *
 * Requests are cached based on the parameter passed to apiRequest(). If apiRequest() is
 * called with a parameter value that it has been called with before, it will not call
 * makeApiRequest(), but use the cached response. Parameter values are compared using
 * JSON.stringify(). Failed requests (errors) are not cached.
 *
 * While a request is pending, apiRequestPending is set to true, but the values from the previous
 * request remain in apiRequestResult and apiRequestError.
 *
 * Exposed methods:
 * - apiRequest( query ): Make a request
 * - apiRequestAbort(): Abort the current request, if any
 * 
 * Exposed data properties:
 *  - apiRequestResult: Result of the most recently completed request,
 *                      or null if it failed
 *  - apiRequestError: Error information from the most recently completed request,
 *                     or null if it was successful
 *  - apiRequestPending: true if a request is currently pending, false otherwise
 */
module.exports = {
	created() {
		this._apiRequestCache = new Map();
		this._apiRequestPromise = null;
	},
	methods: {
		apiRequest( query ) {
			let promise, cacheKey = JSON.stringify( query );
			this.apiRequestAbort();
			if ( this._apiRequestCache.has( cacheKey ) ) {
				this.apiRequestResult = this._apiRequestCache.get( cacheKey );
				return;
			}

			this.apiRequestPending = true;
			promise = this._apiRequestPromise = this.makeApiRequest( query );
			promise
				.then( ( result ) => {
					if ( promise !== this._apiRequestPromise ) {
						// Request has been superseded, ignore
						return;
					}
					this._apiRequestCache.set( cacheKey, result );
					this._apiRequestPromise = null;
					this.apiRequestPending = false;
					this.apiRequestResult = result;
					this.apiRequestError = null;
				} )
				.catch( ( error ) => {
					if ( promise !== this._apiRequestPromise ) {
						// Request has been superseded, ignore
						return;
					}
					this._apiRequestPromise = null;
					this.apiRequestPending = false;
					this.apiRequestResult = null;
					this.apiRequestError = error || true;
				} );
		},
		apiRequestAbort() {
			let oldPromise = this._apiRequestPromise;
			this._apiRequestPromise = null;
			this.apiRequestPending = false;
			if ( oldPromise && oldPromise.abort ) {
				oldPromise.abort();
			}
		}
	},
	data: () => ( {
		apiRequestResult: null,
		apiRequestError: null,
		apiRequestPending: false
	} )
};
