<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import type { Snippet } from 'svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import type { FormResult, Infer, SuperValidated } from 'sveltekit-superforms';
	import { addCookbookFormSchema, type AddCookbookFormSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ActionData } from './$types';
	import { toast } from 'svelte-sonner';
	import * as m from '$lib/paraglide/messages';
	import { superForm } from '$lib/superForm';

	let {
		children,
		data,
		class: className
	}: {
		children: Snippet;
		data: SuperValidated<Infer<AddCookbookFormSchema>>;
		class?: HTMLAttributes<HTMLButtonElement>['class'];
	} = $props();

	const form = superForm(data, {
		validators: zodClient(addCookbookFormSchema),
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
</script>

<Dialog.Root
	bind:open
	onOpenChange={(open) => {
		if (open) return;
		reset();
	}}
>
	<Dialog.Trigger class={className}>
		{@render children()}
	</Dialog.Trigger>
	<Dialog.Content>
		<form method="POST" action="?/add" use:enhance>
			<Dialog.Header>
				<Dialog.Title>{m.add_cookbook()}</Dialog.Title>
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
				<Form.Field {form} name="description">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>{m.description()}</Form.Label>
							<Input {...props} bind:value={$formData.description} />
						{/snippet}
					</Form.Control>
					<Form.Description />
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Dialog.Footer>
				<Form.Button loading={$delayed}>{m.add()}</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
