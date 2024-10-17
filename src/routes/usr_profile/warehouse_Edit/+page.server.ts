// +page.server.ts

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

    const [
        productDataResponse, 
        productInventoryResponse, 
        sizeDataResponse, 
        foldersResponse
    ] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('product_inventory').select('*'),
        supabase.from('sizes').select('size_id, size_name'),
        supabase.storage.from('Gallery').list('items')
    ]);

    if (productDataResponse.error) {
        throw new Error('Failed to fetch products');
    }
    if (productInventoryResponse.error) {
        throw new Error('Failed to fetch product inventory');
    }
    if (sizeDataResponse.error) {
        throw new Error('Failed to fetch sizes');
    }
    if (foldersResponse.error) {
        throw new Error('Failed to fetch folders');
    }

    // Fetch images within each folder
    const imagesData = await Promise.all(
        foldersResponse.data.map(async (folder) => {
            const { data: images, error } = await supabase.storage.from('Gallery').list(`items/${folder.name}`);
            if (error) {
                console.error(`Failed to fetch images for folder ${folder.name}:`, error);
                return { ...folder, images: [] };
            }
            return { ...folder, images };
        })
    );

    return {
        session,
        productData: productDataResponse.data,
        productInventory: productInventoryResponse.data,
        sizeData: sizeDataResponse.data,
        images: imagesData
    };
};


export const actions: Actions = {
   submit: async ({ request, locals: { supabase, safeGetSession } }) => {
        const { session } = await safeGetSession();

        if (!session) {
            return fail(401, { error: 'Unauthorized' });
        }

        const formData = await request.formData();
        const warehouseHub = formData.get('warehouseHub');

        const productData = {
            item_name: formData.get('item_name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price') as string),
            category: formData.get('category')
        };

        const inventoryData = {
            quantity: parseInt(formData.get('quantity') as string),
            item_location: formData.get('item_location'),
            reorder_threshold: parseInt(formData.get('reorder_threshold') as string)
        };

        try {
            if (warehouseHub === 'New') {
                await supabase.from('products').insert([productData]);
            } else if (warehouseHub === 'Amount') {
                await handleAmountSubmit(formData, supabase);
            } else if (warehouseHub === 'Gallery') {
                await handleGalleryUpload(formData, supabase);
            } else if (warehouseHub === 'Edit') {
                await handleEditSubmit(formData, productData, inventoryData, supabase);
            }

            throw redirect(303, '/usr_profile/warehouse_Edit');
        } catch (error) {
            return fail(500, { error: error.message });
        }
    }
};

// Separate function to handle 'Amount' submission
async function handleAmountSubmit(formData, supabase) {
    const product_id = formData.get('product_id');
    const size_id = formData.get('size_id');
    const quantity = parseInt(formData.get('quantity'));
    const item_location = formData.get('item_location');
    const reorder_threshold = parseInt(formData.get('reorder_threshold'));

    // Ensure all required fields are provided
    if (!product_id || !size_id || isNaN(quantity) || !item_location || isNaN(reorder_threshold)) {
        return fail(400, { error: 'All fields are required.' });
    }

    const { error } = await supabase.from('product_inventory').insert({
        product_id,
        size_id,
        quantity,
        item_location,
        reorder_threshold
    });

    if (error) {
        throw new Error(error.message);
    }
}

// Separate function to handle 'Gallery' uploads
async function handleGalleryUpload(formData, supabase) {
    const product_name = formData.get('product_name');

    if (!product_name) {
        return fail(400, { error: 'Product name is required to upload images.' });
    }

    const images = formData.getAll('item_images');
    const uploadErrors = [];

    const { data: existingImages, error: fetchError } = await supabase.storage
        .from('Gallery')
        .list(`items/${product_name}`);

    if (fetchError) {
        throw new Error('Failed to fetch existing images.');
    }

    const existingImageCount = existingImages ? existingImages.length : 0;

    if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            const fileExtension = images[i].name.split('.').pop();
            const newFileName = `${existingImageCount + i + 1}.${fileExtension}`;

            const { error } = await supabase.storage
                .from('Gallery')
                .upload(`items/${product_name}/${newFileName}`, images[i]);

            if (error) {
                uploadErrors.push(error.message);
            }
        }

        if (uploadErrors.length > 0) {
            throw new Error(uploadErrors.join(', '));
        }
    }
}



async function handleEditSubmit(formData, productData, inventoryData, supabase) {
    const product_id = formData.get('product_id');

    const { error: updateProductError } = await supabase
        .from('products')
        .update(productData)
        .eq('product_id', product_id);

    if (updateProductError) {
        throw new Error(updateProductError.message);
    }

    const inventory_ids = formData.getAll('inventory_ids[]');
    const quantities = formData.getAll('quantities[]');
    const reorder_thresholds = formData.getAll('reorder_thresholds[]');

    for (let i = 0; i < inventory_ids.length; i++) {
        const inventory_id = inventory_ids[i];
        const quantity = quantities[i];
        const reorder_threshold = reorder_thresholds[i];

        const { error: updateInventoryError } = await supabase
            .from('product_inventory')
            .update({
                quantity: quantity,
                reorder_threshold: reorder_threshold,
                item_location: formData.get('item_location')
            })
            .eq('inventory_id', inventory_id);

        if (updateInventoryError) {
            throw new Error(updateInventoryError.message);
        }
    }

    // Handle image deletion
    const deleteImages = formData.getAll('delete_images[]');
    const product_name = formData.get('product_name');

    if (deleteImages.length > 0) {
        const deleteErrors = [];

        for (const imageUrl of deleteImages) {
            const imageName = imageUrl.split('/').pop();

            const { error } = await supabase.storage
                .from('Gallery')
                .remove([`items/${product_name}/${imageName}`]);

            if (error) {
                deleteErrors.push(error.message);
            }
        }

        if (deleteErrors.length > 0) {
            throw new Error(deleteErrors.join(', '));
        }
    }
}