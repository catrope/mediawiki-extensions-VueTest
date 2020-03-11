<template>
	<div v-bind:style="positionStyle">
		<slot />
	</div>
</template>
<script>
module.exports = {
	props: {
		anchor: String
	},
	data: function () {
		return {
			positionStyle: {}
		};
	},
	mounted: function () {
		// eslint-disable-next-line no-jquery/variable-pattern
		var anchor = this.$parent.$refs[ this.anchor ];
		this.positionStyle = { position: 'absolute', top: anchor.offsetHeight + 'px' };
	}
};
</script>
