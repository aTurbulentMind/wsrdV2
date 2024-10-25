<!-- +page.svelte  
	Shop/warehouse page.

	@since version 0.3.3

	Plans
	Filter Sidebar: Add a sidebar for filtering items by categories, colors, sizes, or price ranges.
	Search Bar: Implement a search bar at the top for easy item lookup, with autocomplete suggestions.
	Item Background Patterns: Introduce subtle background patterns or textures to enhance depth without overwhelming the content.

-->

<script lang="ts">
	import { fade } from 'svelte/transition'
	import MeBase from '$lib/assets/img/meBase.jpg'

	// ✨ ✨✨ ✨✨ ✨✨ ✨

	export let data

	let { session, productData, productInventory, sizeData, images } = data
	$: ({ session, productData, productInventory, sizeData, images } = data)

	// ✨ ✨✨ ✨✨ ✨✨ ✨

	let loading = false
	let matchingInventory = {}
	let uniqueCategories = new Set(productData.map((product) => product.category))
	let selectedCategory = ''
	let selectedProduct = null
	let showCategorySelection = false
	let selectedSize
	let showModal = false
	let productImages = []
	let currentImageIndex = 0
	let intervalId

	let storeFrontSpace = {
		product_id: '',
		item_name: '',
		description: '',
		price: '',
		size_id: '',
		category: '',
		quantity: '',
		images: []
	}

	// ✨ ✨✨ ✨✨ ✨✨ ✨

	// Handle category selection when a tab is clicked
	function handleCategorySelection(category) {
		selectedCategory = category // Update the selected category
	}

	// ✨ ✨✨ ✨✨ ✨✨ ✨

	async function handleSizeSelection() {
		selectedSize = sizeData.find((size) => size.size_id === storeFrontSpace.size_id)
		selectedProduct = productData.find(
			(product) => product.product_id === storeFrontSpace.product_id
		)
	}

	// ✨ ✨✨ ✨✨ ✨✨ ✨

	async function handleProductSelection(event) {
		selectedProduct = event.target.options[event.target.selectedIndex]
		const selectedProductId = selectedProduct.value

		// Filter the product inventory for the selected product
		matchingInventory = productInventory.filter(
			(inventory) => inventory.product_id === parseInt(selectedProductId)
		)

		const availableSizes = matchingInventory.map((inventory) => {
			const size = sizeData.find((size) => size.size_id === inventory.size_id)
			return size ? size.size_name : ' N/A'
		})

		// Update the storeFrontSpace object with product details
		storeFrontSpace = {
			...storeFrontSpace,
			product_id: selectedProductId,
			item_name: selectedProduct.getAttribute('data-name'),
			description: selectedProduct.getAttribute('data-description'),
			price: selectedProduct.getAttribute('data-price'),
			category: selectedProduct.getAttribute('data-category'),
			images: [selectedProduct.getAttribute('data-image')],
			sizes: availableSizes
		}
	}

	// ✨ ✨✨ ✨✨ ✨✨ ✨

	const hasMatchingImage = async (itemName) => {
		const sanitizedItemName = itemName
			.replace(/[^a-zA-Z0-9-_ ]/g, '')
			.trim()
			.toLowerCase()

		if (!images || !Array.isArray(images) || images.length === 0) {
			return null
		}

		const matchingFolder = images.find((folder) => {
			const folderName = decodeURIComponent(folder.name.trim().toLowerCase())
			return folderName === sanitizedItemName
		})

		if (
			!matchingFolder ||
			!Array.isArray(matchingFolder.images) ||
			matchingFolder.images.length === 0
		) {
			return null
		}

		const firstMatchingImage = matchingFolder.images[0]
		const imageUrl = `https://vyzeudiywhlxdzpnfehs.supabase.co/storage/v1/object/public/Gallery/items/${matchingFolder.name}/${firstMatchingImage.name}`

		return imageUrl
	}

	// ✨ ✨✨ ✨✨ ✨✨ ✨

	const nextImage = () => {
		if (productImages && productImages.length > 0) {
			currentImageIndex = (currentImageIndex + 1) % productImages.length
		}
	}

	const prevImage = () => {
		if (productImages && productImages.length > 0) {
			currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length
		}
	}

	// ✨ ✨✨ ✨✨ ✨✨ ✨

	// Start auto-slide every 20 seconds.
	const startAutoSlide = () => {
		stopAutoSlide() // Ensure no duplicate intervals
		intervalId = setInterval(nextImage, 3000) // Change image every 20 seconds
	}

	// Stop the auto-slide when the modal is closed.
	const stopAutoSlide = () => {
		if (intervalId) clearInterval(intervalId)
	}

	// ✨ ✨✨ ✨✨ ✨✨ ✨

	// Fetch all images in the matching folder.
	const getImagesFromFolder = async (itemName) => {
		const sanitizedItemName = itemName
			.replace(/[^a-zA-Z0-9-_ ]/g, '')
			.trim()
			.toLowerCase()

		if (!images || !Array.isArray(images) || images.length === 0) {
			return []
		}

		const matchingFolder = images.find((folder) => {
			const folderName = decodeURIComponent(folder.name.trim().toLowerCase())
			return folderName === sanitizedItemName
		})

		if (!matchingFolder || !Array.isArray(matchingFolder.images)) {
			return []
		}

		// Construct URLs for each image in the folder.
		return matchingFolder.images.map(
			(img) =>
				`https://vyzeudiywhlxdzpnfehs.supabase.co/storage/v1/object/public/Gallery/items/${matchingFolder.name}/${img.name}`
		)
	}

	// ✨ ✨✨ ✨✨ ✨✨ ✨

	// Trigger modal and load images.
	const handleCardClick = async (product) => {
		selectedProduct = product

		showModal = true

		productImages = await getImagesFromFolder(product.item_name)

		currentImageIndex = 0

		// Ensure matchingInventory is set based on the product_id
		matchingInventory = productInventory.filter(
			(inventory) => inventory.product_id === product.product_id
		)

		startAutoSlide()
	}

	// ✨ ✨✨ ✨✨ ✨✨ ✨

	// Filter products based on the selected category
	$: filteredProducts = productData.filter((product) => product.category === selectedCategory)

	$: if (!showModal) stopAutoSlide()

	// ✨ ✨✨ ✨✨ ✨✨ ✨

	// Function to get the first matching image URL
	const getFirstMatchingImage = async (itemName) => {
		const imageUrl = await hasMatchingImage(itemName)
		return imageUrl
	}
</script>

<svelte:head>
	<title>Storefront</title>
</svelte:head>

<main>
	<header class=" head_Line">
		<h1>Shop by Category</h1>
	</header>

	<section>
		{#if uniqueCategories.size > 0}
			<div class="tabs">
				{#each Array.from(uniqueCategories) as category}
					<button
						class:active-tab={selectedCategory === category}
						on:click={() => handleCategorySelection(category)}
					>
						{category}
					</button>
				{/each}
			</div>
		{/if}
		{#if selectedCategory}
			<h3>Items in {selectedCategory}:</h3>
			<div class="scroll-container">
				<div class="horizontal-grid">
					{#each filteredProducts as product}
						<button
							class="card"
							type="button"
							aria-label={`View details for ${product.item_name}`}
							on:click={() => handleCardClick(product)}
						>
							{#await getFirstMatchingImage(product.item_name) then imageUrl}
								<img src={imageUrl} alt={product.item_name} />
							{:catch}
								<img src={MeBase} alt="Default product" />
							{/await}
							<h4>{product.item_name}</h4>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		{#if showModal}
			<div class="modal-background">
				<div class="modal">
					<h4>{selectedProduct.item_name}</h4>

					<!-- Carousel Navigation -->
					<div class="carousel">
						{#if productImages && productImages.length > 0}
							<button on:click={prevImage} class="caro-nav-button">←</button>
							<img
								src={productImages[currentImageIndex]}
								alt={`Image of ${selectedProduct.item_name}`}
								transition:fade={{ duration: 500 }}
							/>
							<button on:click={nextImage} class="caro-nav-button">→</button>
						{:else}
							<img src={MeBase} alt="Default product" />
						{/if}
					</div>

					<section>
						<p><strong>Description:</strong> {selectedProduct.description}</p>
						<p><strong>Price:</strong> {selectedProduct.price}</p>
						<p><strong>Category:</strong> {selectedProduct.category}</p>

						{#if matchingInventory.length > 0}
							<p><strong>Available Sizes:</strong></p>
							<p>
								{#each matchingInventory as inventory, i}
									{sizeData.find((size) => size.size_id === inventory.size_id)?.size_name ||
										'Unknown Size'}
									{#if i < matchingInventory.length - 1}/{/if}
								{/each}
							</p>
						{/if}
					</section>

					<button type="button" on:click={() => (showModal = false)}> <span> Close </span></button>
				</div>
			</div>
		{/if}
	</section>
</main>

<!-- svelte-ignore css-unused-selector -->
<style>
	button {
		all: unset;
	}

	.tabs {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;
		margin-left: 20vw;

		& button {
			padding: 10px 20px;
			border: none;
			background-color: var(--back_Tre);
			border-radius: 5px;
			cursor: pointer;
			transition:
				background-color 0.3s,
				color 0.3s;

			&&:hover {
				background-color: var(--highlight);
			}

			&&.active-tab {
				background-color: var(--grabber);
			}
		}
	}

	/* Pseudo-elements for blur effect */
	.scroll-container::before,
	.scroll-container::after {
		content: '';
		position: absolute;
		height: 150%;
		top: 0;
		bottom: 0;
		width: 20%; /* Adjust width as needed */
		pointer-events: none; /* Allow clicks to pass through */
		z-index: 1;
	}

	.scroll-container::before {
		left: 0;
		background: linear-gradient(to right, var(--back_Main), rgba(255, 255, 255, 0));
	}

	.scroll-container::after {
		right: 0;
		background: linear-gradient(to left, var(--back_Main), rgba(255, 255, 255, 0));
	}

	.horizontal-grid {
		display: grid;
		grid-auto-flow: column;
		grid-template-rows: repeat(2, 1fr);
		padding: var(--pad);
		gap: var(--pad);
		overflow-x: auto;
		scroll-snap-type: x mandatory;
	}

	/* Card Styling */
	.card {
		min-width: 200px;
		background-color: var(--back_Hallow_Dark);
		transition:
			transform 0.3s,
			box-shadow 0.3s;
		padding: var(--pad);
		border-radius: var(--rad);
		box-shadow: var(--box_Shadow);
		scroll-snap-align: start;
		cursor: pointer;

		&:hover {
			transform: scale(1.05);
		}

		& img {
			width: 100%;
			height: 9rem;
			object-fit: cover;
			border-radius: var(--rad);
		}
	}

	span {
		cursor: pointer;
	}

	.carousel {
		& img {
			max-width: 100%;
			max-height: 300px;
			border-radius: 8px;
			padding: var(--space);
			border-radius: var(--rad);
		}

		& button {
			background: var(--back_Tre);
			padding: var(--space);

			&:hover {
				background: var(--grabber);
			}
		}
	}

	/* Animations */
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideDown {
		from {
			transform: translateY(-30px);
		}
		to {
			transform: translateY(0);
		}
	}
</style>
