<script>
    import Cookies from "js-cookie"
    import Btn from "$lib/Btn.svelte"
</script>

<header>
  <a class="header-left" href="/"><img alt="logo Talemelier" src="/logo.svg"></a>
  <div class="header-right">
    {#if Cookies.get('token')}
      <Btn onClick={() => {
    Cookies.remove('token')
    window.location.reload()
      }}>
        Logout
      </Btn>
      <a class="cart" href="/cart">
        Panier
        <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
             stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
          <line x1="3" x2="21" y1="6" y2="6"></line>
          <path d="M16 10a4 4 0 01-8 0"></path>
        </svg>
      </a>
      <a class="account" href="/login">
        Mon compte
        <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
             stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </a>
    {:else}
      <Btn href="/login">Login</Btn>
      <Btn href="/register">Register</Btn>
    {/if}
  </div>
</header>

<style lang="scss">
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--background-color);
    z-index: 10;

    @media (max-width: 768px) {
      padding: 1rem;
    }
  }

  .header-left {
    img {
      width: 6rem;
    }
  }

  .header-right {
    display: flex;
    gap: 1.5rem;

    svg {
      width: 1.5rem;
    }

    > * {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

  }
</style>