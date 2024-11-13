<script>
	import { page } from '$app/stores'
</script>

<br /> <br /> <br />
<aside>
	<ul>
		<li aria-current={$page.url.pathname === '/usr_profile' ? 'page' : undefined}>
			<a href="/usr_profile/">Base</a>
		</li>
		<li aria-current={$page.url.pathname === '/usr_profile/profile_Edit' ? 'page' : undefined}>
			<a href="/usr_profile/profile_Edit">Profile</a>
		</li>
		<li aria-current={$page.url.pathname === '/usr_profile/event_Edit' ? 'page' : undefined}>
			<a href="/usr_profile/event_Edit">Events</a>
		</li>
		<li aria-current={$page.url.pathname === '/usr_profile/warehouse_Edit' ? 'page' : undefined}>
			<a href="/usr_profile/warehouse_Edit">Warehouse</a>
		</li>
		<li aria-current={$page.url.pathname === '/usr_profile/helper' ? 'page' : undefined}>
			<a href="/usr_profile/helper">Helper</a>
		</li>
	</ul>
</aside>
<slot />

<style>
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid var(--highlight);
		border-radius: 50%;
	}

	a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		cursor: pointer;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--highlight_Alt);
	}
</style>
