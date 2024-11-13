// +page.server.ts 

import { fetchEventsAndImages, fetchTopImageUrl } from '$lib/assets/utils/eve_utils';

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
  try {
    const { existingEvents, folders, images, error } = await fetchEventsAndImages(supabase);

    if (error) {
      console.error('Error fetching data:', error);
      return { existingEvents: [], folders: [], images: [], url: url.origin, error };
    }    

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


    // Fetch thumbnails for each folder
    const foldersWithThumbnails = await Promise.all(
      folders.map(async (folder) => {
        const thumbnailUrl = await fetchTopImageUrl(supabase, folder.name);
        return { ...folder, thumbnailUrl };
      })
    );

    return { url: url.origin, folders: foldersWithThumbnails, existingEvents, images };
  } catch (err) {
    console.error('Error loading data:', err);
    return { existingEvents: [], folders: [], images: [], url: url.origin, error: err.message };
  }
};


