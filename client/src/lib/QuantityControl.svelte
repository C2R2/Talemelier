<script>
    import Btn from "$lib/Btn.svelte"

    let productQuantity = 1

    function addProduct () {
        productQuantity++
    }

    function removeProduct () {
        if (productQuantity > 1) {
            productQuantity--
        }
    }
</script>

<div class="quantity-control">
  <Btn onClick={() => removeProduct()} outline>-</Btn>
  <input bind:value={productQuantity} min="1" required type="number"/>
  <Btn onClick={() => addProduct()} outline>+</Btn>
</div>

<style lang="scss">
  .quantity-control {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    input {
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      border: none;
      background-color: var(--background-color);
      width: 1em;

      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

</style>