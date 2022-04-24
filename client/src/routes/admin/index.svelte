<script>
    import Cookies from "js-cookie"

    let users
    let status

    async function getUsers () {
        const response = await fetch("https://talemelier.herokuapp.com/users",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + Cookies.get("token")
                }
            }
        )
        users = await response.json()
        status = response.status
    }

    getUsers()


</script>

{#if status === 200}
  <h1> Vous êtes autorisé</h1>
  {#each users as user}
    <p>{user.email}</p>
  {/each}
{:else }
  <h1> Vous n'etes pas autorisé</h1>
{/if}
