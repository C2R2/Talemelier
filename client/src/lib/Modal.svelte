<script>
    export let onClickCross
</script>


<div class="modal">
  {#if onClickCross}
    <svg fill="none" height="24" on:click={onClickCross} stroke="currentColor" stroke-linecap="round"
         stroke-linejoin="round" stroke-width="2"
         viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <line x1="18" x2="6" y1="6" y2="18"></line>
      <line x1="6" x2="18" y1="6" y2="18"></line>
    </svg>
  {/if}
  <slot/>
</div>

<style lang="scss">
  .modal {
    position: fixed;
    border-radius: 0.25rem;
    width: 90%;
    background: var(--background-color);
    border: 1px solid var(--black);
    margin: auto;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: min-content;
    padding: 2rem;
    box-shadow: 0 0.25rem 5rem rgba(0, 0, 0, 0.1);
  }

  svg {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
</style>