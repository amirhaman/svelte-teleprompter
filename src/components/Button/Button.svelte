<script lang="ts">
	export let type: 'primary' | 'secondary' | 'transparent';
	export let buttonOnClick: (id?: number) => void;
	export let buttonText: string | undefined = undefined;
	export let svgWidth: string | undefined = undefined;
	export let svgHeight: string | undefined = undefined;
	export let svgColor: string | undefined = undefined;
	export let svgIcon: string | undefined = undefined
	export let className: string = '';
</script>

<button class={`button ${type} ${svgColor} ${className}`} on:click={() => buttonOnClick()}>
	{#if buttonText}
		{buttonText}
	{/if}
	{#if svgWidth !== undefined && svgHeight !== undefined && svgColor !== undefined && svgIcon !== undefined}
		<i class={svgIcon + " " + svgHeight + " " + svgWidth} style={`color: ${svgColor};`}></i>
	{/if}
</button>

<style lang="scss">
	.button {
		@apply flex flex-row items-center justify-center;
		&.transparent {
			background: none;
		}
	}
</style>
