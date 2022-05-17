<script>
    import Btn from "$lib/Btn.svelte"

    import ProductCard from "$lib/ProductCard/ProductCard.svelte"
    import ProductCardCarrousel from "$lib/ProductCard/ProductCardCarrousel.svelte"
    import { onMount } from "svelte"

    let infosWidth
    let infosEl
    let infosChildren = []
    let dotsContainer
    let products

    onMount(
        () => {
            if (infosWidth < 692) {
                infosChildren = [...infosEl.children]
                infosChildren.pop()
                let dot = document.createElement("div")
                dot.classList.add("dot")
            }
        }
    )

    function infosScroll () {
        if (infosWidth < 692) {
            console.log(Math.round(infosEl.scrollLeft / infosEl.children[0].offsetWidth))

            if (Math.round(infosEl.scrollLeft / infosEl.children[0].offsetWidth) === 0) {
                dotsContainer.children[0].style.backgroundColor = "var(--primary-color)"
                dotsContainer.children[1].style.backgroundColor = null
            } else {
                dotsContainer.children[0].style.backgroundColor = null
                dotsContainer.children[1].style.backgroundColor = "var(--primary-color)"

            }
        }
    }

    fetch("https://talemelier.herokuapp.com/products").then(res => res.json()).then(res => {products = res})
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
  <div bind:offsetWidth={infosWidth} bind:this={infosEl} class="scroll-container" on:scroll={infosScroll}>
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
  </div>
  <div bind:this={dotsContainer} class="dots-container">
    {#each infosChildren as i}
      <div class="dot active"></div>
    {/each}
  </div>
</section>
<!-- -->
<section class="products">
  <h2>Nos produits</h2>
  <ProductCardCarrousel>
    {#if products}
      {#each products as product}
        <ProductCard {product}/>
      {/each}
    {:else}
      <div class="loader"></div>
    {/if}
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
    position: relative;

    .scroll-container {
      background-color: #D4CAC4;
      border: dashed 1px var(--black);
      width: 90%;
      margin: 0 auto 4rem auto;
      padding: 1rem 2rem 2rem 2rem;
      display: flex;
      gap: 2rem;
      border-radius: 0.25rem;
      max-width: 64rem;
      @media (max-width: 768px) {
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        > * {
          width: 100%;
          flex-shrink: 0;
        }
      }

      > * {
        scroll-snap-align: center;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;

        span {
          font-family: var(--title-font);
          font-size: 2rem;
          font-weight: 600;
        }
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
    max-width: 64rem;
    @media (min-width: 768px) {
      flex-direction: row;
      gap: 2rem;
      h2 {
        line-height: 1;
      }
    }
    @media (min-width: 1440px) {
      gap: 4rem;
    }

    img {
      width: 100%;
      max-width: 32rem;
      border-radius: 0.25rem;
    }
  }

  .dots-container {
    position: absolute;
    bottom: 0.5rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: var(--black);
  }

  .products {
    max-width: 64rem;
    margin: auto;

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