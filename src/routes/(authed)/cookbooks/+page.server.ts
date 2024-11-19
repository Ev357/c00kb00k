import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { addCookbookFormSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import * as m from '$lib/paraglide/messages';
import { db } from '$lib/server/db';
import { cookbooks, usersToCookbooks } from '$lib/server/db/schema';
import { eq, getTableColumns } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	const { safeGetSession } = event.locals;

	const { user } = await safeGetSession();

	const userCookbooks = await db
		.select(getTableColumns(cookbooks))
		.from(cookbooks)
		.innerJoin(usersToCookbooks, eq(usersToCookbooks.cookbookId, cookbooks.id))
		.where(eq(usersToCookbooks.userId, user!.id));

	return {
		addCookbookForm: await superValidate(zod(addCookbookFormSchema)),
		cookbooks: userCookbooks
	};
};

export const actions: Actions = {
	add: async (event) => {
		const { safeGetSession } = event.locals;

		const { user } = await safeGetSession();

		const form = await superValidate(event, zod(addCookbookFormSchema));

		if (!user) {
			return fail(400, {
				form,
				success: false,
				message: m.error_not_signed_in()
			});
		}

		if (!form.valid) {
			return fail(400, {
				form,
				success: false,
				message: m.error_invalid_data()
			});
		}

		const cookbook = await db.transaction(async (tx) => {
			const [cookbook] = await tx
				.insert(cookbooks)
				.values({
					name: form.data.name,
					description: form.data.description,
					ownerId: user.id
				})
				.returning();

			await tx.insert(usersToCookbooks).values({
				userId: user.id,
				cookbookId: cookbook.id
			});

			return cookbook;
		});

		return {
			form,
			cookbook,
			success: true
		};
	}
};
