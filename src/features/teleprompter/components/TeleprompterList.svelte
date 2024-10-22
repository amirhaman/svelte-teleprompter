<script lang="ts">
	import Button from '../../../components/Button/Button.svelte';
	import { teleprompterConfig } from '../store/store';
  import type {TeleprometerData} from '../../../types/teleprompter-types';
	import {teleprometerData} from '../store/store'

	export let interval: NodeJS.Timeout | undefined;
	export let element: HTMLElement;
	export let stopInterval: (interval: NodeJS.Timeout) => any;

	const onSelect = (id: number) => {
		const selectedItem = $teleprometerData.find((el: TeleprometerData) => el.id === id);

		teleprompterConfig.update((currentStore) => {
			return {
				...currentStore,
				pullImage: 0,
				teleprometerActiveId: id,
				teleprometerPlaying: false,
				teleprometerText: selectedItem?.text || '',
				elementWidth: element?.offsetWidth || 0
			};
		});

		if (interval) {
			stopInterval(interval);
			interval = undefined;
		}
	};
</script>

{#if $teleprometerData}
	{#each $teleprometerData as item}
		<Button
			type="primary"
			svgColor="text-white"
			buttonOnClick={() => onSelect(item.id)}
			buttonText={item.title}
			className="min-w-42 p-2 font-xlarge text-center text-gray-900 bg-violet-900 whitespace-nowrap w-full overflow-y-hidden"
		/>
	{/each}
{/if}
