import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			transitionDuration: {
				'2000': '2000ms',
				'2500': '2500ms',
				'3000': '3000ms'
			}
		}
	},

	plugins: []
} as Config;
