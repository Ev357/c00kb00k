<script lang="ts" module>
	export let headerContext = $state({ isOpen: false });

	export type HeaderContext = typeof headerContext;
</script>

<script lang="ts">
	import { ChartNoAxesGantt, X, ChefHat } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';
	import Avatar from './Avatar.svelte';
	import Notifications from './Notifications.svelte';
	import { Button } from '$lib/components/ui/button';
	import MobileHeader from './MobileHeader.svelte';
	import { setContext } from 'svelte';
	import * as m from '$lib/paraglide/messages';

	setContext('header', headerContext);
</script>

<div class="flex justify-center">
	<header
		class={cn(
			'flex w-full max-w-[1400px] flex-col gap-4 p-4',
			headerContext.isOpen && 'absolute inset-0 bg-background sm:static sm:inset-auto sm:bg-inherit'
		)}
	>
		<div class="flex justify-between gap-4">
			<a href="/dashboard" data-sveltekit-preload-data>
				<ChefHat class="size-8 shrink-0" />
			</a>
			<div class="hidden grow items-center gap-2 sm:flex">
				<a
					href="/dashboard"
					class={cn(
						'transition-colors hover:text-foreground/80',
						$page.url.pathname === '/dashboard' ? 'text-foreground' : 'text-foreground/60'
					)}
					data-sveltekit-preload-data
				>
					{m.dashboard()}
				</a>
				<a
					href="/recepies"
					class={cn(
						'transition-colors hover:text-foreground/80',
						$page.url.pathname.startsWith('/recepies') ? 'text-foreground' : 'text-foreground/60'
					)}
					data-sveltekit-preload-data
				>
					{m.recepies()}
				</a>
				<a
					href="/settings"
					class={cn(
						'transition-colors hover:text-foreground/80',
						$page.url.pathname === '/settings' ? 'text-foreground' : 'text-foreground/60'
					)}
					data-sveltekit-preload-data
				>
					{m.settings()}
				</a>
			</div>
			<div class="flex items-center gap-2">
				<Notifications />
				<Button
					variant="outline"
					size="icon"
					class="rounded-full sm:hidden"
					onclick={() => {
						headerContext.isOpen = !headerContext.isOpen;
					}}
				>
					<ChartNoAxesGantt class={cn('shrink-0', headerContext.isOpen && 'hidden')} />
					<X class={cn('shrink-0', !headerContext.isOpen && 'hidden')} />
				</Button>
				<Avatar class="hidden sm:flex" />
			</div>
		</div>
		{#if headerContext.isOpen}
			<MobileHeader />
		{/if}
	</header>
</div>
