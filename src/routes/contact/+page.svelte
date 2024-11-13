<script lang="ts">
	import { enhance } from '$app/forms'

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

	let selectedForm = ''

	//➖ ➖ ➖ ➖ ➖ 🦖➖ ➖ ➖ 🌟  🌟  🌟

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

<svelte:head>
	<title>Contact page</title>
</svelte:head>

<header class="head_Line">
	<h1>Contact</h1>
</header>

<main>
	<p>
		West Sound Roller Derby is a vibrant and dynamic community that welcomes skaters of all levels,
		from beginners to seasoned athletes. If you’re a visiting skater looking to join a practice or
		participate in a bout, the <span> Visiting Skater Information Form</span> is your gateway to connecting
		with the team. By filling out this form, you’ll receive all the necessary information about practice
		schedules, bout opportunities, and any requirements for visiting skaters. It’s a fantastic way to
		experience the camaraderie and excitement of roller derby while honing your skills with a supportive
		and enthusiastic group.
	</p>

	<p>
		For businesses and individuals interested in supporting the team, the <span
			>Sponsorship Form</span
		> offers a unique opportunity to become a part of the West Sound Roller Derby family. Sponsorship
		not only helps the team with essential resources and equipment but also provides valuable exposure
		for your brand within the local community and beyond. Whether you’re looking to sponsor a specific
		event, a season, or the team as a whole, your support will be greatly appreciated and acknowledged
		in various promotional materials and events.
	</p>

	<p>
		If you’re an organizer or a team looking to schedule a bout with West Sound Roller Derby, the
		<span>Request Bouting Date Form</span> is the perfect tool to get started. This form allows you to
		propose potential dates and provide details about your team and event. By coordinating with West
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

	<!-- Visiting Skater form  -->
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
			<h2>Visiting Skater Information Form</h2>

			<label class="input-group" for="fullName">
				<span>Full Name *</span>
				<input type="text" id="fullName" name="fullName" placeholder="Your full name" required />
			</label>

			<label class="input-group" for="derbyName">
				<span>Derby Name *</span>
				<input
					type="text"
					id="derbyName"
					name="derbyName"
					placeholder="Your derby nickname"
					required
				/>
			</label>

			<label class="input-group" for="email">
				<span>Email *</span>
				<input type="email" id="email" name="email" placeholder="Your email address" required />
			</label>

			<label class="input-group" for="phoneNumber"
				>Phone Number
				<input type="text" id="phoneNumber" name="phoneNumber" placeholder="(555) - 867 - 5309" />
			</label>

			<fieldset class="radio-group">
				<legend>Is it a WFTDA compliant league? *</legend>
				<label><input type="radio" name="compliantLeague" value="yes" required /> Yes</label>
				<label><input type="radio" name="compliantLeague" value="no" required /> No</label>
			</fieldset>

			<fieldset class="radio-group">
				<legend>Do you have active WFTDA Insurance? *</legend>
				<label><input type="radio" name="insuranceStatus" value="yes" required /> Yes</label>
				<label><input type="radio" name="insuranceStatus" value="no" required /> No</label>
			</fieldset>

			<label class="input-group" for="comments"
				>Comments or Questions
				<textarea id="comments" name="comments"></textarea>
			</label>

			<button class="W-button" type="submit">Submit 😊</button>
			<aside>* Indicates required field</aside>
		</form>
	{/if}

	<!-- Sponsorship form -->
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
			<h2>Sponsorship Form</h2>

			<label class="input-group" for="fullName">
				<span>Full Name *</span>
				<input type="text" id="fullName" name="fullName" placeholder="Your full name" required />
			</label>

			<label class="input-group" for="businessName"
				><span> Business Name * </span>
				<input
					type="text"
					id="businessName"
					name="businessName"
					placeholder="Your business name"
					required
				/>
			</label>

			<label class="input-group" for="phoneNumber"
				>Phone Number
				<input type="text" id="phoneNumber" name="phoneNumber" placeholder="(555) - 867 - 5309" />
			</label>

			<label class="input-group" for="email">
				<span>Email *</span>
				<input type="email" id="email" name="email" placeholder="Your email address" required />
			</label>

			<label class="input-group" for="comments"
				>Comments or Questions
				<textarea id="comments" name="comments" placeholder="Your comments or questions"></textarea>
			</label>

			<button class="W-button" type="submit">Submit 😊</button>
			<aside>* Indicates required field</aside>
			<!-- <p>Sponsorship Packet</p> -->
		</form>
	{/if}

	<!-- Bouting form -->
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

			<h2>Request Bouting Date</h2>

			<label for="leagueName" class="input-group"
				><span> League Name * </span>
				<input
					type="text"
					id="leagueName"
					name="leagueName"
					placeholder="Your league name"
					required
				/>
			</label>

			<label class="input-group" for="fullName"
				><span> Corespondent Name * </span>
				<input type="text" id="fullName" name="fullName" placeholder="Your name" required />
			</label>

			<label class="input-group" for="phoneNumber"
				>Phone Number
				<input type="text" id="phoneNumber" name="phoneNumber" placeholder="(555) - 867 - 5309" />
			</label>

			<label class="input-group" for="prefDate"
				><span> Preferred Date * </span>
				<input type="date" id="prefDate" name="prefDate" />
			</label>

			<label class="radio-group" for="playedTogether"
				>Have you played with us before?
				<input type="checkbox" id="playedTogether" name="playedTogether" />
			</label>

			<fieldset class="radio-group">
				<legend> Is it a WFTDA compliant league? *</legend>
				<label><input type="radio" name="compliantLeague" value="yes" required /> Yes</label>
				<label><input type="radio" name="compliantLeague" value="no" required /> No</label>
			</fieldset>

			<fieldset class="radio-group">
				<legend>Do you have active WFTDA Insurance? *</legend>
				<label><input type="radio" name="insuranceStatus" value="yes" required /> Yes</label>
				<label><input type="radio" name="insuranceStatus" value="no" required /> No</label>
			</fieldset>

			<label class="input-group" for="comments"
				>Comments or Questions
				<textarea id="comments" name="comments"></textarea>
			</label>

			<button class="W-button" type="submit">Submit 😊 </button>
			<aside>* Indicates required field</aside>
		</form>
	{/if}
</main>

<!--ignore css-unused-selector-->
<style>
	.selector {
		margin: 10vh 20vw;
	}
	.sendableForm {
		margin: 0 auto;

		& .W-button {
			width: 60%;
		}
	}
</style>
