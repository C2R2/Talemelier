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

<h1>This app is not secure be careful</h1>
<form method="post" on:submit|preventDefault={handleLogin}>
  <h2>Login</h2>
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
  <h2>Create a post</h2>
  <input bind:value={title} name="title" placeholder="title" type="text"/>
  <button type="submit">Send</button>
</form>

<h2>Posts :</h2>
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
