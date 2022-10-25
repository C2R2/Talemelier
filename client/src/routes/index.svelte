<script>
  import Btn from "$lib/Btn.svelte"
  import ProductCard from "$lib/ProductCard/ProductCard.svelte"
  import ProductCardCarrousel from "$lib/ProductCard/ProductCardCarrousel.svelte"
  import { onMount } from "svelte"
  import { products } from "../stores.js"
  import shuffle from "$functions/shuffle.js"

  let infosWidth
  let infosEl
  let infosChildren = []
  let dotsContainer

  onMount(() => {
    if (infosWidth < 692) {
      infosChildren = [...infosEl.children]
      infosChildren.pop()
      let dot = document.createElement("div")
      dot.classList.add("dot")
    }
    // setTimeout(() => {
    //   if (dotsContainer.children[0]) {
    //     dotsContainer.children[0].style.backgroundColor = "var(--primary-color)"
    //   }
    // }, 1)
  })

  function infosScroll() {
    if (infosWidth < 692) {
      // console.log(Math.round(infosEl.scrollLeft / infosEl.children[0].offsetWidth))

      if (
        Math.round(infosEl.scrollLeft / infosEl.children[0].offsetWidth) === 0
      ) {
        dotsContainer.children[0].style.backgroundColor = "var(--primary-color)"
        dotsContainer.children[1].style.backgroundColor = null
      } else {
        dotsContainer.children[0].style.backgroundColor = null
        dotsContainer.children[1].style.backgroundColor = "var(--primary-color)"
      }
    }
  }
</script>

<svelte:head>
  <title>Talemelier</title>
</svelte:head>

<section class="display">
  <div class="title">
    <h1>Le Talemelier</h1>
    <p>
      Passez votre commande sur le site puis venez récupérer vos produits sur
      les différents marchés.
    </p>
    <Btn href="/products">Découvrir nos produits</Btn>
  </div>
</section>

<!-- <section class="about">
  <img alt="L'atelier du talemelier" src="/img/production.webp" />
  <div class="text">
    <h2>Une entreprise artisanale</h2>
    <p>
      <b>Talemelier</b> est une entreprise <b>artisanale</b> productrice de
      produits de <b>boulangerie</b>, <b>pâtisserie</b> et
      <b>traiteur bio</b> depuis plus de <b>35 ans</b>. Nous sommes les
      <b>précurseurs du bio</b>
      dans le Gers. Tous nos pains et biscuits sont réalisés avec des produits
      issus de l'<b>agriculture biologique</b>. Également nos farines sont
      <b>bio et locales</b>
      et nous les <b>façonnons à la main</b>.
    </p>
  </div>
</section> -->
<!-- <section class="infos">
  <div
    bind:offsetWidth={infosWidth}
    bind:this={infosEl}
    class="scroll-container"
    on:scroll={infosScroll}
  >
    <div class="where">
      <span>Où ?</span>
      <p>
        Nous vendons essentiellement sur le marché de <b>Fleurance</b> dans le
        Gers, dans les <b>magasins bio du Gers</b> et des
        <b>départements limitrophes</b>, les <b>épiceries de villages</b> et les
        <b>épiceries fines</b>, les <b>écoles</b>, <b>collèges</b> et
        <b>lycées</b>
        et tous ceux qui veulent <b>promouvoir la qualité</b>.
      </p>
      <Btn small href="/infos#where">Voir les marchés</Btn>
    </div>
    <div class="when">
      <span>Quand ?</span>
      <p>
        Les horaires de récupération des produits change en fonction des
        marchés.
      </p>
      <Btn small href="/infos#hours">Voir les horaires</Btn>
    </div>
  </div>
  <div bind:this={dotsContainer} class="dots-container">
    {#each infosChildren as i}
      <div class="dot active" />
    {/each}
  </div>
</section> -->

<!-- <section class="products">
  <h2>Nos produits</h2>
  <ProductCardCarrousel>
    {#if $products.length > 0}
      {#each shuffle($products) as product}
        <ProductCard {product} />
      {/each}
    {:else}
      <div class="loader" />
    {/if}
  </ProductCardCarrousel>
  <div class="more">
    <Btn href="products" width="100%">Découvrir nos produits</Btn>
  </div>
</section> -->
<style lang="scss">
  .cta {
    display: flex;

    gap: 1rem;
  }
  b {
    font-weight: 600;
  }
  .display {
    height: 100vh;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 10)),
      url("/img/display.webp") no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;

    .title {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      > * {
        color: var(--white);
      }
      p {
        max-width: 500px;
      }
    }

    @media (max-width: 425px) {
      h1 {
        font-size: 4rem;
      }
      h2 {
        font-size: 2rem;
      }
    }
  }

  .infos {
    @media (min-width: 768px) {
      .scroll-container {
        display: flex;
        flex-direction: column;
        gap: 4rem;
        margin: 8rem auto;
        width: 90%;
        max-width: 72rem;

        > * {
          border-bottom: 1px solid var(--black);
          padding-bottom: 4rem;
          display: grid;
          grid-template-areas: "title description" "title cta";
          grid-template-columns: 33% 1fr;
          row-gap: 2rem;
        }

        span {
          font-size: 4rem;
          font-family: var(--title-font);
          grid-area: title;
          display: flex;
          margin: auto 0;
        }

        :global(a) {
          grid-area: cta;
          width: min-content;
          justify-self: end;
        }
      }
    }
    @media (max-width: 768px) {
      position: relative;

      .scroll-container {
        background-color: #d4cac4;
        border: dashed 1px var(--black);
        width: 90%;
        margin: 0 auto 8rem auto;
        padding: 1rem 2rem 2rem 2rem;
        display: flex;
        gap: 2rem;
        border-radius: 0.25rem;
        max-width: 72rem;
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
  }

  .about {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    width: 90%;
    margin: 8rem auto;
    max-width: 72rem;
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

    .text {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    p {
      line-height: 1.5;
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
    width: 2rem;
    height: 0.25rem;
    border-radius: 4px;
    background-color: var(--black);
  }

  .products {
    max-width: 72rem;
    margin: auto;
    display: grid;
    gap: 2rem;
    width: 90%;

    @media (min-width: 768px) {
      grid-template-areas: "title carrousel" "more carrousel";
      grid-template-columns: min-content 1fr;
      border: solid 1px var(--black);
      padding: 2rem;
      border-radius: 0.25rem;
      :global(.productCardCarrousel) {
        grid-area: carrousel;
      }
    }

    h2 {
      font-size: 4rem;
      text-align: center;
      @media (min-width: 768px) {
        text-align: left;
        display: flex;
        margin-top: auto;
      }
    }

    .more {
      width: 90%;
      margin: auto;
      @media (min-width: 768px) {
        width: auto;
        margin: 0;
      }
    }
  }
</style>
