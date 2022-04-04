<script>
    import QuantityControl from "$lib/QuantityControl.svelte"
    import Btn from "$lib/Btn.svelte"
    import ProductCardCarrousel from "$lib/ProductCard/ProductCardCarrousel.svelte"
    import ProductCard from "$lib/ProductCard/ProductCard.svelte"
</script>

<svelte:head>
  <title>Panier - Talemelier</title>
</svelte:head>

<section class="cart">
  <h1>Récapitulatif</h1>

  <ul>
    <li>
      <img alt="du pain" src="/img/product_placeholder.webp">
      <span>Pain</span>
      <div class="price">
        <QuantityControl/>
        Prix unitaire: 1.00€
      </div>
    </li>
    <li>
      <img alt="du pain" src="/img/product_placeholder.webp">
      <span>Pain</span>
      <div class="price">
        <QuantityControl/>
        Prix unitaire: 1.00€
      </div>
    </li>
    <li>
      <img alt="du pain" src="/img/product_placeholder.webp">
      <span>Pain</span>
      <div class="price">
        <QuantityControl/>
        Prix unitaire: 1.00€
      </div>
    </li>
    <div class="bottom">
      <hr>
      <div class="total">
        Total: <b>1.00€</b>
      </div>
    </div>
  </ul>
  <Btn href="/cart/2">Valider la commande</Btn>
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
  .cart {
    width: 90%;
    margin: 6rem auto 4rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;

  }

  ul {
    padding: 2rem 1.5rem;
    border-radius: 0.25rem;
    background-color: #D4CAC4;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .price {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  img {
    width: 8rem;
    height: 4rem;
    border-radius: 0.25rem;
    object-fit: cover;
  }

  hr {
    border-color: var(--black);
    width: 100%;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .total {
    display: flex;
    justify-content: space-between;
    font-weight: 600;

    > * {
      font-weight: 600;
    }

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