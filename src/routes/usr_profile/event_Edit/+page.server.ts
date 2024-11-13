import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {fetchEventsAndImages, sanitizeEventName, uploadFlyerImage, deleteExistingFlyerImage, uploadGalleryImage, deleteExistingGalleryImage} from '$lib/assets/utils/eve_utils';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
  const { session } = await safeGetSession();

  const { data: userData, error: userError } = await supabase.auth.getUser();

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


  if (userError || !userData.user) {
    console.error('Failed to validate user:', userError?.message);
    throw redirect(303, '/'); 
  }

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


  try {
    const { existingEvents, folders, images, error } = await fetchEventsAndImages(supabase);

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


    if (error) {
      console.error('Error fetching data:', error);
    }

    return { session, folders, existingEvents, images };
  } catch (error) {
    console.error('Unexpected error:', error.message);
    return { session: null, existingEvents: [], images: [], folders: [], error: error.message };
  }
};

export const actions: Actions = {
  submit: async ({ request, locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession();

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

    if (!session) return fail(401, { error: 'Unauthorized' });

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


    const formData = await request.formData();
    const eventHub = formData.get('eventHub');

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


    const eventData = {
      event_name: formData.get('event_name'),
      event_date: formData.get('event_date'),
      location: formData.get('location'),
      description: formData.get('description'),
      status_id: formData.get('status_id'),
    };

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


    let operationError;
    const images = formData.getAll('images');
    const sanitizedEventName = sanitizeEventName(eventData.event_name);
    const uploadErrors = [];

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟


    if (eventHub === 'New') {
      const { data: newEvent, error: insertError } = await supabase
        .from('events')
        .insert([eventData])
        .select('event_name');

      if (insertError) return fail(500, { error: insertError.message });

      for (const image of images) {
        if (image instanceof File && image.size > 0) {
          const { success, error } = await uploadFlyerImage(supabase, sanitizedEventName, image);
          if (!success) uploadErrors.push(error);
        }
      }

    } 

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

  else if (eventHub === 'Edit') {
      const id = formData.get('event_id');
    
      ({ error: operationError } = await supabase.from('events').update(eventData).eq('event_id', id));

      if (operationError) return fail(500, { error: operationError.message });
    }
        return { success: true };
  },
};