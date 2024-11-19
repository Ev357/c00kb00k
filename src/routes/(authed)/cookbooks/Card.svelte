<script lang="ts">
	import type { SelectCookbook } from '$lib/server/db/schema';
	import * as Card from '$lib/components/ui/card';

	let { cookbook }: { cookbook: SelectCookbook } = $props();
</script>

<a href={`/cookbooks/${cookbook.id}`} class="rounded-xl">
	<Card.Root class="h-full transition-colors hover:bg-accent">
		<Card.Header>
			<Card.Title>{cookbook.name}</Card.Title>
			{#if cookbook.description}
				<Card.Description>{cookbook.description}</Card.Description>
			{/if}
		</Card.Header>
		<Card.Footer />
	</Card.Root>
</a>
