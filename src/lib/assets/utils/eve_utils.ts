// eve_utils.js - Helper functions for events

export const fetchEventsAndImages = async (supabase) => {
  try {
    const { data: existingEvents, error: eventsError } = await supabase
      .from('events')
      .select('*');

    if (eventsError) {
      console.error('Failed to fetch events:', eventsError.message);
      return { existingEvents: [], folders: [], images: [], error: eventsError.message };
    }

    const { data: imagesData, error: imagesError } = await supabase
      .storage
      .from('Gallery')
      .list('event_Flyer');

    if (imagesError) {
      console.error('Failed to fetch event flyers:', imagesError.message);
      return { existingEvents: [], folders: [], images: [], error: imagesError.message };
    }

    const images = imagesData.map((file, index) => ({
      id: index,
      url: `https://vyzeudiywhlxdzpnfehs.supabase.co/storage/v1/object/public/Gallery/event_Flyer/${file.name}`,
    }));

    const { data: folders, error: folderError } = await supabase
      .storage
      .from('Gallery')
      .list('bout_photos');

    if (folderError) {
      console.error('Error fetching folders:', folderError);
      return { existingEvents, folders: [], images, error: folderError.message };
    }

    if (!folders || folders.length === 0) {
      console.log('No folders found');
      return { existingEvents, folders: [], images, error: null };
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
          const { data, error: urlError } = supabase
            .storage
            .from('Gallery')
            .getPublicUrl(`bout_photos/${name}/${files[0].name}`);

          if (urlError) {
            console.error(`Error generating public URL for ${name}:`, urlError);
            return { name, thumbnailUrl: null };
          }

          console.log(`Thumbnail for ${name}:`, data.publicUrl);
          return { name, thumbnailUrl: data.publicUrl };
        }

        return { name, thumbnailUrl: null };
      })
    );

    return { existingEvents, folders: foldersData, images, error: null };
  } catch (err) {
    console.error('Error loading data:', err);
    return { existingEvents: [], folders: [], images: [], error: err.message };
  }
};

export const sanitizeEventName = (eventName) => {
  return eventName
    .toLowerCase()
    .replace(/[^a-z0-9-_ ]/gi, '')
    .replace(/\s+/g, '-');
};

export const uploadImage = async (supabase, sanitizedName, image) => {
  const filePath = `event_Flyer/${sanitizedName}`;
  const { error } = await supabase.storage
    .from('Gallery')
    .upload(filePath, image);

  if (error) {
    console.error(`Error uploading image: ${error.message}`);
    return { success: false, error: error.message };
  }

  return { success: true, filePath };
};

export const deleteExistingImage = async (supabase, sanitizedName) => {
  const { data: existingImage, error: fetchError } = await supabase.storage
    .from('Gallery')
    .list('event_Flyer', { search: sanitizedName });

  if (fetchError) {
    console.error('Error fetching existing image:', fetchError.message);
    return { success: false, error: fetchError.message };
  }

  if (existingImage && existingImage.length > 0) {
    const { error: deleteError } = await supabase.storage
      .from('Gallery')
      .remove([`event_Flyer/${existingImage[0].name}`]);

    if (deleteError) {
      console.error('Error deleting existing image:', deleteError.message);
      return { success: false, error: deleteError.message };
    }
  }

  return { success: true };
};

export const findMatchingImage = (eventName, images) => {
  if (!eventName) {
    console.error('No event name provided to find the matching image');
    return null;
  }

  const sanitizedEventName = sanitizeEventName(eventName);

  return images.find((image) => {
    const imageName = decodeURIComponent(image.url.split('/').pop())
      .replace(/\.[^/.]+$/, '')
      .trim()
      .toLowerCase();

    return imageName === sanitizedEventName.toLowerCase();
  });
};

export const generatePublicUrl = (folder, filename) => {
  return `https://vyzeudiywhlxdzpnfehs.supabase.co/storage/v1/object/public/Gallery/${folder}/${filename}`;
};

export const findMatchingEvent = (events, galleryName) => {
  const sanitizedGalleryName = sanitizeEventName(galleryName);
  return events.find((event) => sanitizeEventName(event.event_name) === sanitizedGalleryName);
};
