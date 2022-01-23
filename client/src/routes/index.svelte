<script>
  import { onMount } from "svelte"

  let title

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
<form method="post" on:submit|preventDefault={
  () => {
    console.log(title)

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3001", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
    title: title
}))
  }
}>
    <input bind:value={title} name="title" placeholder="title" type="text"/>
    <button type="submit">Send</button>
</form>
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
