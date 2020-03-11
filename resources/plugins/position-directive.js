'use strict';

module.exports = {
	install: function ( Vue ) {
		Vue.directive( 'position-anchor', {
			bind: function ( el, binding, vnode ) {
				var pairName = binding.arg || 'default';
				// HACK store anchors in vnode.context, which we're not really supposed to modify
				// eslint-disable-next-line no-underscore-dangle, camelcase, max-len
				vnode.context._position_directive_anchors = vnode.context._position_directive_anchors || {};
				// eslint-disable-next-line no-underscore-dangle
				vnode.context._position_directive_anchors[ pairName ] = el;
			}
		} );

		Vue.directive( 'position', {
			inserted: function ( el, binding, vnode ) {
				// TODO support multiple position styles (below, above, etc) through binding.value
				var pairName = binding.arg || 'default',
					// eslint-disable-next-line no-underscore-dangle
					anchors = vnode.context._position_directive_anchors,
					anchor = anchors && anchors[ pairName ];
				if ( anchor ) {
					el.style.top = anchor.offsetHeight + 'px';
				}
				// TODO else warn
			}
		} );
	}
};
