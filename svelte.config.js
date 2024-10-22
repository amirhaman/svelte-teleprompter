import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import sass from 'sass';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		sveltePreprocess({
			scss: {
				includePaths: ['src'],
				implementation: sass
			},
			postcss: {
				plugins: [autoprefixer()]
			}
		})
	],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},
	vite: {
		plugins: [
			(function LoadSecrets() {
				return {
					name: 'svelte-secrets',
					configureServer: async () => {
						(await import('dotenv')).config();
					}
				};
			})()
		]
	}
};

export default config;
