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
  <Btn class="cta" href="products" width="20rem">
    Découvrir les produits
  </Btn>
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
<!-- -->
<section class="infos">
  <div class="where">
    <span>Où ?</span>
    <p>
      Nos produits sont disponibles sur une sélections de marchés du sud-ouest de la France.
    </p>
    <Btn>Voir les marchés</Btn>
  </div>
  <div class="when">
    <span>Quand ?</span>
    <p>
      Les horaires de récupération des produits change en fonction des marchés.
    </p>
    <Btn>
      Voir les horaires
    </Btn>
  </div>
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
    <Btn href="products" width="100%">
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

  .infos {
    background-color: #D4CAC4;
    border: dashed 1px var(--black);
    overflow: scroll;
    width: 90%;
    margin: 0 auto 4rem auto;
    padding: 1rem 2rem;
    display: flex;
    gap: 2rem;
    border-radius: 0.25rem;
    scroll-snap-type: x mandatory;

    > * {
      scroll-snap-align: center;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      width: 100%;
      flex-shrink: 0;

      span {
        font-family: var(--title-font);
        font-size: 2rem;
        font-weight: 600;
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