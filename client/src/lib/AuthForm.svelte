<script>
	import Btn from "$lib/Btn.svelte"
	import Cookies from "js-cookie"

	export let login = false
	let email
	let password = ""
	let error
	let passwordHidden = "password"
	let pending = false

	async function handleLogin () {
		pending = true
		await fetch("https://talemelier.herokuapp.com/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				email, password
			})
		}).then(async res => {
				if (res.status === 200) {
					Cookies.set("token", (await res.json()).token, { secure: true })
					// history.back()
					//FIXME: redirect to previous page
					location.href = "/"
				} else if (res.status === 404) {
					console.error(await res.json())
					error = "L'utilisateur n'existe pas"
				} else if (res.status === 400) {
					console.error(await res.json())
					document.location.pathname === "/login" ? error = "Mot de passe incorrect" : null
				} else {
					console.error(await res.json())
					error = "Erreur inconnue. Veuillez réessayer"
				}
				pending = false
			}
		).catch(err => {
			error = err
			console.error(err)
		})
	}

	async function handleRegister () {
		pending = true
		await fetch("https://talemelier.herokuapp.com/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email, password
			})
		}).then(async res => {
			if (res.status === 201) {
				await handleLogin()
			} else if (res.status === 208) {
				console.error(await res.json())
				error = "L'utilisateur existe déjà"
				await handleLogin()
			} else {
				console.error(await res.json())
				error = "Erreur inconnue. Veuillez réessayer"
			}
			pending = false
		}).catch(err => {
			error = err
			console.log(err)
		})
	}
</script>

<form method="post" on:submit|preventDefault={login ? handleLogin : handleRegister}>
  <h3>{login ? "Se connecter à son" : "Créer un"} compte</h3>
  <div class="input-container">
    <input autocomplete="email" bind:value={email} placeholder="Email" required type="text">
    <div class="password">
      <input autocomplete="current-password" on:input={(e)=>{password = e.target.value}} placeholder="Mot de passe" required
             type={passwordHidden}
             value={password}/>
      <svg fill="none" height="24"
           on:click={()=> passwordHidden=== "password" ? passwordHidden = "text" : passwordHidden = "password" }
           stroke="currentColor"
           stroke-linecap="round"
           stroke-linejoin="round"
           stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
        {#if passwordHidden === "password"}
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        {:else}
          <path
              d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        {/if}
      </svg>

    </div>
    {#if error}
      <span>{error}</span>
    {/if}
    <Btn type="submit" width="50%">{pending ? "Chargement..." : login ? "Me connecter" : "M'inscrire"}</Btn>
  </div>
  {#if login}
    <a href="forget" class="forget">
      Mot de passe oublié ?
    </a>
  {/if}
</form>

<style lang="scss">
  form {
    display: flex;
    overflow: hidden;
    align-items: center;
    flex-direction: column;
    width: 100%;
    border: 1px solid;
    border-radius: 0.5rem;
    max-width: 512px;
  }

  h3 {
    width: 100%;
    padding: 0.5rem 0;
    text-align: center;
    color: white;
    background-color: var(--black);
    font-family: var(--body-font);
  }

  .input-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 80%;
    padding: 2rem 0;
    gap: 2rem;
  }

  input {
    width: 100%;
  }

  .password {
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;

    svg {
      cursor: pointer;
      position: absolute;
      right: 0.5rem;
      stroke: var(--black);
    }
  }

  .forget {
    align-self: flex-end;
    margin: 0 1rem 0.5rem 0;
  }

</style>