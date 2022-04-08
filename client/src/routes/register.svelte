<svelte:head>
  <title>Inscription - Talemelier</title>
</svelte:head>

<script>
    import AuthForm from "$lib/AuthForm.svelte"
</script>

<div>
  <h1>Inscription</h1>
  <AuthForm/>
</div>


<style>
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

</style>