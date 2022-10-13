<script>
  export let href = ""
  export let onClick = () => {}
  export let width = ""
  export let fontSize = ""
  export let outline = false
  export let children = ""
  export let small = false
  export let type = "button"
  export let disabled = false
  export let color = ""
</script>

{#if href}
  <a
    style:font-size={fontSize}
    style:width
    style:color={color}
    style:border-color={color}
    {href}
    class={$$props.class}
    class:outline
    class:small
    class:disabled
    on:click={onClick}
  >
    <slot />
    {@html children}
  </a>
{:else}
  <button
    style:font-size={fontSize}
    style:width
    style:color={color}
    style:border-color={color}
    on:click={onClick}
    class={$$props.class}
    class:outline
    class:small
    class:disabled
    {type}
  >
    <slot />
    {@html children}
  </button>
{/if}

<style>
  * {
    font-weight: 600;
    display: inline-block;
    min-width: min-content;
    height: min-content;
    padding: 1rem 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-align: center;
    white-space: nowrap;
    border-radius: 50px;
    background-color: var(--primary-color);
    color: var(--white);
  }

  *:hover {
    transform: translateY(-0.1rem);
  }

  *:active {
    transform: translateY(0.1rem);
  }

  .outline {
    /* padding: 0.5rem 1rem; */
    border: 1px solid var(--second-black);
    background-color: transparent;
  }

  .small {
    padding: 0.5rem 1rem;
  }

  .disabled {
    pointer-events: none;
    opacity: 0.5;
  }
</style>
