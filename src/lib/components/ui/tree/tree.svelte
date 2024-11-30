<script lang="ts" module>
	import type { TreeItem } from './types';

	export type FlattenedItem<T> = {
		_id: string;
		index: number;
		value: T;
		level: number;
		hasChildren: boolean;
		bind: {
			value: T;
			level: number;
		};
	};

	type T = TreeItem;

	export type TreeContext<T> = {
		expanded: string[];
		selectedKey: () => string | undefined;
		getKey: (item: T) => string;
		getItems: () => HTMLButtonElement[];
		onToggle: (item: T) => void;
		onSelect: (item: T) => void;
	};
</script>

<script lang="ts" generics="T extends TreeItem">
	import { setContext, type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	let {
		children,
		items,
		getKey,
		expanded = $bindable([]),
		value = $bindable(),
		class: className,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
		children: Snippet<[{ flattenedItems: FlattenedItem<T>[] }]>;
		items: T[];
		getKey: (item: T) => string;
		expanded?: string[];
		value?: T;
	} = $props();

	let flattenedItems = $derived.by(() => {
		const flattenItems = (items: T[], level: number = 1) =>
			items.reduce<FlattenedItem<T>[]>((items, item, index) => {
				const key = getKey(item);
				const isExpanded = expanded.includes(key);

				items.push({
					_id: key,
					value: item,
					index,
					level,
					hasChildren: !!item.children,
					bind: {
						value: item,
						level
					}
				});

				if (item.children && isExpanded) {
					items.push(...flattenItems(item.children, level + 1));
				}

				return items;
			}, []);

		return flattenItems(items);
	});

	let selectedKey = $derived(value ? getKey(value) : undefined);

	let div: HTMLDivElement | undefined;

	const getItems = () => {
		if (!div) {
			return [];
		}

		const items = div.querySelectorAll('[data-tree-item]');

		return Array.from(items).filter((item) => item instanceof HTMLButtonElement);
	};

	setContext<TreeContext<T>>('tree', {
		expanded,
		getKey,
		selectedKey: () => selectedKey,
		getItems,
		onToggle: (item) => {
			if (!item.children) return;

			const key = getKey(item);
			if (expanded.includes(key)) {
				const node = expanded.indexOf(key);
				if (node === -1) return;

				expanded.splice(node, 1);
			} else {
				expanded.push(key);
			}
		},
		onSelect: (item) => {
			if ((value && getKey(value)) === getKey(item)) {
				value = undefined;
				return;
			}

			value = item;
		}
	});

	const handleKeydown = (event: KeyboardEvent) => {
		switch (event.code) {
			case 'ArrowDown': {
				if (!(document.activeElement instanceof HTMLButtonElement)) return;

				const items = getItems();

				const index = items.indexOf(document.activeElement);

				if (index === -1) return;

				const nextElement = items[index + 1];
				if (nextElement) {
					nextElement.focus();
				}
				break;
			}
			case 'ArrowUp': {
				if (!(document.activeElement instanceof HTMLButtonElement)) return;

				const items = getItems();

				const index = items.indexOf(document.activeElement);

				if (index === -1) return;

				const previousElement = items[index - 1];
				if (previousElement) {
					previousElement.focus();
				}
				break;
			}
		}
	};
</script>

<div
	bind:this={div}
	onkeydown={handleKeydown}
	role="tree"
	tabindex="-1"
	class={cn('flex flex-col gap-1', className)}
	{...restProps}
>
	{@render children({ flattenedItems })}
</div>
