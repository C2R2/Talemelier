<svelte:head>
  <title>Talemelier - Connexion</title>
</svelte:head>

<script>
    import Cookies from "js-cookie"
    import Btn from "$lib/Btn.svelte"

    let username
    let password

    async function handleLogin () {
        await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                username, password
            })
        }).then(res => res.json()).then(
            data => {
                console.log(data)
                Cookies.set("token", data.token, { secure: true })
                window.location = "/"
            }
        ).catch(err =>
            //TODO : handle error
            console.error(err))
    }
</script>

<Btn href="/">Back</Btn>
<h1>Connexion</h1>
<form method="post" on:submit|preventDefault={handleLogin}>
  <h2>Se connecter à son compte</h2>
  <div class="input-container">
    <input bind:value={username} placeholder="Mail" required type="email">
    <input bind:value={password} placeholder="Mot de passe" required type="password">
    <Btn width="50%" type="submit">Me connecter</Btn>
  </div>
</form>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ;
    border-radius: 0.5rem;
    overflow: hidden;
    width: 50%;
  }

  h2 {
    background-color: var(--black);
    color: white;
    width: 100%;
    padding: 0.5rem 0;
    text-align: center;
  }


  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 80%;
    padding: 2rem 0;
  }

  input {
    width: 100%;
  }

</style>