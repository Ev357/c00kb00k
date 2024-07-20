import zod from "zod";

export const addC00kb00kSchema = zod.object({
  name: zod.string().trim().min(1).max(255),
  description: zod.string().trim().min(1).max(1023).optional(),
});
