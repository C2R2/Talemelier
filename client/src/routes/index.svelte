<script>
  import { onMount } from "svelte"
  import Login from "$lib/Login.svelte"
  import Register from "$lib/Register.svelte"

  let username
  let password
  let ads

  onMount(() => {
    fetch("http://localhost:3001/users")
      .then(res => res.json())
      .then(res => ads = res)
  })

</script>

<h1>This app is not secure be careful</h1>

<Login/>
<Register/>

<h2>Users :</h2>
{#if ads}
  <ul>
    {#each ads as ad}
      <li>
        <h3>{ad.username}</h3>
        <p>{ad.password}</p>
      </li>
      <hr>
    {/each}
  </ul>
{/if}
