<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData, SubmitFunction } from './$types.js'

	export let form: ActionData

	let loading = false

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
	<h1>Sign up</h1>
</div>

<form class="sendableForm" method="POST" use:enhance={handleSubmit}>
	<div>
		<div>
			<div>Sign in</div>
		</div>
		<br />
		<br />
		<div>
			<p>Sign in via magic link with your email below</p>
			{#if form?.message !== undefined}
				<div>
					{form?.message}
				</div>
			{/if}
			<div>
				<label for="email">Email address</label>
				<input
					id="email"
					name="email"
					type="email"
					placeholder="Your email"
					value={form?.email ?? ''}
				/>
			</div>
			{#if form?.errors?.email}
				<span>
					{form?.errors?.email}
				</span>
			{/if}
			<div>
				<button class="ripple-btn">
					{loading ? 'Loading' : 'Send link'}
				</button>
			</div>
		</div>
	</div>
</form>



<style>
	.sendableForm {
		display: flex;
		margin: 5% auto;
	}
</style>
