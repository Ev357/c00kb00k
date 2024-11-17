import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect, type Actions } from '@sveltejs/kit';
import { formSchema } from './schema';
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

		const { error } = await supabase.auth.signInWithOtp({
			email: form.data.email,
			options: {
				data: {
					username: form.data.username
				}
			}
		});

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

		redirect(303, `/sign-up/factor-one?${params}`);
	}
};
