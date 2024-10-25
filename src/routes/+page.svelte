<script lang="ts">
	import { onMount } from 'svelte'
	import { findMatchingImage } from '$lib/assets/utils/utils'

	export let data

	let { session, images, existingEvents } = data
	$: ({ session, existingEvents, images } = data)

	// Helper function to compare event dates with the current date
	function isUpcomingEvent(event) {
		const today = new Date()
		const eventDate = new Date(event.event_date)
		return eventDate >= today
	}

	// Sort events by date and find the first future event
	let sortedEvents = existingEvents.sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
	let nextEvent = sortedEvents.find(isUpcomingEvent) || null

	// Find matching image for the next event, if it exists
	let nextEventImage = nextEvent ? findMatchingImage(nextEvent.event_name, images) : null

	// Add timestamp on the client only using onMount
	let nextEventImageUrl = nextEventImage ? nextEventImage.url : null

	onMount(() => {
		if (nextEventImageUrl) {
			nextEventImageUrl = `${nextEventImage.url}?t=${new Date().getTime()}`
		}
	})
</script>

<svelte:head>
	<title>West Sound Roller Derby Homepage</title>
</svelte:head>
<hero>
	<div class="hero-content">
		<h1>West Sound Roller Derby</h1>
		<section class="event_Card">
			{#if nextEvent}
				<article class="event-details">
					<header>
						<h2>{nextEvent.event_name}</h2>
					</header>
					{#if nextEventImageUrl}
						<article class="event-flyer">
							<figure>
								<img src={nextEventImageUrl} alt="Event Flyer" />
							</figure>
						</article>
					{:else}
						<p>No matching flyer found.</p>
					{/if}
					<p>{nextEvent.description}</p>
					<p>{nextEvent.event_date.split('T')[0]}</p>
					<p>{nextEvent.location}</p>
					<button class="X-button" type="button">BUY TICKETS!</button>
				</article>
			{/if}
		</section>
		<section class="action_Card">
			<p>Sub to our letters</p>
			<button class="X-button" type="button">SIGN UP!</button>
			<br />
			<p>A 501c3 non-profit</p>
			<button class="X-button" type="button">DONATE!</button>
		</section>
	</div>
</hero>

<header class="head_Line">
	<h1>West Sound Roller Derby</h1>
</header>

<section>
	<article>
		<h2>The best roller derby team in Kitsap County</h2>

		<p>
			Welcome to the home of Kitsap County’s premier roller derby team! We are a passionate group of
			athletes dedicated to the sport of flat track roller derby. Our mission is to foster
			athleticism, teamwork, and personal growth in a safe, positive, and hard-working training
			environment. As a 501©3 non-profit organization, we are run entirely by volunteers who share
			a love for the sport and a commitment to our community.
		</p>

		<p>
			We pride ourselves on being an inclusive and welcoming team, embracing skaters of all ability
			levels. Whether you’re a seasoned pro or just lacing up your skates for the first time, you’ll
			find a supportive and encouraging atmosphere here. Our core values of respect, communication,
			and integrity guide us both on and off the track, ensuring that every member feels valued and
			empowered.
		</p>
		<p>
			Join us as we take care of business on the track and in our community. Together, we strive to
			push the boundaries of what we can achieve, celebrating every victory and learning from every
			challenge. Come be a part of our roller derby family and experience the thrill, camaraderie,
			and empowerment that comes with being a part of this incredible sport.
		</p>
	</article>
</section>

<!--svelte-ignore css-unused-selector -->
<style>
	hero {
		position: relative;
		display: flex;
		height: 100%;
		width: 100%;
		align-items: center;
		justify-content: center;
		text-align: center;
		background-image: url('$lib/assets/img/inHomeBase.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		margin-top: 10%;
	}

	.hero-content {
		background: var(--back_Hallow_Dark);
		padding: var(--space_Sm);

		& img {
			width: 80%;
			border-radius: var(--rad);
		}
	}
	.X-button {
		background-color: var(--grabber);
		color: var(--text_Main);
		padding: var(--space_M);
		border: none;
		border-radius: var(--rad);
		cursor: pointer;
	}
	.X-button:hover {
		background-color: var(--grabber_Alt);
	}

	.head_Line {
		margin: 10vh auto;

		@media screen and (min-width: 768px) {
			margin: 15vh auto;
		}
	}
</style>
