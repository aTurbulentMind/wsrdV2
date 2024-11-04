<script lang="ts">
	import { onMount } from 'svelte'
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'

	export let data

	let { session, supabase, existingEvents, images } = data
	$: ({ supabase, session, existingEvents, images } = data)
	let loading = false
	let eventHub = ''
	let formData = new FormData()

	let selectedEventId

	let eventForm = {
		event_name: '',
		event_date: '',
		location: '',
		description: '',
		status_id: '',
		images: []
	}

	const findMatchingImage = (eventName) => {
		const sanitizedEventName = eventName.replace(/[^a-zA-Z0-9-_ ]/g, '')

		return images.find((image) => {
			const imageName = image.url
				.split('/')
				.pop()
				.replace(/\.[^/.]+$/, '')

			return imageName.toLowerCase() === sanitizedEventName.toLowerCase()
		})
	}

	const hasMatchingImage = (eventName) => {
		const sanitizedEventName = eventName.replace(/[^a-zA-Z0-9-_ ]/g, '')
		const matchingImage = images.find((image) => {
			const imageName = image.url
				.split('/')
				.pop()
				.replace(/\.[^/.]+$/, '')

			return imageName.toLowerCase() === sanitizedEventName.toLowerCase()
		})

		return matchingImage ? `${matchingImage.url}?t=${new Date().getTime()}` : null
	}

	async function handleEventSelection(event) {
		selectedEventId = event.target.value

		if (!selectedEventId) {
			console.log('Step 2: No event selected, exiting function')
			return
		}

		if (images.length === 0) {
			await fetchEventFlyers()
		}

		const { data: selectedEvent, error } = await supabase
			.from('events')
			.select('*')
			.eq('event_id', selectedEventId)
			.single()

		if (error) {
			return
		}

		eventForm = {
			...eventForm,

			event_name: selectedEvent.event_name,

			event_date: new Date(selectedEvent.event_date).toISOString().slice(0, 10),

			location: selectedEvent.location,

			description: selectedEvent.description,

			status_id: selectedEvent.status_id.toString()
		}

		const matchingImageUrl = hasMatchingImage(selectedEvent.event_name)

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
		return bHasImage - aHasImage
	})

	// Function to handle file upload
	function handleFileChange(event) {
		const files = event.target.files

		eventForm.images = Array.from(files)

		formData = new FormData()

		eventForm.images.forEach((image) => {
			formData.append('images', image)
		})
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
			{#if findMatchingImage(event.event_name)}
				<article class="event-flyer">
					<figure>
						<!-- <figcaption>{event.event_name}</figcaption> -->
						<img
							src={`${findMatchingImage(event.event_name).url}?t=${new Date().getTime()}`}
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

		<label class="input-group" for="event_image">Event Flyer</label>

		<img src={eventForm.event_image} alt="Event Flyer" />

		<input
			type="file"
			id="event_image"
			name="images"
			multiple
			on:change={handleFileChange}
			aria-label="Event Flyer"
		/>

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
</style>
