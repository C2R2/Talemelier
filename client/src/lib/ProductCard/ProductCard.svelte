<script>
    import Btn from "$lib/Btn.svelte"
</script>

<a href="/products/baguette">
  <figure class="product-card">
    <img alt="du pain" src="/img/product_placeholder.webp"/>
    <figcaption>
      <span class="title">Product Name</span>
      <p>Product description</p>
      <span class="price">1,50 €</span>
      <div class="cta">
        <Btn width="100%">Voir le produit</Btn>
      </div>
    </figcaption>
  </figure>
</a>

<style lang="scss">
  a {
    min-width: 24rem;
    max-width: 30rem;
  }

  figure {
    overflow: hidden;
    border-radius: 0.25rem;
    background-color: #D4CAC4;
    flex-shrink: 0;
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
  }

  p {
    grid-area: description;
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