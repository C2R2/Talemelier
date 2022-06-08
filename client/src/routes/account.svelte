<script>
    import Cookies from "js-cookie"
    import Btn from "$lib/Btn.svelte"

    let userInfos

    fetch("https://talemelier.herokuapp.com/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    }).then((response) => response.json())
        .then((data) => {
            userInfos = data
        })

    $:console.log(userInfos)

</script>

{#if userInfos}
  <main>

    <h1>Mon compte</h1>

    <form action="">
      <div class="form-group">
        <label for="email">Adresse email</label>
        <input bind:value={userInfos.email} id="email" placeholder="Adresse email" type="email">
      </div>
      <div class="form-group">
        <label for="firstName">Prénom</label>
        <input bind:value={userInfos.firstName} id="firstName" placeholder="Prénom" type="text">
      </div>
      <div class="form-group">
        <label for="lastName">Nom</label>
        <input bind:value={userInfos.lastName} id="lastName" placeholder="Nom" type="text">
      </div>
      <div class="form-group">
        <label for="tel">Téléphone</label>
        <input bind:value={userInfos.tel} id="tel" placeholder="Téléphone" type="tel">
      </div>
      <Btn>Mettre à jour</Btn>
    </form>
  </main>
{/if}

<style>

  main {
    max-width: 64rem;
    margin: 0 auto;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

</style>