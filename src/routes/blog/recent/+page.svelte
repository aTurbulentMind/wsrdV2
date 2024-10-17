<script>
	import { onMount, onDestroy } from 'svelte'

	import { blur, fly, slide } from 'svelte/transition'
	import { cubicInOut } from 'svelte/easing'

	export let data
	export let recentArticles = data.recentArticles || []

	// Function to format date
	function formatDate(dateString) {
		const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
		return new Date(dateString).toLocaleDateString(undefined, options)
	}

	function formatTextGuts(text) {
		// Replace newlines with <br> tags for line breaks
		return text.replace(/\n/g, '<br />')
	}

	function generateRandomNumber() {
		return Math.floor(Math.random() * 300) + 1
	}

	let randomNumber
	let shouldBlink = false

	// Show the modal after 0.5 seconds
	onMount(() => {
		startRandomNumberGenerator()
	})

	function startRandomNumberGenerator() {
		randomNumber = generateRandomNumber()
		shouldBlink = randomNumber <= 150
		const interval = setInterval(() => {
			randomNumber = generateRandomNumber()
			shouldBlink = randomNumber <= 150
		}, 3000)

		onDestroy(() => {
			clearInterval(interval)
		})
	}
</script>

<div
	class=" head_Line"
	in:blur={{ delay: 100, duration: 300, easing: cubicInOut, amount: 5 }}
	out:fly={{ delay: 200, duration: 300, easing: cubicInOut, x: 100, y: -50, opacity: 0.5 }}
>
	<h1 class=" neon-text {shouldBlink ? 'blink' : ''}">Most Recent Fire</h1>
</div>

<div
	class="blog-container"
	in:slide={{ delay: 200, duration: 300, easing: cubicInOut, axis: 'x' }}
	out:blur={{ delay: 100, duration: 300, easing: cubicInOut }}
>
	{#if recentArticles.length > 0}
		<h2 class="blog-title neon-text">{recentArticles[0].text_name}</h2>
		<p class="highlight"><strong>Date:</strong> {formatDate(recentArticles[0].date_made)}</p>
		<div class="blog-content">
			<p>{@html formatTextGuts(recentArticles[0].text_guts)}</p>
		</div>
	{:else}
		<p>Loading most recent article...</p>
	{/if}
</div>

<!-- svelte-ignore css-unused-selector -->
<style>
	.blog-container {
		max-width: 90vw;
		margin-left: 5vw;
		margin-bottom: 5vh;
		padding: var(--pad_Sm);
		border: var(--bord);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
		background-color: var(--back_Hallow_Dark);

		/* Tablet  */
		@media only screen and (min-width: 768px) {
			max-width: 80vw;
			margin-left: 10vw;
		}
	}

	.blog-title {
		font-family: var(--font_Quad);
		color: var(--grabber);
		font-size: var(--f_Xl);
		text-align: center;
		text-transform: capitalize;

		@media only screen and (min-width: 1024px) {
			font-size: var(--f_Xxl);
			margin: 0;
		}
	}

	.blog-content {
		font-size: var(--font);

		& p {
			margin: var(--marg);
		}
	}

	.highlight {
		color: var(--highlight);
	}

	ul {
		list-style-type: square;
		margin: 20px 0;
		padding-left: 20px;
	}

	ul li {
		margin: 10px 0;
	}

	.image-container {
		display: flex;
		justify-content: center;
		margin: 20px 0;
	}

	.image-container img {
		max-width: 100%;
		border: 2px solid var(--highlight);
		border-radius: 8px;
	}
</style>
