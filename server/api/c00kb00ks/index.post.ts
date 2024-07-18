import { c00kb00ks } from "@@/server/database/schema";
import zod from "zod";

export default eventHandler(async (event) => {
  const body = await readValidatedBody(
    event,
    zod.object({
      name: zod.string().trim().min(1).max(255),
      description: zod.string().trim().min(1).max(1023),
    }).safeParse,
  );

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0]?.code,
      message: "Bad Request",
      data: body.error.issues,
    });
  }

  const c00kb00k = await useDrizzle(event).insert(c00kb00ks).values({
    name: body.data.name,
    description: body.data.description,
  });

  return c00kb00k;
});
