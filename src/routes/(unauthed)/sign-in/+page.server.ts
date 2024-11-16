import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { fail, redirect } from '@sveltejs/kit';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import * as m from '$lib/paraglide/messages';

export const load: PageServerLoad = async () => ({
	form: await superValidate(zod(formSchema))
});

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, {
				form,
				success: false,
				message: m.error_invalid_data()
			});
		}

		const {
			locals: { supabase }
		} = event;

		const { error } = await supabase.auth.signInWithOtp({ email: form.data.email });

		if (error) {
			return fail(400, {
				form,
				success: false,
				message: m.error_contact_support()
			});
		}

		const params = new URLSearchParams({
			email: form.data.email
		});

		redirect(303, `/sign-in/factor-one?${params}`);
	}
};
