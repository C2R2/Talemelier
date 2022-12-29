<script>
	import Btn from "$lib/Btn.svelte"
	import Cookies from "js-cookie"

	export let login = false
	let firstName = ""
	let lastName = ""
	let email = ""
	let password = ""
	let confirmPassword = ""
	let error
	let passwordHidden = "password"
	let pending = false
  let disabled = false

	async function handleLogin () {
		pending = true
		await fetch(import.meta.env.VITE_SERVER_URL + "/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				email,
				password
			})
		})
			.then(async (res) => {
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
					document.location.pathname === "/login"
						? (error = "Mot de passe incorrect")
						: null
				} else {
					console.error(await res.json())
					error = "Erreur inconnue. Veuillez réessayer"
				}
				pending = false
			})
			.catch((err) => {
				error = err
				console.error(err)
			})
	}

	async function handleRegister () {
		pending = true
		await fetch(import.meta.env.VITE_SERVER_URL + "/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				firstName,
				lastName,
				email,
				password
			})
		})
			.then(async (res) => {
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
			})
			.catch((err) => {
				error = err
				console.log(err)
			})
	}

	function handleConfirmPassword () {
		if (password !== confirmPassword) {
			error = "Les mots de passe ne correspondent pas"
      disabled = true
		} else {
			error = ""
      disabled = false
		}
	}

</script>

<form
    method="post"
    on:submit|preventDefault={login ? handleLogin : handleRegister}
>
  <div class="input-container">
    <p>{login ? "Connectez-vous" : "Créer votre compte"} </p>
    {#if !login}
      <div class="names-container">
        <div class="lastname-container">
          <label for="lastname">Nom</label>
          <input
              autocomplete="lastname"
              bind:value={lastName}
              id="lastname"
              placeholder="Nom"
              required
              type="text"
          />
        </div>
        <div class="firstname-container">
          <label for="firstname">Prénom</label>
          <input
              autocomplete="firstname"
              bind:value={firstName}
              id="firstname"
              placeholder="Prénom"
              required
              type="text"
          />
        </div>
      </div>
    {/if}
    <div class="email-container">
      <label for="email">Mail</label>
      <input
          autocomplete="email"
          bind:value={email}
          id="email"
          placeholder="mail@talemelier.fr"
          required
          type="text"
      />
    </div>
    <div class="password-container">
      <label for="password">Mot de passe</label>
      <div class="password">
        <input
            autocomplete="current-password"
            id="password"
            on:input={(e) => {
            password = e.target.value
          }}
            placeholder="●●●●●●●●"
            required
            type={passwordHidden}
            value={password}
        />
        <svg
            fill="none"
            height="24"
            on:click={() =>
            passwordHidden === "password"
              ? (passwordHidden = "text")
              : (passwordHidden = "password")}
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
        >
          {#if passwordHidden === "password"}
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          {:else}
            <path
                d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
            />
            <line x1="1" y1="1" x2="23" y2="23"/>
          {/if}
        </svg>
      </div>
      {#if login}
        <a href="forget" class="forget underline"> Mot de passe oublié ? </a>
      {/if}
    </div>
    {#if !login}
      <div class="password-container">
        <label for="confirm-password">Confirmer le mot de passe</label>
        <div class="password">
          <input
              autocomplete="current-password"
              id="confirm-password"
              on:input={(e) => {
            confirmPassword = e.target.value
          }}
              placeholder="●●●●●●●●"
              required
              type={passwordHidden}
              value={confirmPassword}
              on:input={handleConfirmPassword}
          />
          <svg
              fill="none"
              height="24"
              on:click={() =>
            passwordHidden === "password"
              ? (passwordHidden = "text")
              : (passwordHidden = "password")}
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
          >
            {#if passwordHidden === "password"}
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            {:else}
              <path
                  d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
              />
              <line x1="1" y1="1" x2="23" y2="23"/>
            {/if}
          </svg>
        </div>
      </div>
    {/if}
    {#if error}
      <span class="error">{error}</span>
    {/if}
    <Btn disabled={disabled} type="submit" width="100%">
      {pending ? "Chargement..." : login ? "Me connecter" : "M'inscrire"}
    </Btn>
  </div>
</form>

<style lang="scss">
  .error {
    color: var(--error);
  }

  .names-container {
    display: flex;
    gap: 1rem;
    width: 100%;

    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  form {
    display: flex;
    overflow: hidden;
    align-items: center;
    flex-direction: column;
    width: 100%;
    border-radius: 0.5rem;
    background: var(--white);
  }

  h3 {
    width: 100%;
    padding: 0.5rem 0;
    text-align: center;
    color: var(--white);
    background-color: var(--black);
    font-family: var(--body-font);
  }

  .input-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 3rem;
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
      right: 1.5rem;
      stroke: var(--black);
    }
  }

  .password-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }

  .email-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }

  .forget {
    align-self: flex-end;
    color: #334c84;
    // text-decoration: underline;
  }
</style>
