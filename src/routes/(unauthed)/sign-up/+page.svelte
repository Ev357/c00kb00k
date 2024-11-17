<script lang="ts">
	import { superForm, type FormResult } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form/index';
	import { Input } from '$lib/components/ui/input/index';
	import type { ActionData, PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema } from './schema';
	import { toast } from 'svelte-sonner';
	import * as Card from '$lib/components/ui/card';
	import * as m from '$lib/paraglide/messages';

	let { data }: { data: PageData } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		dataType: 'json',
		onUpdate: ({ result }) => {
			const action = result.data as FormResult<ActionData>;

			if (result.type !== 'failure' || action.success !== false) return;

			toast.error(action.message);
		}
	});

	const { form: formData, enhance, delayed } = form;
</script>

<Card.Header>
	<Card.Title>{m.sign_up_title()}</Card.Title>
	<Card.Description>
		{m.sign_up_description()}
		<a href="/sign-in" class="inline text-blue-500 hover:text-blue-600 hover:underline">
			{m.sign_in()}
		</a>
	</Card.Description>
</Card.Header>
<Card.Content>
	<form method="POST" use:enhance>
		<Form.Field {form} name="username">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{m.username()}</Form.Label>
					<Input {...props} bind:value={$formData.username} required />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="email">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{m.email()}</Form.Label>
					<Input {...props} bind:value={$formData.email} required />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button loading={$delayed} class="w-full">{m.page_continue()}</Form.Button>
	</form>
</Card.Content>
