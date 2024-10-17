<!-- +page.svelte  -->

<script lang="ts">
	import { onMount } from 'svelte'
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { fade } from 'svelte/transition'
	import MeBase from '$lib/assets/img/meBase.jpg'

	// ✨ ✨✨ ✨✨ ✨✨ ✨

	export let data

	let { session, productData, productInventory, sizeData, images } = data
	$: ({ session, productData, productInventory, sizeData, images } = data)

	console.log('**productInventory:', productInventory)

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

		console.log('**availableSizes:', availableSizes)

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
		console.log('A. handleCardClick called')
		selectedProduct = product
		console.log('B. Selected product:', selectedProduct)

		showModal = true
		console.log('C. showModal set to:', showModal)

		productImages = await getImagesFromFolder(product.item_name)
		console.log('D. Fetched product images:', productImages)

		currentImageIndex = 0
		console.log('E. currentImageIndex set to:', currentImageIndex)

		// Ensure matchingInventory is set based on the product_id
		matchingInventory = productInventory.filter(
			(inventory) => inventory.product_id === product.product_id
		)

		console.log('F.Matching Inventory:', matchingInventory)

		startAutoSlide()
		console.log('G. startAutoSlide called')
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

<main>
	<h1>Shop by Category</h1>

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
					<h2>{selectedProduct.item_name}</h2>

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

					<button on:click={() => (showModal = false)}>Close</button>
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

	/* Scroll Container with Visible Scrollbar */
	.scroll-container {
		width: 100vw;
		margin: 0;
		position: relative; /* Position relative to contain pseudo-elements */
		overflow-x: auto; /* Enable horizontal scrolling */
		overflow-y: hidden; /* Prevent vertical scroll */
		-webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */

		&::-webkit-scrollbar {
			width: 0.8vw; /* Set scrollbar height */
		}

		&::-webkit-scrollbar-track {
			background: var(--gradient);
			border-radius: var(--rad);
		}

		&::-webkit-scrollbar-thumb {
			background: var(--back_Main);
			border: var(--bord);
			border-radius: var(--rad);
			transition: background-color 0.3s ease; /* Smooth transition */
		}
	}

	/* Pseudo-elements for blur effect */
	.scroll-container::before,
	.scroll-container::after {
		content: '';
		position: absolute;
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
		gap: 24px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		height: 100%;
	}

	/* Card Styling */
	.card {
		min-width: 200px;
		background-color: var(--back_Hallow_Dark);
		transition:
			transform 0.3s,
			box-shadow 0.3s;
		padding: 16px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		scroll-snap-align: start;
		cursor: pointer;

		&:hover {
			transform: scale(1.05);
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		}

		& img {
			width: 100%;
			height: 150px;
			object-fit: cover;
			border-radius: 8px;
			margin-bottom: 8px;
		}
	}

	/* Modal Background and Content */
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--back_Hallow_Dark);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal {
		background: var(--extra);
		padding: 20px;
		border-radius: 8px;
		width: 80%;
		max-width: 500px;
		text-align: center;
		position: relative;

		& h2 {
			margin: 0 0 16px;
		}

		& p {
			margin: 8px 0;
		}

		& button {
			background: var(--back_Tre);
			border: none;
			padding: 10px 20px;
			border-radius: 5px;
			cursor: pointer;
			margin-top: 16px;
			font-size: 16px;
			transition: background 0.3s;

			&:hover {
				background: var(--grabber);
			}
		}
	}

	.carousel {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		& img {
			max-width: 100%;
			max-height: 300px;
			border-radius: 8px;
		}

		& button {
			background: var(--back_Tre);
			border: none;
			padding: 10px 20px;
			border-radius: 5px;
			cursor: pointer;
			margin-top: 16px;
			font-size: 16px;
			transition: background 0.3s;

			&:hover {
				background: var(--grabber);
			}
		}
	}

	.caro-nav-button {
		background: none;
		border: none;
		color: var(--text_Main);
		font-size: 2rem;
		cursor: pointer;
		margin: 0 10px;

		&:focus {
			outline: 2px solid var(--highlight);
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
