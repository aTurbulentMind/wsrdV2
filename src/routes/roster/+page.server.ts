import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { supabase, safeGetSession } }) => {
  const { session } = await safeGetSession();

  // if the user is already logged in return them to the account page
  if (session) {
    console.log('User is already logged in');
  }

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

  try {
    // Fetch roster from Supabase
    const { data: skater, error } = await supabase
      .from('accounts')
      .select('*');

    if (error) {
      console.error('Error fetching roster:', error.message);
      return { skater: [] };
    }

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`username, full_name, contact, avatar_url`)
      .eq('id', session.user.id)
      .single();

    if (profileError) { 
      console.error('Error fetching profile:', profileError.message);
      return { profile: null }; 
    }

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

    return { skater, profile };
  } catch (err) {
    console.error('Error loading skater:', err);
    return { skater: [] };
  }
};
