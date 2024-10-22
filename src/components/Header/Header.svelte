<script lang="ts">

	import Navigation from '../Navigation/Navigation.svelte';
</script>

<header class="header-container">
	<div class="header-back-drop">
		<h1 class="text-xl text-white">Your Logo</h1>
		<Navigation />
	</div>
</header>

<style lang="scss">
	.header-container {
		@apply fixed top-0 flex w-full z-10 ;
    background-color: white;
    .header-back-drop{
      @apply flex w-full min-h-24 pl-2 pr-2 items-center p-0;
      background: rgb(0, 0, 0, 0.8);
    }
	}
</style>
