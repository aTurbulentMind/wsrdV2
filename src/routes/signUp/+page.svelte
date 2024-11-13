<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData, SubmitFunction } from './$types.js'

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	export let form: ActionData

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	let loading = false

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	const handleSubmit: SubmitFunction = () => {
		loading = true
		return async ({ update }) => {
			update()
			loading = false
		}
	}
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div class="head_Line">
	<h1>Sign up/ Sign in</h1>
</div>

<form class="sendableForm" method="POST" use:enhance={handleSubmit}>
	<label for="introMessage" class="input-group">
		<p>Sign in via magic link with your email below</p>
		{#if form?.message !== undefined}
			{form?.message}
		{/if}
	</label>
	<label class="input-group" for="email"
		>Email address
		<input
			id="email"
			name="email"
			type="email"
			placeholder="Your email"
			value={form?.email ?? ''}
		/></label
	>
	{#if form?.errors?.email}
		<span>
			{form?.errors?.email}
		</span>
	{/if}

	<button class="ripple-btn">
		{loading ? 'Loading' : 'Send link'}
	</button>
</form>

<style>
	.sendableForm {
		margin: 5% auto;
	}
</style>
