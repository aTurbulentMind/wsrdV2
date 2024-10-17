<script>
	import { goto } from '$app/navigation'

	let menuItems = ['Why', 'Recent', 'Library']
	let selected = ''

	const select = (name) => {
		selected = name
		if (name === 'Why') {
			goto('/blog/')
		} else {
			goto('/blog/' + name.toLowerCase())
		}
	}
</script>

<meni>
	<!-- Side menu -->
	<div>
		<ul>
			{#each menuItems as item (item)}
				<li>
					<button class={selected === item ? 'selected' : ''} on:click={() => select(item)}>
						{item}
					</button>
				</li>
			{/each}
		</ul>
	</div>

	<!-- Page content -->
	<div style="flex-grow: 1; padding: 20px;"></div>
</meni>
<slot />

<!-- svelte-ignore css-unused-selector -->
<style>
	button {
		all: unset;
	}

	meni {
		display: flex;

		& ul {
			position: fixed;
			display: flex;
			margin: 50vh -2vw;
			transform: rotate(270deg);
			width: 8vw;

			& li {
				list-style: none;
				cursor: pointer;
				padding: 0 2vw;
				border-right: 1px solid var(--back_Hallow);
			}
		}
	}

	.selected {
		background-color: var(--back_Alt);
		color: var(--back_Main);
	}

	@media screen and (min-width: 768px) {
		meni {
			& ul {
				margin: 50vh -1vw;
				width: 12vw;

				& li {
					list-style: none;
					cursor: pointer;
					padding: 0 2vw;
					border-right: 1px solid var(--back_Hallow);
				}
			}
		}
	}
</style>
