<script>
    import ProductCard from "$lib/ProductCard/ProductCard.svelte"
    import ProductCardCarrousel from "$lib/ProductCard/ProductCardCarrousel.svelte"
    import Select from "$lib/Select.svelte"
</script>

<svelte:head>
  <title>Produits - L'Atelier du Talemelier</title>
</svelte:head>

<section class="head">
  <h1>Les produits</h1>

  <p class="instruction">
    Passez votre commande puis venez récupérer vos produits sur les différents marchés.
  </p>
</section>
<!-- -->
<section class="best-seller">
  <h2>Meilleures ventes</h2>
  <ProductCardCarrousel>
    <ProductCard/>
    <ProductCard/>
    <ProductCard/>
  </ProductCardCarrousel>
</section>
<!-- -->
<section class="all-products">
  <h2>Tous nos produits</h2>
  <Select>
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
  </Select>

  <div class="products">
    <ProductCard/>
    <ProductCard/>
    <ProductCard/>
  </div>

  <div class="pagination">
    <span class="left">←</span>
    <span class="current">1</span>
    <span>2</span>
    <span>3</span>
    <span class="right">→</span>
  </div>
</section>

<style lang="scss">
  .head {
    width: 90%;
    margin: 6rem auto 2rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .instruction {
    font-weight: 600;
    padding: 1.5rem;
    background-color: #D4CAC4;
  }

  .best-seller {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      width: 90%;
      margin: 0 auto;
    }
  }

  .all-products {
    margin: 2rem auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .products {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > * {
      cursor: pointer;
      border-radius: 0.25rem;
      border: 1px solid var(--black);
      height: 3rem;
      width: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .left, .right {
      height: 2rem;
    }

    .current {
      font-weight: 600;
      border-width: 2px;

    }
  }
</style>