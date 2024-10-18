export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
  try {
    // Fetch folder list from storage bucket
    const { data: folders, error: folderError } = await supabase
      .storage
      .from('Gallery')
      .list('bout_photos');

    if (folderError) {
      console.error('Error fetching folders:', folderError);
      return { folders: [], url: url.origin };
    }

    // Early return if no folders found
    if (!folders || folders.length === 0) {
      console.log('No folders found');
      return { folders: [], url: url.origin };
    }

    // Map folders to their thumbnails
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

    // Return the URL and folders data
    return { url: url.origin, folders: foldersData };
  } catch (err) {
    console.error('Error loading folders:', err);
    return { folders: [], url: url.origin };
  }
};
