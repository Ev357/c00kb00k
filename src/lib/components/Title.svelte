<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	let { name, disableTemplate = false }: { name: string; disableTemplate?: boolean } = $props();

	let title = $derived.by(() => {
		if (!disableTemplate) {
			return `${name} - ${m.c00kb00k()}`;
		}

		return m.c00kb00k();
	});
</script>

<title>{title}</title>
