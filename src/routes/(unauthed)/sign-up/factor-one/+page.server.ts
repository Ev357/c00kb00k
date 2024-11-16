import type { PageServerLoad, Actions } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import * as m from '$lib/paraglide/messages';
import { redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { isAuthApiError } from '@supabase/supabase-js';

export const load: PageServerLoad = async () => ({
	form: await superValidate(zod(formSchema))
});

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		const {
			url,
			locals: { supabase }
		} = event;

		const emailParam = url.searchParams.get('email');
		const emailValidation = z.string().trim().email().safeParse(emailParam);

		if (!form.valid || !emailValidation.success) {
			return fail(400, {
				form,
				success: false,
				message: m.error_invalid_data()
			});
		}

		const { error } = await supabase.auth.verifyOtp({
			email: emailValidation.data,
			type: 'email',
			token: form.data.pin
		});

		if (isAuthApiError(error)) {
			switch (error.message) {
				case 'Token has expired or is invalid':
					return fail(400, {
						form,
						success: false,
						message: m.invalid_code()
					});
				default:
					return fail(400, {
						form,
						success: false,
						message: error.message
					});
			}
		}

		if (error) {
			return fail(400, {
				form,
				success: false,
				message: m.error_contact_support()
			});
		}

		redirect(303, '/dashboard');
	}
};
