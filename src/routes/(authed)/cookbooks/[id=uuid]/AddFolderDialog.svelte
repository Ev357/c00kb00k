<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import type { Snippet } from 'svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import type { FormResult, Infer, SuperValidated } from 'sveltekit-superforms';
	import { addFolderFormSchema, type AddFolderFormSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ActionData } from './$types';
	import { toast } from 'svelte-sonner';
	import * as m from '$lib/paraglide/messages';
	import { superForm } from '$lib/superForm';
	import * as Tree from '$lib/components/ui/tree';
	import type { FolderTreeItem } from './types';
	import { Folder, FolderClosed, FolderOpen, House } from 'lucide-svelte';

	let {
		children,
		data,
		folders,
		class: className
	}: {
		children: Snippet;
		data: SuperValidated<Infer<AddFolderFormSchema>>;
		folders: FolderTreeItem[];
		class?: HTMLAttributes<HTMLButtonElement>['class'];
	} = $props();

	const form = superForm(data, {
		validators: zodClient(addFolderFormSchema),
		dataType: 'json',
		onUpdate: ({ form, result }) => {
			const action = result.data as FormResult<ActionData>;

			if (result.type !== 'failure' && action.success !== false && action.message) {
				toast.error(action.message);
			}

			if (form.valid) {
				open = false;
			}
		}
	});

	const { form: formData, enhance, delayed, reset } = form;

	let open = $state(false);

	let treeValue = $state<FolderTreeItem>();

	$effect(() => {
		$formData.folderId = treeValue?.id;
	});

	let expanded = $state(['-1']);

	let foldersWithRoot = $derived<FolderTreeItem[]>([
		{
			id: -1,
			name: m.root(),
			children: folders,
			parentId: null
		}
	]);
</script>

<Dialog.Root
	bind:open
	onOpenChange={(open) => {
		if (open) return;
		reset();
		treeValue = undefined;
		expanded = ['-1'];
	}}
>
	<Dialog.Trigger class={className}>
		{@render children()}
	</Dialog.Trigger>
	<Dialog.Content>
		<form method="POST" action="?/addFolder" class="min-w-0" use:enhance>
			<Dialog.Header>
				<Dialog.Title>{m.add_new_folder()}</Dialog.Title>
			</Dialog.Header>
			<div class="py-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>{m.name()}</Form.Label>
							<Input {...props} bind:value={$formData.name} required />
						{/snippet}
					</Form.Control>
					<Form.Description />
					<Form.FieldErrors />
				</Form.Field>
				{#if folders.length}
					<Form.Field {form} name="folderId">
						<Form.Control>
							{#snippet children()}
								<Form.Label>{m.folder_location()}</Form.Label>

								<Tree.Root
									items={foldersWithRoot}
									getKey={(folder) => String(folder.id)}
									bind:value={treeValue}
									bind:expanded
									class="max-h-48 overflow-y-auto"
								>
									{#snippet children({ flattenedItems })}
										{#each flattenedItems as folder (folder.value.id)}
											<Tree.Item style={`padding-left: ${folder.level - 0.5}rem;`} {...folder.bind}>
												{#snippet children({ isExpanded, value })}
													{#if folder.value.id === -1}
														<House class="shrink-0" />
													{:else if value.children}
														{#if isExpanded}
															<FolderOpen class="shrink-0" />
														{:else}
															<FolderClosed class="shrink-0" />
														{/if}
													{:else}
														<Folder class="shrink-0" />
													{/if}
													<p class="truncate">
														{folder.value.name}
													</p>
												{/snippet}
											</Tree.Item>
										{/each}
									{/snippet}
								</Tree.Root>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/if}
			</div>
			<Dialog.Footer>
				<Form.Button loading={$delayed}>{m.add()}</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
