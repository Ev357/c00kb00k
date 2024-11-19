<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	let { children, class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class="flex w-full justify-center p-4">
	<div class={cn('w-full max-w-[1080px] pt-8', className)} {...restProps}>
		{@render children?.()}
	</div>
</div>
