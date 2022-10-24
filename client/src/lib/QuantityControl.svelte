<script>
    import Btn from "$lib/Btn.svelte"

    export let productQuantity

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
  <Btn borderRadius="0.25rem" padding="0.25rem 0.75rem" color="var(--black)" small onClick={() => removeProduct()} outline>-</Btn>
  <input bind:value={productQuantity} max="99" maxlength="2" min="1"
         on:keypress={(e)=> {
            e.key === '-' ? e.preventDefault() : null
            productQuantity.toString().length >= 2 ? e.preventDefault(): null
         }}
         required
         type="number"/>
  <Btn borderRadius="0.25rem" padding="0.25rem 0.75rem" color="var(--black)" small onClick={() => addProduct()} outline>+</Btn>
</div>

<style lang="scss">
  .quantity-control {
    display: flex;
    align-items: center;

    input {
      padding: 0.5rem 0.75rem 0.5rem 0;
      border: none;
      background-color: transparent;
      text-align: right;
      outline: none;

      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

</style>