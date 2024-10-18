<footer>
	<p>
		Produced by <br />
		<a href="https://www.lanternlightdevelopment.com/"> Lantern Light Development</a> 2024
	</p>
</footer>

<!-- svelte-ignore css-unused-selector -->
<style>
	footer {
		background-color: var(--gradient);
		justify-content: center;
		display: flex;
		bottom: 0;
		width: 100vw;
		height: fit-content;
	}

	p {
		align-items: center;
		justify-content: center;
		font-size: var(--f_Sm);
		margin: var(--marg);
		gap: 10px;

		& a {
			color: var(--text_Main);

			&:hover {
				padding: 0 1vw;
				transform: scale(1.1);
				text-decoration: underline;
			}
		}
	}

	@media only screen and (min-width: 1024px) {
		p {
			font-size: var(--f_Sm);
		}
	}
</style>
