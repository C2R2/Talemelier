<script>
    import { page } from "$app/stores"
    import Btn from "$lib/Btn.svelte"
    import ProductCardCarrousel from "$lib/ProductCard/ProductCardCarrousel.svelte"
    import ProductCard from "$lib/ProductCard/ProductCard.svelte"

    const productId = $page.params.id
</script>

<svelte:head>
  <title>{productId}</title>
</svelte:head>

<section class="product">
  <h1>{productId}</h1>
  <img alt="du pain" src="/img/product_placeholder.webp"/>
  <div class="infos">
    <span class="title">{productId}</span>
    <span class="price">Prix : <b>1,10 €</b></span>
    <div class="quantity">
      Quantité : 2
      <div class="quantity-control">
        <svg fill="none" height="10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
             stroke-width="2" viewBox="5 0 15 10" width="15" xmlns="http://www.w3.org/2000/svg">
          <polyline points="6 9 12 3 18 9"/>
        </svg>
        <svg fill="none" height="8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
             stroke-width="2" viewBox="5 8 15 8" width="15" xmlns="http://www.w3.org/2000/svg">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </div>
    <span>Ingrédients :</span>
    <p class="ingredients">
      Farine, <b>oeuf</b>, beurre, <b>lait</b>, sel, levure, huile d'olive
    </p>
  </div>
  <Btn>Ajouter au panier</Btn>
</section>

<section class="other">
  <h2>Autres produits</h2>
  <ProductCardCarrousel>
    <ProductCard/>
    <ProductCard/>
    <ProductCard/>
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

  .quantity-control {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    >*{
      cursor: pointer;
    }
  }

  .ingredients {
    color: #323232;
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