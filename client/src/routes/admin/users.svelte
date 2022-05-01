<script>
    import Cookies from "js-cookie"

    // const serverURL = process.env.SERVER_URL

    const users = fetch("https://talemelier.herokuapp.com/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("token")
        }
    })

</script>

<svelte:head>
  <title>Utilisateurs - Talemelier</title>
</svelte:head>

<h1>Utilisateurs</h1>

{#await users}

{/await}