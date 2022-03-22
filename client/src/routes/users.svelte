<svelte:head>
  <title>L'Atelier du Talemelier</title>
</svelte:head>

<script>
    import getUsers from "../functions/getUsers.js"
    import Cookies from "js-cookie"
    import Btn from "$lib/Btn.svelte"

    let username
    let password

    /*  const animation = () => {
          return {
              duration: 1000,
              css: (t) => `
              transform: translateY(${t * -100 + 100}px);
           `
          }
      }*/
</script>

{#if Cookies.get('token')}
  <Btn onClick={() => {
    Cookies.remove('token')
    window.location.reload()
  }}>Logout
  </Btn>
{:else}
  <Btn href="/login">Login</Btn>
  <Btn href="/register">Register</Btn>
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
