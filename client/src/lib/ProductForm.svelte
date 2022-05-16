<script>
    import Tiptap from "$lib/Tiptap.svelte"
    import Btn from "$lib/Btn.svelte"

    export let submit = false
    export let product = {}
    export let onSubmit = () => {}
    let imageElement = null

    function handleImageChange () {
        const file = imageElement.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            if (e.target.result.length < 1000000) {
                product.image = e.target.result
            } else {
                imageElement.value = ""
                alert("L'image est trop lourde (1Mo max)")
            }
        }
        reader.readAsDataURL(file)
    }
</script>

<form on:submit|preventDefault={onSubmit}>
  <label class="field">
    <span>Image* (1Mo max)</span>
    {#if product.image}
      <div class="img-container">
        <img src={product.image} alt=""/>
        <Btn small onClick={() => product.image = null}>Changer l'image</Btn>
      </div>
    {:else}
      <input accept="image/*" bind:this={imageElement} on:change={handleImageChange} required type="file"/>
    {/if}
  </label>
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
    <input bind:value={product.ref} on:input={()=>product.ref = product.ref.toUpperCase()} required/>
  </label>
  <Btn small type="submit">{submit ? "Chargement" : "Valider un produit"}</Btn>
</form>


<style lang="scss">
  .img-container {
    display: flex;
  }

  img {
    width: 12rem;
  }

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