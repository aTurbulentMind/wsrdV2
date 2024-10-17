<!-- +page.svelte -->
<script>
	import { onMount, onDestroy } from 'svelte'

	import { blur, fly, slide } from 'svelte/transition'
	import { cubicInOut } from 'svelte/easing'

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

	export let data
	export let recentArticles = data.recentArticles || []

	let showModal = false
	let selectedArticle = null
	let selectedIndex = -1

	function showArticleDetails(article, index) {
		selectedArticle = article
		selectedIndex = index
		showModal = true
	}

	// Function to format date
	function formatDate(dateString) {
		const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
		return new Date(dateString).toLocaleDateString(undefined, options)
	}

	function formatTextGuts(text) {
		// Replace newlines with <br> tags for line breaks
		return text.replace(/\n/g, '<br />')
	}
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<div
	class=" head_Line"
	in:blur={{ delay: 100, duration: 300, easing: cubicInOut, amount: 5 }}
	out:fly={{ delay: 200, duration: 300, easing: cubicInOut, x: 100, y: -50, opacity: 0.5 }}
>
	<h1 class=" neon-text {shouldBlink ? 'blink' : ''}">Blog</h1>
</div>
<div
	class="blog-container"
	in:blur={{ delay: 100, duration: 300, easing: cubicInOut, amount: 5 }}
	out:fly={{ delay: 200, duration: 300, easing: cubicInOut, x: 100, y: 0, opacity: 0.5 }}
>
	<article>
		<p>
			The Vaporwave Photographer's Blog is a mesmerizing journey into the world of retro aesthetics,
			blending vibrant neon hues, nostalgic elements, and modern digital art. This unique blog
			captures the essence of the vaporwave genre, transporting readers to an era where past and
			future intertwine seamlessly. Through carefully curated photo shoots and insightful
			commentary, the blog showcases the timeless beauty of forgotten places, the allure of vintage
			technology, and the surreal charm of urban landscapes bathed in synthetic light.
			<br /><br />
			Each post on the Vaporwave Photographer's Blog is a visual and auditory experience, often accompanied
			by curated playlists that enhance the immersive journey. The blog not only highlights stunning
			visuals but also delves into the philosophy and cultural significance behind the vaporwave movement.
			It serves as a sanctuary for art enthusiasts, retro aficionados, and anyone seeking to escape the
			mundane and dive into a world where art, music, and technology converge in a nostalgic symphony.
			Whether you're a seasoned vaporwave enthusiast or a curious newcomer, the Vaporwave Photographer's
			Blog offers a refreshing perspective that celebrates the beauty of ambiguity and timelessness.
		</p>

		<h2 class="neon-text">Most Recent Articles</h2>
		<section>
			{#if recentArticles && recentArticles.length > 0}
				<ul>
					{#each recentArticles as article, index}
						<li>
							<button
								class="win_95_butt"
								type="button"
								on:click={() => showArticleDetails(article, index)}
								aria-label="View details for {article.text_name}"
							>
								{article.text_name}
							</button>

							{#if showModal && selectedIndex === index}
								<article class="win_95">
									<header class="title-bar">
										<h3 style="margin: 0;" class="title-bar-text">{selectedArticle.text_name}</h3>
										<nav class="title-bar-controls">
											<button aria-label="Close" on:click={() => (showModal = false)}>X</button>
										</nav>
									</header>
									<section class="window-content">
										<p class="highlight">
											<strong>Date:</strong>
											{formatDate(recentArticles[0].date_made)}
										</p>
										<p><strong>Author:</strong> {selectedArticle.author}</p>
										<p>{@html formatTextGuts(selectedArticle.text_guts)}</p>
									</section>
								</article>
							{/if}
						</li>
					{/each}
				</ul>
			{:else}
				<p aria-live="polite">Loading recent articles...</p>
			{/if}
		</section>

		<br /> <br />
		<p>Check out the last thing I wrote:</p>
		<br />
		<a class="bord_Caps marg_Also" href="/blog/recent/">Newest words</a>
	</article>

	<br /> <br />
	<p>Or look into a library of the past:</p>
	<br />
	<a class="bord_Caps marg_Also" href="/blog/library/">Older words</a>
</div>

<!-- svelte-ignore css-unused-selector -->
<style>
	.win_95_butt {
		margin: var(--qtr_Marg);
		font-size: var(--f_M);
		padding: var(--pad);

		@media (min-width: 766px) {
			margin: var(--qtr_Marg);
		}

		@media (min-width: 1024px) {
			margin: var(--lrg_Marg);
		}
	}

	.bord_Caps {
		font-size: var(--f_M);

		@media (min-width: 1024px) {
			font-size: var(--f_Lg);
		}
	}

	.window-content {
		background-color: var(--text_Main);
	}

	ul li {
		list-style-type: none;
		margin: 5vh 5vw;
	}

	@media screen and (min-width: 768px) {
		.blog-container {
			width: 90vw;
			margin: 10vh auto;
		}

		.win_95 {
			width: 80vw;
			margin: 0 2vw;

			& .title-bar {
				margin: -1%;
			}
		}
	}

	@media screen and (min-width: 1440px) {
		.blog-container {
			width: 90vw;
			margin: 10vh auto;
		}

		.win_95 {
			width: 70vw;
			margin: 0 5vw;

			& .title-bar {
				margin: 0;
			}
		}
	}
</style>
