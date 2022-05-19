<script>
    export let allsize = false
    export let id = undefined
    export let options = []
    export let value = undefined
    export let onChange = () => {}
</script>

<div class="select" class:allsize>
  <select {id} bind:value={value} on:change={onChange}>
    <slot/>
    {#if options.length > 0}
      {#each options as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    {/if}
  </select>
</div>

<style lang="scss">
  select {
    padding: 1rem 2rem 1rem 1rem;
    background: transparent;
    appearance: none;
    border: 1px solid var(--black);
    border-radius: 0.25rem;
    width: min-content;
    font: inherit;
  }

  .select {
    position: relative;
    display: flex;
    align-items: center;
    width: min-content;
  }

  .allsize {
    width: 100%;

    > select {
      width: 100%;
    }
  }

  .select::after {
    position: absolute;
    right: 0.5rem;
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' viewBox='5 8 15 8' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' height='8'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  select:focus-visible {
    outline: 1px solid var(--black);
  }
</style>