<script>
    export let href = undefined
    export let onClick = () => {}
    export let width = undefined
    export let fontSize = undefined
</script>

{#if href}
  <a style:font-size={fontSize}
     style:width={width}
     href={href}
     class={$$props.class}>
    <slot/>
  </a>
{:else}
  <button style:font-size={fontSize}
          style:width={width}
          on:click={onClick}
          class={$$props.class}>
    <slot/>
  </button>
{/if}

<style>
  * {
    display: inline-block;
    min-width: min-content;

    padding: 0.5rem 1rem;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25rem;
    background-color: var(--primary-color);
  }

</style>