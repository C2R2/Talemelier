<script>
  import { onMount } from "svelte"

  let title

  let ads

  function getPosts () {
    fetch("http://localhost:3001/posts")
      .then(res => res.json())
      .then(data => {
        ads = data
      })
  }

  onMount(() => {
      getPosts()
    }
  )
</script>

<form method="post" on:submit|preventDefault={
  async () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3001/posts", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
    title: title
    }))
    title = ""
    await getPosts()
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
