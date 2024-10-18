<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'

	import Avatar from '$lib/assets/tools/Avatar.svelte'

	export let data
	export let form

	let { session, supabase, profile } = data
	$: ({ session, supabase, profile } = data)

	let profileForm: HTMLFormElement
	let loading = false
	let fullName: string = profile?.full_name ?? ''
	let username: string = profile?.username ?? ''
	let contact: string = profile?.contact ?? ''
	let avatarUrl: string = profile?.avatar_url ?? ''

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

<div class="head_Line">
	<h1>Account</h1>
</div>

<div>
	<form
		class="sendableForm"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<div class="window-content">
			<p>Details</p>
		</div>

		<Avatar
			{supabase}
			bind:url={avatarUrl}
			size={10}
			on:upload={() => {
				profileForm.requestSubmit()
			}}
		/>
		<div>
			<label for="email">Email</label>
			<input id="email" type="text" value={session.user.email} disabled />
		</div>

		<div>
			<label for="fullName">Full Name</label>
			<input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />
		</div>

		<div>
			<label for="username">Username</label>
			<input id="username" name="username" type="text" value={form?.username ?? username} />
		</div>

		<div>
			<label for="contact">Contact</label>
			<input id="contact" name="contact" type="text" value={form?.contact ?? contact} />
		</div>

		<div class="window-content">
			<input type="submit" value={loading ? 'Loading...' : 'Update'} disabled={loading} />
		</div>
	</form>

	<br />

	<form method="post" action="?/signout" use:enhance={handleSignOut}>
		<div>
			<button class="button block" disabled={loading}>Sign Out</button>
		</div>
	</form>
</div>

<div>
	<a href="/usr_profile">Go to your profile dashboard</a>
</div>
