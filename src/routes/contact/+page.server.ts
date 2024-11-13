import { redirect, fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


export const actions: Actions = {
     submit: async ({ request, locals: { supabase, safeGetSession } }) => {
        const { session } = await safeGetSession();

        if (!session) {
            return fail(401, { error: 'Unauthorized' });
        }

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


        const formData = await request.formData();
        const formTypeMap = {
            'skater': 1,
            'sponsorship': 2,
            'bouting': 3
        };

        const formType = formTypeMap[formData.get('formType')];

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


        const submissionData = {
            form_type: formType,
            full_name: formData.get('fullName'),
            derby_name: formData.get('derbyName'),
            email: formData.get('email'),
            phone_number: formData.get('phoneNumber'),
            business_name: formData.get('businessName'),
            league_name: formData.get('leagueName'),
            compliant_league: formData.get('compliantLeague') === 'yes',
            insurance_status: formData.get('insuranceStatus') === 'yes',
            preferred_date: formData.get('prefDate'),
            played_together: formData.get('playedTogether') === 'on',
            comments: formData.get('comments')
        };

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


        try {
            await supabase.from('form_submissions').insert(submissionData);

            throw redirect(303, '/usr_profile/warehouse_Edit');
        } catch (error) {
            return fail(500, { error: error.message });
        }
    }
};

