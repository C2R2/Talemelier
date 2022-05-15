<script>
    import { page } from "$app/stores"
    import Cookies from "js-cookie"

    const userID = $page.params.id

    const usersPromise = fetch("https://talemelier.herokuapp.com/users/" + userID, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("token")
        }
    }).then(response => response.json())
</script>


<p>User: {userID}</p>

{#await usersPromise }
  <p>Chargement...</p>
{:then user}
  <p>{user.email}</p>
  <p>{user.password}</p>
{:catch error}
  <p>{error}</p>
{/await}