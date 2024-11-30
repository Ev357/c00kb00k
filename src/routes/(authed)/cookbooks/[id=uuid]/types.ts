import type { TreeItem } from '$lib/components/ui/tree/types';

export type FolderTreeItem = TreeItem & {
	id: number;
	name: string;
	parentId: number | null;
};
