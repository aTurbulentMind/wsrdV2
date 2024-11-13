// +page.server.ts

import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession();

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


    // Step 1: Validate user with supabase.auth.getUser() to ensure authenticity
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    console.error('Failed to validate user:', userError?.message);
    throw redirect(303, '/'); // Redirect if user is not authenticated
  }

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


  // Fetch the logged-in user's profile
  const { data: skater, error: skaterError } = await supabase
    .from('accounts')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  if (skaterError) {
    return { skater: null, error: skaterError.message };  // Ensure error is returned
  }

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


  const { data: sk8Avatar, error: sk8AvatarError } = await supabase
    .from('profiles')
    .select(`avatar_url`)
    .eq('id', session.user.id)
    .single();

  if (sk8AvatarError) {
    return { sk8Avatar: null, error: sk8AvatarError.message };  // Ensure error is returned
  }

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


  return { session, skater, sk8Avatar };
};


export const actions: Actions = {
submit: async ({ request, locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession();

    // Step A: Check if user is authenticated
    if (!session) {
      return fail(401, { error: 'Unauthorized' });
    }

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


    let error; // Declare error variable
    const formData = await request.formData();

      // Skater data fields
      const skaterData = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        derby_name: formData.get('derby_name'),
        player_number: formData.get('player_number'),
        bio: formData.get('bio')
      };

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


      // Update skater profile
      const { error: updateError } = await supabase
        .from('accounts')
        .update(skaterData)
        .eq('user_id', session.user.id); // Update based on user_id

      // Error handling
      if (updateError) {
        return fail(500, { error: updateError.message });
      }
    }


};
