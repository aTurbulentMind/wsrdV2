<script lang="ts">
	import Avatar from '$lib/assets/tools/Avatar.svelte'

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	export let data
	let { supabase, profile, skater } = data
	$: ({ supabase, profile, skater } = data)

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	let avatarUrl: string = profile?.avatar_url ?? '' // Get avatar URL
</script>

<svelte:head>
	<title>Team Roster</title>
</svelte:head>

<main>
	<header class="head_Line">
		<h1>Roster</h1>
	</header>

	<p>
		Welcome to the Kitsap Roller Derby Team Roster! Our team is a dynamic group of athletes
		dedicated to the sport of flat track roller derby. We pride ourselves on fostering a culture of
		respect, communication, and integrity both on and off the track. Each skater brings their unique
		skills and personality, contributing to a positive, hard-working training environment.We are
		committed to advancing the sport in a safe and supportive manner. Meet our incredible skaters
		who embody the spirit and athleticism of roller derby!
	</p>

	{#if skater.length > 0}
		<div class="skater-cards">
			{#each skater as skaterItem}
				<div class="skater-card">
					<Avatar {supabase} bind:url={avatarUrl} size={10} showUploadButton={false} />
					<h2>{skaterItem.derby_name}</h2>
					<p><strong>Name:</strong> {skaterItem.first_name} {skaterItem.last_name}</p>
					<p><strong>Player Number:</strong> {skaterItem.player_number}</p>
					<p><strong>Bio:</strong></p>
					<p class="bio">{skaterItem.bio}</p>
				</div>
			{/each}
		</div>
	{:else}
		<p>No skaters found.</p>
	{/if}

	<p>
		Photographs by: One of our fantastic sponsors, Lydia Brewer is the official photographer of
		WSRD!
	</p>
</main>

<style>
	.skater-cards {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;

		margin: 1rem 20vw;
	}
	.skater-card {
		border: 1px solid #ccc;
		border-radius: 8px;
		padding: 1rem;
		width: 200px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

		& h2 {
			margin: 0 0 0.5rem 0;
			font-size: 1.25rem;
		}

		& p {
			margin: 0.25rem 0;
		}

		& .bio {
			font-size: var(--f_Sm);
		}
	}
</style>
