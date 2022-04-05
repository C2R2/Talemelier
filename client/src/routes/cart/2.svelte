<script>
    import ProductCard from "$lib/ProductCard/ProductCard.svelte"
    import ProductCardCarrousel from "$lib/ProductCard/ProductCardCarrousel.svelte"
    import Select from "$lib/Select.svelte"
    import Btn from "$lib/Btn.svelte"
</script>

<svelte:head>
    <title>Informations complémentaires - Talemelier</title>
</svelte:head>

<section class="collect">
  <h1>Collecte</h1>
  <div class="input-container">
    <label for="place">Lieu de retrait :</label>
    <Select allsize id="place">
      <option>Auch</option>
      <option>Villeneuve sur Lot</option>
      <option>Agen</option>
    </Select>
    <label for="when">Jour et heure :</label>
    <div>
      <Select allsize id="when">
        <option>Lundi</option>
        <option>Mardi</option>
        <option>Mercredi</option>
        <option>Jeudi</option>
        <option>Vendredi</option>
        <option>Samedi</option>
        <option>Dimanche</option>
      </Select>
      <Select allsize>
        <option>8h</option>
        <option>9h</option>
        <option>10h</option>
        <option>11h</option>
        <option>12h</option>
        <option>13h</option>
      </Select>
    </div>
  </div>
  <Btn href="/cart/3">Continuer</Btn>
</section>

<section class="other">
  <h2>Autres produits</h2>
  <ProductCardCarrousel>
    <ProductCard/>
    <ProductCard/>
    <ProductCard/>
  </ProductCardCarrousel>
</section>

<style lang="scss">

  .collect {
    margin: 6rem auto 4rem auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    background-color: #D4CAC4;
    gap: 1rem;
    padding: 2rem 1.5rem;
    border-radius: 0.25rem;

    div {
      display: flex;
      gap: 1rem;
    }

  }

  label {
    font-weight: 600;
  }

  .other {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      width: 90%;
      margin: 0 auto;
    }

  }
</style>