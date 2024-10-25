//  +page.server.ts 


import { redirect } from '@sveltejs/kit';
import { fetchEventsAndImages } from '../lib/assets/utils/utils';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
  const { session } = await safeGetSession();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    console.error('Failed to validate user:', userError?.message);
    throw redirect(303, '/');
  }


  try {
    const { existingEvents, images } = await fetchEventsAndImages(supabase);
    return { session, existingEvents, images };
  } catch (error) {
    return { existingEvents: [], error: error.message };
  }
};
