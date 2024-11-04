// itm_utils.ts - Helper functions for item management

/**
 * Fetch products, inventory, sizes, and images from Supabase in parallel.
 *
 * @param {object} supabase - The Supabase client.
 * @returns {Promise<object>} - Returns fetched data or an error message.
 */
export const fetchProductsAndImages = async (supabase) => {
    try {
        // Fetch product-related data in parallel
        const [productData, productInventory, sizeData, folders] = await Promise.all([
            supabase.from('products').select('*'),
            supabase.from('product_inventory').select('*'),
            supabase.from('sizes').select('size_id, size_name'),
            supabase.storage.from('Gallery').list('items'),
        ]);

        // Check for errors in each fetch operation
        if (productData.error) throw new Error(`Failed to fetch products: ${productData.error.message}`);
        if (productInventory.error) throw new Error(`Failed to fetch product inventory: ${productInventory.error.message}`);
        if (sizeData.error) throw new Error(`Failed to fetch sizes: ${sizeData.error.message}`);
        if (folders.error) throw new Error(`Failed to fetch folders: ${folders.error.message}`);

        // Fetch images within each folder in parallel
        const imagesData = await Promise.all(
            folders.data.map(async (folder) => {
                const { data: images, error } = await supabase.storage.from('Gallery').list(`items/${folder.name}`);
                if (error) {
                    console.error(`Failed to fetch images for folder ${folder.name}:`, error.message);
                    return { folder: folder.name, images: [] };
                }
                return { folder: folder.name, images };
            })
        );

        // Return all collected data
        return {
            productData: productData.data,
            productInventory: productInventory.data,
            sizeData: sizeData.data,
            images: imagesData,
        };
    } catch (error) {
        console.error(error.message);
        return { productData: [], productInventory: [], sizeData: [], images: [], error: error.message };
    }
};

/**
 * Sanitize item names by making them lowercase, alphanumeric with hyphens.
 *
 * @param {string} itemName - The name of the item to sanitize.
 * @returns {string} - The sanitized item name.
 */
export const sanitizeItemName = (itemName: string): string => {
    return itemName
        .toLowerCase()
        .replace(/[^a-z0-9-_ ]/gi, '')  // Normalize to alphanumeric with spaces
        .replace(/\s+/g, '-');          // Replace spaces with dashes
};


/**
 * Retrieve images associated with a given item name.
 *
 * @param {string} itemName - The name of the item.
 * @param {Array} images - Array of folder objects with images.
 * @param {boolean} getFirstImageOnly - Flag to return only the first image URL.
 * @returns {string | string[] | null} - The image URL(s) or null if not found.
 */
export const getImages = async (
    itemName: string,
    images: any[],
    getFirstImageOnly = false
): Promise<string | string[] | null> => {
    if (!itemName) {
        console.error('No item name provided');
        return getFirstImageOnly ? null : [];
    }

    const sanitizedItemName = itemName.trim().toLowerCase();

    if (!images || !Array.isArray(images) || images.length === 0) {
        console.warn('No images found or invalid images array');
        return getFirstImageOnly ? null : [];
    }

    // Find the folder that matches the sanitized item name
    const matchingFolder = images.find((folder) => {
        if (!folder || !folder.folder) {
            console.error('Invalid folder data:', folder);
            return false;
        }
        return folder.folder.trim().toLowerCase() === sanitizedItemName;
    });

    if (!matchingFolder || !Array.isArray(matchingFolder.images) || matchingFolder.images.length === 0) {
        console.warn(`No images found for item: ${itemName}`);
        return getFirstImageOnly ? null : [];
    }

    // Map the images to their URLs
    const imageUrls = matchingFolder.images.map(
        (img) =>
            `https://vyzeudiywhlxdzpnfehs.supabase.co/storage/v1/object/public/Gallery/items/${matchingFolder.folder}/${img.name}`
    );

    return getFirstImageOnly ? imageUrls[0] : imageUrls;
};

