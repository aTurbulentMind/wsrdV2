<!-- Modal.svelte -->
<script>
	export let showModal = false

	// Function to close the modal
	const closeModal = () => {
		showModal = false
	}
</script>

<div class="Moodal">
	{#if showModal}
		<div class="win_95">
			<div class="title-bar">
				<div class="title-bar-text">Welcome to,</div>
				<div class="title-bar-controls">
					<button aria-label="Close" on:click={closeModal}>X</button>
				</div>
			</div>
			<div class="window-content">
				<p>Busy Child Photography. Would you like to see photos, or plan an appointment?</p>

				<a href="/gallery/"><button class="win_95_butt">See</button></a>
				<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
					><button class="win_95_butt">Plan</button></a
				>
			</div>
		</div>
	{/if}
</div>
