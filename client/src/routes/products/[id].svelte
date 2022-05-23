<script>
    import { page } from "$app/stores"
    import Cookies from "js-cookie"
    import Btn from "$lib/Btn.svelte"
    import ProductCardCarrousel from "$lib/ProductCard/ProductCardCarrousel.svelte"
    import ProductCard from "$lib/ProductCard/ProductCard.svelte"
    import QuantityControl from "$lib/QuantityControl.svelte"
    import { onMount } from "svelte"

    const productId = $page.params.id

    let products
    let product
    let quantity = 1

    fetch("https://talemelier.herokuapp.com/products/" + productId).then(res => res.json()).then(res => product = res)
    fetch("https://talemelier.herokuapp.com/products").then(res => res.json()).then(res => products = res)

    onMount(() => {
        console.log(localStorage.getItem("cart"))
    })

    function handleSubmit () {
        if (Cookies.get("token")) {
            //send product to local storage
            let cart = JSON.parse(localStorage.getItem("cart")) || []
            let productExists = cart.find(p => p._id === product._id)
            if (productExists) {
                productExists.quantity += quantity
            } else {
                cart.push({
                    _id: product._id,
                    name: product.title,
                    price: product.price,
                    quantity: quantity
                })
            }
            localStorage.setItem("cart", JSON.stringify(cart))
            window.location = "/cart"
        } else {
            window.location = "/login"
        }
    }
</script>

<svelte:head>
  <title>{product ? product.title : "Chargement..."}</title>
</svelte:head>

<section class="product">
  {#if product}
    <h1>{product.title}</h1>
    <img alt="du pain" src={product.image}/>
    <div class="infos">
      <span class="title">{product.title}</span>
      <span class="price">Prix : <b>{product.price} €</b></span>
      <div class="quantity">
        Quantité :
        <QuantityControl bind:productQuantity={quantity}/>
      </div>
      {@html product.description}
    </div>
    <Btn onClick={handleSubmit}>Ajouter au panier</Btn>
  {:else}
    <p>Chargement...</p>
  {/if}
</section>

<section class="other">
  <h2>Autres produits</h2>
  <ProductCardCarrousel>
    {#if products}
      {#each products as product}
        <ProductCard {product}/>
      {/each}
    {:else}
      <div class="loader"></div>
    {/if}
  </ProductCardCarrousel>
</section>


<style lang="scss">
  b {
    font-weight: 600;
  }

  .product {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 6rem auto;
    gap: 2rem;
  }

  img {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 16rem;
    border-radius: 0.25rem;
    object-fit: cover;
    gap: 1rem;
  }

  .infos {
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    border-radius: 0.25rem;
    background-color: #D4CAC4;
    gap: 1rem;
  }

  .quantity {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .other {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      width: 90%;
      margin: 0 auto;
    }
  }
</style>