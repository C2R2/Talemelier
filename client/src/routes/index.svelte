<script>
  import { onMount } from "svelte"

  let ads
  onMount(() => {
      fetch("http://localhost:3001")
        .then(res => res.json())
        .then(data => {
          ads = data
          console.log(ads)
        })
    }
  )
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{#if ads}
    <ul>
        {#each ads as ad}
            <li>
                <h3>{ad._id}</h3>
                <p>{ad.title}</p>
            </li>
            <hr>
        {/each}
    </ul>
{/if}
