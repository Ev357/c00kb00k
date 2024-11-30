<script lang="ts">
	import * as Tree from '$lib/components/ui/tree';
	import { Input } from '$lib/components/ui/input';
	import { Folder, FolderClosed, FolderOpen, Plus, Search } from 'lucide-svelte';
	import * as m from '$lib/paraglide/messages';
	import { buttonVariants } from '$lib/components/ui/button';
	import type { FolderTreeItem } from './types';
	import AddFolderDialog from './AddFolderDialog.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { AddFolderFormSchema } from './schema';
	import { cn } from '$lib/utils';

	let {
		addFolderForm,
		folders
	}: {
		folders: FolderTreeItem[];
		addFolderForm: SuperValidated<Infer<AddFolderFormSchema>>;
	} = $props();
</script>

<div class="flex h-full flex-col gap-2 p-1">
	<div class="flex gap-2">
		<div class="relative flex grow items-center">
			<Search class="absolute left-2.5 size-4 shrink-0" />
			<Input type="search" placeholder={m.search()} class="pl-9" />
		</div>
		<AddFolderDialog
			{folders}
			data={addFolderForm}
			class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'shrink-0')}
		>
			<Plus class="shrink-0" />
		</AddFolderDialog>
	</div>
	<div class="relative h-full">
		<Tree.Root
			items={folders}
			getKey={(folder) => String(folder.id)}
			class="absolute size-full overflow-y-auto"
		>
			{#snippet children({ flattenedItems })}
				{#each flattenedItems as folder (folder.value.id)}
					<Tree.Item style={`padding-left: ${folder.level - 0.5}rem;`} {...folder.bind}>
						{#snippet children({ isExpanded, value })}
							{#if value.children}
								{#if isExpanded}
									<FolderOpen />
								{:else}
									<FolderClosed />
								{/if}
							{:else}
								<Folder />
							{/if}
							<p class="truncate">
								{folder.value.name}
							</p>
						{/snippet}
					</Tree.Item>
				{/each}
			{/snippet}
		</Tree.Root>
	</div>
</div>
