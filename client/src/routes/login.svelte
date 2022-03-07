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

<form method="post" on:submit|preventDefault={handleLogin}>
  <h2>Login</h2>
  <input bind:value={username} placeholder="Mail" required type="email">
  <input bind:value={password} placeholder="Mot de passe" required type="password">
  <Btn type="submit">Me connecter</Btn>
</form>

<style lang="scss">


</style>