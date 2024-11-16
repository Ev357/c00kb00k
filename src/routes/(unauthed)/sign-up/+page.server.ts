import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';
import { formSchema } from './schema';

export const load: PageServerLoad = async () => ({
	form: await superValidate(zod(formSchema))
});

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// TODO: sign up

		/* const {
			locals: { supabase }
		} = event; */

		/* const { error } = await supabase.auth.signInWithOtp({ email: form.data.email });

		if (error) {
			return fail(400, {
				form,
				success: false,
				email: form.data.email,
				message: `There was an issue, Please contact support.`
			});
		} */

		return {
			form,
			success: true,
			message: 'Please check your email for a magic link to log into the website.'
		};
	}
};
