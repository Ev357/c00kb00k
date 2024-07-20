import { c00kb00ks } from "@@/server/database/schema";
import { addC00kb00kSchema } from "@/schemas/addC00kb00k";

export default eventHandler(async (event) => {
  const body = await readValidatedBody(event, addC00kb00kSchema.safeParse);

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
