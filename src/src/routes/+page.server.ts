//  +page.server.ts 

import { redirect } from '@sveltejs/kit';
import {fetchEventsAndImages} from '$lib/assets/utils/eve_utils';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
  const { session } = await safeGetSession();

  try {
    const { existingEvents, images, error } = await fetchEventsAndImages(supabase);

    if (error) {
      console.error('Error fetching data:', error);
    }

    return { session, existingEvents, images };
  } catch (error) {
    console.error('Unexpected error:', error.message);
    return { session: null, existingEvents: [], images: [], error: error.message };
  }
};