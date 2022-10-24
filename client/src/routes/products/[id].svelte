<script>
    import { page } from "$app/stores"
    import Cookies from "js-cookie"
    import Btn from "$lib/Btn.svelte"
    import ProductCardCarrousel from "$lib/ProductCard/ProductCardCarrousel.svelte"
    import ProductCard from "$lib/ProductCard/ProductCard.svelte"
    import QuantityControl from "$lib/QuantityControl.svelte"
    import { cart, products } from "../../stores.js"
    import slugify from "$functions/slugify.js"
    import shuffle from "$functions/shuffle.js"
    import formatter from "$functions/formatter.js"

    $: productId = $page.params.id

    $: product = $products.find((p) => slugify(p.title) === productId)
    let quantity = 1

    function handleSubmit () {
        // check if product exists in cart store
        if ($cart.find((p) => p._id === product._id)) {
            // if product exists, update quantity
            cart.update((products) => {
                let newProduct = products.find((p) => p._id === product._id )
                newProduct.quantity += quantity
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
        // window.location = "/cart"
    }
</script>

<svelte:head>
  <title>{product ? product.title : "Chargement..."}</title>
</svelte:head>

<section class="product">
  {#if product}
    <h1>{product.title}</h1>
    <div class="product__content">
      <img alt="du pain" src={product.image}/>
      <div class="infos">
        <span class="title">{product.title}</span>
        <div> {@html product.description}</div>
        <div class="quantity">
          Quantité :
          <QuantityControl bind:productQuantity={quantity}/>
        </div>
        <span class="price">Prix : <b>{formatter(product.price)} </b></span>
      {#if Cookies.get("token")}
        <Btn onClick={handleSubmit}>Ajouter au panier</Btn>
      {:else}
        <Btn href="/login">Connectez-vous pour ajouter au panier</Btn>
      {/if}
      </div>
    </div>
  {:else}
    <p>Chargement...</p>
  {/if}
</section>

<section class="other">
  <h2>Autres produits</h2>
  <ProductCardCarrousel>
    {#if $products}
      {#each shuffle($products) as product}
        <ProductCard {product}/>
      {/each}
    {:else}
      <div class="loader"></div>
    {/if}
  </ProductCardCarrousel>
  <div class="cta">
    <Btn href="/products">Voir le catalogue</Btn>
  </div>
</section>


<style lang="scss">
  b {
    font-weight: 600;
  }

  h1, h2 {
    font-family: var(--body-font);
    font-weight: 400;
  }

  .product {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 2rem auto 6rem auto;
    gap: 2rem;
    max-width: var(--max-width-container);
  }

  .product__content {
    display: grid;
    grid-template-rows: 1fr min-content;
    grid-template-areas: "image infos" "image cta";
    gap: 1rem;

    @media (max-width: 768px) {
      grid-template-areas: "image" "infos" "cta";
    }
  }


  img {
    grid-area: image;
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
    object-fit: cover;
    gap: 1rem;
    max-width: 48rem;
    max-height: 32rem;

    @media (max-width: 768px) {
      max-height: 24rem;
      max-width: unset;
    }
  }

  .infos {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    border-radius: 0.25rem;
    gap: 2rem;
    align-items:start;
  }

  .title{
    font-weight: 600;
  }

  .quantity {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .other {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: var(--max-width-container);
    margin: auto;

    .cta{
      align-self: flex-end;
      margin-right: 1rem;
    }

    h2 {
      width: 90%;
      margin: 0 auto;
    }
  }
</style>