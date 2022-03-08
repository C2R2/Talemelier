<script>
    export let href
    export let onClick
    export let width
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
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    background-color: var(--primary-color);
    min-width: min-content;
    white-space: nowrap;
  }

</style>