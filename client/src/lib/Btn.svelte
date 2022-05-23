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
</script>

{#if href}
  <a style:font-size={fontSize}
     style:width={width}
     href={href}
     class={$$props.class}
     class:outline
     class:small
      class:disabled
  >
    <slot/>
    {@html children}
  </a>
{:else}
  <button style:font-size={fontSize}
          style:width={width}
          on:click={onClick}
          class={$$props.class}
          class:outline
          class:small
          class:disabled
          {type}
  >
    <slot/>
    {@html children}
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
    transform: scale(0.99);
  }

  .outline {
    padding: 0.5rem 1rem;
    border: 1px solid var(--second-black);
    background-color: var(--background-color);
  }

  .small{
    padding: 0.5rem 1rem;
  }

  .disabled{
    pointer-events: none;
    opacity: 0.5;


  }
</style>