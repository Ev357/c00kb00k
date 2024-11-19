import { z } from '$lib/zod';

export const addCookbookFormSchema = z.object({
	name: z.string().trim().min(1).max(256),
	description: z.string().trim().min(1).max(1024).empty().optional()
});

export type AddCookbookFormSchema = typeof addCookbookFormSchema;
