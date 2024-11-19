import { pgTable, uuid, text, serial } from 'drizzle-orm/pg-core';

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
