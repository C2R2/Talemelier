<script>
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
                document.cookie = `token=${data.token};secure`
            }
        ).catch(err => console.error(err))
    }
</script>

<a href="/">Back</a>

<form method="post" on:submit|preventDefault={handleLogin}>
  <h2>Login</h2>
  <input bind:value={username} placeholder="Username" type="text">
  <input bind:value={password} placeholder="Password" type="password">
  <button type="submit">Login</button>
</form>

<style>
</style>