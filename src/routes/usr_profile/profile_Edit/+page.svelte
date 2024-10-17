<script lang="ts">
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'

	export let data

	import Avatar from '$lib/assets/tools/Avatar.svelte'

	let { skater, session, supabase, sk8Avatar } = data
	$: ({ supabase, skater, sk8Avatar, session } = data)

	let loading = false

	let profileForm: HTMLFormElement

	let form = {
		first_name: skater?.first_name || '',
		last_name: skater?.last_name || '',
		derby_name: skater?.derby_name || '',
		player_number: skater?.player_number || '',
		bio: skater?.bio || ''
	}

	const handleSubmit: SubmitFunction = () => {
		loading = true
		return async () => {
			loading = false
		}
	}
</script>

<div class="head_Line">
	<h1>Modify Your Profile</h1>
</div>

<form
	class="sendableForm"
	method="post"
	action="?/submit"
	use:enhance
	enctype="multipart/form-data"
>
	<input type="hidden" name="operation" value="modify" />

	<label for="first_name">First Name *</label>
	<input type="text" id="first_name" name="first_name" bind:value={form.first_name} required />

	<label for="last_name">Last Name *</label>
	<input type="text" id="last_name" name="last_name" bind:value={form.last_name} required />

	<label for="derby_name">Derby Name *</label>
	<input type="text" id="derby_name" name="derby_name" bind:value={form.derby_name} required />

	<label for="player_number">Player Number</label>
	<input type="number" id="player_number" name="player_number" bind:value={form.player_number} />

	<label for="bio">Bio</label>
	<textarea id="bio" name="bio" bind:value={form.bio}></textarea>

	<!-- 	<label for="avatar">Profile Picture</label>

	<Avatar {supabase} bind:url={avatarUrl} size={10} /> -->

	<button type="submit">Submit</button>
</form>
