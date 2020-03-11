'use strict';

var composition = require( 'vue-composition-api' ),
	ref = composition.ref,
	onMounted = composition.onMounted;

function usePosition( anchorRef ) {
	var positionStyle = ref( {} );
	onMounted( function () {
		var anchor = this.$refs[ anchorRef ];
		positionStyle.value = { top: anchor.offsetHeight + 'px' };
	} );
	return {
		positionStyle: positionStyle
	};
}

module.exports = usePosition;