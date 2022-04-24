<script>
    export let href = undefined
    export let onClick = () => {}
    export let width = undefined
    export let fontSize = undefined
    export let outline = undefined
</script>

{#if href}
  <a style:font-size={fontSize}
     style:width={width}
     href={href}
     class={$$props.class}
     class:outline
  >
    <slot/>
  </a>
{:else}
  <button style:font-size={fontSize}
          style:width={width}
          on:click={onClick}
          class={$$props.class}
          class:outline
  >
    <slot/>
  </button>
{/if}

<style>
  * {
    font-weight: 600;
    display: inline-block;
    min-width: min-content;
    padding: 1rem;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25rem;
    background-color: var(--primary-color);
    height: min-content;
    transition: all 0.2s ease-in-out;
  }
  *:hover{
    filter: brightness(1.05);
    transform: scale(1.05);
  }
  *:active{
    transform: scale(0.95);
  }

  .outline {
    padding: 0.5rem 1rem;
    border: 1px solid var(--second-black);
    background-color: var(--background-color);
  }
</style>