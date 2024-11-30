import { z } from '$lib/zod';

export const addFolderFormSchema = z.object({
	name: z.string().trim().min(1).max(256),
	folderId: z.number().int().positive().safe().optional()
});

export type AddFolderFormSchema = typeof addFolderFormSchema;
