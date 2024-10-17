<script lang="ts">
	import { onMount } from 'svelte'
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'

	export let data

	let { session, supabase, existingEvents, images } = data
	$: ({ supabase, session, existingEvents, images } = data)
	let loading = false
	let eventHub = ''
	let formData = new FormData() // Initialize formData

	let selectedEventId // Track the selected event ID

	let eventForm = {
		event_name: '',
		event_date: '',
		location: '',
		description: '',
		status_id: '',
		images: []
	}

	////////////////////////////////

	// Function to get the matching image for an event
	const findMatchingImage = (eventName) => {
		// (A) Sanitize the event name by removing any characters that are not alphanumeric, hyphen, underscore, or space.
		const sanitizedEventName = eventName.replace(/[^a-zA-Z0-9-_ ]/g, '')

		// (B) Find an image from the 'images' array that matches the sanitized event name
		return images.find((image) => {
			// (C) Get the image name from the image URL. The URL is split by '/', and we take the last part, which is the actual file name.
			const imageName = image.url
				.split('/') // Split the URL by '/'
				.pop() // Take the last part, which is the image name with the extension (e.g., 'event.jpg')

				// (D) Remove the file extension from the image name (e.g., 'event.jpg' becomes 'event').
				.replace(/\.[^/.]+$/, '')

			// (E) Compare the image name with the sanitized event name. Both are converted to lowercase for a case-insensitive comparison.
			return imageName.toLowerCase() === sanitizedEventName.toLowerCase()
		})
	}

	////////////////////////////////

	// Function to check if there is a matching image for the given event name
	const hasMatchingImage = (eventName) => {
		// (A) Sanitize the event name by removing characters that are not alphanumeric, hyphen, underscore, or space.
		const sanitizedEventName = eventName.replace(/[^a-zA-Z0-9-_ ]/g, '')

		// (B) Search for a matching image from the 'images' array using the sanitized event name
		const matchingImage = images.find((image) => {
			// (C) Extract the image file name from the URL by splitting the URL by '/' and taking the last part.
			const imageName = image.url
				.split('/') // Split the URL into parts using '/' as a delimiter
				.pop() // Get the last part of the split, which is the file name with extension

				// (D) Remove the file extension from the image name (e.g., 'event.jpg' becomes 'event').
				.replace(/\.[^/.]+$/, '')

			// (E) Return true if the image name matches the sanitized event name (ignoring case differences)
			return imageName.toLowerCase() === sanitizedEventName.toLowerCase()
		})

		// (F) If a matching image is found, append a timestamp to the image URL to prevent caching issues.
		// Otherwise, return null if no matching image is found.
		return matchingImage ? `${matchingImage.url}?t=${new Date().getTime()}` : null
	}

	////////////////////////////////
	async function handleEventSelection(event) {
		// (A) Log that the event selection handler has been triggered
		console.log('Step 1: Event selection handler triggered')

		// (B) Get the value of the selected event (likely from a dropdown) and assign it to `selectedEventId`
		selectedEventId = event.target.value

		// (C) If no event is selected (i.e., `selectedEventId` is empty or null), log and exit the function
		if (!selectedEventId) {
			console.log('Step 2: No event selected, exiting function')
			return
		}

		// (D) If the `images` array is empty, it means event flyers have not been fetched yet, so fetch them
		if (images.length === 0) {
			await fetchEventFlyers() // Fetch the event flyers from storage and populate the `images` array
		}

		// (E) Query the 'events' table in Supabase for the selected event's data based on `selectedEventId`
		const { data: selectedEvent, error } = await supabase
			.from('events')
			.select('*')
			.eq('event_id', selectedEventId)
			.single() // Return a single event object since the selection is by unique `event_id`

		// (F) If there is an error in fetching the event (e.g., no event found), exit the function
		if (error) {
			return
		}

		// (G) Populate the `eventForm` object with data from the selected event. The fields being populated are:
		eventForm = {
			...eventForm, // Preserve existing fields in `eventForm`

			// - `event_name`: Name of the event
			event_name: selectedEvent.event_name,

			// - `event_date`: Date of the event, converted to a string in YYYY-MM-DD format
			event_date: new Date(selectedEvent.event_date).toISOString().slice(0, 10),

			// - `location`: Location of the event
			location: selectedEvent.location,

			// - `description`: Event description
			description: selectedEvent.description,

			// - `status_id`: Status ID, converted to a string (if numeric)
			status_id: selectedEvent.status_id.toString()
		}

		// (H) Call the `hasMatchingImage` function to check if there is an image associated with the event's name
		const matchingImageUrl = hasMatchingImage(selectedEvent.event_name)

		// (I) If a matching image is found, add the image URL to `eventForm.event_image`, otherwise set it to an empty string
		if (matchingImageUrl) {
			eventForm.event_image = matchingImageUrl
		} else {
			eventForm.event_image = ''
		}
	}

	// Sort events: matched events first
	const sortedEvents = [...existingEvents].sort((a, b) => {
		const aHasImage = hasMatchingImage(a.event_name)
		const bHasImage = hasMatchingImage(b.event_name)
		return bHasImage - aHasImage // Sort by matched images
	})

	// Function to handle file upload
	function handleFileChange(event) {
		// (A) Retrieve the files selected by the user from the input element
		const files = event.target.files

		// (B) Convert the FileList object to an array and store it in eventForm.images
		eventForm.images = Array.from(files) // Store selected images in eventForm

		// (C) Reinitialize formData, ensuring it starts as a new empty instance
		formData = new FormData()

		// (D) Loop through each selected image and append it to formData
		eventForm.images.forEach((image) => {
			formData.append('images', image) // 'images' should match what you retrieve
		})
	}
</script>

<div class="head_Line">
	<h1>Modify Events</h1>
</div>

<!-- Event operation select -->
<select bind:value={eventHub}>
	<option value="">-- select an event operation --</option>
	<option value="View">View</option>
	<option value="New">New</option>
	<option value="Edit">Edit</option>
</select>

{#if eventHub === 'View'}
	{#each sortedEvents as event}
		<div class="event-with-image">
			<div class="event-details">
				<h2>{event.event_name}</h2>
				<p>{event.description}</p>
				<p>{event.event_date.split('T')[0]}</p>
				<p>{event.location}</p>
			</div>

			<!-- Find and display the matching image if it exists -->
			{#if findMatchingImage(event.event_name)}
				<div class="event-flyer">
					<figure>
						<figcaption>{event.event_name}</figcaption>
						<img
							src={`${findMatchingImage(event.event_name).url}?t=${new Date().getTime()}`}
							alt="Event Flyer"
						/>
					</figure>
				</div>
			{:else}
				<p>No matching flyer found.</p>
			{/if}
		</div>
	{/each}

	<div class="flyers">
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
	</div>
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

		<label for="event_name">Event Name</label>
		<input
			type="text"
			id="event_name"
			name="event_name"
			bind:value={eventForm.event_name}
			required
			aria-label="Event Name"
		/>

		<label for="event_date">Event Date</label>

		<input
			type="date"
			id="event_date"
			name="event_date"
			bind:value={eventForm.event_date}
			required
			aria-label="Event Date"
		/>

		<label for="location">Event Location</label>

		<input
			type="text"
			id="location"
			name="location"
			bind:value={eventForm.location}
			required
			aria-label="Event Location"
		/>

		<label for="status_id">Status</label>
		<select
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

		<label for="description">Event Description</label>

		<textarea
			id="description"
			name="description"
			bind:value={eventForm.description}
			required
			aria-label="Event Description"
		></textarea>

		<label for="event_image">Event Flyer</label>

		<input
			type="file"
			id="event_image"
			name="images"
			multiple
			on:change={handleFileChange}
			aria-label="Event Flyer"
		/>

		<button type="submit" aria-busy={loading}>Submit</button>
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

		<select name="event_id" bind:value={eventForm.id} on:change={handleEventSelection}>
			<option value="">-- select an event --</option>
			{#each existingEvents as event}
				<option value={event.event_id}>{event.event_name}</option>
			{/each}
		</select>

		<label for="event_name"> Event Name</label>
		<input
			type="text"
			id="event_name"
			name="event_name"
			bind:value={eventForm.event_name}
			required
			aria-label="Event Name"
		/>

		<label for="event_date">Event Date</label>
		<input
			type="date"
			id="event_date"
			name="event_date"
			bind:value={eventForm.event_date}
			required
			aria-label="Event Date"
		/>

		<label for="location">Event Location</label>
		<input
			type="text"
			id="location"
			name="location"
			bind:value={eventForm.location}
			required
			aria-label="Event Location"
		/>

		<label for="status_id">Status</label>
		<select
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

		<label for="description">Event Description</label>

		<textarea
			id="description"
			name="description"
			bind:value={eventForm.description}
			required
			aria-label="Event Description"
		></textarea>

		<label for="event_image">Event Flyer</label>

		<img src={eventForm.event_image} alt="Event Flyer" />

		<input
			type="file"
			id="event_image"
			name="images"
			multiple
			on:change={handleFileChange}
			aria-label="Event Flyer"
		/>

		<br />

		<button type="submit" aria-busy={loading}>Submit</button>
	</form>
{/if}

<!-- svelte-ignore css-unused-selector -->
<style>
	select {
		background-color: var(--grabber);
		color: #fff;
		border: none;
		padding: 10px;
		margin-left: 10vw;
		border-radius: 5px;
		box-shadow: 0 4px var(--extra);
		transform: translateY(-2px);
	}
	select:active {
		box-shadow: 0 2px var(--highlight);
		transform: translateY(0);
	}

	figure {
		width: 40vw;
		margin: 10rem;
		text-align: center;

		& img {
			width: 100%;
		}

		& figcaption {
			margin-bottom: 2vh;
		}
	}

	.event-with-image {
		display: flex;
		align-items: center;
		justify-content: space-between;
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
</style>
