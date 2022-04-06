<script>
    import Btn from "$lib/Btn.svelte"

    let productQuantity = 1

    function addProduct () {
        if (productQuantity < 99) {
            productQuantity++
        }
    }

    function removeProduct () {
        if (productQuantity > 1) {
            productQuantity--
        }
    }
</script>

<div class="quantity-control">
  <Btn onClick={() => removeProduct()} outline>-</Btn>
  <input bind:value={productQuantity} max="99" maxlength="2" min="1"
         on:keypress={(e)=> {
            e.key === '-' ? e.preventDefault() : null
            productQuantity.toString().length >= 2 ? e.preventDefault(): null
         }}
         required
         type="number"/>
  <Btn onClick={() => addProduct()} outline>+</Btn>
</div>

<style lang="scss">
  .quantity-control {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    input {
      padding: 0.5rem 1rem 0.5rem 0.25rem;
      border: none;
      background-color: var(--background-color);
      text-align: right;

      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

</style>