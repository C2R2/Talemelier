<script>
	import AuthForm from "$lib/AuthForm.svelte"
</script>

<svelte:head>
  <title>Connexion - Talemelier</title>
</svelte:head>

<div>
  <a href="/register">
    Pas encore de compte ? <br/><span class="underline">Inscrivez-vous</span>
  </a>
  <AuthForm login/>
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    margin: 4rem auto 0 auto;
    gap: 0.5rem;
    align-items: flex-end;
    max-width: 40rem;
  }

  h1 {
    align-self: flex-start;
  }

  a {
    text-align: center;
  }

  span {
    color: #334c84;
  }
</style>
