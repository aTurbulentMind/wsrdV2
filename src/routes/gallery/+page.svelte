<script lang="ts">
	import { onMount, onDestroy } from 'svelte'

	export let data
	let { supabase, profile, folders } = data
	$: ({ supabase, profile, folders } = data)

	let showModal = false
	let selectedGallery = ''
	let selectedGalleryImages = []

	async function showGalleryDetails(galleryName) {
		try {
			const { data, error } = await supabase.storage
				.from('Gallery')
				.list(`bout_photos/${galleryName}`, {
					limit: 100
				})

			if (error) {
				console.error('Error fetching gallery details:', error)
				return
			}

			if (data && data.length > 0) {
				selectedGalleryImages = data.map((file) => {
					const publicURL = `https://vyzeudiywhlxdzpnfehs.supabase.co/storage/v1/object/public/Gallery/bout_photos/${galleryName}/${file.name}`
					return publicURL
				})
			} else {
				console.log('No images found in gallery:', galleryName)
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
	<div class=" head_Line">
		<h1>WSRD Event Gallery</h1>
	</div>

	<section class="gallery-container">
		<p class="intro-paragraph">
			The bouts are amazing and bring out the best characters. Here are some of the best of them for
			you to check out.
		</p>

		{#if folders && folders.length > 0}
			<section class="carousel-container">
				{#each folders as folder}
					<button
						class="gallery-item"
						type="button"
						aria-label="View details for {folder.name}"
						on:click={() => showGalleryDetails(folder.name)}
					>
						<h2>{folder.name}</h2>
					</button>
				{/each}
			</section>
		{:else if folders === undefined}
			<p aria-live="polite">Loading folders...</p>
		{:else}
			<p aria-live="polite">No folders found.</p>
		{/if}

		{#if showModal}
			<section class="modal-background">
				<div class="modal">
					<h2>{selectedGallery}</h2>
					{#if selectedGalleryImages.length > 0}
						<figure class="carousel-container">
							{#each selectedGalleryImages as imageUrl}
								<img src={imageUrl} alt={selectedGallery} />
							{/each}
						</figure>
						<button on:click={() => (showModal = false)}>Close</button>
					{:else}
						<p aria-live="polite">Loading gallery images...</p>
					{/if}
				</div>
			</section>
		{/if}
	</section>
</main>

<!-- svelte-ignore css-unused-selector -->
<style>
	.gallery-container {
		width: 90vw;
		margin: 10vh auto;
		color: var(--highlight);
		background-color: var(--back_Hallow_Dark);
		border: 2px solid var(--highlight_Alt);
		box-shadow: var(--box_Shadow);

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
	}

	.intro-paragraph {
		margin-bottom: 40px;
		font-size: var(--f_M);
		color: var(--highlight_Alt);
	}

	.carousel-container {
		display: flex;
		overflow-x: auto;
		gap: 10px;
		margin: 40px 10px;

		&::-webkit-scrollbar {
			height: 12px;
		}

		&::-webkit-scrollbar-thumb {
			background: var(--grabber);
		}

		&::-webkit-scrollbar-track {
			background: var(--gradient);
		}
	}

	button {
		background: var(--grabber);
		text-align: center;
		padding: var(--pad);
		margin: var(--marg);

		&:hover {
			background: var(--back_Hallow);
			cursor: pointer;
		}
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
	}

	.gallery-item img {
		max-width: 200px;
		object-fit: cover;
	}

	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal {
		width: 80vw;
		height: 80vh;
		background-color: var(--back_Hallow_Dark);
		padding: 20px;
		border: var(--bord);

		overflow-y: auto;
	}

	.modal img {
		height: 30%;
		margin-bottom: 10px;

		/* Larger screens */
		@media only screen and (min-width: 1440px) {
			height: 40%;
		}
	}

	.modal button {
		background: var(--win95-background);
		border: var(--win95-border-width) solid var(--win95-text);
		border-top-color: var(--win95-border-light);
		border-left-color: var(--win95-border-light);
		padding: var(--pad_Sm);
		margin: var(--qtr_Marg);
		position: center;
		color: var(--win95-text);
		font-size: var(--f_M);
		cursor: pointer;

		&:hover {
			border-color: var(--win95-border-medium);
		}
	}

	h4 {
		@media screen and (min-width: 768px) {
			display: none;
		}
	}
</style>
