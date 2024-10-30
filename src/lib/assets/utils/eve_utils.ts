// eve_utils.ts - Helper functions for events
// Fetch events and corresponding images
export const fetchEventsAndImages = async (supabase) => {
  const { data: existingEvents, error: eventsError } = await supabase
    .from('events')
    .select('*');

  if (eventsError) {
    console.error('Failed to fetch events:', eventsError.message);
    return { existingEvents: [], images: [], error: eventsError.message };
  }

  const { data: imagesData, error: imagesError } = await supabase
    .storage
    .from('Gallery')
    .list('event_Flyer');

  if (imagesError) {
    console.error('Failed to fetch event flyers:', imagesError.message);
    return { existingEvents, images: [], error: imagesError.message };
  }

  const images = imagesData.map((file, index) => ({
    id: index,
    url: `https://vyzeudiywhlxdzpnfehs.supabase.co/storage/v1/object/public/Gallery/event_Flyer/${file.name}`,
  }));

  return { existingEvents, images };
};

// Sanitize event name to be used as a file path or identifier
export const sanitizeEventName = (eventName) => {
  return eventName
    .toLowerCase()
    .replace(/[^a-z0-9-_ ]/gi, '')  // Normalize to alphanumeric with spaces
    .replace(/\s+/g, '-');           // Replace spaces with dashes
};

// Upload an image to Supabase Storage
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

// Delete an existing image if it exists
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

// Find the matching image for a given event
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
