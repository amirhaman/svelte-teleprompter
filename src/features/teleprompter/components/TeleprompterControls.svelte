<script lang="ts">
	import Button from '../../../components/Button/Button.svelte';
	import { teleprompterConfig, teleprometerData } from '../store/store';

	export let element: HTMLElement;
	export let interval: NodeJS.Timeout | undefined;
	export let startInterval: () => any;
	export let stopInterval: (interval: NodeJS.Timeout) => any;

	const onSpeedUp = () => {
		teleprompterConfig.update((currentStore) => {
			if (currentStore.teleprometerSpeed >= currentStore.maxSpeed) return currentStore; // Prevent exceeding max speed
			return { ...currentStore, teleprometerSpeed: currentStore.teleprometerSpeed + 1 };
		});
	};

	const onSpeedDown = () => {
		teleprompterConfig.update((currentStore) => {
			if (currentStore.teleprometerSpeed <= currentStore.minSpeed) return currentStore; // Prevent going below min speed
			return { ...currentStore, teleprometerSpeed: currentStore.teleprometerSpeed - 1 };
		});
	};

	const onReset = () => {
		if (interval) {
			stopInterval(interval);
			interval = undefined;
		}
		teleprompterConfig.update((currentStore) => {
			return {
				...currentStore,
				teleprometerPlaying: false,
				pullImage: 0
			};
		});
	};

	const onStart = () => {
		if (interval) {
			stopInterval(interval);
			interval = undefined;
		}
		teleprompterConfig.update((currentStore) => {
			return {
				...currentStore,
				teleprometerPlaying: !$teleprompterConfig.teleprometerPlaying,
				elementWidth: element.offsetWidth
			};
		});

		if ($teleprompterConfig.teleprometerPlaying) {
			startInterval();
		}
	};
</script>

<div class="teleprompter-container_reader-switch">
	<Button
		type="primary"
		svgColor="white"
		svgWidth={"w-4"}
		svgHeight={"h-4"}
		svgIcon={"fa-solid fa-stop"}
		buttonOnClick={onReset}
		className="min-w-42 p-2 font-xlarge text-center text-gray-900 bg-violet-900"
	/>
	<Button
		type="primary"
		svgColor="white"
		svgWidth={"w-4"}
		svgHeight={"h-4"}
		svgIcon={$teleprompterConfig.teleprometerPlaying ? "fa-solid fa-pause" : "fa-solid fa-play"}
		buttonOnClick={onStart}
		className="min-w-80 p-2 font-xlarge text-center text-gray-900 bg-violet-900"
	/>

	<Button
		type="primary"
		svgColor="white"
		svgWidth={"w-4"}
		svgHeight={"h-4"}
		svgIcon={"fa-solid fa-minus"}
		buttonOnClick={onSpeedDown}
		className="min-w-42 p-2 font-xlarge text-center text-gray-900 bg-violet-900"
	/>
	
	<Button
		type="primary"
		svgColor="white"
		svgWidth={"w-4"}
		svgHeight={"h-4"}
		svgIcon={"fa-solid fa-plus"}
		buttonOnClick={onSpeedUp}
		className="min-w-42 p-2 font-xlarge text-center text-gray-900 bg-violet-900"
	/>
	
	<p class="m-1 ml-auto">Steed: {$teleprompterConfig.teleprometerSpeed}</p>
</div>

<style lang="scss">
	.teleprompter-container {
		&_reader-switch {
			display: flex;
			align-items: center;
		}
	}
</style>
