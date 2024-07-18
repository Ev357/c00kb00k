import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { H3Event } from "h3";

export const useDrizzle = (event?: H3Event) => {
  const { supabase } = useRuntimeConfig(event);
  const client = postgres(supabase.databaseUrl);
  return drizzle(client);
};
