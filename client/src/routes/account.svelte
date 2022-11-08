<script>
	import Cookies from "js-cookie"
	import Btn from "$lib/Btn.svelte"

	let userInfos = {}
	let editingEmail = false
	let editingFirstName = false
	let editingLastName = false
	let editingTel = false
	let submit = false

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

	$:console.log(userInfos.tel)

	function handleSubmit (e) {
		e.preventDefault()
		submit = true
		fetch("https://talemelier.herokuapp.com/user", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${Cookies.get("token")}`
			},
			body: JSON.stringify({
				email: userInfos.email,
				firstName: userInfos.firstName,
				lastName: userInfos.lastName,
				tel: userInfos.tel
			})
		}).then((res) => {
			if (res.status === 200) {
				editingEmail = false
				editingFirstName = false
				editingLastName = false
				editingTel = false
			} else {
				alert("Une erreur est survenue")
			}
			submit = false
		})
	}

</script>

{#if userInfos}
  <main>

    <h1>Mon compte</h1>

    <div class="forms">
      <form class="form-group" on:submit={handleSubmit}>
        <label for="email">Adresse email</label>
        <div>
          <input required bind:value={userInfos.email} disabled={!editingEmail} id="email" placeholder="utilisateur@talemelier.fr" type="email">
          {#if editingEmail}
            <Btn small type="submit">{submit ? "Chargement..." : "Sauvegarder"}</Btn>
          {:else}
            <Btn small onClick={() => editingEmail = true}>Modifier</Btn>
          {/if}
        </div>
      </form>
      <form class="form-group" on:submit={handleSubmit}>
        <label for="firstName">Prénom</label>
        <div>
          <input required bind:value={userInfos.firstName} disabled={!editingFirstName} id="firstName" placeholder="Prénom" type="text">
          {#if editingFirstName}
            <Btn small type="submit">{submit ? "Chargement..." : "Sauvegarder"}</Btn>
          {:else}
            <Btn small onClick={() => editingFirstName = true}>Modifier</Btn>
          {/if}
        </div>
      </form>
      <form class="form-group" on:submit={handleSubmit}>
        <label for="lastName">Nom</label>
        <div>
          <input required bind:value={userInfos.lastName} disabled={!editingLastName} id="lastName" placeholder="Nom" type="text">
          {#if editingLastName}
            <Btn small type="submit">{submit ? "Chargement..." : "Sauvegarder"}</Btn>
          {:else}
            <Btn small onClick={() => editingLastName = true}>Modifier</Btn>
          {/if}
        </div>
      </form>
      <form class="form-group" on:submit={handleSubmit}>
        <label for="tel">Téléphone</label>
        <div>
          <input required bind:value={userInfos.tel} disabled={!editingTel} pattern={`[0-9]{10}`} maxlength="10" id="tel" placeholder="0600000000" type="tel">
          {#if editingTel}
            <Btn small type="submit">{submit ? "Chargement..." : "Sauvegarder"}</Btn>
          {:else}
            <Btn small onClick={() => editingTel = true}>Modifier</Btn>
          {/if}
        </div>
      </form>
    </div>
  </main>
{/if}

<style>

  main {
    width: 90%;
    margin: 0 auto;
  }

  .forms {
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