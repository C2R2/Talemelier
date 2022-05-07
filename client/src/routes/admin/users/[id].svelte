<script>
    import { page } from "$app/stores"
    import Cookies from "js-cookie"

    const userID = $page.params.id

    const userPromise = fetch("https://talemelier.herokuapp.com/users/" + userID, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("token")
        }
    }).then(response => response.json())
</script>


<p>User: {userID}</p>

{#await userPromise }
  <p>Chargement...</p>
{:then user}
  <p>{user.email}</p>
{:catch error}
  <p>{error}</p>
{/await}