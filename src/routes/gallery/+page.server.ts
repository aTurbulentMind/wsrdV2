import { fetchEventsAndImages } from '$lib/assets/utils/eve_utils';

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
  try {
    const { existingEvents, folders, images, error } = await fetchEventsAndImages(supabase);

    if (error) {
      console.error('Error fetching data:', error);
      return { existingEvents: [], folders: [], images: [], url: url.origin, error };
    }

    return { url: url.origin, folders, existingEvents, images };
  } catch (err) {
    console.error('Error loading data:', err);
    return { existingEvents: [], folders: [], images: [], url: url.origin, error: err.message };
  }
};
