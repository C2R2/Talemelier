<script>
    import { page } from "$app/stores"
    import Cookies from "js-cookie"

    const productID = $page.params.id

    const userPromise = fetch("https://talemelier.herokuapp.com/products/" + productID, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("token")
        }
    }).then(response => response.json())
</script>


<p>User: {productID}</p>

{#await userPromise }
  <p>Chargement...</p>
{:then product}
  <p>{product.title}</p>
  <p>{product.description}</p>
  <p>{product.price}</p>
  <p>{product.ref}</p>
{:catch error}
  <p>{error}</p>
{/await}