<script>
    export let href
    export let onClick
</script>

{#if href}
  <a href={href}>
    <slot/>
  </a>
{:else}
  <button on:click={onClick}>
    <slot/>
  </button>
{/if}

<style>
  * {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    background-color: var(--primary-color);
  }

</style>