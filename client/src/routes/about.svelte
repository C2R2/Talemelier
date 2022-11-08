<script>
	import Btn from "$lib/Btn.svelte"
	import ProductCardCarrousel from "$lib/ProductCard/ProductCardCarrousel.svelte"
	import ProductCard from "$lib/ProductCard/ProductCard.svelte"
	import { onMount } from "svelte"
	import { products } from "../stores.js"
	import shuffle from "$functions/shuffle.js"

	let infosWidth
	let infosEl
	let infosChildren = []
	let dotsContainer
	let markets = []

	fetch("https://talemelier.herokuapp.com/markets", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	}).then(res => res.json()).then(res => {
		markets = res
	})

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

	function infosScroll () {
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

<section class="display">
  <div class="title">
    <h1>À propos</h1>
    <p>
      Le Talemelier en quelques explications
    </p>
  </div>
</section>

<section class="about">
  <div class="text">
    <h2>Une entreprise artisanale</h2>
    <p>
      <b>Talemelier</b> est une entreprise <b>artisanale</b> productrice de
      produits de <b>boulangerie</b>, <b>pâtisserie</b> et
      <b>traiteur bio</b> depuis plus de <b>35 ans</b>. Nous sommes les
      <b>précurseurs du bio</b>
      dans le Gers. Tous nos pains et biscuits sont réalisés avec des produits
      issus de l'<b>agriculture biologique</b>. Également nos farines sont
      <b>bio et locales</b> et nous les <b>façonnons à la main</b>.
    </p>
  </div>
</section>

<section class="infos">
  <div
      bind:offsetWidth={infosWidth}
      bind:this={infosEl}
      class="scroll-container"
      on:scroll={infosScroll}
  >
    <div class="where">
      <span>Où ?</span>
      <p>Vous pouvez récupérer vos produits sur les différent marchés :</p>
      <ul>
        {#key markets}
          {#if markets.length > 0}
            {#each markets as market}
              <li>{market.place.split(',')[0]}, <strong>{market.place.split(',')[1]}</strong> le <strong>{market.days.map((day) => day).join(" ou ")}</strong> à
                <strong>{market.hours.map((hour) => hour).join(" ou ")}</strong></li>
            {/each}
          {:else}
            <li class="loader"></li>
          {/if}
        {/key}
      </ul>
    </div>
    <!--<div class="when">
      <span>Quand ?</span>
      <p>
        Les horaires de récupération des produits change en fonction des
        marchés.
      </p>
      <Btn href="/infos#hours" small>Voir les horaires</Btn>
    </div>-->
  </div>
  <div bind:this={dotsContainer} class="dots-container">
    {#each infosChildren as i}
      <div class="dot active"/>
    {/each}
  </div>
</section>

<section class="products">
  <h2>Autres produits</h2>
  <ProductCardCarrousel>
    {#if $products}
      {#each shuffle($products) as product}
        <ProductCard {product}/>
      {/each}
    {:else}
      <ProductCard skeleton/>
      <ProductCard skeleton/>
      <ProductCard skeleton/>
    {/if}
  </ProductCardCarrousel>
  <div class="cta">
    <Btn href="/products">Voir le catalogue</Btn>
  </div>
</section>

<style lang="scss">
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: unset;
    margin-left: 1rem;
  }

  .display {
    height: 100vh;
    background: linear-gradient(180deg, rgba(24, 20, 17, 0.45) 44.3%, rgba(221, 213, 208, 0) 79.21%),
    linear-gradient(180deg, rgba(71, 59, 51, 0) 0%, rgba(71, 59, 51, 0.55) 85.15%),
    url("/img/display.webp") no-repeat center center;
    filter: grayscale(100%);
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
          //border-bottom: 1px solid var(--black);
          //padding-bottom: 4rem;
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
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: var(--max-width-container);
    margin: auto;

    .cta {
      align-self: flex-end;
      margin-right: 1rem;
    }

    h2 {
      width: 90%;
      margin: 0 auto;
    }

    //max-width: 72rem;
    //margin: auto;
    //display: grid;
    //gap: 2rem;
    //width: 90%;
    //
    //@media (min-width: 768px) {
    //  grid-template-areas: "title carrousel" "more carrousel";
    //  grid-template-columns: min-content 1fr;
    //  border: solid 1px var(--black);
    //  padding: 2rem;
    //  border-radius: 0.25rem;
    //  :global(.productCardCarrousel) {
    //    grid-area: carrousel;
    //  }
    //}
    //
    //h2 {
    //  font-size: 4rem;
    //  text-align: center;
    //  @media (min-width: 768px) {
    //    text-align: left;
    //    display: flex;
    //    margin-top: auto;
    //  }
    //}
    //
    //.more {
    //  width: 90%;
    //  margin: auto;
    //  @media (min-width: 768px) {
    //    width: auto;
    //    margin: 0;
    //  }
    //}
  }
</style>