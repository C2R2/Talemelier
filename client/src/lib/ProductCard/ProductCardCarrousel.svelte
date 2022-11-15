<script>
	import Btn from "$lib/Btn.svelte"

	let productCardCarrousel = null

	function handleLeftClick () {
		productCardCarrousel.scrollLeft -= productCardCarrousel.clientWidth
	}

	function handleRightClick () {
		productCardCarrousel.scrollLeft += productCardCarrousel.clientWidth
	}
</script>

<div class="cta-container">
  <Btn color="var(--black)" onClick={handleLeftClick} outline padding="1rem 1.4rem">
    <svg fill="currentColor" height="13" viewBox="0 0 8 15" width="7" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.8 2v12a1 1 0 0 1-1.8.8L.8 9.5c-.8-.8-.8-2.2 0-3l2-2L6 1.3a1 1 0 0 1 1.8.8Z"/>
    </svg>
  </Btn>
  <Btn color="var(--black)" onClick={handleRightClick} outline padding="1rem 1.4rem">
    <svg fill="currentColor" height="13" viewBox="0 0 8 13" width="7" xmlns="http://www.w3.org/2000/svg">
      <path d="M.2 13V1a1 1 0 0 1 1.8-.8L7.2 5.5c.8.8.8 2.2 0 3l-2 2L2 13.7a1 1 0 0 1-1.8-.8Z"/>
    </svg>
  </Btn>
</div>
<div bind:this={productCardCarrousel} class="productCardCarrousel">
  <slot/>
</div>

<style>
  .productCardCarrousel {
    display: flex;
    overflow-x: auto;
    width: 90vw;
    margin: 0 auto;
    border-radius: 0.25rem;
    gap: 1rem;
    scroll-behavior: smooth;
  }

  .cta-container {
    position: absolute;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  @media (max-width: 500px) {
    .cta-container {
      bottom: 0;
      left: 1rem;
    }
  }
</style>