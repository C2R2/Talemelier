<script>
    import { page } from "$app/stores"
    import Cookies from "js-cookie"
    import ProductForm from "$lib/ProductForm.svelte"

    const productID = $page.params.id
    let product
    let submit = false

    fetch("https://talemelier.herokuapp.com/products/" + productID, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("token")
        }
    }).then(response => response.json()).then(data => product = data)

    function handleSubmit () {
        submit = true
        fetch("https://talemelier.herokuapp.com/products/" + productID, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get("token")
            },
            body: JSON.stringify(product)
        }).then(() => window.location = "/admin/products").catch(error => {
            console.error(error)
            submit = false
        })
    }

</script>

<div class="products-container">
  <p>Product: {productID}</p>

  {#if product}
    <ProductForm product={product} onSubmit={handleSubmit}/>
  {:else}
    <p>Chargement...</p>
  {/if}
</div>

<style lang="scss">
  .products-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: start;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    span {
      font-weight: 600;
    }
  }
</style>