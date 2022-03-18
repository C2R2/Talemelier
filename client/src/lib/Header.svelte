<script>

</script>

<header>
  <div class="header-left"><img alt="logo Talemelier" src="/logo.svg"></div>
  <div class="header-right">
    <div class="cart">
      Panier
      <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
           stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
        <line x1="3" x2="21" y1="6" y2="6"></line>
        <path d="M16 10a4 4 0 01-8 0"></path>
      </svg>
    </div>
    <div class="account">
      Mon compte
      <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
           stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </div>

  </div>
</header>

<style lang="scss">
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
  }

  .header-right {
    display: flex;
    gap: 1.5rem;

  > * {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  }
</style>