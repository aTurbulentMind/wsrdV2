export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
  try {
    const { data: existingEvents, error: eventsError } = await supabase
      .from('events')
      .select('*');

    if (eventsError) {
      console.error('Error fetching events:', eventsError);
      return { existingEvents: [], folders: [], url: url.origin, error: eventsError.message };
    }

    const { data: folders, error: folderError } = await supabase
      .storage
      .from('Gallery')
      .list('bout_photos');

    if (folderError) {
      console.error('Error fetching folders:', folderError);
      return { existingEvents, folders: [], url: url.origin };
    }

    if (!folders || folders.length === 0) {
      console.log('No folders found');
      return { existingEvents, folders: [], url: url.origin };
    }

    const foldersData = await Promise.all(
      folders.map(async ({ name }) => {
        const { data: files, error: fileError } = await supabase
          .storage
          .from('Gallery')
          .list(`bout_photos/${name}`, { limit: 1 });

        if (fileError) {
          console.error(`Error fetching files for folder ${name}:`, fileError);
          return { name, thumbnailUrl: null };
        }

        if (files && files.length > 0) {
          const { data: { publicUrl } } = supabase
            .storage
            .from('Gallery')
            .getPublicUrl(`bout_photos/${name}/${files[0].name}`);
          return { name, thumbnailUrl: publicUrl };
        }

        return { name, thumbnailUrl: null };
      })
    );

    return { url: url.origin, folders: foldersData, existingEvents };
  } catch (err) {
    console.error('Error loading folders:', err);
    return { existingEvents: [], folders: [], url: url.origin };
  }
};
