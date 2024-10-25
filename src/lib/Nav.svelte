<script>
	import { goto } from '$app/navigation'

	import { page } from '$app/stores'

	function navigateTo(url) {
		goto(url, { noScroll: true })
	}

	import Camera_Svg from './svg/crown_Svg.svelte'

	let isMenuOpen = false

	function toggleMenu() {
		isMenuOpen = !isMenuOpen
	}

	let current = 0
</script>

<div class="navbar">
	<nav class:open={isMenuOpen}>
		<ul>
			<li aria-current={$page.url.pathname === '/signUp' ? 'page' : undefined}>
				<button on:click={() => (isMenuOpen = false)} on:keydown={() => (isMenuOpen = false)}>
					<a
						class:current={current === 0}
						on:click|preventDefault={() => {
							current = 0
							navigateTo('/signUp')
						}}
						href="/signUp"
					>
						Login
					</a>
				</button>
			</li>

			<li aria-current={$page.url.pathname === '/faqs' ? 'page' : undefined}>
				<button on:click={() => (isMenuOpen = false)} on:keydown={() => (isMenuOpen = false)}>
					<a
						class:current={current === 1}
						on:click={() => {
							current = 1

							navigateTo('/faqs')
						}}
						href="/faqs/">Info</a
					>
				</button>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<button on:click={() => (isMenuOpen = false)} on:keydown={() => (isMenuOpen = false)}>
					<a
						class:current={current === 2}
						on:click|preventDefault={() => {
							current = 2
							navigateTo('/about')
						}}
						href="/about">About</a
					>
				</button>
			</li>

			<li aria-current={$page.url.pathname === '/supporters' ? 'page' : undefined}>
				<button on:click={() => (isMenuOpen = false)} on:keydown={() => (isMenuOpen = false)}>
					<a
						class:current={current === 3}
						on:click|preventDefault={() => {
							current = 3
							navigateTo('/supporters')
						}}
						href="/supporters">Supporters</a
					>
				</button>
			</li>
			<li aria-current={$page.url.pathname === '/contact' ? 'page' : undefined}>
				<button on:click={() => (isMenuOpen = false)} on:keydown={() => (isMenuOpen = false)}>
					<a
						class:current={current === 4}
						on:click|preventDefault={() => {
							current = 4
							navigateTo('/contact')
						}}
						href="/contact/">Contact</a
					>
				</button>
			</li>
			<li aria-current={$page.url.pathname === '/roster' ? 'page' : undefined}>
				<button on:click={() => (isMenuOpen = false)} on:keydown={() => (isMenuOpen = false)}>
					<a
						class:current={current === 5}
						on:click|preventDefault={() => {
							current = 5

							navigateTo('/roster')
						}}
						href="/roster">Roster</a
					>
				</button>
			</li>

			<li aria-current={$page.url.pathname === '/gallery' ? 'page' : undefined}>
				<button on:click={() => (isMenuOpen = false)} on:keydown={() => (isMenuOpen = false)}>
					<a
						class:current={current === 6}
						on:click|preventDefault={() => {
							current = 6
							navigateTo('/gallery')
						}}
						href="/gallery/">Gallery</a
					>
				</button>
			</li>

			<li aria-current={$page.url.pathname === '/shop' ? 'page' : undefined}>
				<button on:click={() => (isMenuOpen = false)} on:keydown={() => (isMenuOpen = false)}>
					<a
						class:current={current === 7}
						on:click|preventDefault={() => {
							current = 7
							navigateTo('/shop')
						}}
						href="/shop/">Shop</a
					>
				</button>
			</li>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<button on:click={() => (isMenuOpen = false)} on:keydown={() => (isMenuOpen = false)}>
					<a
						class:current={current === 8}
						on:click|preventDefault={() => {
							current = 8
							navigateTo('/')
						}}
						href="/">Home</a
					>
				</button>
			</li>
		</ul>
	</nav>
	<button on:click={toggleMenu} on:keydown={() => (isMenuOpen = false)}>
		<div class="burger">
			<svg> <Camera_Svg /></svg>
		</div>
	</button>
</div>

<!--svelte-ignore css-unused-selector -->
<style>
	.navbar {
		background: radial-gradient(ellipse, hwb(275 4% 32%), hwb(22 2% 17%));
		background-size: 300% 300%;
		animation: gradientShift 50s ease-in-out infinite;
		width: 100vw;
		display: flex;
		top: 0;
		justify-content: space-between;
		position: fixed;
		height: 5rem;
		z-index: 950;
		transition: transform 1.2s ease-in-out;
		border-bottom: var(--bord);
	}

	li[aria-current='page']::before,
	li[aria-current='page']::after {
		content: '';
		padding: var(--space_Sm);
		border: 3px solid var(--grabber);
		border-radius: 50px;
	}

	@keyframes gradientShift {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.navbar button {
		all: unset;
	}

	.navbar a {
		color: var(--back_Alt);
		text-shadow: 1px 1px 0 var(--highlight);
		text-decoration: none;

		&:hover {
			color: var(--text_Main);
			text-shadow: var(--text_Shadow);
		}
	}

	.navbar ul {
		display: flex;
		flex-direction: column-reverse;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		list-style: none;
		margin: 0;
	}

	.navbar ul li button {
		all: unset;
		margin-top: 20px;
	}

	.navbar .burger {
		height: fit-content;
		width: 100%;
		display: flex;
		background-color: transparent;
		margin-left: 1rem;
		align-items: center;
		justify-content: center;
	}

	.navbar .burger:hover {
		cursor: pointer;
		transition: transform 0.1s ease-in-out;
		transform: scale(1.1);
	}

	.navbar .burger svg {
		width: 2.5rem;
		height: 2.5rem;
	}

	nav {
		display: none;
	}

	nav.open {
		display: block;
		position: absolute;
		top: 100%;
		left: 0;
		background: var(--highlight_Alt);
		width: 100%;
		border-bottom: var(--bord);
		border-top: var(--bord);
	}

	.current::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		box-shadow: 0 0 10px rgba(255, 119, 169, 0.8);
	}

	/* Laptop styles */
	@media only screen and (min-width: 1024px) {
		nav {
			display: flex;
		}

		.navbar {
			height: 4rem;
		}

		.navbar .burger {
			display: none;
		}

		.navbar ul {
			flex-direction: row-reverse;
			gap: 2rem;
			margin: 0 10vw;
		}
	}

	/* Larger screens */
	@media only screen and (min-width: 1440px) {
		.navbar ul {
			gap: 3rem;
			margin: 0 22vw;
		}
	}
</style>
