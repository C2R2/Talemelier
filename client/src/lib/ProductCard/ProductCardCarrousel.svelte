<div class="productCardCarrousel">
  <slot/>
</div>

<style>
  .productCardCarrousel {
    display: flex;
    overflow-x: auto;
    padding: 0 5%;
    gap: 1rem;
    border-radius: 0.25rem;
  }
</style>