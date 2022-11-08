<script>
	import slugify from "$functions/slugify.js"
	import formatter from "$functions/formatter.js"

	export let product
	export let skeleton = false
	let productDescriptionElement

	// onMount(() => {
	// 	clamp(productDescriptionElement, { clamp: 2 })
	// })


</script>

{#if !skeleton}
  <a href={`/products/${slugify(product.title)}`}>
    <figure class="product-card">
      <figcaption>
        <span class="title">{product.title}</span>
        <!--      <p bind:this={productDescriptionElement}>{@html product.description.replace("<p>", "").replace("</p>", "")}</p>-->
        <span class="price">{formatter(product.price)}</span>
        <!--      <div class="cta">-->
        <!--        <Btn width="100%">Voir le produit</Btn>-->
        <!--      </div>-->
      </figcaption>
      <img alt={product.title} height="16rem" src={product.image}/>
    </figure>
  </a>
{:else}
  <a href="" class="skeleton">
    <figure class="product-card">
      <figcaption>
        <span class="title"></span>
        <span class="price"></span>
      </figcaption>
      <div class="img"></div>
  </a>
{/if}

<style lang="scss">


  a {
    width: 100%;
  }

  figure {
    overflow: hidden;
    border-radius: 0.25rem;
    background-color: #D4CAC4;
    flex-shrink: 0;
    width: 100%;
    min-width: 16rem;
    transition: transform 0.2s ease-in-out;
    padding: 1rem;
    min-height: 21.5rem;

    &:hover {
      transform: scale(0.99);
    }
  }

  figcaption {
    display: grid;
    border-radius: 0.25rem;
    grid-template-areas: "title cta" "description cta" "price cta";
    //gap: 0.5rem;
    //padding: 1rem;
    margin-bottom: 1rem;
  }

  .title {
    grid-area: title;
    //font-size: 1.25rem;
    font-weight: 600;
    white-space: nowrap;
  }

  p {
    grid-area: description;
    //overflow: hidden;
    //text-overflow: ellipsis;
    //display: -webkit-box;
    //-webkit-line-clamp: 2;
    //-webkit-box-orient: vertical;
  }

  .price {
    grid-area: price;
  }

  img {
    width: 100%;
    min-height: 16rem;
    object-fit: cover;
    border-radius: 0.25rem;
  }

  .cta {
    grid-area: cta;
    margin: auto 0;
  }

  .skeleton {

    .title {
      width: 100%;
      height: 1.25rem;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 0.25rem;
      animation: skeleton 1s infinite;
    }

    .price {
      margin-top: 0.5rem;
      width: 100%;
      height: 1rem;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 0.25rem;
      animation: skeleton 1s infinite;
    }
  }

  .img {
    width: 100%;
    min-height: 16rem;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0.25rem;
    animation: skeleton 1s infinite;
  }

  @keyframes skeleton {
    0% {
      background-color: rgba(255, 255, 255, 0.5);
    }
    50% {
      background-color: rgba(255, 255, 255, 0.4);
    }
    100% {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }

</style>