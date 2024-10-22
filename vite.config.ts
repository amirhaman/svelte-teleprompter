import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
// import svelte from '@sveltejs/vite-plugin-svelte';
import dotenv from 'dotenv';


dotenv.config();

export default defineConfig({
  plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
  define: {
    'process.env': process.env
  }
});
