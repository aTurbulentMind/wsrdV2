// itm_utils.ts - Helper functions for item management

export const fetchProductsAndImages = async (supabase) => {
  // Fetch product-related data in parallel
  const [productDataResponse, productInventoryResponse, sizeDataResponse, foldersResponse] = await Promise.all([
    supabase.from('products').select('*'),
    supabase.from('product_inventory').select('*'),
    supabase.from('sizes').select('size_id, size_name'),
    supabase.storage.from('Gallery').list('items'),
  ]);

  // Handle any errors in the parallel fetch operations
  if (productDataResponse.error) {
    console.error('Failed to fetch products:', productDataResponse.error.message);
    return { productData: [], productInventory: [], sizeData: [], images: [], error: productDataResponse.error.message };
  }

  if (productInventoryResponse.error) {
    console.error('Failed to fetch product inventory:', productInventoryResponse.error.message);
    return { productData: [], productInventory: [], sizeData: [], images: [], error: productInventoryResponse.error.message };
  }

  if (sizeDataResponse.error) {
    console.error('Failed to fetch sizes:', sizeDataResponse.error.message);
    return { productData: [], productInventory: [], sizeData: [], images: [], error: sizeDataResponse.error.message };
  }

  if (foldersResponse.error) {
    console.error('Failed to fetch folders:', foldersResponse.error.message);
    return { productData: [], productInventory: [], sizeData: [], images: [], error: foldersResponse.error.message };
  }

  // Fetch images within each folder in parallel
  const imagesData = await Promise.all(
    foldersResponse.data.map(async (folder) => {
      const { data: images, error } = await supabase.storage.from('Gallery').list(`items/${folder.name}`);
      if (error) {
        console.error(`Failed to fetch images for folder ${folder.name}:`, error.message);
        return { folder: folder.name, images: [] };
      }
      return { folder: folder.name, images };
    })
  );

  // Return all the collected data
  return {
    productData: productDataResponse.data,
    productInventory: productInventoryResponse.data,
    sizeData: sizeDataResponse.data,
    images: imagesData,
  };
};


// Helper to sanitize item names
export const sanitizeItemName = (itemName) => {
  return itemName
    .toLowerCase()
    .replace(/[^a-z0-9-_ ]/gi, '')  // Normalize to alphanumeric with spaces
    .replace(/\s+/g, '-');           // Replace spaces with dashes
};


// Unified image-related logic
export const getImages = async (
  itemName: string,
  images: any[],
  getFirstImageOnly = false // Flag to control what to return
) => {
  if (!itemName) {
    console.error('No item name provided');
    return getFirstImageOnly ? null : [];
  }

  // Sanitize item name
  const sanitizedItemName = itemName.trim().toLowerCase();

  if (!images || !Array.isArray(images) || images.length === 0) {
    return getFirstImageOnly ? null : [];
  }

  const matchingFolder = images.find((folder) => {
    if (!folder || !folder.folder) {
      console.error('Invalid folder:', folder);
      return false;
    }
    const folderName = folder.folder.trim().toLowerCase();
    return folderName === sanitizedItemName;
  });

  if (!matchingFolder || !Array.isArray(matchingFolder.images) || matchingFolder.images.length === 0) {
    return getFirstImageOnly ? null : [];
  }

  const imageUrls = matchingFolder.images.map(
    (img) =>
      `https://vyzeudiywhlxdzpnfehs.supabase.co/storage/v1/object/public/Gallery/items/${matchingFolder.folder}/${img.name}`
  );

  return getFirstImageOnly ? imageUrls[0] : imageUrls;
};
