<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import Title from '$lib/components/Title.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<Title name={m.sign_in()} />
</svelte:head>

{@render children()}
