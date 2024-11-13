<script>
	import { findMatchingEvent, fetchImagesWithPagination } from '$lib/assets/utils/eve_utils'
	import MeBase from '$lib/assets/img/meBase.jpg'

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	export let data
	let { folders, existingEvents } = data
	$: ({ existingEvents, folders } = data)

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	let showModal = false
	let selectedGallery = ''
	let selectedGalleryImages = []

	let eventForm = {
		event_name: '',
		event_date: '',
		location: '',
		description: '',
		status_id: '',
		images: []
	}

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	// Display gallery details and event info based on the selected gallery
	async function showGalleryDetails(galleryName, page = 0, limit = 10) {
		try {
			// Fetch images for the selected folder with pagination
			const images = await fetchImagesWithPagination(data.supabase, galleryName, page, limit)
			selectedGalleryImages = images.length > 0 ? images : []

			// Find the matching event data
			const matchingEvent = findMatchingEvent(existingEvents, galleryName)

			if (matchingEvent) {
				eventForm = {
					...eventForm,
					event_name: matchingEvent.event_name,
					event_date: new Date(matchingEvent.event_date).toISOString().slice(0, 10),
					location: matchingEvent.location,
					description: matchingEvent.description,
					status_id: matchingEvent.status_id.toString()
				}
			} else {
				eventForm = {}
			}

			selectedGallery = galleryName
			showModal = true
		} catch (err) {
			console.error('Error showing gallery details:', err)
		}
	}
</script>

<svelte:head>
	<title>Event Gallery</title>
</svelte:head>

<main>
	<div class="head_Line">
		<h1>WSRD Event Gallery</h1>
	</div>

	<p class="intro-paragraph">
		The bouts are amazing and bring out the best characters. Here are some of the best of them for
		you to check out.
	</p>

	<section class="gallery-container">
		{#if folders && folders.length > 0}
			<article class="carousel-container">
				{#each folders as folder, index (folder.name)}
					<button
						class="gallery-item {index % 2 === 0 ? 'above' : 'below'}"
						type="button"
						aria-label="View details for {folder.name}"
						on:click={() => showGalleryDetails(folder.name)}
					>
						<img src={folder.thumbnailUrl || MeBase} alt="Event Thumbnail" />
						<h2>{folder.name}</h2>
					</button>
				{/each}
			</article>
		{:else if folders === undefined}
			<p aria-live="polite">Loading folders...</p>
		{:else}
			<p aria-live="polite">No folders found.</p>
		{/if}

		<div class="under">
			{#if showModal}
				<h3>{selectedGallery}</h3>
				{#if selectedGalleryImages.length > 0}
					<figure class="carousel-container">
						{#each selectedGalleryImages as imageUrl}
							<img src={imageUrl} alt={selectedGallery} />
						{/each}
					</figure>

					{#if eventForm.event_name}
						<label for="event_description">
							Description
							<p>{eventForm.description}</p>
						</label>

						<label for="event_date">
							Date
							<p>{eventForm.event_date}</p>
						</label>

						<label for="event_location">
							Location
							<p>{eventForm.location}</p>
						</label>
					{/if}

					<button class="ripple-btn" on:click={() => (showModal = false)}>Close</button>
				{:else}
					<p aria-live="polite">Loading gallery images...</p>
				{/if}
			{/if}
		</div>
	</section>
</main>

<!-- svelte-ignore css-unused-selector -->
<style>
	.intro-paragraph {
		margin-bottom: var(--space);
		color: var(--text_Main);
	}

	.gallery-container {
		width: 90vw;
		margin: 10vh auto;
		color: var(--highlight);
		background-color: var(--back_Hallow_Dark);
		border: var(--bord);
		box-shadow: var(--box_Shadow);
		border-radius: var(--rad);

		& h2 {
			text-transform: uppercase;
			padding: 20px;
			margin: 0;
			font-size: var(--f_M);
		}

		& img {
			width: 20vw;
			cursor: pointer;
		}

		.gallery-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			cursor: pointer;

			& h2 {
				padding: 7vh 5vw 0 5vw;
				color: var(--extra);
				text-shadow:
					0 0 5px var(--back_Tre),
					0 0 10px var(--back_Tre),
					0 0 20px var(--back_Tre),
					0 0 40px var(--back_Tre),
					0 0 80px var(--back_Tre);
			}

			& img {
				max-width: 200px;
				object-fit: cover;
			}
		}

		.carousel-container {
			display: flex;
			overflow-x: auto;
			gap: 40px;
			height: 60vh;
			margin: 40px 10px;
			position: relative; /* To add the timeline line */
			align-items: center;

			&::before {
				content: '';
				position: absolute;
				top: 50%;
				left: 0;
				width: 1400px;
				max-width: 2000px;
				height: 0;
				background: transparent;
				border: 5px dashed var(--highlight);
				z-index: 0;
			}

			&::-webkit-scrollbar {
				height: 12px;
			}

			&::-webkit-scrollbar-thumb {
				background: var(--grabber);
				border-radius: 6px;
			}

			&::-webkit-scrollbar-track {
				background: var(--gradient);
			}
		}

		button {
			background: var(--grabber);
			text-align: center;
			padding: var(--space);
			margin: var(--space);
			z-index: 1;

			&:hover {
				background: var(--grabber_Alt);
				cursor: pointer;
			}
		}
	}

	.under {
		color: var(--text_Main);

		& h3,
		label {
			margin: 0;
			padding: 0 20px;
		}

		& img {
			width: 70%;
			margin: 0;
			padding: 0;
		}

		& .carousel-container::before,
		.carousel-container::after {
			display: none;
		}
	}

	.modal-background {
		z-index: 420;
	}

	.carousel-container {
		display: flex;
		overflow-x: auto;
		gap: 40px;
		margin: 40px 10px;
		position: relative;
		align-items: center; /* Centers the timeline */

		/* Horizontal dashed timeline line */
		&::before {
			content: '';
			position: absolute;
			top: 50%; /* Middle of the container */
			left: 0;
			width: 200%;
			height: 0;
			border: 3px dashed var(--highlight);
			z-index: 0;
		}

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.gallery-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		cursor: pointer;
		position: relative; /* To position above/below line */
		z-index: 1; /* Above the timeline line */

		h2 {
			padding: 7vh 5vw 0 5vw;
			color: var(--extra);
			text-shadow:
				0 0 5px var(--back_Tre),
				0 0 10px var(--back_Tre),
				0 0 20px var(--back_Tre),
				0 0 40px var(--back_Tre),
				0 0 80px var(--back_Tre);
		}

		img {
			max-width: 200px;
			object-fit: cover;
		}
	}

	/* Alternating positions using CSS classes */
	.above {
		top: -100px; /* Shift above the timeline */
	}

	.below {
		top: 100px; /* Shift below the timeline */
	}

	/* Optional: Smooth transitions on hover */
	.gallery-item:hover {
		transform: scale(1.05);
		transition: transform 0.3s;
	}
</style>
