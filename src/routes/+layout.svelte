<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '$lib/style/baseCamp.svelte'
	import Header from '$lib/Nav.svelte'
	import Footer from '$lib/Footer.svelte'

	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<svelte:head>
	<title>West Sound Roller Derby</title>
</svelte:head>

<Header />

<slot />

<!-- <Footer /> -->

<!--svelte-ignore css-unused-selector -->
<style>
</style>
