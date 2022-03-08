<script>
    import Btn from "$lib/Btn.svelte"
    import Cookies from "js-cookie"

    export let login = false
    let mail
    let password
    let error

    async function handleLogin () {
        await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                username: mail, password
            })
        }).then(res => res.json()).then(
            data => {
                if (data.token) {
                    console.log(data)
                    Cookies.set("token", data.token, { secure: true })
                    window.location = "/"
                } else {
                    console.error(data)
                    error = data.msg
                    setTimeout(()=>{
                        if (data.msg.includes("inscription")) {
                            window.location = "/register"
                        }
                    }, 2000)
                }
            }
        ).catch(err => {
            error = err
            console.error(err)
        })
    }

    async function handleRegister () {
        await fetch("http://localhost:3001/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: mail, password
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            if (data) {
                handleLogin()
                // window.location = "/"
            } else {
                console.error(data.msg)
                error = data.msg
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
    <input bind:value={mail} placeholder="Mail" required type="text">
    <input bind:value={password} placeholder="Mot de passe" required type="password">
    {#if error}
      <span>{error}</span>
    {/if}
    <Btn width="50%">{login ? "Me connecter" : "M'inscrire" }</Btn>
  </div>
</form>

<style>
  form {
    display: flex;
    overflow: hidden;
    align-items: center;
    flex-direction: column;
    width: 50%;
    margin: auto;
    border: 1px solid;
    border-radius: 0.5rem;
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

</style>