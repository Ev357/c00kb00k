<script lang="ts">
	import MaxWidthWrapper from '$lib/components/MaxWidthWrapper.svelte';
	import { setContext } from 'svelte';
	import Header from './Header.svelte';
	import { redirect } from '@sveltejs/kit';

	let { children, data } = $props();

	if (!data.user) {
		redirect(303, '/sign-in');
	}

	setContext('user', data.user);
	setContext('auth', data.supabase.auth);
</script>

<div class="flex h-full min-h-svh flex-col">
	<Header />
	<main class="grow">
		<MaxWidthWrapper>
			{@render children()}
		</MaxWidthWrapper>
	</main>
</div>
