<script lang="ts">
	import Textarea from '../../components/Textarea/Textarea.svelte';
	import { onDestroy } from 'svelte';
	import TeleprompterDisplay from './components/TeleprompterDisplay.svelte';
	import TeleprompterControls from './components/TeleprompterControls.svelte';
	import { teleprompterConfig, teleprometerData } from './store/store';
	import TeleprompterList from './components/TeleprompterList.svelte';

	let element: HTMLElement;
	let interval: NodeJS.Timeout | undefined;

	const onChange = (event: any) => {
		if (interval) {
			stopInterval(interval);
			interval = undefined;
		}

		teleprompterConfig.update((currentStore) => {
			return {
				...currentStore,
				teleprometerText: event.target.value,
				elementWidth: element.offsetWidth
			};
		});

		const index = $teleprometerData.findIndex(
			(el) => el.id === $teleprompterConfig.teleprometerActiveId
		);

		updateItemAtIndex(index, event.target.value);
	};

	const updateItemAtIndex = (index: number, newValue: string) => {
		teleprometerData.update((items) => {
			const updatedItems = [...items];
			updatedItems[index] = { ...updatedItems[index], text: newValue };
			return updatedItems;
		});
	};

	const startInterval = () => {
		interval = setInterval(() => {
			teleprompterConfig.update((currentStore) => {
				if (currentStore.pullImage > currentStore.elementWidth) {
					stopInterval(interval);
					return {
						...currentStore,
						pullImage: 0,
						teleprometerPlaying: false
					};
				}

				return {
					...currentStore,
					pullImage:
						currentStore.pullImage + currentStore.pixelPerSecond * currentStore.teleprometerSpeed
				};
			});
			console.log('i');
		}, 100);
	};

	const stopInterval = (intervalProp: any) => {
		clearInterval(intervalProp);
	};

	$: activeTeleprompterName = $teleprometerData.find(
		(el) => el.id === $teleprompterConfig.teleprometerActiveId
	)?.title;


	onDestroy(() => {
		stopInterval(interval);
	});
</script>

<div class="teleprompter-header">
	{#if activeTeleprompterName}
	<h3 class="text-4xl">Active Tab: {activeTeleprompterName}</h3>
{/if}
</div>
<section class="teleprompter-container">
	<aside class="teleprompter-sidebar">
		<TeleprompterList {interval} {element} {stopInterval}/>
	</aside>
	<article class="teleprompter-content">
		<TeleprompterControls {interval} {element} {startInterval} {stopInterval}/>
		<TeleprompterDisplay bind:element />
		<Textarea
			id="teleprompter-textarea"
			name="teleprompter-field"
			rows={10}
			cols={5}
			value={$teleprompterConfig.teleprometerText}
			placeholder="Enter something..."
			label=""
			on:change={(e) => onChange(e)}
		/>
	</article>
</section>

<style lang="scss">
	.teleprompter-header{
			min-height: 2.5rem;
			margin-bottom: 1rem;
		}
	.teleprompter-container {
		display: flex;
		flex-direction: row;
		.teleprompter-sidebar {
			min-width: 126px; //Todo
		}
		.teleprompter-content {
			width: 100%;
			overflow: hidden;
			margin-left: 0.5rem;
		}
	}
</style>
