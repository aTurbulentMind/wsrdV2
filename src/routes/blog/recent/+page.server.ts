// +page.server.ts 
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { supabase, safeGetSession } }) => {
  const { session } = await safeGetSession();
  try {
    const { data: recentArticles, error } = await supabase
      .from('Allthestuff')
      .select('*')
      .order('id', { ascending: false })
      .eq('type_of_text', 1) // Assuming 'type_of_text' is your filter condition
      .limit(1);

    if (error) {
      return { recentArticles: [] };
    }
process
    return { recentArticles };
  } catch (err) {
    return { recentArticles: [] };
  }
};