<script lang="ts">
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'

	export let data

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
	<h1>Modify Your Roster Card</h1>
</div>

<form
	class="sendableForm"
	method="post"
	action="?/submit"
	use:enhance
	enctype="multipart/form-data"
>
	<input type="hidden" name="operation" value="modify" />

	<label class="input-group" for="first_name"
		>First Name *
		<input type="text" id="first_name" name="first_name" bind:value={form.first_name} required />
	</label>

	<label class="input-group" for="last_name"
		>Last Name *
		<input type="text" id="last_name" name="last_name" bind:value={form.last_name} required />
	</label>

	<label class="input-group" for="derby_name"
		>Derby Name *
		<input type="text" id="derby_name" name="derby_name" bind:value={form.derby_name} required />
	</label>

	<label class="input-group" for="player_number"
		>Player Number
		<input type="number" id="player_number" name="player_number" bind:value={form.player_number} />
	</label>

	<label class="input-group" for="bio"
		>Bio
		<textarea id="bio" name="bio" bind:value={form.bio}></textarea>
	</label>

	<button class="W-button" type="submit">Submit</button>
</form>

<style>
	.sendableForm {
		display: block;
		margin: 0 auto 15% auto;
	}
</style>
