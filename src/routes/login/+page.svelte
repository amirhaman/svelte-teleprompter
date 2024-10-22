<script>
	import { goto } from '$app/navigation';
  import { user } from '../../app/stores/user-store';
  import {get} from 'svelte/store';

	let email = '';
	let password = '';

	const login = async () => {
		const response = await fetch('/login', {
			method: 'POST',
			body: new URLSearchParams({ email, password })
		});

		const result = await response.json();
		if (result.type === 'success') {
			goto('/');
		} else {
			alert(JSON.parse(result.data)[2]);
		}
	};
</script>

<form on:submit|preventDefault={login}>
	<input type="email" bind:value={email} placeholder="Email" required />
	<input type="password" bind:value={password} placeholder="Password" required />
	<button type="submit">Login</button>
</form>
