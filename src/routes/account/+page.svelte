<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'

	import Avatar from '$lib/assets/tools/Avatar.svelte'

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	export let data
	export let form

	let { session, supabase, profile } = data
	$: ({ session, supabase, profile } = data)

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	let profileForm: HTMLFormElement
	let loading = false
	let fullName: string = profile?.full_name ?? ''
	let username: string = profile?.username ?? ''
	let contact: string = profile?.contact ?? ''
	let avatarUrl: string = profile?.avatar_url ?? ''

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	const handleSubmit: SubmitFunction = () => {
		loading = true
		return async () => {
			loading = false
		}
	}

	const handleSignOut: SubmitFunction = () => {
		loading = true
		return async ({ update }) => {
			loading = false
			update()
		}
	}
</script>

<svelte:head>
	<title>Account</title>
</svelte:head>

<header class="head_Line">
	<h1>Account</h1>
</header>

<form
	class="sendableForm"
	method="post"
	action="?/update"
	use:enhance={handleSubmit}
	bind:this={profileForm}
>
	<h2>Profile info</h2>

	<p>This is your account info for the admin to see and reach out to you</p>

	<Avatar
		{supabase}
		bind:url={avatarUrl}
		size={10}
		on:upload={() => {
			profileForm.requestSubmit()
		}}
	/>

	<label for="email"
		>Email
		<input id="email" type="text" value={session.user.email} disabled />
	</label>

	<label for="fullName"
		>Full Name
		<input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />
	</label>

	<label for="username"
		>Username
		<input id="username" name="username" type="text" value={form?.username ?? username} />
	</label>

	<label for="contact"
		>Contact
		<input id="contact" name="contact" type="text" value={form?.contact ?? contact} />
	</label>

	<div class="window-content">
		<input
			class="W-button"
			type="submit"
			value={loading ? 'Loading...' : 'Update'}
			disabled={loading}
		/>
	</div>

	<a href="/usr_profile"><span> Go to the dashboard </span></a>
</form>

<form method="post" action="?/signout" use:enhance={handleSignOut}>
	<div>
		<button class="W-button" disabled={loading}> Sign Out</button>
	</div>
</form>

<style>
	.sendableForm {
		margin: 10px auto;
	}

	.W-button {
		display: block;
		margin: 10px auto;
	}
</style>
