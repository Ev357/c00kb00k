<script lang="ts">
	import { superForm, type FormResult } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { ActionData, PageData } from './$types';
	import { toast } from 'svelte-sonner';
	import * as Card from '$lib/components/ui/card';
	import * as m from '$lib/paraglide/messages';
	import * as Form from '$lib/components/ui/form/index';
	import { Input } from '$lib/components/ui/input/index';
	import { formSchema } from './schema';

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
	<Card.Title>{m.sign_in_title()}</Card.Title>
	<Card.Description>
		{m.sign_in_description()}
		<a href="/sign-up" class="inline text-blue-500 hover:text-blue-600 hover:underline">
			{m.sign_up()}
		</a>
	</Card.Description>
</Card.Header>
<Card.Content>
	<form method="POST" use:enhance>
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
