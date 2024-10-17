//  +page.server.ts 

import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
    const [productDataResponse, productInventoryResponse, sizeDataResponse, foldersResponse] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('product_inventory').select('*'),
        supabase.from('sizes').select('size_id, size_name'),
        supabase.storage.from('Gallery').list('items')
    ]);

    if (productDataResponse.error) {
        console.error('Failed to fetch products:', productDataResponse.error.message);
        throw new Error('Failed to fetch products');
    }
    if (productInventoryResponse.error) {
        console.error('Failed to fetch product inventory:', productInventoryResponse.error.message);
        throw new Error('Failed to fetch product inventory');
    }
    if (sizeDataResponse.error) {
        console.error('Failed to fetch sizes:', sizeDataResponse.error.message);
        throw new Error('Failed to fetch sizes');
    }
    if (foldersResponse.error) {
        console.error('Failed to fetch folders:', foldersResponse.error.message);
        throw new Error('Failed to fetch folders');
    }

    // Fetch images within each folder
    const imagesData = await Promise.all(
        foldersResponse.data.map(async (folder) => {
            const { data: images, error } = await supabase.storage.from('Gallery').list(`items/${folder.name}`);
            if (error) {
                console.error(`Failed to fetch images for folder ${folder.name}:`, error.message);
                return { ...folder, images: [] };
            }
            return { ...folder, images };
        })
    );

    return {
        productData: productDataResponse.data,
        productInventory: productInventoryResponse.data,
        sizeData: sizeDataResponse.data,
        images: imagesData
    };
};
