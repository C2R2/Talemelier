<script>
    import Btn from "$lib/Btn.svelte"
    import Cookies from "js-cookie"

    export let login = false
    let email
    let password
    let error

    async function handleLogin () {
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
                    Cookies.set("token", res.headers.get("Authorization"), { secure: true })
                    window.location = "/"
                } else if (res.status === 404) {
                    console.error(await res.json())
                    error = "L'utilisateur n'existe pas"
                } else if (res.status === 400) {
                    console.error(await res.json())
                    error = "Mot de passe incorrect"
                } else {
                    console.error(await res.json())
                    error = "Erreur inconnue. Veuillez réessayer"
                }
            }
        ).catch(err => {
            error = err
            console.error(err)
        })
    }

    async function handleRegister () {
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
        }).catch(err => {
            error = err
            console.log(err)
        })
    }


</script>

<form method="post" on:submit|preventDefault={login ? handleLogin : handleRegister}>
  <h2>{login ? "Se connecter à son" : "Créer un"} compte</h2>
  <div class="input-container">
    <input bind:value={email} placeholder="Mail" required type="text">
    <input bind:value={password} placeholder="Mot de passe" required type="password">
    {#if error}
      <span>{error}</span>
    {/if}
    <Btn width="50%">{login ? "Me connecter" : "M'inscrire" }</Btn>
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

  h2 {
    width: 100%;
    padding: 0.5rem 0;
    text-align: center;
    color: white;
    background-color: var(--black);
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

  .forget {
    align-self: flex-end;
    margin: 0 1rem 0.5rem 0;
  }

</style>