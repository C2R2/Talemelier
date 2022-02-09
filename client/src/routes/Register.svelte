<script>

  let username
  let password

  async function handleRegister () {
    await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username, password
      })
    }).then(res => res.json()).then(data => {
      console.log(data)
    }).catch(err => {
      console.error(err)
    })
  }
</script>

<a href="/">Back</a>

<form method="post" on:submit|preventDefault={handleRegister}>
  <h2>Create a user</h2>
  <input bind:value={username} placeholder="Username" type="text"/>
  <input bind:value={password} placeholder="Password" type="password"/>
  <button type="submit">Register</button>
</form>

<style></style>