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

<form class="form" method="POST" use:enhance={handleSubmit}>
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
				<button>
					{loading ? 'Loading' : 'Send link'}
				</button>
			</div>
		</div>
	</div>
</form>

<!--svelte-ignore css-unused-selector -->
<style>
	.selector {
		margin-left: 25vw;
	}

	form {
		max-width: 600px;
		margin: 3vh auto;
		padding: 20px;
		background: var(--back_Hallow_Dark);
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(10, 1, 26, 0.1);
	}

	label {
		display: block;
		margin-bottom: 8px;
		font-weight: bold;
	}
	input[type='text']:focus,
	input[type='email']:focus,
	textarea:focus {
		border-color: var(--grabber);
		box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
		outline: none;
	}

	label input:focus {
		outline: 2px solid var(--extra);
	}

	fieldset {
		margin-bottom: 20px;
		border: none;
	}

	legend {
		font-weight: bold;
		margin-bottom: 10px;
	}

	label input {
		margin-right: 10px;
	}

	button {
		display: block;
		width: 100%;
		padding: 10px;
		background: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 16px;
	}

	button:hover {
		background: #0056b3;
	}

	@media (max-width: 600px) {
		form {
			padding: 10px;
		}

		button {
			font-size: 14px;
			height: 30vh;
		}
	}
</style>
