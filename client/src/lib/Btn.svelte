<script>
    export let href = undefined
    export let onClick = () => {}
    export let width = undefined
</script>

{#if href}
  <a style:width={width} href={href}>
    <slot/>
  </a>
{:else}
  <button style:width={width} on:click={onClick}>
    <slot/>
  </button>
{/if}

<style>
  * {
    display: inline-block;
    min-width: min-content;
    padding: 0.5rem 1rem;
    white-space: nowrap;
    border-radius: 0.25rem;
    background-color: var(--primary-color);
  }

</style>