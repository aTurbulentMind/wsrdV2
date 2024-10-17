<script lang="ts">
	import { enhance } from '$app/forms'

	let selectedForm = ''

	const handleSubmit = async (event) => {
		event.preventDefault()
		const formData = new FormData(event.target)

		// Add form type to formData
		formData.append('formType', selectedForm)

		// Submit the form
		await fetch('/submit', {
			method: 'POST',
			body: formData
		})
	}
</script>

<main>
	<h1>Contact</h1>

	<!-- Dropdown to choose which form to display -->

	<p>
		West Sound Roller Derby is a vibrant and dynamic community that welcomes skaters of all levels,
		from beginners to seasoned athletes. If you’re a visiting skater looking to join a practice or
		participate in a bout, the <strong> Visiting Skater Information Form</strong> is your gateway to
		connecting with the team. By filling out this form, you’ll receive all the necessary information
		about practice schedules, bout opportunities, and any requirements for visiting skaters. It’s a fantastic
		way to experience the camaraderie and excitement of roller derby while honing your skills with a
		supportive and enthusiastic group.
	</p>

	<p>
		For businesses and individuals interested in supporting the team, the <strong
			>Sponsorship Form</strong
		> offers a unique opportunity to become a part of the West Sound Roller Derby family. Sponsorship
		not only helps the team with essential resources and equipment but also provides valuable exposure
		for your brand within the local community and beyond. Whether you’re looking to sponsor a specific
		event, a season, or the team as a whole, your support will be greatly appreciated and acknowledged
		in various promotional materials and events.
	</p>

	<p>
		If you’re an organizer or a team looking to schedule a bout with West Sound Roller Derby, the
		<strong>Request Bouting Date Form</strong> is the perfect tool to get started. This form allows you
		to propose potential dates and provide details about your team and event. By coordinating with West
		Sound Roller Derby, you can ensure a thrilling and competitive bout that will be enjoyed by skaters
		and fans alike. Whether it’s a friendly match or a high-stakes competition, West Sound Roller Derby
		is always eager to engage with other teams and showcase the sport’s excitement and athleticism.
	</p>

	<p>Please select a way to communicate with the team:</p>
	<div class="selector">
		<label for="formSelector">Choose a form:</label>
		<select id="formSelector" bind:value={selectedForm}>
			<option value="">-- Select a form --</option>
			<option value="skater">Visiting Skater Information Form</option>
			<option value="sponsorship">Sponsorship Form</option>
			<option value="bouting">Request Bouting Date Form</option>
		</select>
	</div>

	<!-- Conditionally render the forms -->
	{#if selectedForm === 'skater'}
		<form
			class="sendableForm"
			method="post"
			action="?/submit"
			use:enhance
			enctype="multipart/form-data"
			on:submit={handleSubmit}
		>
			<input type="hidden" name="formType" value="skater" />
			<p>Visiting Skater Information Form</p>

			<label for="fullName">Full Name *</label>
			<input type="text" id="fullName" name="fullName" required />

			<label for="derbyName">Derby Name *</label>
			<input type="text" id="derbyName" name="derbyName" required />

			<label for="email">Email *</label>
			<input type="email" id="email" name="email" required />

			<label for="phoneNumber">Phone Number *</label>
			<input type="text" id="phoneNumber" name="phoneNumber" />

			<fieldset>
				<legend>Is it a WFTDA compliant league? *</legend>
				<label><input type="radio" name="compliantLeague" value="yes" required /> Yes</label>
				<label><input type="radio" name="compliantLeague" value="no" required /> No</label>
			</fieldset>

			<fieldset>
				<legend>Do you have active WFTDA Insurance? *</legend>
				<label><input type="radio" name="insuranceStatus" value="yes" required /> Yes</label>
				<label><input type="radio" name="insuranceStatus" value="no" required /> No</label>
			</fieldset>

			<label for="comments">Comments or Questions</label>
			<textarea id="comments" name="comments"></textarea>

			<button type="submit">Submit</button>
			<aside>* Indicates required field</aside>
		</form>
	{/if}

	{#if selectedForm === 'sponsorship'}
		<form
			class="sendableForm"
			method="post"
			action="?/submit"
			use:enhance
			enctype="multipart/form-data"
			on:submit={handleSubmit}
		>
			<input type="hidden" name="formType" value="sponsorship" />
			<p>Sponsorship Form</p>

			<label for="fullName">Full Name *</label>
			<input type="text" id="fullName" name="fullName" required />

			<label for="businessName">Business Name *</label>
			<input type="text" id="businessName" name="businessName" />

			<label for="phoneNumber">Phone Number *</label>
			<input type="text" id="phoneNumber" name="phoneNumber" />

			<label for="email">Email *</label>
			<input type="email" id="email" name="email" required />

			<label for="comments">Comments or Questions</label>
			<textarea id="comments" name="comments"></textarea>

			<button type="submit">Submit</button>
			<aside>* Indicates required field</aside>
			<!-- <p>Sponsorship Packet</p> -->
		</form>
	{/if}

	{#if selectedForm === 'bouting'}
		<form
			class="sendableForm"
			method="post"
			action="?/submit"
			use:enhance
			enctype="multipart/form-data"
			on:submit={handleSubmit}
		>
			<input type="hidden" name="formType" value="bouting" />

			<p>Request Bouting Date</p>

			<label for="leagueName">League Name *</label>
			<input type="text" id="leagueName" name="leagueName" required />

			<label for="fullName">Corespondent Name *</label>
			<input type="text" id="fullName" name="fullName" required />

			<label for="phoneNumber">Phone Number *</label>
			<input type="text" id="phoneNumber" name="phoneNumber" />

			<label for="prefDate">Preferred Date * </label>
			<input type="date" id="prefDate" name="prefDate" />

			<label for="playedTogether">Have you played with us before?</label>
			<input type="checkbox" id="playedTogether" name="playedTogether" />

			<fieldset>
				<legend>Is it a WFTDA compliant league? *</legend>
				<label><input type="radio" name="compliantLeague" value="yes" required /> Yes</label>
				<label><input type="radio" name="compliantLeague" value="no" required /> No</label>
			</fieldset>

			<fieldset>
				<legend>Do you have active WFTDA Insurance? *</legend>
				<label><input type="radio" name="insuranceStatus" value="yes" required /> Yes</label>
				<label><input type="radio" name="insuranceStatus" value="no" required /> No</label>
			</fieldset>

			<label for="comments">Comments or Questions</label>
			<textarea id="comments" name="comments"></textarea>

			<button type="submit">Submit</button>
			<aside>* Indicates required field</aside>
		</form>
	{/if}
</main>

<style>
	select {
		background-color: var(--grabber);
		color: #fff;
		border: none;
		padding: 10px;
		margin-left: 10vw;
		cursor: pointer;
		margin-bottom: 20vh;
		border-radius: 5px;
		box-shadow: 0 4px var(--extra);
		transform: translateY(-2px);
	}
	select:active {
		box-shadow: 0 2px var(--highlight);
		transform: translateY(0);
	}
</style>
