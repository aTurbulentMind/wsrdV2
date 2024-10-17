// +page.server.ts 

import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { supabase, safeGetSession } }) => {
  const { session } = await safeGetSession();

  // if the user is already logged in return them to the account page
  if (session) {
    console.log('User is already logged in');
  }

  try {
    // Fetch recent articles from Supabase
    const { data: recentArticles, error } = await supabase
      .from('Allthestuff')
      .select('*')
      .order('id', { ascending: false })
      .eq('type_of_text', 1) // Assuming 'type_of_text' is your filter condition
      .limit(5);

    if (error) {
      console.error('B. Error fetching recent articles:', error.message);
      return { recentArticles: [] };
    }

    // Log fetched articles for debugging
    console.log('C. Recent articles fetched:', recentArticles);

    console.log('D. Returning fetched articles...'); // Log the end of the fetching process
    return { recentArticles };
  } catch (err) {
    console.error('Error loading recent articles:', err);
    return { recentArticles: [] };
  }
};