<script>
    export let allsize = false
</script>

<div class="select" class:allsize>
  <select>
    <slot/>
  </select>
</div>

<style>
  select {
    font-weight: 600;
    width: 100%;
    padding: 1rem 1.5rem 1rem 1rem;
    border: none;
    background: transparent;
    appearance: none;
  }

  .select {
    position: relative;
    display: flex;
    align-items: center;
    width: min-content;
    border: 1px solid var(--black);
    border-radius: 0.25rem;
  }

  .allsize {
    width: 100%;
  }

  .select::after {
    position: absolute;
    right: 0.25rem;
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' viewBox='5 8 15 8' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' height='8'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  select:focus-visible {
    outline: none;
  }
</style>