import { z } from 'zod';

export const formSchema = z.object({
	pin: z.string().length(6)
});
