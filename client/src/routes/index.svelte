<script>
  let title
  let username
  let password

  let ads

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
    }).then(res => res.json()).then(data => {
      console.log(data.accessToken)
      let xhr = new XMLHttpRequest()
      xhr.open("GET", "http://localhost:3001/posts")
      xhr.setRequestHeader("Authorization", `Bearer ${data.accessToken}`)
      xhr.onload = () => {
        if (xhr.status === 200) {
          ads = JSON.parse(xhr.responseText)
        }
      }
      xhr.send()
    })
  }
</script>

<form method="post" on:submit|preventDefault={handleLogin}>
  <input bind:value={username} placeholder="Username" type="text">
  <input bind:value={password} placeholder="Password" type="password">
  <button type="submit">Login</button>
</form>

<form method="post" on:submit|preventDefault={
  async () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3001/posts", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
    title: title
    }))
    title = ""

  }
}>
  <input bind:value={title} name="title" placeholder="title" type="text"/>
  <button type="submit">Send</button>
</form>
{#if ads}
  <ul>
    {#each ads as ad}
      <li>
        <h3>{ad.username}</h3>
        <p>{ad.title}</p>
      </li>
      <hr>
    {/each}
  </ul>
{/if}
