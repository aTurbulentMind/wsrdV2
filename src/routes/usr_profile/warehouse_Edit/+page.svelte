<!-- +page.svelte 
Needs to change folder name in bucket on submit.  -->

<script lang="ts">
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import { enhance } from '$app/forms'
	import { fetchProductsAndImages, getImages } from '$lib/assets/utils/itm_utils'
	import type { SubmitFunction } from '@sveltejs/kit'

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	let logCounter = 1

	function log(message, data) {
		console.log(`${logCounter}. ${message}`, data)
		logCounter++
	}

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	export let data
	let { session, productData, productInventory, sizeData, images } = data
	$: ({ session, productData, productInventory, sizeData, images } = data)

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	let formData = new FormData()
	let loading = false
	let selectedProduct
	let selectedSize

	let warehouseHub = ''
	let selectedProductName = ''

	let matchingInventory = {}

	let newItemForm = {
		product_id: '',
		item_name: ' ',
		description: '',
		price: '',
		category: ''
	}

	let amountForm = {
		product_id: '',
		size_id: '',
		quantity: '',
		reorder_threshold: '',
		item_location: ''
	}

	let editForm = {
		product_id: '',
		size_id: '',
		item_name: '',
		description: '',
		price: '',
		category: '',
		quantity: '',
		reorder_threshold: '',
		item_location: '',
		images: []
	}

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	async function handleSizeSelection() {
		selectedSize = sizeData.find((size) => size.size_id === amountForm.size_id)
		selectedProduct = productData.find((product) => product.product_id === amountForm.product_id)

		amountForm.item_location = selectedSize?.size_name ?? ''
		amountForm.reorder_threshold = selectedProduct?.reorder_threshold ?? ''
		amountForm.quantity = selectedProduct?.quantity ?? ''
	}

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	function updateProductName(event) {
		const selectedOption = event.target.options[event.target.selectedIndex]
		selectedProductName = selectedOption.getAttribute('data-name')
		console.log('Selected Product Name:', selectedProductName) // For debugging
	}

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	async function editItemHandling(event) {
		const selectedOption = event.target.options[event.target.selectedIndex]
		const selectedProductName = selectedOption.getAttribute('data-name')
		const selectedProductDescription = selectedOption.getAttribute('data-description')
		const selectedProductPrice = selectedOption.getAttribute('data-price')
		const selectedProductCategory = selectedOption.getAttribute('data-category')
		const selectedProductLocation = selectedOption.getAttribute('data-item_location')
		const selectedProductImage = selectedOption.getAttribute('data-image')
		const selectedProductId = selectedOption.value

		const matchingImages = await getImages(selectedProductName, images)

		editForm = {
			...editForm,
			product_id: selectedProductId,
			item_name: selectedProductName,
			description: selectedProductDescription,
			price: selectedProductPrice,
			item_location: selectedProductLocation,
			images: matchingImages ? [...matchingImages, selectedProductImage] : [selectedProductImage],
			category: selectedProductCategory
		}

		matchingInventory = [
			...productInventory.filter(
				(inventory) => inventory.product_id === parseInt(selectedProductId)
			)
		]
	}

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	function getSizeName(sizeId) {
		const size = sizeData.find((size) => size.size_id === sizeId)
		return size ? size.size_name : 'Unknown Size'
	}
</script>

<svelte:head>
	<title>Warehouse inventory edit page</title>
</svelte:head>

<header class="head_Line">
	<h1>The Warehouse Floor</h1>
</header>

<section>
	<!-- Event operation select -->
	<select class="selector" bind:value={warehouseHub}>
		<option value="">-- select a warehouse operation --</option>
		<option value="View">View Warehouse</option>
		<option value="New">New Item</option>
		<option value="Amount">Add Amount</option>
		<option value="Gallery">Add Images </option>
		<option value="Edit">Edit item</option>
	</select>
</section>

{#if warehouseHub === 'View'}
	<section>
		<h2>Warehouse Inventory</h2>

		{#if productData.length > 0}
			<table>
				<thead>
					<tr>
						<th>Item Name</th>
						<!-- <th>Quantity</th> -->
						<th>Category</th>
						<th>Description</th>
						<!-- <th>Location</th> -->
						<!-- <th>Reorder Threshold</th>
							<th>Select Size</th>
							<th>Quantity for Size</th> -->
					</tr>
				</thead>
				<tbody>
					{#each productData as product}
						<tr>
							<td>{product.item_name}</td>
							<!-- <td>{product.quantity}</td> -->
							<td>{product.category}</td>
							<td>{product.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>No warehouse items found.</p>
		{/if}
	</section>
{:else if warehouseHub === 'New'}
	<h2>New warehouse item form</h2>
	<form class="sendableForm" method="post" action="?/submit" enctype="multipart/form-data">
		<input type="hidden" name="warehouseHub" value="New" />

		<label class="input-group" for="item_name">
			Item Name
			<input
				type="text"
				id="item_name"
				name="item_name"
				bind:value={newItemForm.item_name}
				required
				aria-label="Item Name"
			/>
		</label>

		<label class="input-group" for="description"
			>Description
			<textarea
				id="description"
				name="description"
				bind:value={newItemForm.description}
				required
				aria-label="Item Description"
			></textarea>
		</label>

		<label class="input-group" for="price"
			>Item Price
			<input
				type="number"
				id="price"
				name="price"
				bind:value={newItemForm.price}
				required
				aria-label="Item Price"
			/>
		</label>

		<label class="input-group" for="category"
			>Item Category
			<input
				type="text"
				id="category"
				name="category"
				bind:value={newItemForm.category}
				required
				aria-label="Item Category"
			/>
		</label>

		<button class="W-button" type="submit">Submit</button>
	</form>
{:else if warehouseHub === 'Amount'}
	<h2>Amount</h2>

	<!-- Amount Form -->
	<form class="sendableForm" method="post" action="?/submit" enctype="multipart/form-data">
		<input type="hidden" name="warehouseHub" value="Amount" />

		<!-- Select Product -->
		<label for="product_id">Product</label>
		<select
			class="selector"
			name="product_id"
			bind:value={amountForm.product_id}
			on:change={handleSizeSelection}
			required
			aria-label="Product Selection"
		>
			<option value="">-- select a product --</option>
			{#each productData as product}
				<option value={product.product_id}>{product.item_name}</option>
			{/each}
		</select>

		<!-- Select Size -->
		<label for="size_id">Size</label>
		<select
			class="selector"
			name="size_id"
			bind:value={amountForm.size_id}
			on:change={handleSizeSelection}
			required
			aria-label="Size Selection"
		>
			<option value="">-- select a size --</option>
			{#each sizeData as size}
				<option value={size.size_id}>{size.size_name}</option>
			{/each}
		</select>

		<!-- Quantity -->
		<label class="input-group" for="quantity"
			>Quantity
			<input
				type="number"
				id="quantity"
				name="quantity"
				bind:value={amountForm.quantity}
				required
				aria-label="Quantity"
			/>
		</label>

		<!-- Location -->
		<label class="input-group" for="item_location"
			>Location
			<input
				type="text"
				id="item_location"
				name="item_location"
				bind:value={amountForm.item_location}
				required
				aria-label="Item Location"
			/>
		</label>

		<!-- Reorder Threshold -->
		<label class="input-group" for="reorder_threshold"
			>Reorder Threshold
			<input
				type="number"
				id="reorder_threshold"
				name="reorder_threshold"
				bind:value={amountForm.reorder_threshold}
				required
				aria-label="Reorder Threshold"
			/>
		</label>

		<button class="W-button" type="submit" aria-busy={loading}>Submit</button>
	</form>
{:else if warehouseHub === 'Gallery'}
	<h2>Gallery</h2>

	<form
		class="sendableForm"
		method="post"
		action="?/submit"
		use:enhance
		enctype="multipart/form-data"
	>
		<input type="hidden" name="warehouseHub" value="Gallery" />

		<!-- Select Product -->
		<label for="product_id">Product</label>
		<select
			class="selector"
			name="product_id"
			required
			aria-label="Product Selection"
			on:change={updateProductName}
		>
			<option value="">-- select a product --</option>
			{#each productData as product}
				<!-- Add data-name attribute to each option -->
				<option value={product.product_id} data-name={product.item_name}>{product.item_name}</option
				>
			{/each}
		</select>

		<!-- Label corrected to 'Item Images' -->
		<label for="item_images">Item Images</label>
		<input type="file" id="item_images" name="item_images" multiple aria-label="Item Image" />

		<!-- Hidden input for product_name -->
		<input type="hidden" name="product_name" bind:value={selectedProductName} />

		<button class="W-button" type="submit" aria-busy={loading}>Submit</button>
	</form>
{:else if warehouseHub === 'Edit'}
	<h2>Edit warehouse item</h2>
	<form
		class="sendableForm"
		method="post"
		action="?/submit"
		use:enhance
		enctype="multipart/form-data"
	>
		<input type="hidden" name="warehouseHub" value="Edit" />

		<label for="product_id">Product</label>
		<select
			class="selector"
			name="product_id"
			required
			aria-label="Product Selection"
			on:change={editItemHandling}
		>
			<option value="">-- select a product --</option>
			{#each productData as product}
				<option
					value={product.product_id}
					data-name={product.item_name}
					data-description={product.description}
					data-price={product.price}
					data-category={product.category}
					data-item_location={product.item_location}
				>
					{product.item_name}
				</option>
			{/each}
		</select>

		<!-- Hidden input for product_name -->
		<input type="hidden" name="product_name" bind:value={editForm.item_name} />

		<label class="input-group" for="item_name"
			>Item Name
			<input id="item_name" name="item_name" bind:value={editForm.item_name} required />
		</label>

		<label class="input-group" for="description"
			>Item Description
			<textarea
				id="description"
				name="description"
				bind:value={editForm.description}
				required
				aria-label="Item Description"
			></textarea>
		</label>

		<label class="input-group" for="price"
			>Price
			<input
				type="number"
				id="price"
				name="price"
				bind:value={editForm.price}
				required
				aria-label="Item Price"
			/>
		</label>

		<label class="input-group" for="category"
			>Category
			<input
				type="text"
				id="category"
				name="category"
				bind:value={editForm.category}
				required
				aria-label="Item Category"
			/>
		</label>

		{#if matchingInventory.length > 0}
			<h3>Inventory Data:</h3>
			{#each matchingInventory as inventory}
				<div class="inventory-row">
					<input type="hidden" name="warehouseHub" value="Edit" />
					<input type="hidden" name="inventory_ids[]" value={inventory.inventory_id} />

					<label class="input-group" for="quantity_{inventory.size_id}">
						Quantity for <span> {getSizeName(inventory.size_id)}</span>
						<input
							type="number"
							id="quantity_{inventory.size_id}"
							name="quantities[]"
							value={inventory.quantity}
							required
							aria-label="Quantity for {getSizeName(inventory.size_id)}"
						/>
					</label>

					<label class="input-group" for="item_location_{inventory.size_id}">
						Item Location
						<input
							type="text"
							id="item_location_{inventory.size_id}"
							name="item_locations[]"
							value={inventory.item_location}
							aria-label="Item Location"
						/>
					</label>

					<label class="input-group" for="reorder_threshold_{inventory.size_id}"
						>Reorder Threshold
						<input
							type="number"
							id="reorder_threshold_{inventory.size_id}"
							name="reorder_thresholds[]"
							value={inventory.reorder_threshold}
							required
							aria-label="Reorder Threshold"
						/>
					</label>
				</div>
			{/each}
		{/if}

		{#if editForm.images && editForm.images.length > 0}
			<h3>Images:</h3>
			<div class="image-grid radio-group">
				{#each editForm.images as image (image)}
					{#if image}
						<div class="image-card">
							<img src={image} alt={selectedProductName} />
							<p>{selectedProductName}</p>
							<label>
								<input type="checkbox" name="delete_images[]" value={image} />
								Select to delete
							</label>
						</div>
					{/if}
				{/each}
			</div>
		{/if}

		<!-- 
		<label for="item_images">Item Images</label>
		<input type="file" id="item_images" name="item_images" multiple aria-label="Item Image" /> -->

		<button class="W-button" type="submit" aria-busy={loading}>Submit</button>
	</form>
{/if}

<!-- svelte-ignore css-unused-selector -->
<style>
	section {
		margin-top: 2rem;
	}

	.selector {
		display: block;
		margin: 0 auto;
	}

	table {
		border-collapse: collapse;
		width: 80%;
		margin-left: 10%;
	}

	th,
	td {
		text-align: left;
		padding: 8px;
	}

	th {
		background-color: var(--grabber);
	}

	tr:nth-child(even) {
		background-color: var(--back_Hallow_Dark);

		& td {
			color: var(--back_Alt);
		}
	}

	.size-legend {
		width: 10vw;
		list-style-type: none;
		padding: 0;
		margin: 0 20vw;
	}

	.size-legend li {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		border-bottom: 1px solid #ddd;
		font-size: 1rem;
	}

	.size-id {
		flex-basis: 10%; /* Adjust width as needed */
		text-align: left;
	}

	.size-name {
		flex-basis: 90%; /* Adjust width as needed */
		text-align: right;
	}

	.inventory-row {
		display: flex;
		flex-direction: column;
		margin-bottom: 1em;
	}

	.inventory-row label {
		margin-right: 0.5em;
	}

	.image-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 10px;
		margin-top: 20px;
	}

	.image-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 5px;
	}

	.image-card img {
		width: 100%;
		height: auto;
		border-radius: 5px;
	}

	.image-card p {
		margin-top: 10px;
		font-size: 14px;
		color: #333;
	}

	.sendableForm {
		margin: 5% auto;

		& .W-button {
			width: 60%;
			margin-top: 10%;
		}
	}
</style>
