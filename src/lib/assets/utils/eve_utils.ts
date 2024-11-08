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

    // 🌞 \\

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

    // 🌞 \\

    // Fetch bout photo folders
    const { data: folderData, error: folderError } = await supabase.storage
      .from('Gallery')
      .list('bout_photos');

    if (folderError) {
      console.error('Error fetching folders:', folderError);
      return { existingEvents: [], folders: [], images: [], error: folderError.message };
    }

    // 🌞 \\

    const folders = await Promise.all(
      folderData.map(async (folder, index) => {
        const { data: files, error: filesError } = await supabase
          .storage
          .from('Gallery')
          .list(`bout_photos/${folder.name}`);

        if (filesError) {
          console.error(`Error fetching images for folder ${folder.name}:`, filesError);
          return { name: folder.name, images: [] };
        }

        const images = files.map(file => generatePublicUrl(`bout_photos/${folder.name}`, file.name));
        return { name: folder.name, images };
      })
    );

    return { existingEvents, folders, images, error: null };
  } catch (err) {
    console.error('Error loading data:', err);
    return { existingEvents: [], folders: [], images: [], error: err.message };
  }
};

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


// Utility function to fetch the top image URL for a given folder
export const fetchTopImageUrl = async (supabase, folderName) => {
  try {
    const { data: files, error: fileError } = await supabase
      .storage
      .from('Gallery')
      .list(`bout_photos/${folderName}`, { limit: 1 });

    if (fileError) {
      console.error(`Error fetching files for folder ${folderName}:`, fileError);
      return null;
    }

    if (files && files.length > 0) {
      const { data, error: urlError } = supabase
        .storage
        .from('Gallery')
        .getPublicUrl(`bout_photos/${folderName}/${files[0].name}`);

      if (urlError) {
        console.error(`Error generating public URL for ${folderName}:`, urlError);
        return null;
      }

      return data.publicUrl;
    }

    return null;
  } catch (err) {
    console.error('Error fetching top image URL:', err);
    return null;
  }
};

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

export const fetchImagesWithPagination = async (supabase, folderName, page, limit) => {
  try {
    const { data: files, error: filesError } = await supabase
      .storage
      .from('Gallery')
      .list(`bout_photos/${folderName}`, { limit, offset: page * limit });

    if (filesError) {
      console.error(`Error fetching images for folder ${folderName}:`, filesError);
      return [];
    }

    return files.map(file => generatePublicUrl(`bout_photos/${folderName}`, file.name));
  } catch (err) {
    console.error('Error fetching images with pagination:', err);
    return [];
  }
};

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

export const uploadFlyerImage = async (supabase, sanitizedName, image) => {
  const filePath = `event_Flyer/${sanitizedName}`;
  const { error } = await supabase.storage
    .from('Gallery')
    .upload(filePath, image);

  if (error) {
    console.error(`Error uploading flyer image: ${error.message}`);
    return { success: false, error: error.message };
  }

  return { success: true, filePath };
};

export const uploadGalleryImage = async (supabase, folderName, sanitizedName, image) => {
  const filePath = `bout_photos/${folderName}/${sanitizedName}`;
  const { error } = await supabase.storage
    .from('Gallery')
    .upload(filePath, image);

  if (error) {
    console.error(`Error uploading gallery image: ${error.message}`);
    return { success: false, error: error.message };
  }

  return { success: true, filePath };
};

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

export const deleteExistingFlyerImage = async (supabase, sanitizedName) => {
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
      console.error('Error deleting existing flyer image:', deleteError.message);
      return { success: false, error: deleteError.message };
    }
  }

  return { success: true };
};


export const deleteExistingGalleryImage = async (supabase, folderName, imageName) => {
  const { error: deleteError } = await supabase.storage
    .from('Gallery')
    .remove([`bout_photos/${folderName}/${imageName}`]);

  if (deleteError) {
    console.error('Error deleting existing gallery image:', deleteError.message);
    return { success: false, error: deleteError.message };
  }

  return { success: true };
};

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

export const sanitizeEventName = (eventName) => {
  return eventName
    .toLowerCase()
    .replace(/[^a-z0-9-_ ]/gi, '')
    .replace(/\s+/g, ' ');
};

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

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

export const hasMatchingImage = (eventName, images) => {
	const sanitizedEventName = sanitizeEventName(eventName);

	const matchingImage = images.find((image) => {
		const imageName = image.url
			.split('/')
			.pop()
			.replace(/\.[^/.]+$/, '');

		return imageName.toLowerCase() === sanitizedEventName.toLowerCase();
	});

	return matchingImage ? `${matchingImage.url}?t=${new Date().getTime()}` : null;
};

export const findMatchingEvent = (events, galleryName) => {
  const sanitizedGalleryName = sanitizeEventName(galleryName);
  return events.find((event) => sanitizeEventName(event.event_name) === sanitizedGalleryName);
};

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

export const generatePublicUrl = (folder, filename) => {
  return `https://vyzeudiywhlxdzpnfehs.supabase.co/storage/v1/object/public/Gallery/${folder}/${filename}`;
};
