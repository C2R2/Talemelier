<script>
    import getUsers from "../functions/getUsers.js"
    import Cookies from "js-cookie"

    let username
    let password

</script>

<h1>This app is a bit more secure be careful</h1>
{#if Cookies.get('token')}
  <p>You are logged in</p>
{:else}
  <a href="/login">Login</a>
  <a href="/register">Register</a>
{/if}

<h2>Users :</h2>
{#await getUsers()}
  <p>Loading...</p>
{:then users}
  {#if users.length}
    <ul>
      {#each users as user}
        <li>
          <h3>{user.username}</h3>
          <p>{user.password}</p>
        </li>
        <hr>
      {/each}
    </ul>
  {:else}
    <p>No users found</p>
  {/if}
{:catch error}
  <p>{error}</p>
{/await}
