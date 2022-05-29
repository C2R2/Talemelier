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
    <input bind:value={market.place} placeholder="Parvis de la cathédrale, 32000 Auch" required type="text"/>
  </label>
  <div class="field">
    <span>Jours du marché*</span>
    <MultiSelect bind:value={market.days} required>
      <option value="Lundi">Lundi</option>
      <option value="Mardi">Mardi</option>
      <option value="Mercredi">Mercredi</option>
      <option value="Jeudi">Jeudi</option>
      <option value="Vendredi">Vendredi</option>
      <option value="Samedi">Samedi</option>
      <option value="Dimanche">Dimanche</option>
    </MultiSelect>
  </div>
  <label class="field">
    <span>Heures du marché*</span>
    <MultiSelect bind:value={market.hours} required>
      <option value="0h">0h</option>
      <option value="1h">1h</option>
      <option value="2h">2h</option>
      <option value="3h">3h</option>
      <option value="4h">4h</option>
      <option value="5h">5h</option>
      <option value="6h">6h</option>
      <option value="7h">7h</option>
      <option value="8h">8h</option>
      <option value="9h">9h</option>
      <option value="10h">10h</option>
      <option value="11h">11h</option>
      <option value="12h">12h</option>
      <option value="13h">13h</option>
      <option value="14h">14h</option>
      <option value="15h">15h</option>
      <option value="16h">16h</option>
      <option value="17h">17h</option>
      <option value="18h">18h</option>
      <option value="19h">19h</option>
      <option value="20h">20h</option>
      <option value="21h">21h</option>
      <option value="22h">22h</option>
      <option value="23h">23h</option>
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