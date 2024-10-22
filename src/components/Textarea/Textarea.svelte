<script lang="ts">
	export let id: string;
	export let name: string;
	export let rows: number;
	export let cols: number;
	export let value: string;
	export let placeholder: string;
	export let label: string;
	export let error: string[] | undefined = undefined; // TODO: add box for error.
</script>

<fieldset class="textarea-fieldset">
	<label for={name}>{label}</label>
	<textarea class="textarea-field" {id} {name} {rows} {cols} {placeholder} {value} on:change/>
</fieldset>

<style lang="scss">
	.textarea-fieldset {
    width: 100%;
    display: flex;
    flex-direction: column;
    .textarea-field{
      padding: 1rem;
    }
	}
</style>
