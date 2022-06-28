<script>
	import Cookies from "js-cookie"
	import Btn from "$lib/Btn.svelte"

	export let connected = false

	if (Cookies.get("token")) {
		connected = true
	}
</script>

<header>
  <a class="header-left" href="/"><img alt="logo Talemelier" src="/logo.svg"/></a>
  <div class="header-right">
    <a href="/products">
      Produits
      <!--<svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
           width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="m4.6 13.11 5.79-3.21c1.89-1.05 4.79 1.78 3.71 3.71l-3.22 5.81C8.8 23.16.79 15.23 4.6 13.11Z"></path>
        <path d="m10.5 9.5-1-2.29C9.2 6.48 8.8 6 8 6H4.5C2.79 6 2 6.5 2 8.5a7.71 7.71 0 0 0 2 4.83"></path>
        <path d="M8 6c0-1.55.24-4-2-4-2 0-2.5 2.17-2.5 4"></path>
        <path d="m14.5 13.5 2.29 1c.73.3 1.21.7 1.21 1.5v3.5c0 1.71-.5 2.5-2.5 2.5a7.71 7.71 0 0 1-4.83-2"></path>
        <path d="M18 16c1.55 0 4-.24 4 2 0 2-2.17 2.5-4 2.5"></path>
      </svg>-->


      <!--<svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.7262 21.8621C24.7262 21.8621 27.4238 23.5532 28.9907 22.5536C31.0768 21.2202 30.625 15.531 28.5158 13.0102C28.3783 13.9019 27.925 16.325 26.7004 16.8082C28.0503 13.9496 28.9651 11.2876 23.8565 7.24939C23.6712 7.37573 24.2231 9.86037 23.1069 11.328C23.6323 7.63773 22.7827 5.52935 16.5557 3.13383C17.2347 4.71132 17.3873 6.5852 16.7439 7.69975C16.6202 4.20101 16.0372 1.70882 9.1249 1.77411C10.0138 3.24418 10.0139 5.01483 9.692 5.98976C8.97742 1.70697 7.87154 1.39094 3.60501 2.58355C2.09382 3.20567 0.990694 4.22176 0.852122 6.08964C0.711187 7.98657 3.19386 9.2435 3.55891 9.45426C5.42336 10.4967 11.7891 14.2164 24.7262 21.8621Z" stroke="#151515" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>-->

      <svg width="32" height="14" viewBox="0 0 32 14" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M26.8111 12.4546C26.8111 12.4546 29.5952 12.5559 30.3452 11.1129C31.3426 9.18984 28.5112 5.07637 25.8101 4.08897C26.096 4.82485 26.8126 6.85931 26.096 7.7612C25.8683 5.00451 25.3969 2.58702 19.759 1.76203C19.6739 1.93881 21.1791 3.58018 20.9754 5.18058C19.759 2.1544 18.1928 0.928411 12.4261 1.83748C13.6308 2.73578 14.5663 4.08897 14.5663 5.21507C12.9419 2.61792 11.4098 0.984464 6.2004 4.05807C7.51712 4.78317 8.29188 6.12486 8.47448 7.00447C6.05927 4.07172 5.083 4.31606 2.37171 7.0864C1.49875 8.21897 1.10737 9.47155 1.81956 10.9476C2.54267 12.4467 4.97388 12.313 5.34271 12.313C7.21159 12.2872 13.6628 12.3209 26.8111 12.4546Z" stroke="#151515" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <svg width="45" height="18" viewBox="0 0 45 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M38.1848 16.9977C38.1848 16.9977 42.267 17.1463 43.3666 15.0305C44.8291 12.2108 40.6776 6.1795 36.7171 4.73173C37.1363 5.81071 38.187 8.79371 37.1363 10.1161C36.8024 6.07413 36.1112 2.52951 27.8447 1.31988C27.72 1.57908 29.9269 3.98572 29.6283 6.33229C27.8447 1.89519 25.5483 0.097595 17.0929 1.43051C18.8593 2.74763 20.231 4.73173 20.231 6.38286C17.8492 2.57482 15.6028 0.179782 7.96458 4.68642C9.8952 5.74959 11.0312 7.71683 11.2989 9.00655C7.75765 4.70644 6.3262 5.0647 2.3508 9.12668C1.07083 10.7873 0.496976 12.6239 1.54122 14.7881C2.60147 16.9862 6.16621 16.7901 6.707 16.7901C9.44722 16.7523 18.9062 16.8017 38.1848 16.9977Z" stroke="#151515" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>








    </a>
    {#if connected}
      <a class="cart" href="/cart">
        Panier
        <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
             stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
          <line x1="3" x2="21" y1="6" y2="6"></line>
          <path d="M16 10a4 4 0 01-8 0"></path>
        </svg>
      </a>
      <button class="account">
        Mon compte
        <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
             stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <div class="account-popup">
          <Btn outline href="/account">Accéder à mon compte</Btn>
          <Btn outline onClick={() => {
                Cookies.remove('token')
                window.location.reload()
            }}>
            Deconnexion
          </Btn>
        </div>
      </button>
    {:else}
      <Btn href="/login" outline>Se connecter</Btn>
      <Btn href="/register" outline>S'inscrire</Btn>
    {/if}
  </div>
</header>

<style lang="scss">
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    position: sticky;
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
      height: 1.5rem;
    }

    > * {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .account {
    position: relative;

    &:focus, &:hover, &:focus-within {
      .account-popup {
        display: flex !important;
      }
    }
  }

  .account-popup {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #D4CAC4;
    padding: 1rem;
    border-radius: 0.25rem;
    flex-direction: column;
    gap: 1rem;
  }
</style>