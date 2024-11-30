<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
	import Folders from './Folders.svelte';

	let { data } = $props();
</script>

<div class="flex justify-between gap-2">
	<h1 class="text-3xl font-bold">{data.cookbook.name}</h1>
</div>
<Resizable.PaneGroup direction="horizontal" class="h-full pt-4">
	<Resizable.Pane defaultSize={25}>
		<Folders folders={data.folders} addFolderForm={data.addFolderForm} />
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={75}>
		<div class="flex h-full items-center justify-center p-6">
			<span class="font-semibold">Content</span>
		</div>
	</Resizable.Pane>
</Resizable.PaneGroup>
