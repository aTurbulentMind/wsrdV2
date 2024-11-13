<script>
	import A from '$lib/assets/guide_img/A.png'
	import B from '$lib/assets/guide_img/B-1.png'
	import B2 from '$lib/assets/guide_img/B-2.png'
	import C from '$lib/assets/guide_img/C.png'
	import D from '$lib/assets/guide_img/D-1.png'
	import D2 from '$lib/assets/guide_img/D-2.png'
	import D3 from '$lib/assets/guide_img/D-3.png'
	import D4 from '$lib/assets/guide_img/D-4.png'
	import E from '$lib/assets/guide_img/E-1.png'
	import E2 from '$lib/assets/guide_img/E-2.png'
	import E3 from '$lib/assets/guide_img/E-3.png'
	import E4 from '$lib/assets/guide_img/E-4.png'
	import F from '$lib/assets/guide_img/F.png'
	import G from '$lib/assets/guide_img/G.png'
	import H from '$lib/assets/guide_img/H-1.png'
	import H2 from '$lib/assets/guide_img/H-2.png'
	import H3 from '$lib/assets/guide_img/H-3.png'
	import H4 from '$lib/assets/guide_img/H-4.png'
	import I from '$lib/assets/guide_img/I-1.png'
	import I2 from '$lib/assets/guide_img/I-2.png'
	import I3 from '$lib/assets/guide_img/I-3.png'
	import I4 from '$lib/assets/guide_img/I-4.png'
	import I5 from '$lib/assets/guide_img/I-5.png'
	import I6 from '$lib/assets/guide_img/I-6.png'
	import I7 from '$lib/assets/guide_img/I-7.png'
</script>

<svelte:head>
	<title>Storefront</title>
</svelte:head>

<header class=" head_Line">
	<h1 id="topOfPage">User guide for this site</h1>
</header>
<main>
	<a class="ripple-btn topper" href="#topOfPage">Top</a>
	<section>
		<p>This page is designed to reference with questions about how this site works</p>

		<ol>
			<li><a href="#homepage"><strong>Homepage</strong></a>: Hero Banner and team info</li>
			<li>
				<a href="#merchandise"><strong>Merchandise Section</strong></a>: Displays items available
				for purchase at the bout merch table
			</li>
			<li>
				<a href="#gallery"><strong>Gallery</strong></a>: A page with a timeline of events and
				galleries for each event
			</li>
			<li>
				<a href="#roster"><strong>Roster Page</strong></a>: Shows the team members and the roster
				for the next upcoming bout
			</li>
			<li>
				<a href="#contact"><strong>Contact Forms</strong></a>: Allows users to contact an admin or
				designated message reader
			</li>
			<li>
				<a href="#supporters"><strong>Supporters Page</strong></a>: Displays supporters' brand logos
				and information on how to become a supporter
			</li>
			<li>
				<a href="#about-team"><strong>About the Team</strong></a>: Provides information about the
				team
			</li>
			<li>
				<a href="#about-roller-derby"><strong>About Roller Derby</strong></a>: Explains the game of
				roller derby
			</li>
			<li><a href="#login"><strong>Login System</strong></a>: Login for various actions</li>
		</ol>
	</section>

	<section id="homepage">
		<h2>Homepage</h2>

		<p><strong>Hero Banner</strong>: Features the next upcoming bout flyer.</p>

		<h3>Buttons:</h3>
		<ul>
			<li>Buy Tickets</li>
			<li>Subscribe to Newsletter</li>
			<li>Donate to WSRD (501(c)(3) organization)</li>
		</ul>

		<p>
			<strong>Team info</strong>: This is the body of the main page and has general info about the
			team.
		</p>
	</section>

	<section id="merchandise">
		<h2>Merchandise Section</h2>

		<p>
			<strong>Clothing Tabs</strong>: These tabs will be labeled by types of clothing in the sense
			of Hats, hoodies, shirts or socks.
		</p>

		<br />
		<p>
			<strong>Side scrolling items</strong>: These are the items available in the selected clothing
			group. It has a header image and name for the object.
		</p>
		<br />
		<p>
			<strong>Object card</strong>:
		</p>
		<img src={A} alt="Card diagram" />
		<ol>
			<li>Object name</li>
			<li>
				Object images: this is a gallery you can add different views or people wearing the clothing
			</li>
			<li>Description of the object</li>
			<li>Price of the object</li>
			<li>What article type it is</li>
			<li>The sizes available for the object selected</li>
			<li>Button to close the window</li>
		</ol>
	</section>

	<section id="gallery">
		<h2>Gallery</h2>
		<p>
			<strong>Timeline</strong>: This is a date situated event timeline for things that the team has
			done. It can be bouts or fundraising events. Each card holds a head image and the name of the
			event.
		</p>
		<img src={B} alt="Diagram 2" />
		<img src={B2} alt="Diagram 3" />
		<p>When you select an event:</p>
		<ol>
			<li>The event name</li>
			<li>Gallery of images from the event</li>
			<li>Information about what the event was</li>
			<li>When the event happened/ will happen</li>
			<li>Where the event happened/ will happen</li>
			<li>Button to close the event drop down</li>
		</ol>
	</section>

	<section id="roster">
		<h2>Roster Page</h2>

		<p><strong>Info</strong>: About the team</p>
		<p>
			<strong>Roster</strong>: This is a place for people to see and learn about the team members.
		</p>
		<img src={C} alt="Roster Card" />
		<p>
			<strong>Player card</strong>:
		</p>
		<ol>
			<li>Player picture</li>
			<li>Derby name</li>
			<li>Name</li>
			<li>Number</li>
			<li>Phrase</li>
		</ol>

		<p>Photographer credits</p>
	</section>

	<section id="contact">
		<h2>Contact Forms</h2>

		<p>
			<strong>Information</strong>: This space has information about the different contact forms
		</p>
		<p>
			<strong>Form selector</strong>: This has the different options for selecting what type of way
			you need to contact the team
		</p>

		<p>The forms are:</p>

		<p>
			<strong>Visiting skater</strong>:
		</p>
		<img src={D} alt="Visiting skater Form diagram" />
		<ol>
			<li>Senders Name</li>
			<li>Derby name</li>
			<li>Their email</li>
			<li>Their phone number</li>
			<li>League compliance true or false</li>
			<li>Wftda insurance check</li>
			<li>Comments from the submitter</li>
			<li>Submit button for the form</li>
		</ol>

		<p>
			<strong>Sponsorship Form</strong>:
		</p>
		<img src={D2} alt="Sponsorship Form diagram" />
		<ol>
			<li>Senders Name</li>
			<li>Business name</li>
			<li>Their phone number</li>
			<li>Their email</li>
			<li>Comments from the submitter</li>
			<li>Submit button for the form</li>
		</ol>

		<p>
			<strong>Request Bouting Form</strong>:
		</p>
		<img src={D3} alt="Bouting Form diagram" />
		<img src={D4} alt="Bouting Form diagram" />
		<ol>
			<li>League name</li>
			<li>Senders Name</li>
			<li>Their phone number</li>
			<li>Preferred Date</li>
			<li>Box to click whether they have played or not with WSRD</li>
			<li>League compliance true or false</li>
			<li>Wftda insurance check</li>
			<li>Comments from the submitter</li>
			<li>Submit button for the form</li>
		</ol>
	</section>

	<section id="supporters">
		<h2>Supporters Page</h2>
		<p>
			This page is information about becoming a sponsor, official or volunteer. It also has a bit
			about joining the team or transferring in from another group also.
		</p>
	</section>

	<section id="about-team">
		<h2>About the Team</h2>
		<p>
			This is about the team. It could be combined with the roster page before I have finished this
			product.
		</p>
	</section>

	<section id="about-roller-derby">
		<h2>About Roller Derby</h2>
		<p>
			This is the basis of what roller derby is and what the league is. This space has a simple
			breakdown of the roller derby rules.
		</p>
	</section>

	<section id="login-system">
		<h2>Login System</h2>
		<p>This is where our system becomes more elaborate.</p>

		<p><strong> User Authentication</strong></p>
		<p>After you input your email</p>
		<p><strong>Magic Link</strong>: Users receive a link via email to log in with cookies.</p>

		<img src={E} alt="Sign up system" />
		<p>
			1. Clicking the login button for the first time will prompt with an input asking for your
			email.
		</p>
		<br />
		<img src={E2} alt="Sign up system" />
		<p>
			2. After you input your email and submit, the prompt in the window will change to ‘Please
			check your email for a magic link to log into the website.’
		</p>
		<br />
		<img src={E3} alt="Sign up system" />
		<p>
			3. There is a link inside the email sent to the address you input. That link will take you
			back to the homepage, and you should be signed in. When you click the login button again, you
			will be taken to a profile page with your user information for this website.
		</p>
	</section>

	<section id="profile-page">
		<h2>Profile Page</h2>

		<p>Users can upload/change their avatar image and update their profile data.</p>

		<p><strong>User Profile</strong></p>
		<img src={E4} alt="Profile form" />
		<ol>
			<li>Profile image</li>
			<li>Button to upload a replacement picture</li>
			<li>Email attached to the account</li>
			<li>Full name</li>
			<li>Username/ Derby name</li>
			<li>Best way to contact you</li>
			<li>Update: will change any data you have modified</li>
			<li>Button to go to the dashboard</li>
			<li>Button to sign out of your account</li>
		</ol>

		<p>
			When you select "Move to the Dashboard," you will transition to a page that has different
			levels of control depending on who is logged in. Some people will only get to see limited
			information, so you don't have to worry about children breaking things they should not. Admins
			will have full access.
		</p>
	</section>

	<section id="admin-dashboard">
		<h2>Admin Dashboard</h2>
		<p>This will be from an admin level, and anything can be removed from the regular user.</p>
		<p>
			The top of the profile page has a few tabs: 'base,' 'profile,' 'events,' and 'warehouse.'
			These different tabs will give you an overview of things on the website without having to look
			at everything like a regular user.
		</p>

		<article>
			<h3>Dashboard Tabs</h3>

			<ol>
				<li><strong>Base</strong>: General overview.</li>
				<li><strong>Profile</strong>: Manage personal profile data.</li>
				<li><strong>Events</strong>: Options to manage existing events or add new events.</li>
				<li><strong>Warehouse</strong>: Manage inventory items.</li>
			</ol>
		</article>

		<article>
			<h3>Base Tab</h3>
			<p>The entry of the dashboard is where the messages or forms are submitted.</p>

			<img src={F} alt="Message table" />
			<ol>
				<li>
					The type of form is labeled (e.g., sponsorship, new skater, or a team looking to bout).
				</li>
				<li>The name of the person who submitted the form.</li>
				<li>The email of the submitter.</li>
				<li>When the message was submitted.</li>
				<li>A button to view the message.</li>
			</ol>

			<p>
				In the message window, each submitted input is labeled on the left side of the field. Each
				form has different fields to display. Not all input fields will be shared (e.g., business
				name will not be on a new skater form but will be in a sponsor form). When you view the
				message, you can choose to click the "has viewed" button to remove it from this dashboard
				space. Or you can leave it up for another admin to view. You can close the message with a
				button at the bottom.
			</p>
		</article>

		<article>
			<h3>Profile Tab</h3>
			<p>This is what the people see. There is a roster space where this profile data is shown.</p>
			<img src={G} alt="Profile card	and form" />
			<ol>
				<li>First name</li>
				<li>Last name</li>
				<li>Derby Name</li>
				<li>Derby number</li>
				<li>Info about you. Mini bio</li>
			</ol>
		</article>

		<article>
			<h3>Events Tab</h3>
			<p>
				Events are the getter for this sport. This will be a hub for viewing, controlling, and
				modifying events whether it is a bout or some type of fundraiser. There is a selector to
				choose where you want to go in the event space.
			</p>

			<p>
				<strong>View</strong>: is going to show you the next upcoming events. It shows data on the
				event and a flyer image.
			</p>
			<img src={H} alt="view events" />
			<p>
				<strong>New</strong>: This is your form to add a new event, set the data for it, and set a
				flyer image for it.
			</p>
			<img src={H2} alt="New events" />
			<ol>
				<li>Event name</li>
				<li>Event date</li>
				<li>Event location</li>
				<li>Status of the event such as pending, confirmed, or completed</li>
				<li>Description of the event</li>
				<li>A place to upload a flyer for the event</li>
				<li>Button for submitting the form</li>
			</ol>

			<p>
				<strong>Edit</strong>: This is where you will edit the event data and add or delete images
				associated with it.
			</p>
			<img src={H3} alt="edit events" />
			<img src={H4} alt="edit events" />
			<ol>
				<li>Selector for which event you want to edit</li>
				<li>Name of event</li>
				<li>Date of Event</li>
				<li>Description of what the event is</li>
				<li>Flyer for the event</li>
				<li>The input for replacing or adding an event flyer</li>
				<li>Button to upload a flyer if one has been selected</li>
				<li>Delete the flyer that matches for the flyer</li>
				<li>Gallery images for the event</li>
				<li>Button for choosing files to upload</li>
				<li>Button to upload the selected images</li>
				<li>Checkboxes next to an image so you can select what you want to delete</li>
				<li>Button to enact deletion of the images</li>
				<li>Button to submit all data</li>
			</ol>
		</article>

		<article>
			<h2>Warehouse Tab</h2>
			<p>
				There is no purchasing set up on this website because there are no online sales. While there
				may not be sales of merch, it may be cool to see what kind of merch is available to purchase
				at the bout. So in this space, it will be different levels of control and sight over what is
				in the warehouse.
			</p>
			<p>
				The head of the tab for the warehouse has a selector like with the Event tab. The first tab
				being a table to view what's inside.
			</p>

			<p>
				<strong>View warehouse</strong>
			</p>
			<img src={I} alt="view warehouse" />
			<ol>
				<li>Item name</li>
				<li>The category of the item</li>
				<li>Description of the item</li>
			</ol>
			<p>
				<strong>New item</strong>
			</p>
			<img src={I2} alt="new item" />
			<ol>
				<li>Name for the new item</li>
				<li>Description of the new item</li>
				<li>Item price</li>
				<li>Category the item fits in</li>
				<li>Submit the form button</li>
			</ol>
			<p>
				<strong>Add amount</strong>
			</p>
			<img src={I3} alt="add amount" />
			<ol>
				<li>Selector for product you want to deal with inventory for</li>
				<li>Selector for size matching to quantity information</li>
				<li>Location of the product in the warehouse for easy reference</li>
				<li>
					Number of items for the inventory to hit in order to trigger a re-order (if it was
					automated. Currently just like a sticky note to an admin)
				</li>
				<li>Submit button for amount form</li>
			</ol>
			<p>
				<strong>Add images</strong>
			</p>
			<img src={I4} alt="add images" />
			<ol>
				<li>Selector for product in reference</li>
				<li>Button to upload images to a matching product</li>
				<li>Submit button for product gallery</li>
			</ol>
			<p>
				<strong>Edit item</strong>
			</p>
			<img src={I5} alt="edit item" />
			<img src={I6} alt="edit item" />
			<img src={I7} alt="edit item" />
			<ol>
				<li>Product selector</li>
				<li>Name</li>
				<li>Description</li>
				<li>Price</li>
				<li>Category</li>
				<li>Quantity for size</li>
				<li>Location of item in the warehouse</li>
				<li>Reorder threshold</li>
				<li>Button to select which images to delete</li>
				<li>The submit button here will modify any data</li>
			</ol>
		</article>
	</section>

	<section>
		<article>
			<h2>FAQs</h2>
			<p>There are no FAQs at this time.</p>
		</article>
	</section>

	<!-- <section>
		<article>
			<h2>Developer-Focused Documentation</h2>

			<p>
				<strong> Project Overview : </strong>
				Explain the purpose and scope of the project.
			</p>

			<p>
				<strong> Installation : </strong>
				Provide step-by-step instructions for setting up the development environment.
			</p>

			<p>
				<strong> Code Structure : </strong>
				Describe the organization of the codebase and key components.
			</p>

			<p>
				<strong> API Documentation : </strong>
				Detail the APIs used in the project, including endpoints, request/response formats, and examples.
			</p>

			<p>
				<strong> Contribution Guidelines : </strong>
				Outline how other developers can contribute to the project.
			</p>
		</article>
	</section> -->
</main>

<!-- svelte-ignore css-unused-selector -->
<style>
	.topper {
		display: flex;
		position: fixed;
		bottom: 5px;
		left: 5px;
		width: 10vw;
		padding: 2px;
		font-size: var(--f_Sm);
	}

	heading {
		margin: 10vh 5vw;
		font-weight: bold;
	}

	ul,
	ol {
		font-size: var(--f_Sm);
		margin: 5vh 15vw;

		@media screen and (min-width: 1024px) {
			margin: 5vh 30vw;
		}
	}

	img {
		width: 50vw;
		margin: 0 25vw;
		border: var(--bord);

		@media screen and (min-width: 1440px) {
			width: 30vw;
			margin: 0 35vw;
		}
	}
</style>
