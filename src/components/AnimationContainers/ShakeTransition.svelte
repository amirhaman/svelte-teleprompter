<script lang="ts">

</script>

<div class="animation-shake">
  <slot />
</div>

<style lang="scss">
	.animation-shake {
		&:hover {
			// display:none;
			animation: shaking 0.5s 1;
		}
	}
	@keyframes shaking {
		0% {
			transform: rotate(0deg);
		}
		20% {
			transform: rotate(-4deg);
		}
		50% {
			transform: rotate(0deg);
		}
		70% {
			transform: rotate(4deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
</style>