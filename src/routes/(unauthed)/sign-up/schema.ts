import { z } from 'zod';

export const formSchema = z.object({
	username: z.string().trim().min(1).max(256),
	email: z.string().trim().email().max(256)
});
