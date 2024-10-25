<script lang="ts">
	import { onMount } from 'svelte'
	import { enhance } from '$app/forms'
	import { invalidate } from '$app/navigation'

	export let data

	let { session, newMessages } = data
	$: ({ session, newMessages } = data)

	let selectedMessage = null

	// Define your formTypeMap
	const formTypeMap = {
		1: 'skater',
		2: 'sponsorship',
		3: 'bouting'
	}

	const selectMessage = (message) => {
		selectedMessage = message
	}

	// Function to get the form type name based on form_type value
	function getFormTypeName(form_type) {
		return formTypeMap[form_type] || 'Unknown Form Type'
	}

	// Function to get the label from formTypeMap
	const getFormTypeLabel = (formType) => formTypeMap[formType] || 'Unknown'
</script>

<svelte:head>
	<title>Admin page</title>
</svelte:head>

<header class="head_Line">
	<h1>Admin dashboard</h1>
</header>

<h2>Welcome back</h2>

<p>These are the unread messages:</p>

<div class="summary">
	<h3>Summary</h3>
	<table>
		<thead>
			<tr>
				<th>Form Type</th>
				<th>Full Name</th>
				<th>Email</th>
				<th>Submitted At</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each newMessages as message}
				<tr>
					<td>{getFormTypeLabel(message.form_type)}</td>
					<td>{message.full_name}</td>
					<td>{message.email}</td>
					<td>{message.submitted_at}</td>
					<td><button on:click={() => selectMessage(message)}>View</button></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

{#if selectedMessage}
	<div class="detail-grid">
		<h3>Message Details</h3>

		{#if selectedMessage.form_type}
			<div><strong>Form Type:</strong> {getFormTypeName(selectedMessage.form_type)}</div>
		{/if}

		{#if selectedMessage.full_name}
			<div><strong>Full Name:</strong> {selectedMessage.full_name}</div>
		{/if}

		{#if selectedMessage.derby_name}
			<div><strong>Derby Name:</strong> {selectedMessage.derby_name}</div>
		{/if}

		{#if selectedMessage.email}
			<div><strong>Email:</strong> {selectedMessage.email}</div>
		{/if}

		{#if selectedMessage.phone_number}
			<div><strong>Phone Number:</strong> {selectedMessage.phone_number}</div>
		{/if}

		{#if selectedMessage.business_name}
			<div><strong>Business Name:</strong> {selectedMessage.business_name}</div>
		{/if}

		{#if selectedMessage.league_name}
			<div><strong>League Name:</strong> {selectedMessage.league_name}</div>
		{/if}

		{#if selectedMessage.compliant_league !== null}
			<div>
				<strong>Compliant League:</strong>
				{selectedMessage.compliant_league ? 'Yes' : 'No'}
			</div>
		{/if}

		{#if selectedMessage.insurance_status !== null}
			<div>
				<strong>Insurance Status:</strong>
				{selectedMessage.insurance_status ? 'Yes' : 'No'}
			</div>
		{/if}

		{#if selectedMessage.preferred_date}
			<div><strong>Preferred Date:</strong> {selectedMessage.preferred_date}</div>
		{/if}

		{#if selectedMessage.played_together !== null}
			<div><strong>Played Together:</strong> {selectedMessage.played_together ? 'Yes' : 'No'}</div>
		{/if}

		{#if selectedMessage.comments}
			<div class="full-width"><strong>Comments:</strong> {selectedMessage.comments}</div>
		{/if}

		{#if selectedMessage.submitted_at}
			<div><strong>Submitted At:</strong> {selectedMessage.submitted_at}</div>
		{/if}

		<!-- Has been viewed checkbox -->
		<div>
			<form action="?/updateMessageViewed" method="post">
				<label>
					Has been viewed:
					<input type="checkbox" name="been_viewed" bind:checked={selectedMessage.viewed} />
				</label>
				<input type="hidden" name="messageId" value={selectedMessage.vstr_id} />
				<button type="submit">Update</button>
			</form>
		</div>

		<!-- Close button (or another event that closes the message) -->
		<button>Close Message</button>
	</div>
{/if}

<!-- svelte-ignore css-unused-selector -->
<style>
	.summary {
		margin-bottom: 20px;
	}
	.summary table {
		width: 80%;
		margin: 0 auto;
		border-collapse: collapse;
	}
	.summary th,
	.summary td {
		border: 1px solid #ddd;
		padding: 8px;
	}
	.summary th {
		background-color: var(--back_Tre);
	}

	.detail-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		max-width: 1200px;
		margin: 2rem auto;
		padding: 1.5rem;
		border-radius: 10px;
		background-color: var(--background);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		font-family: 'Arial', sans-serif;

		& :hover {
			background-color: #f1f1f1;
			transition: background-color 0.3s ease;
		}

		& h3 {
			grid-column: span 2;
			font-size: 1.8rem;
			text-align: center;
			margin-bottom: 1.5rem;
		}

		& div {
			font-size: 1rem;
			padding: 0.75rem 1rem;
			background: var(--highlight);
			border: 1px solid #ddd;
			border-radius: 8px;
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

			& strong {
				color: #333;
				margin-right: 5px;
			}
		}

		.full-width {
			grid-column: span 2;
		}
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.detail-grid {
			grid-template-columns: 1fr;
		}

		h3 {
			grid-column: span 1;
		}
	}
</style>
