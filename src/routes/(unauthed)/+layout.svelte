<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	let { children } = $props();
</script>

<div class="flex size-full items-center justify-center px-2">
	<Card.Root class="w-[350px]">
		{@render children()}
	</Card.Root>
</div>
