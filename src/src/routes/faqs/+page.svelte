<script>
	import Wftda from '$lib/assets/img/WFTDAlogo.jpg'
</script>

<svelte:head>
	<title>Information and questions</title>
</svelte:head>

<header class="head_Line">
	<h1>Information</h1>
</header>

<main>
	<img class="logo_wf" src={Wftda} alt="" />

	<section>
		<p>
			Roller derby is fast-paced, full contact sport played on quad roller skates. WSRD belongs to
			the Women's Flat Track Derby Association (WFTDA) and plays by the WFTDA rule set. Since 2001,
			flat track roller derby has gone global with over 400 leagues worldwide. What's with the flat
			track? If you grew up watching roller derby, you probably remember the banked tracks. Flat
			track roller derby has gained momentum because flat track derby can be played on any flat
			surface that is suitable for skating (skating rinks, warehouse floors, wooden gym floors,
			sport court, etc), which makes it more affordable for a league to get up and going. We have
			the opportunity to bout teams from all over the world.
		</p>

		<p>
			<span> Roller Derby's Guiding Body</span>
			Who is WFTDA? The Women’s Flat Track Derby Association is the governing body for women’s flat track
			roller derby, and a membership organization for the leagues to collaborate and network. The organization
			develops and maintains the standardized rules for roller derby, in use by WFTDA member and non-member
			leagues internationally. The WFTDA also serves as the sanctioning body for flat track roller derby
			games, hosts regional and national tournaments, sets safety standards, provides roller derby insurance
			to athletes and leagues, and serves as a networking venue for flat track roller derby leagues to
			share resources and get advice. There are currently 463 WFTDA member leagues on six continents!
			Want to learn more about Roller Derby! Who wouldn't? Check out our next bout and our upcoming intern
			class. Our New Skater classes are for anyone who wants to skate with WSRD as a team skater or as
			an official - rules training is part of our program!
		</p>
	</section>

	<section>
		<p>
			<span>What are the rules you ask?</span>
		</p>
		<ul>
			<li>
				1. Teams and Players: Each team has up to 14 players, but only 5 are on the track at a time.
				These 5 players include one jammer (who scores points) and four blockers (who try to stop
				the opposing jammer and help their own jammer).
			</li>
			<li>
				2. Objective: The main goal is to score more points than the opposing team. Points are
				scored when the jammer laps members of the opposing team.
			</li>
			<li>
				3. Gameplay: The game is played in two 30-minute periods. Each period is divided into
				shorter segments called jams, which last up to 2 minutes. During a jam, both teams’ jammers
				try to lap the opposing team’s blockers to score points.
			</li>
			<li>
				4. Blocking: Blockers use their bodies to block the opposing jammer and clear the way for
				their own jammer. They can use their hips, shoulders, and torso to block, but certain types
				of contact (like tripping or elbowing) are not allowed.
			</li>
			<li>
				5. Lead Jammer: The first jammer to break through the pack of blockers without committing
				any penalties becomes the lead jammer. The lead jammer has the strategic advantage of being
				able to end the jam early by placing their hands on their hips.
			</li>
			<li>
				6. Penalties: Players can receive penalties for illegal actions, such as blocking with
				elbows or tripping. Penalized players must spend time in the penalty box, giving the
				opposing team a temporary advantage.
			</li>
			<li>
				7. Winning: The team with the most points at the end of the game wins. If the game is tied,
				an overtime jam is played to determine the winner.
			</li>
		</ul>
	</section>

	<section>
		<h3>Check out the "Basics of Flat Track Roller Derby" video from WFTDA below:</h3>
		<!-- 
	<iframe
		width="1080"
		height="630"
		src="https://www.youtube.com/embed/OId6gTd2LCM?si=dlo9DvKh7d7rOZiV"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	></iframe> -->
	</section>
</main>

<style>
	ul {
		width: 80vw;
		margin: 0 auto;
		& li {
			list-style: none;
			margin-bottom: 2rem;
			font-size: var(--f_Sm);
		}
	}

	.logo_wf {
		width: 10vw;
		margin: 0 40vw;
	}
	/* 
	iframe {
		margin: 0 20vw;
	} */
</style>
