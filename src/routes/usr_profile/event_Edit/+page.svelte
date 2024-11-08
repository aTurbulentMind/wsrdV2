<script lang="ts">
	import {
		findMatchingImage,
		hasMatchingImage,
		sanitizeEventName,
		deleteExistingFlyerImage,
		uploadFlyerImage,
		uploadGalleryImage,
		deleteExistingGalleryImage
	} from '$lib/assets/utils/eve_utils'
	import MeBase from '$lib/assets/img/meBase.jpg'
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟 Data

	export let data

	let { supabase, existingEvents, images, folders } = data
	$: ({ supabase, existingEvents, images, folders } = data)

	console.log('🚀 ~ file: +page.svelte  ~ data', data)

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟 Variables

	let loading = false
	let eventHub = ''
	let formData = new FormData()

	let selectedEventId
	let selectedEventImages = []
	let selectedImages = []

	let eventForm = {
		event_name: '',
		event_date: '',
		location: '',
		description: '',
		status_id: '',
		images: []
	}

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟 Functions

	async function handleEventSelection(event) {
		selectedEventId = event.target.value

		if (!selectedEventId) {
			return
		}

		if (images.length === 0) {
			await fetchEventFlyers()
		}

		const numericSelectedEventId = Number(selectedEventId)
		const selectedEvent = existingEvents.find((event) => event.event_id === numericSelectedEventId)

		if (!selectedEvent) {
			console.error('Selected event not found')
			return
		}

		const selectedFolder = folders.find((folder) => folder.name === selectedEvent.event_name)

		if (selectedFolder) {
			selectedEventImages = selectedFolder.images
		} else {
			selectedEventImages = []
			console.log('No folder found for the selected event')
		}

		eventForm = {
			...eventForm,
			event_name: selectedEvent.event_name,
			event_date: new Date(selectedEvent.event_date).toISOString().slice(0, 10),
			location: selectedEvent.location,
			description: selectedEvent.description,
			status_id: selectedEvent.status_id.toString()
		}

		const matchingImage = findMatchingImage(selectedEvent.event_name, images)

		if (matchingImage) {
			eventForm.event_image = matchingImage.url
		} else {
			eventForm.event_image = ''
			console.log('No matching image URL found')
		}
	}

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟
	// Sort events: matched events first
	const sortedEvents = [...existingEvents].sort((a, b) => {
		const aHasImage = hasMatchingImage(a.event_name, images)
		const bHasImage = hasMatchingImage(b.event_name, images)
		return bHasImage - aHasImage
	})

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	// Function to handle file upload
	function handleFileChange(event) {
		const files = event.target.files
		eventForm.images = Array.from(files)
		formData = new FormData()
		eventForm.images.forEach((image) => {
			formData.append('images', image)
		})
	}

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	async function handleFlyerUpload() {
		if (eventForm.images.length > 0) {
			const sanitizedEventName = sanitizeEventName(eventForm.event_name)
			const uploadErrors = []

			for (const image of eventForm.images) {
				if (image instanceof File && image.size > 0) {
					const { success, error } = await uploadFlyerImage(supabase, sanitizedEventName, image)
					if (!success) uploadErrors.push(error)
				}
			}

			if (uploadErrors.length > 0) {
				console.error('Some images failed to upload:', uploadErrors)
			} else {
				console.log('Images uploaded successfully')
			}
		} else {
			console.error('No images selected for upload')
		}
	}

	async function handleGalleryUpload() {
		if (eventForm.images.length > 0) {
			const sanitizedEventName = sanitizeEventName(eventForm.event_name)
			const uploadErrors = []

			for (const image of eventForm.images) {
				if (image instanceof File && image.size > 0) {
					const { success, error } = await uploadGalleryImage(
						supabase,
						sanitizedEventName,
						image.name,
						image
					)
					if (!success) uploadErrors.push(error)
				}
			}

			if (uploadErrors.length > 0) {
				console.error('Some images failed to upload:', uploadErrors)
			} else {
				console.log('Images uploaded successfully')
			}
		} else {
			console.error('No images selected for upload')
		}
	}

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	async function handleFlyerDelete() {
		const sanitizedEventName = sanitizeEventName(eventForm.event_name)
		const { success, error } = await deleteExistingFlyerImage(supabase, sanitizedEventName)

		if (success) {
			console.log('Image deleted successfully')
			eventForm.event_image = '' // Clear the image URL
		} else {
			console.error('Error deleting image:', error)
		}
	}

	async function handleGalleryDelete() {
		const sanitizedEventName = sanitizeEventName(eventForm.event_name)
		const deleteErrors = []

		for (const imageUrl of selectedImages) {
			const imageName = imageUrl.split('/').pop()
			const { success, error } = await deleteExistingGalleryImage(
				supabase,
				sanitizedEventName,
				imageName
			)

			if (!success) {
				deleteErrors.push(error)
			} else {
				selectedEventImages = selectedEventImages.filter((img) => img !== imageUrl)
			}
		}

		if (deleteErrors.length > 0) {
			console.error('Some images failed to delete:', deleteErrors)
		} else {
			selectedImages = [] // Clear the selected images
		}
	}
</script>

<svelte:head>
	<title>Event edit page</title>
</svelte:head>

<header class="head_Line">
	<h1>Modify Events</h1>
</header>

<!-- Event operation select -->
<select class="selector" bind:value={eventHub}>
	<option value="">-- select an event operation --</option>
	<option value="View">View</option>
	<option value="New">New</option>
	<option value="Edit">Edit</option>
</select>

{#if eventHub === 'View'}
	{#each sortedEvents as event}
		<section class="event-with-image">
			<article class="event-details">
				<header>
					<h2>{event.event_name}</h2>
				</header>
				<p>{event.description}</p>
				<p>{event.event_date.split('T')[0]}</p>
				<p>{event.location}</p>
			</article>

			<!-- Find and display the matching image if it exists -->
			{#if findMatchingImage(event.event_name, images)}
				<article class="event-flyer">
					<figure>
						<!-- <figcaption>{event.event_name}</figcaption> -->
						<img
							src={`${findMatchingImage(event.event_name, images).url}?t=${new Date().getTime()}`}
							alt="Event Flyer"
						/>
					</figure>
				</article>
			{:else}
				<p>No matching flyer found.</p>
			{/if}
		</section>
	{/each}

	<section class="flyers">
		<h2>All Flyers</h2>
		{#each images as image, i (image.id)}
			<figure>
				<figcaption>
					{image.url
						.split('/')
						.pop()
						.replace(/\.[^/.]+$/, '')}
				</figcaption>
				<img src={image.url} alt="Event Flyer" />
			</figure>
		{/each}
	</section>
{:else if eventHub === 'New'}
	<!-- Event creation form -->
	<form
		class="sendableForm"
		method="post"
		action="?/submit"
		use:enhance
		enctype="multipart/form-data"
	>
		<input type="hidden" name="eventHub" value="New" />

		<label class="input-group" for="event_name"
			>Event Name
			<input
				type="text"
				id="event_name"
				name="event_name"
				bind:value={eventForm.event_name}
				required
				aria-label="Event Name"
			/>
		</label>

		<label class="input-group" for="event_date"
			>Event Date

			<input
				type="date"
				id="event_date"
				name="event_date"
				bind:value={eventForm.event_date}
				required
				aria-label="Event Date"
			/>
		</label>

		<label class="input-group" for="location"
			>Event Location

			<input
				type="text"
				id="location"
				name="location"
				bind:value={eventForm.location}
				required
				aria-label="Event Location"
			/>
		</label>

		<label for="status_id"
			>Status
			<select
				class="selector"
				id="status_id"
				name="status_id"
				bind:value={eventForm.status_id}
				required
				aria-label="Event Status"
			>
				<option value="1">1 - Pending</option>
				<option value="2">2 - Confirmed</option>
				<option value="3">3 - In Progress</option>
				<option value="4">4 - Completed</option>
				<option value="5">5 - Cancelled</option>
			</select>
		</label>

		<label class="input-group" for="description"
			>Event Description

			<textarea
				id="description"
				name="description"
				bind:value={eventForm.description}
				required
				aria-label="Event Description"
			></textarea>
		</label>

		<label for="event_image">Event Flyer</label>

		<input
			type="file"
			id="event_image"
			name="images"
			multiple
			on:change={handleFileChange}
			aria-label="Event Flyer"
		/>

		<br />
		<button class="W-button" type="submit" aria-busy={loading}>Submit</button>
	</form>
{:else if eventHub === 'Edit'}
	<h3>Event Edit</h3>

	<!-- Event edit form -->

	<form
		class="sendableForm"
		method="post"
		action="?/submit"
		use:enhance
		enctype="multipart/form-data"
	>
		<input type="hidden" name="eventHub" value="Edit" />

		<select
			class="selector"
			name="event_id"
			bind:value={eventForm.id}
			on:change={handleEventSelection}
		>
			<option value="">-- select an event --</option>
			{#each existingEvents as event}
				<option value={event.event_id}>{event.event_name}</option>
			{/each}
		</select>

		<label class="input-group" for="event_name">
			Event Name
			<input
				type="text"
				id="event_name"
				name="event_name"
				bind:value={eventForm.event_name}
				required
				aria-label="Event Name"
			/>
		</label>

		<label class="input-group" for="event_date"
			>Event Date
			<input
				type="date"
				id="event_date"
				name="event_date"
				bind:value={eventForm.event_date}
				required
				aria-label="Event Date"
			/>
		</label>

		<label class="input-group" for="location"
			>Event Location
			<input
				type="text"
				id="location"
				name="location"
				bind:value={eventForm.location}
				required
				aria-label="Event Location"
			/>
		</label>

		<label for="status_id">Status</label>
		<select
			class="selector"
			id="status_id"
			name="status_id"
			bind:value={eventForm.status_id}
			required
			aria-label="Event Status"
		>
			<option value="1">1 - Pending</option>
			<option value="2">2 - Confirmed</option>
			<option value="3">3 - In Progress</option>
			<option value="4">4 - Completed</option>
			<option value="5">5 - Cancelled</option>
		</select>

		<label class="input-group" for="description"
			>Event Description

			<textarea
				id="description"
				name="description"
				bind:value={eventForm.description}
				required
				aria-label="Event Description"
			></textarea>
		</label>

		<label class="radio-group" for="event_image">
			Event Flyer
			<img src={eventForm.event_image} alt="Event Flyer" />
			<input
				type="file"
				id="event_image"
				name="images"
				multiple
				on:change={handleFileChange}
				aria-label="Event Flyer"
			/>
			<button type="button" on:click={handleFlyerUpload}>Upload Flyer</button>
			<button type="button" on:click={handleFlyerDelete}>Delete Flyer</button>
		</label>

		<p>🌟🌟🌟🌟🌟🌟🌟🌟🌟</p>

		<!-- Gallery Image Management -->
		<section class="gallery-management">
			<h3>Manage Gallery Images</h3>

			<!-- Upload Gallery Images -->
			<label for="gallery_images">Upload Gallery Images</label>
			<input
				type="file"
				id="gallery_images"
				name="gallery_images"
				multiple
				on:change={handleFileChange}
				aria-label="Gallery Images"
			/>
			<button type="button" on:click={handleGalleryUpload}>Upload Gallery Images</button>

			<!-- Delete Gallery Images -->
			<h4>Existing Gallery Images</h4>
			<div class="event-images">
				<div class="image-gallery">
					{#each selectedEventImages as imageUrl}
						<div class="gallery-image">
							<input type="checkbox" bind:group={selectedImages} value={imageUrl} />
							<img src={imageUrl} alt="Gallery " />
						</div>
					{/each}
				</div>
			</div>
			<button type="button" on:click={handleGalleryDelete}>Delete Selected Images</button>
		</section>

		<button class="W-button" type="submit" aria-busy={loading}>Submit</button>
	</form>
{/if}

<!-- svelte-ignore css-unused-selector -->
<style>
	.selector {
		display: block;
		margin: 0 auto;
	}

	.sendableForm {
		margin: 5% auto;

		& .W-button {
			width: 60%;
			margin-top: 10%;
		}
	}

	.image-gallery {
		margin: 0;
		padding: 0;

		& img {
			padding: 0;
			margin: 0;
			width: 500px;
		}
	}

	figure {
		width: 40vw;
		/* margin: 10rem; */
		text-align: center;

		/* & img {
			width: 100%;
		} */

		& figcaption {
			margin-bottom: 2vh;
		}
	}

	.event-with-image {
		display: flex;
		flex-direction: column;
		margin-left: 0;
		width: 100%;

		& img {
			/* margin: 0 10vw; */
			width: 90%;
		}

		@media screen and (min-width: 768px) {
			flex-direction: row;

			& img {
				margin: 0;
			}
		}

		@media screen and (min-width: 1024px) {
			& img {
				width: 50%;
			}

			& .event-details {
				margin: 0 15vw;
			}
		}
	}

	.event-details,
	.event-flyer {
		margin: 10px;
	}

	img {
		max-width: 200px;
		height: auto;
	}

	.flyers {
		display: none;
	}

	.image-gallery {
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-columns: 1fr 1fr;
		contain: content;
		gap: 1%;
	}

	.bout-gallery-image {
		width: 80%;
	}
</style>
