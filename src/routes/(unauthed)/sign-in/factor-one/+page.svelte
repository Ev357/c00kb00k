<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { page } from '$app/stores';
	import * as m from '$lib/paraglide/messages';
	import * as Form from '$lib/components/ui/form/index';
	import { PencilLine } from 'lucide-svelte';
	import type { PageData } from './$types';
	import type { FormResult } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema } from './schema';
	import * as InputOTP from '$lib/components/ui/input-otp';
	import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'bits-ui';
	import { onMount, onDestroy } from 'svelte';
	import { toast } from 'svelte-sonner';
	import type { ActionData } from '../$types';
	import { superForm } from '$lib/superForm';

	let { data }: { data: PageData } = $props();

	const email = $page.url.searchParams.get('email');

	const duration = 60;
	let timer = $state(duration);

	let isActive = $derived(timer > 0);

	onMount(() => {
		const interval = setInterval(() => {
			if (!isActive) return;
			timer -= 1;
		}, 1000);

		onDestroy(() => {
			clearInterval(interval);
		});
	});

	const restart = () => {
		timer = duration;
	};

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		dataType: 'json',
		onUpdate: ({ result, cancel }) => {
			const action = result.data as FormResult<ActionData>;

			if (result.type !== 'failure' || action.success !== false) return;

			toast.error(action.message);

			reset();
			cancel();
		}
	});

	const { form: formData, enhance, submit, reset } = form;

	const resend = async () => {
		reset();

		const toastId = toast.loading(m.sending_code());

		try {
			const response = await fetch('/sign-in/factor-one/resend', {
				method: 'POST',
				body: JSON.stringify({ email }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const data = await response.json();

			if (data.success !== true) {
				toast.error(data.message, { id: toastId });
				return;
			}
		} catch (_) {
			toast.error(m.error(), { id: toastId });
			return;
		}

		toast.success(m.code_sent(), { id: toastId });
		restart();
	};
</script>

<Card.Header>
	<Card.Title>{m.check_email()}</Card.Title>
	<Card.Description>
		{m.enter_code()}
		<span class="inline-flex items-center gap-2">
			{email}
			<a href="/sign-in">
				<PencilLine class="size-4 shrink-0 text-blue-500 dark:text-blue-300" />
			</a>
		</span>
	</Card.Description>
</Card.Header>
<Card.Content>
	<form method="POST" use:enhance>
		<Form.Field {form} name="pin">
			<Form.Control>
				{#snippet children({ props })}
					<InputOTP.Root
						maxlength={6}
						{...props}
						bind:value={$formData.pin}
						pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
						class="justify-center"
						onComplete={submit}
					>
						{#snippet children({ cells })}
							<InputOTP.Group>
								{#each cells.slice(0, 3) as cell}
									<InputOTP.Slot {cell} />
								{/each}
							</InputOTP.Group>
							<InputOTP.Separator />
							<InputOTP.Group>
								{#each cells.slice(3, 6) as cell}
									<InputOTP.Slot {cell} />
								{/each}
							</InputOTP.Group>
						{/snippet}
					</InputOTP.Root>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</form>
</Card.Content>
<Card.Footer class="gap-1 text-sm">
	{m.did_not_receive_code()}
	<button
		class="text-blue-500 disabled:text-muted-foreground dark:text-blue-300 disabled:dark:text-muted-foreground"
		disabled={isActive}
		onclick={resend}
	>
		{m.resend_code()}
		{#if isActive}
			({timer})
		{/if}
	</button>
</Card.Footer>
