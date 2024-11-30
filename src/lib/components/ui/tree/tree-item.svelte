<script lang="ts" module>
	import type { TreeItem } from './types';

	type T = TreeItem;
</script>

<script lang="ts" generics="T extends TreeItem">
	import { getContext, type Snippet } from 'svelte';
	import type { TreeContext } from './tree.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '../button';

	let {
		children,
		value,
		level,
		class: className,
		...restProps
	}: Omit<HTMLAttributes<HTMLButtonElement>, 'children'> & {
		children?: Snippet<[{ isSelected: boolean; isExpanded: boolean; value: T }]>;
		value: T;
		level: number;
	} = $props();

	let treeContext = getContext<TreeContext<T>>('tree');

	let isExpanded = $derived.by(() => {
		const key = treeContext.getKey(value);
		return treeContext.expanded.includes(key);
	});

	let isSelected = $derived(treeContext.selectedKey() === treeContext.getKey(value));

	const handleKeydown = (event: KeyboardEvent) => {
		switch (event.code) {
			case 'Enter':
			case 'Space':
				event.preventDefault();
				treeContext.onSelect(value);
				break;
			case 'ArrowRight': {
				event.preventDefault();
				if (!value.children) return;

				if (isExpanded) {
					const currentElement = document.activeElement;

					if (!(currentElement instanceof HTMLButtonElement)) return;

					const items = treeContext.getItems();

					const currentIndex = items.indexOf(currentElement);
					const list = items.slice(currentIndex);

					const nextElement = list.find(
						(treeItem) => Number(treeItem.getAttribute('data-indent')) === level + 1
					);

					if (nextElement) {
						nextElement.focus();
					}
				} else {
					treeContext.onToggle(value);
				}
				break;
			}
			case 'ArrowLeft': {
				if (!value.children) return;
				event.preventDefault();

				if (!isExpanded) {
					const currentElement = document.activeElement;

					if (!(currentElement instanceof HTMLButtonElement)) return;

					const items = treeContext.getItems();

					const currentIndex = items.indexOf(currentElement);
					const list = items.slice(0, currentIndex).toReversed();

					const parentElement = list.find(
						(treeItem) => Number(treeItem.getAttribute('data-indent')) === level - 1
					);

					if (parentElement) {
						parentElement.focus();
					}
				} else {
					treeContext.onToggle(value);
				}
				break;
			}
			case 'PageUp':
			case 'Home': {
				event.preventDefault();

				const items = treeContext.getItems();

				const firstElement = items.at(0);
				if (firstElement) {
					firstElement.focus();
				}
				break;
			}
			case 'PageDown':
			case 'End': {
				event.preventDefault();
				const items = treeContext.getItems();

				const lastElement = items.at(-1);
				if (lastElement) {
					lastElement.focus();
				}
				break;
			}
		}
	};

	const handleClick = (event: MouseEvent) => {
		event.stopPropagation();

		treeContext.onSelect(value);
		treeContext.onToggle(value);
	};
</script>

<button
	role="treeitem"
	aria-selected={isSelected}
	data-selected={isSelected ? '' : undefined}
	data-expanded={isExpanded ? '' : undefined}
	data-indent={level}
	data-tree-item
	onkeydown={handleKeydown}
	onclick={handleClick}
	class={cn(
		buttonVariants({ variant: 'ghost' }),
		'flex w-full justify-start pl-0 data-[selected]:bg-accent',
		className
	)}
	type="button"
	{...restProps}
>
	{@render children?.({ isSelected, isExpanded, value })}
</button>
