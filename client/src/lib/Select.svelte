<script>
	import { onMount } from "svelte"

	export let allsize = false
	export let id = ""
	export let options = []
	export let value = ""
	export let onChange = () => {}
	export let small = false

	let selectEl

	onMount(() => {
		selectEl.firstChild.selected = true
	})
</script>

<div class="select" class:allsize class:small>
  <select bind:this={selectEl} bind:value={value} {id} on:change={onChange}>
    <slot/>
    {#if options.length > 0}
      {#each options as option}
        {console.log()}
        <option value={option.value} selected={value === option.value}>{option.label}</option>
      {/each}
    {/if}
  </select>
</div>

<style lang="scss">
  select {
    padding: 1rem 2.5rem 1rem 2rem;
    background: transparent;
    appearance: none;
    border: 1px solid var(--black);
    border-radius: 2rem;
    width: min-content;
    font: inherit;
  }

  .small {
    select {
      padding: 0.5rem 2rem 0.5rem 1rem;
    }
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
    right: 1rem;
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 15 8'%3E%3Cpath d='M13.4.2H1.6A1 1 0 0 0 .8 2L6 7.2c.8.8 2.2.8 3 0l2-2L14.2 2a1 1 0 0 0-.8-1.8Z'/%3E%3C/svg%3E");
    width: 1rem;
    pointer-events: none;
  }

  select:focus-visible {
    outline: 1px solid var(--black);
  }
</style>