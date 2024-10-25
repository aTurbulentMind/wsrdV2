import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
  const { session } = await safeGetSession();

    // Step 1: Validate user with supabase.auth.getUser() to ensure authenticity
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    console.error('Failed to validate user:', userError?.message);
    throw redirect(303, '/'); // Redirect if user is not authenticated
  }

  console.log('Authenticated user:', userData.user);

  // Step 2: Fetch existing events
  const { data: existingEvents, error: eventsError } = await supabase
    .from('events')
    .select('*');

  if (eventsError) {
    return { existingEvents: [], error: eventsError.message };
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

  return { session, existingEvents, images };
};

export const actions: Actions = {
  submit: async ({ request, locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession();
    
    if (!session) {
      return fail(401, { error: 'Unauthorized' });
    }

    const formData = await request.formData();
    const eventHub = formData.get('eventHub');

    const eventData = {
      event_name: formData.get('event_name'),
      event_date: formData.get('event_date'),
      location: formData.get('location'),
      description: formData.get('description'),
      status_id: formData.get('status_id')
    };

    let operationError;

if (eventHub === 'New') {
  const { data: newEvent, error: insertError } = await supabase
  .from('events')
  .insert([eventData])
  .select('event_name');

  if (insertError) {
    return fail(500, { error: insertError.message });
  }

  const images = formData.getAll('images');
  const uploadErrors: string[] = [];

  // If new images were uploaded
  if (images.length > 0) {
    for (const image of images) {
      if (image instanceof File && image.size > 0) {
        const sanitizedEventName = newEvent[0].event_name.replace(/[^a-zA-Z0-9-_ ]/g, '');
        const filePath = `event_Flyer/${sanitizedEventName}`;

        // Upload the new image
        const { error: uploadError } = await supabase.storage
          .from('Gallery')
          .upload(filePath, image);

        if (uploadError) {
          uploadErrors.push(`Error uploading image: ${uploadError.message}`);
        }
      }
    }
  }

  if (uploadErrors.length > 0) {
    return fail(500, { error: 'Some images failed to upload', details: uploadErrors });
  }
}


else if (eventHub === 'Edit') {
  const id = formData.get('event_id');

  // Update event data in the DB
  ({ error: operationError } = await supabase
    .from('events')
    .update(eventData)
    .eq('event_id', id));

  if (operationError) {
    return fail(500, { error: operationError });
  }
  
  const images = formData.getAll('images');

  const uploadErrors: string[] = [];

  if (images.length > 0) {
    

    for (const image of images) {
      
  
      if (image instanceof File && image.size > 0) {
        
    
        const sanitizedEventName = eventData.event_name.replace(/[^a-zA-Z0-9-_ ]/g, '');

    
        const filePath = `event_Flyer/${sanitizedEventName}`;

    
        const { data: existingImage, error: fetchError } = await supabase.storage
          .from('Gallery')
          .list('event_Flyer', { search: sanitizedEventName });

    
        if (fetchError) {
          console.error('Error fetching existing image:', fetchError.message);
        }

    
        if (existingImage && existingImage.length > 0) {
          
      
          const { error: deleteError } = await supabase.storage
            .from('Gallery')
            .remove([`event_Flyer/${existingImage[0].name}`]);

      
          if (deleteError) {
            uploadErrors.push(`Error deleting existing image: ${deleteError.message}`);
          }
        }

    
        const { error: uploadError } = await supabase.storage
          .from('Gallery')
          .upload(filePath, image);

    
        if (uploadError) {
          uploadErrors.push(`Error uploading image: ${uploadError.message}`);
        }
      }
    }
  }



  
  // const images = formData.getAll('images');
  // const uploadErrors: string[] = [];

  // // If new images were uploaded
  // if (images.length > 0) {
  //   for (const image of images) {
  //     if (image instanceof File && image.size > 0) {
  //       const sanitizedEventName = eventData.event_name.replace(/[^a-zA-Z0-9-_ ]/g, '');
  //       const filePath = `event_Flyer/${sanitizedEventName}`;

  //       // Check if an image with the same event name already exists
  //       const { data: existingImage, error: fetchError } = await supabase.storage
  //         .from('Gallery')
  //         .list('event_Flyer', { search: sanitizedEventName });

  //       if (fetchError) {
  //         console.error('Error fetching existing image:', fetchError.message);
  //       }

  //       // If an existing image is found, delete it
  //       if (existingImage && existingImage.length > 0) {
  //         const { error: deleteError } = await supabase.storage
  //           .from('Gallery')
  //           .remove([`event_Flyer/${existingImage[0].name}`]);

  //         if (deleteError) {
  //           uploadErrors.push(`Error deleting existing image: ${deleteError.message}`);
  //         }
  //       }

  //       // Upload the new image
  //       const { error: uploadError } = await supabase.storage
  //         .from('Gallery')
  //         .upload(filePath, image);

  //       if (uploadError) {
  //         uploadErrors.push(`Error uploading image: ${uploadError.message}`);
  //       }
  //     }
  //   }
  // }
}

let uploadErrors = [];

if (uploadErrors.length > 0) {
  return fail(500, { uploadErrors });
}


    if (operationError) {
      return fail(500, { error: operationError });
    }

    if (uploadErrors.length > 0) {
      return fail(500, { error: 'Some images failed to upload', details: uploadErrors });
    }

    return { success: true };
  }
};