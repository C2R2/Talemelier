<script>
    import { page } from "$app/stores"
    import Cookies from "js-cookie"
    import Btn from "$lib/Btn.svelte"
    import ProductCardCarrousel from "$lib/ProductCard/ProductCardCarrousel.svelte"
    import ProductCard from "$lib/ProductCard/ProductCard.svelte"
    import QuantityControl from "$lib/QuantityControl.svelte"

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
      Quantité :
      <QuantityControl/>
    </div>
    <span>Ingrédients :</span>
    <p class="ingredients">
      Farine, <b>oeuf</b>, beurre, <b>lait</b>, sel, levure, huile d'olive
    </p>
  </div>
  <Btn href={Cookies.get('token') ? '/cart' : "/register"}>Ajouter au panier</Btn>
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