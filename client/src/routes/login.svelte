<svelte:head>
  <title>Connexion - Talemelier</title>
</svelte:head>

<script>

    import AuthForm from "$lib/AuthForm.svelte"
</script>

<div>
  <h1>Connexion</h1>
  <AuthForm login/>

  <a href="/register">
    Pas encore de compte ? <u>Inscrivez-vous</u>
  </a>
</div>
<style lang="scss">
  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    min-height: 60vh;
    margin: auto;
    gap: 2rem;
  }

  h1 {
    align-self: flex-start;
  }

a{
  margin-top: 1rem;
}

</style>