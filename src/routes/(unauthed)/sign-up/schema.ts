import { z } from 'zod';

export const formSchema = z.object({
	firstName: z.string().trim().min(1).max(256),
	lastName: z.string().trim().min(1).max(256),
	email: z.string().trim().email().max(256)
});
