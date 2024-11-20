<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	let { children, class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class="flex size-full justify-center p-4">
	<div class={cn('pt-8, flex w-full max-w-[1080px] flex-col', className)} {...restProps}>
		{@render children?.()}
	</div>
</div>
