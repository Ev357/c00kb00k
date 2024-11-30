<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import { page } from '$app/stores';

	let { children } = $props();
</script>

<svelte:head>
	<Title name={$page.params.id} />
</svelte:head>

{@render children()}
