import { c00kb00ks } from "@@/server/database/schema";

export default eventHandler(async (event) => {
  return await useDrizzle(event).select().from(c00kb00ks);
});
