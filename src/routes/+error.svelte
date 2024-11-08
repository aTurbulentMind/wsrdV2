<script>
	export let error;
</script>

<section id="error">
	<h2>Oops!</h2>
	<p>{error.status} - {error.message}</p>
	<p>The page you're looking for doesn't exist.</p>
	<a href="/">Go back home</a>
</section>

<style>
	#error {
		text-align: center;
		padding: 50px;
	}
	#error h2 {
		font-size: 2em;
		color: #ff00ff;
	}
	#error p {
		margin: 10px 0;
	}
	#error a {
		color: #00ffcc;
		text-decoration: none;
		border-bottom: 1px solid #00ffcc;
	}
</style>
