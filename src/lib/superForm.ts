import { superForm as sf } from 'sveltekit-superforms';
import { toast } from 'svelte-sonner';
import * as m from '$lib/paraglide/messages';

export const superForm = <
	T extends Record<string, unknown>,
	In extends Record<string, unknown> = T
>(
	...params: Parameters<typeof sf<T, In>>
) => {
	return sf<T, In>(params[0], {
		onError: () => {
			toast.error(m.error());
		},
		...params[1]
	});
};
