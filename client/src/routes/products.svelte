<script>
    import ProductCard from "$lib/ProductCard/ProductCard.svelte"
    import ProductCardCarrousel from "$lib/ProductCard/ProductCardCarrousel.svelte"
</script>

<svelte:head>
  <title>Produits - L'Atelier du Talemelier</title>
</svelte:head>

<h1>Les produits</h1>

<p class="instruction">
  Passez votre commande puis venez récupérer vos produits sur les différents marchés.
</p>
<!-- -->
<div class="best-seller">
  <h2>Meilleures ventes</h2>
  <ProductCardCarrousel>
    <ProductCard/>
    <ProductCard/>
    <ProductCard/>
  </ProductCardCarrousel>
</div>
<!-- -->
<div class="all-products">
  <h2>Tous nos produits</h2>
  <select>
    <option>Trier</option>
    <option>
      A-Z
    </option>
    <option>
      Z-A
    </option>
    <option>
      Prix croissant
    </option>
    <option>
      Prix décroissant
    </option>
  </select>

  <div class="products">
    <ProductCard/>
    <ProductCard/>
    <ProductCard/>
  </div>

  <div class="pagination"></div>
</div>

<style lang="scss">
  h1 {
    width: 90%;
    margin: 0 auto;
  }

  .instruction {
    font-weight: 600;
    width: 90%;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #D4CAC4;
  }

  .best-seller {
    h2 {
      width: 90%;
      margin: 0 auto 1rem auto;
    }
  }

  .all-products {
    margin: 2rem auto;
    width: 90%;

    select {
      margin: 1rem 0;
    }

    .products {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

</style>