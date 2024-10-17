<hero> </hero>

<svelte:head>
	<title>Entry page</title>
</svelte:head>

<div class="head_Line">
	<h1>West Sound Roller Derby</h1>
</div>

<section>
	<article>
		<h2>The best roller derby team in Kitsap County</h2>

		<p>
			Welcome to the home of Kitsap County’s premier roller derby team! We are a passionate group of
			athletes dedicated to the sport of flat track roller derby. Our mission is to foster
			athleticism, teamwork, and personal growth in a safe, positive, and hard-working training
			environment. As a 501©3 non-profit organization, we are run entirely by volunteers who share
			a love for the sport and a commitment to our community.
		</p>

		<p>
			We pride ourselves on being an inclusive and welcoming team, embracing skaters of all ability
			levels. Whether you’re a seasoned pro or just lacing up your skates for the first time, you’ll
			find a supportive and encouraging atmosphere here. Our core values of respect, communication,
			and integrity guide us both on and off the track, ensuring that every member feels valued and
			empowered.
		</p>
		<p>
			Join us as we take care of business on the track and in our community. Together, we strive to
			push the boundaries of what we can achieve, celebrating every victory and learning from every
			challenge. Come be a part of our roller derby family and experience the thrill, camaraderie,
			and empowerment that comes with being a part of this incredible sport.
		</p>
	</article>
</section>

<!--svelte-ignore css-unused-selector -->
<style>
	hero {
		display: flex;
		position: relative;
		background-image: url('$lib/assets/img/inHomeBase.jpg');
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: cover;
		z-index: 999;
		height: 100vh;
		width: 100vw;
	}

	.head_Line {
		margin: 10vh auto;

		@media screen and (min-width: 768px) {
			margin: 15vh auto;
		}
	}
</style>
