<script>
    import { page } from "$app/stores"
    import Cookies from "js-cookie"
    import Btn from "$lib/Btn.svelte"
    import ProductCardCarrousel from "$lib/ProductCard/ProductCardCarrousel.svelte"
    import ProductCard from "$lib/ProductCard/ProductCard.svelte"
    import QuantityControl from "$lib/QuantityControl.svelte"
    import { cart, products } from "../../stores.js"
    import slugify from "$functions/slugify.js"

    $: productId = $page.params.id

    $: product = $products.find((p) => slugify(p.title) === productId)
    let quantity = 1


    function handleSubmit () {
        // check if product exists in cart store
        if ($cart.find((p) => p._id === product._id)) {
            // if product exists, update quantity
            cart.update((products) => {
                let product = products.find((p) => p._id === product._id)
                product.quantity += quantity
                return products
            })
        } else {
            // if product doesn't exist, add product to cart store
            cart.update((products) => {
                products.push({
                    _id: product._id,
                    quantity: quantity
                })
                return products
            })
        }
        window.location = "/cart"
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
    {#if Cookies.get("token")}
      <Btn onClick={handleSubmit}>Ajouter au panier</Btn>
    {:else}
      <Btn href="/login">Connectez-vous pour ajouter au panier</Btn>
    {/if}
  {:else}
    <p>Chargement...</p>
  {/if}
</section>

<section class="other">
  <h2>Autres produits</h2>
  <ProductCardCarrousel>
    {#if $products}
      {#each $products as product}
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