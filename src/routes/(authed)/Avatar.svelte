<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index';
	import type { User } from '@supabase/supabase-js';
	import type { AvatarRootProps } from 'bits-ui';
	import { getContext } from 'svelte';

	let props: AvatarRootProps = $props();

	let user = getContext<User>('user');

	let initials: string = $derived(user.user_metadata?.username?.slice(0, 2).toUpperCase() ?? 'U');
</script>

<Avatar.Root {...props}>
	<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
	<Avatar.Fallback>{initials}</Avatar.Fallback>
</Avatar.Root>
