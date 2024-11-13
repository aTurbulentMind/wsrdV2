<!-- +page.svelte  
	Shop/warehouse page.

	@since version 0.3.3 -->

<script lang="ts">
	import { fade } from 'svelte/transition'
	import MeBase from '$lib/assets/img/meBase.jpg'
	import { getImages, fetchProductsAndImages } from '$lib/assets/utils/itm_utils'
	import { onDestroy } from 'svelte'

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	export let data: {
		session: any
		productData: Array<{
			product_id: number
			item_name: string
			category: string
			description: string
			price: string
		}>
		productInventory: Array<{ product_id: number; size_id: number }>
		sizeData: Array<{ size_id: number; size_name: string }>
		images: any[]
	}

	let { session, productData, productInventory, sizeData, images } = data
	$: ({ session, productData, productInventory, sizeData, images } = data)

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	let loading = false
	let matchingInventory = {}
	let uniqueCategories = new Set(productData.map((product) => product.category))
	let selectedCategory = ''
	let selectedProduct = null
	let showModal = false
	let productImages = []
	let currentImageIndex = 0
	let intervalId

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	function handleCategorySelection(category) {
		selectedCategory = category
	}

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	const nextImage = () => {
		if (productImages.length) {
			currentImageIndex = (currentImageIndex + 1) % productImages.length
		}
	}

	const prevImage = () => {
		if (productImages.length) {
			currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length
		}
	}

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	const startAutoSlide = () => {
		stopAutoSlide()
		intervalId = setInterval(nextImage, 3000)
	}

	const stopAutoSlide = () => {
		if (intervalId) clearInterval(intervalId)
	}

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	const handleCardClick = async (product) => {
		selectedProduct = product
		showModal = true
		try {
			productImages = await getImages(product.item_name, images)
			console.log('Retrieved product images:', productImages)
		} catch (error) {
			console.error('Error fetching images:', error)
		}
		currentImageIndex = 0
		matchingInventory = productInventory.filter(
			(inventory) => inventory.product_id === product.product_id
		)
		startAutoSlide()
	}

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	$: filteredProducts = productData.filter((product) => product.category === selectedCategory)

	$: if (!showModal) stopAutoSlide()
	onDestroy(() => stopAutoSlide())
</script>

<svelte:head>
	<title>Storefront</title>
</svelte:head>

<main>
	<header class=" head_Line">
		<h1>Shop by Category</h1>
	</header>

	<p>Select a category:</p>
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
			<div class="scroll-container">
				<div class="horizontal-grid">
					{#each filteredProducts as product}
						<button
							class="card"
							type="button"
							aria-label={`View details for ${product.item_name}`}
							on:click={() => handleCardClick(product)}
						>
							{#await getImages(product.item_name, images, true) then imageUrl}
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
								src={productImages[currentImageIndex] || MeBase}
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

						{#if matchingInventory && Array.isArray(matchingInventory) && matchingInventory.length > 0}
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

					<button type="button" on:click={() => (showModal = false)}>
						<span>Close</span>
					</button>
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

	.tabs button,
	.head_Line {
		z-index: 420;
	}

	.tabs {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		margin-bottom: 20px;

		@media screen and (min-width: 768px) {
			flex-direction: row;
			margin-left: 10vw;
		}

		& button {
			padding: var(--space);
			margin: var(--space);
			border: none;
			background-color: var(--grabber);
			border-radius: var(--rad);
			cursor: pointer;
			transition:
				background-color 0.3s,
				color 0.3s;

			&&:hover {
				background-color: var(--grabber_Alt);
			}

			&&.active-tab {
				background-color: var(--highlight);
			}
		}
	}

	.horizontal-grid {
		display: grid;
		grid-auto-flow: column;
		grid-template-rows: repeat(2, 1fr);
		padding: var(--pad);
		gap: var(--pad);
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		position: relative; /* Ensure pseudo-elements are positioned within the grid */
	}

	/* Pseudo-elements for blur effect */
	.horizontal-grid::before,
	.horizontal-grid::after {
		content: '';
		position: fixed;
		top: 0;
		bottom: 0;
		height: 100%;
		width: 20%; /* Adjust width as needed */
		pointer-events: none; /* Allow clicks to pass through */
		z-index: 1;
	}

	.horizontal-grid::before {
		left: 0;
		background: linear-gradient(to right, var(--back_Main), rgba(255, 255, 255, 0));
	}

	.horizontal-grid::after {
		right: 0;
		background: linear-gradient(to left, var(--back_Main), rgba(255, 255, 255, 0));
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

	.modal-background {
		position: fixed;
		z-index: 777;
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
			width: 10px;
			border: var(--bord);
			border-radius: var(--rad);

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
