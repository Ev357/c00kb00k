<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { Input } from '$lib/components/ui/input';
	import { Plus, Search } from 'lucide-svelte';
	import AddDialog from './AddDialog.svelte';
	import type { PageData } from './$types';
	import Card from './Card.svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let { data }: { data: PageData } = $props();

	let search = $state('');

	let cookbooks = $derived.by(() => {
		const searchQuery = search.trim().toLowerCase();

		return data.cookbooks.filter(
			(cookbook) =>
				cookbook.name.toLowerCase().includes(searchQuery) ||
				cookbook.description?.toLowerCase().includes(searchQuery)
		);
	});
</script>

<div class="flex justify-between gap-2">
	<h1 class="text-3xl font-bold">{m.cookbooks()}</h1>
	<AddDialog
		data={data.addCookbookForm}
		class={cn('size-9 sm:size-auto', buttonVariants(), 'items-center')}
	>
		<Plus class="shrink-0" />
		<p class="hidden font-bold sm:block">{m.add_cookbook()}</p>
	</AddDialog>
</div>
<div class="relative flex items-center pt-4">
	<Search class="absolute left-2.5 size-4 shrink-0" />
	<Input bind:value={search} type="search" placeholder={m.search()} class="pl-9" />
</div>
<div class="grid auto-rows-fr gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each cookbooks as cookbook (cookbook.id)}
		<Card {cookbook} />
	{/each}
</div>
