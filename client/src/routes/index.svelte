<script>
    import Btn from "$lib/Btn.svelte"

    import ProductCard from "$lib/ProductCard/ProductCard.svelte"
    import ProductCardCarrousel from "$lib/ProductCard/ProductCardCarrousel.svelte"
</script>

<svelte:head>
  <title>L'atelier du Talemelier</title>
</svelte:head>

<section class="display">
  <div class="title">
    <h1>L'Atelier du Talemelier</h1>
    <h2>Artisan Boulanger</h2>
  </div>
  <Btn class="cta" fontSize="1.25rem" href="products" width="20rem">
    Découvrir les produits
  </Btn>
</section>
<!-- -->
<section class="products">
  <h2>Nos produits</h2>
  <ProductCardCarrousel>
    <ProductCard/>
    <ProductCard/>
    <ProductCard/>
  </ProductCardCarrousel>
  <div class="more">
    <Btn fontSize="1.25rem" href="products" width="100%">
      Découvrir nos produits
    </Btn>
  </div>
</section>
<!-- -->
<section class="about">
  <img alt="L'atelier du talemelier" src="/img/production.webp">
  <div class="text">
    <h2>Une entreprise artisanale</h2>
    <p>
      L’Atelier du Talemelier est une entreprise artisanale productrice de produits de boulangerie, pâtisserie et
      traiteur depuis plus de 35 ans.
    </p>
  </div>
</section>
<section class="products">
  <h2>Nos produits</h2>
  <div class="productCard-container">
    <ProductCard/>
    <ProductCard/>
    <ProductCard/>
  </div>
  <div class="more">
    <Btn fontSize="1.25rem" href="products" width="100%">
      Découvrir nos produits
    </Btn>
  </div>
</section>


<style lang="scss">
  .display {
    height: 100vh;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 10)), url("/img/display.webp") no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;

    .title {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      > * {
        color: white;
      }
    }
  }

  .about {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    width: 90%;
    margin: 4rem auto;

    img {
      width: 100%;
      border-radius: 0.25rem;
    }
  }

  .products {
    h2 {
      font-size: 4rem;
      text-align: center;
      margin-bottom: 1rem;
    }
    .more {
      width: 90%;
      margin: 2rem auto;
    }
  }
</style>