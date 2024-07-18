import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  dbCredentials: {
    url: process.env.NUXT_SUPABASE_DATABASE_URL ?? "",
    port: 5432,
  },
});
