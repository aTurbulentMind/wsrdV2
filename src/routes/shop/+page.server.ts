//  +page.server.ts 

import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {fetchProductsAndImages} from '$lib/assets/utils/itm_utils';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
    try {
    const { session } = await safeGetSession();
    
        // Fetch products, inventory, sizes, and images
        const { productData, productInventory, sizeData, images, error } = 
            await fetchProductsAndImages(supabase);

        // Check for any data fetching error
        if (error) {
            console.error('Error fetching product data:', error);
            return fail(500, { error: 'Failed to load product data' });
        }

        // Return all data to the page
        return { session, productData, productInventory, sizeData, images };

    } catch (error) {
        console.error('Unexpected error:', error.message);
        return fail(500, { error: 'An unexpected error occurred' });
}};
