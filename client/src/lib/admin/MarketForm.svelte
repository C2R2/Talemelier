<script>
    import Btn from "$lib/Btn.svelte"
    import MultiSelect from "$lib/MultiSelect.svelte"

    export let submit = false
    export let market = {}
    export let onSubmit = () => {}

</script>

<form on:submit|preventDefault={onSubmit}>
  <label class="field">
    <span>Lieu du marché*</span>
    <input bind:value={market.place} required type="text" placeholder="Parvis de la cathédrale, 32000 Auch"/>
  </label>
  <div class="field">
    <span>Jours du marché*</span>
    <MultiSelect bind:value={market.days} required>
      <option value="monday">Lundi</option>
      <option value="tuesday">Mardi</option>
      <option value="wednesday">Mercredi</option>
      <option value="thursday">Jeudi</option>
      <option value="friday">Vendredi</option>
      <option value="saturday">Samedi</option>
      <option value="sunday">Dimanche</option>
    </MultiSelect>
  </div>
  <label class="field">
    <span>Heures du marché*</span>
    <MultiSelect bind:value={market.hours}>
      <option value="0">0h</option>
      <option value="1">1h</option>
      <option value="2">2h</option>
      <option value="3">3h</option>
      <option value="4">4h</option>
      <option value="5">5h</option>
      <option value="6">6h</option>
      <option value="7">7h</option>
      <option value="8" selected>8h</option>
      <option value="9">9h</option>
      <option value="10">10h</option>
      <option value="11">11h</option>
      <option value="12">12h</option>
      <option value="13">13h</option>
      <option value="14">14h</option>
      <option value="15">15h</option>
      <option value="16">16h</option>
      <option value="17">17h</option>
      <option value="18">18h</option>
      <option value="19">19h</option>
      <option value="20">20h</option>
      <option value="21">21h</option>
      <option value="22">22h</option>
      <option value="23">23h</option>
    </MultiSelect>
  </label>
  <Btn small type="submit">{submit ? "Chargement" : "Valider le marché"}</Btn>
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
    margin-top: 1rem;
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