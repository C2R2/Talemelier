<script context="module">
  let promise = getUsers()

  export async function getUsers () {
    return await fetch("http://localhost:3001/users")
      .then(response => response.json())

  }

</script>

<script>
  import Login from "$lib/Login.svelte"
  import Register from "$lib/Register.svelte"

  let username
  let password


</script>

<h1>This app is a bit more secure be careful</h1>

<Login/>
<Register {promise}/>

<h2>Users :</h2>
{#await getUsers() then users}
  <ul>
    {#each users as user}
      <li>
        <h3>{user.username}</h3>
        <p>{user.password}</p>
      </li>
      <hr>
    {/each}
  </ul>
{/await}
