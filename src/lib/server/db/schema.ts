import { relations } from 'drizzle-orm';
import { pgTable, uuid, text, serial, integer, type AnyPgColumn } from 'drizzle-orm/pg-core';

export const cookbooks = pgTable('cookbooks', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	description: text('description'),
	ownerId: text('ownerId').notNull()
});

export type SelectCookbook = typeof cookbooks.$inferSelect;

export const usersToCookbooks = pgTable('usersToCookbooks', {
	id: serial('id').primaryKey(),
	userId: text('userId').notNull(),
	cookbookId: uuid('cookbookId')
		.notNull()
		.references(() => cookbooks.id)
});

export const folders = pgTable('folders', {
	id: serial('id').primaryKey(),
	parentId: integer('parentId').references((): AnyPgColumn => folders.id),
	name: text('name').notNull()
});

export type SelectFolder = typeof folders.$inferSelect;

export const foldersRelations = relations(folders, ({ one }) => ({
	parent: one(folders, {
		fields: [folders.parentId],
		references: [folders.id]
	})
}));
