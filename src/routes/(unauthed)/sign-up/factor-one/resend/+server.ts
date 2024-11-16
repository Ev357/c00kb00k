import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { formSchema } from './schema';
import * as m from '$lib/paraglide/messages';

export const POST: RequestHandler = async ({ request, locals }) => {
	const body = await request.json();

	const validation = formSchema.safeParse(body);

	if (!validation.success) {
		error(400, {
			message: m.error_invalid_data()
		});
	}

	const { supabase } = locals;

	const { error: supabaseError } = await supabase.auth.resend({
		type: 'signup',
		email: validation.data.email
	});

	if (supabaseError) {
		error(400, {
			message: m.error_contact_support()
		});
	}

	return json({ success: true });
};
