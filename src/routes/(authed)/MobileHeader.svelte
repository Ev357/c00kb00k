<script lang="ts">
	import { getContext } from 'svelte';
	import type { HeaderContext } from './Header.svelte';
	import { buttonVariants, Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { Separator } from '$lib/components/ui/separator';
	import type { User } from '@supabase/supabase-js';
	import type { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
	import { goto } from '$app/navigation';
	import * as m from '$lib/paraglide/messages';

	const headerContext = getContext<HeaderContext>('header');

	const closeHeader = () => {
		headerContext.isOpen = false;
	};

	let user = getContext<User>('user');
	let auth = getContext<SupabaseAuthClient>('auth');
</script>

<div class="flex flex-col gap-1 sm:hidden">
	<div class="px-4 py-2">
		<p>{user.user_metadata.username}</p>
		<p class="text-sm text-muted-foreground">{user.email}</p>
	</div>
	<Button
		variant="ghost"
		class={cn(buttonVariants({ variant: 'ghost' }), 'justify-start text-muted-foreground')}
		onclick={async () => {
			await auth.signOut();
			goto('/sign-in');
		}}
	>
		{m.log_out()}
	</Button>
	<Separator />
	<a
		href="/dashboard"
		class={cn(buttonVariants({ variant: 'ghost' }), 'justify-start text-muted-foreground')}
		onclick={closeHeader}
	>
		{m.dashboard()}
	</a>
	<a
		href="/recepies"
		class={cn(buttonVariants({ variant: 'ghost' }), 'justify-start text-muted-foreground')}
		onclick={closeHeader}
	>
		{m.recepies()}
	</a>
	<a
		href="/settings"
		class={cn(buttonVariants({ variant: 'ghost' }), 'justify-start text-muted-foreground')}
		onclick={closeHeader}
	>
		{m.settings()}
	</a>
	<Separator />
</div>
