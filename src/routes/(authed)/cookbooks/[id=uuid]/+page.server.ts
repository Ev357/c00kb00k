import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { cookbooks, folders, usersToCookbooks, type SelectFolder } from '$lib/server/db/schema';
import { eq, getTableColumns, and, sql } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { FolderTreeItem } from './types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { addFolderFormSchema } from './schema';
import * as m from '$lib/paraglide/messages';

export const load: PageServerLoad = async (event) => {
	const { safeGetSession } = event.locals;

	const { user } = await safeGetSession();

	const [[cookbook], foldersResult] = await Promise.all([
		db
			.select(getTableColumns(cookbooks))
			.from(cookbooks)
			.innerJoin(usersToCookbooks, eq(usersToCookbooks.cookbookId, cookbooks.id))
			.where(and(eq(usersToCookbooks.userId, user!.id), eq(cookbooks.id, event.params.id))),
		db.execute<SelectFolder>(sql`
			WITH RECURSIVE folder_tree AS (
				SELECT * 
				FROM ${folders}
				UNION
				SELECT f.*
				FROM ${folders} f
				INNER JOIN folder_tree ft 
				ON ft."id" = f."parentId"
			)
			SELECT * FROM folder_tree;
		`)
	]);

	if (!cookbook) {
		error(404);
	}

	const buildFolderTree = (folders: SelectFolder[], parentId: number | null = null) => {
		return folders
			.filter((folder) => folder.parentId === parentId)
			.map((folder) => {
				const children = buildFolderTree(folders, folder.id);

				const item: FolderTreeItem = {
					...folder,
					...(children.length && { children })
				};

				return item;
			});
	};

	return {
		cookbook: cookbook,
		folders: buildFolderTree(foldersResult),
		addFolderForm: await superValidate(zod(addFolderFormSchema))
	};
};

export const actions: Actions = {
	addFolder: async (event) => {
		const { safeGetSession } = event.locals;

		const { user } = await safeGetSession();

		const form = await superValidate(event, zod(addFolderFormSchema));

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

		const [folder] = await db
			.insert(folders)
			.values({
				name: form.data.name,
				parentId: form.data.folderId
			})
			.returning();

		return {
			form,
			folder,
			success: true
		};
	}
};
