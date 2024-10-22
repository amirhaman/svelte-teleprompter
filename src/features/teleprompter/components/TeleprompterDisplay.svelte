<script lang="ts">
	import { teleprompterConfig } from '../store/store';

	export let element;
</script>

<div class="teleprompter-container_reader-box">
	<div class="teleprompter-container_reader-text">
		<div class="clipper"></div>
		<h1
			class="paragraph text-4xl"
			bind:this={element}
			style="transform: translateX({-$teleprompterConfig.pullImage}px); transition: transform 300ms ease-out;"
		>
			{$teleprompterConfig.teleprometerText}
		</h1>
	</div>
</div>

<style lang="scss">
	.teleprompter-container {
		&_reader-box {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			min-height: 150px;
			color: black;
		}
		&_reader-text {
			position: relative;
			display: flex;
			align-items: center;
			width: 100%;
			height: 150px; /* Adjust the height based on your content */
			background-color: rgba(0, 0, 0, 0.8); /* Example background */
			text-align: center;
			line-height: 150px;
			.paragraph {
				width: auto;
				position: absolute;
				left: 50%;
				display: block;
				white-space: nowrap;
				margin-left: -170px;
			}
			.clipper {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: white;
				clip-path: inset(50px 30% 50px 30%);
			}
		}
	}
</style>
