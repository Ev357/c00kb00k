import { integer, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

export const c00kb00ks = pgTable("c00kb00ks", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
});

export const usersToC00kb00ks = pgTable("usersToC00kb00ks", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  c00kb00kId: integer("c00kb00kId")
    .notNull()
    .references(() => c00kb00ks.id),
  ownerId: integer("ownerId").notNull(),
});

export const recepies = pgTable("recepies", {
  id: serial("id").primaryKey(),
  c00kb00kId: integer("c00kb00kId")
    .notNull()
    .references(() => c00kb00ks.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image"),
  folderId: integer("folderId").notNull(),
  cookingTime: integer("cookingTime"),
});

export type SelectC00kb00k = typeof c00kb00ks.$inferSelect;
