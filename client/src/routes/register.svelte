<svelte:head>
  <title>Inscription - Talemelier</title>
</svelte:head>

<script>
	import AuthForm from "$lib/AuthForm.svelte"
</script>

<div>
  <a href="/login">
    Vous avez déjà créé un compte ? <br/><span class="underline">Connectez-vous</span>
  </a>
  <AuthForm/>
</div>


<style>
  div {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    max-width: 40rem;
    margin: 4rem auto 0 auto;
    gap: 0.5rem;
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