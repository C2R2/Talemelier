<script>
  import { getUsers } from "../routes/index.svelte"

  let username
  let password
  export let promise

  async function handleRegister () {
    await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username, password
      })
    }).then(res => res.json()).then(async data => {
      console.log(data)
      promise = getUsers()
    }).catch(err => {
      console.error(err)
    })
  }
</script>

<form method="post" on:submit|preventDefault={handleRegister}>
  <h2>Create a user</h2>
  <input bind:value={username} placeholder="Username" type="text"/>
  <input bind:value={password} placeholder="Password" type="password"/>
  <button type="submit">Register</button>
</form>

<style></style>