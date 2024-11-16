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
			const action: FormResult<ActionData> = result.data;

			if (result.type === 'failure' && action.success === false && action.message !== undefined) {
				toast.error(action.message);
			}
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
		<div class="flex flex-col gap-x-4 sm:flex-row">
			<Form.Field {form} name="firstName">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>{m.first_name()}</Form.Label>
						<Input {...props} bind:value={$formData.firstName} required />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="lastName">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>{m.last_name()}</Form.Label>
						<Input {...props} bind:value={$formData.lastName} required />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<Form.Field {form} name="email">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{m.email()}</Form.Label>
					<Input {...props} bind:value={$formData.email} required />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{m.password()}</Form.Label>
					<Input {...props} bind:value={$formData.password} required />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button loading={$delayed} class="w-full">{m.page_continue()}</Form.Button>
	</form>
</Card.Content>
