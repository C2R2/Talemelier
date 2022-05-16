<script>
    import Tiptap from "$lib/Tiptap.svelte"
    import Btn from "$lib/Btn.svelte"

    let submit = false
    export let product = {}
    export let onSubmit = () => {}
</script>

<form on:submit|preventDefault={onSubmit}>
  <label class="field">
    <span>Titre*</span>
    <input bind:value={product.title} required/>
  </label>
  <div class="field">
    <span>Description*</span>
    <Tiptap bind:value={product.description}/>
  </div>
  <label class="field">
    <span>Prix*</span>
    <input bind:value={product.price} required step="0.1" type="number"/>
  </label>
  <label class="field">
    <span>Référence*</span>
    <input bind:value={product.ref} required/>
  </label>
  <Btn small type="submit">{submit ? "Chargement" : "Valider un produit"}</Btn>
</form>


<style lang="scss">
  .products-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: start;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    span {
      font-weight: 600;
    }
  }
</style>