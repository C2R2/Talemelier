<script>
	import slugify from "$functions/slugify.js"
	import formatter from "$functions/formatter.js"
	import { onMount } from "svelte"

	export let product
	let isSafari = false

	//detect if the browser is safari

	onMount(() => {
		isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
	})

</script>

<a href={`/products/${slugify(product.title)}`}>
  <figure class="product-card">
    <img alt="du pain" src={product.image}/>
    <figcaption>
      <span class="title">{product.title}</span>
      <p class:isSafari>{@html product.description.replace("<p>", "").replace("</p>", "")}</p>
      <span class="price">{formatter(product.price)}</span>
      <!--      <div class="cta">-->
      <!--        <Btn width="100%">Voir le produit</Btn>-->
      <!--      </div>-->
    </figcaption>
  </figure>
</a>

<style lang="scss">
  figure {
    overflow: hidden;
    border-radius: 0.25rem;
    background-color: #D4CAC4;
    flex-shrink: 0;
    width: 20rem;
  }

  figcaption {
    display: grid;
    border-radius: 0.25rem;
    grid-template-areas: "title cta" "description cta" "price cta";
    gap: 0.5rem;
    padding: 1rem;
  }

  .title {
    grid-area: title;
    font-size: 1.25rem;
    font-weight: 600;
    white-space: nowrap;
  }

  p {
    grid-area: description;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .isSafari {
    -webkit-box-orient: unset;
  }


  .price {
    grid-area: price;
  }

  img {
    width: 100%;
    height: 16rem;
    object-fit: cover;
  }

  .cta {
    grid-area: cta;
    margin: auto 0;
  }

</style>