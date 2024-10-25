// utils.ts - utility functions for the sveltekit app

export const fetchEventsAndImages = async (supabase) => {
  // Fetch existing events
  const { data: existingEvents, error: eventsError } = await supabase
    .from('events')
    .select('*');

  if (eventsError) {
    throw new Error(eventsError.message);
  }

  // Fetch event flyers from storage
  const { data: imagesData, error: imagesError } = await supabase
    .storage
    .from('Gallery')
    .list('event_Flyer');

  if (imagesError) {
    throw new Error('Failed to fetch event flyers');
  }

  const images = imagesData.map((file, index) => {
    const publicURL = `https://vyzeudiywhlxdzpnfehs.supabase.co/storage/v1/object/public/Gallery/event_Flyer/${file.name}`;
    return { id: index, url: publicURL };
  });

  return { existingEvents, images };
};

export const findMatchingImage = (eventName, images) => {
  if (!eventName) {
    console.error('Image is not fetching');
    return null;
  }

  const sanitizedEventName = eventName.replace(/[^a-zA-Z0-9-_ ]/g, '');

  return images.find((image) => {
    const imageName = image.url
      .split('/')
      .pop()
      .replace(/\.[^/.]+$/, '');

    return imageName.toLowerCase() === sanitizedEventName.toLowerCase();
  });
};

