<script>
	import Cookies from "js-cookie"
	import Btn from "$lib/Btn.svelte"
	import { cart } from "../stores.js"
	import { onMount } from "svelte"

	export let connected = false
	export let color
	let productAdded = false
	let burger = false
	let menuOpen = true

	if (typeof window !== "undefined") {
		window.addEventListener("resize", () => {
			burger = window.innerWidth < 768
		})
	}
	onMount(
		() => {
			burger = window.innerWidth < 768
		}
	)

	if (Cookies.get("token")) {
		connected = true
	}

	// detect when $cart is updated on product page
	cart.subscribe(() => {
		if ($cart.length > 0 && window.location.pathname.includes("/products/")) {
			productAdded = true
			setTimeout(() => {
				productAdded = false
			}, 5000)
		}
	})

	function toggleMenu () {
		menuOpen = !menuOpen
	}

</script>

{#key color}
  <header style:color style:position={ color ? null : "sticky"} style:background-color={
    color ? "transparent" : "var(--background-color)"
  }>
    <a class="header-left" href="/">
      <img alt="logo Talemelier" src="/logo.svg" style:filter={ color ? "invert(1)" : null}/>
      Talemelier
    </a>
    {#if burger}
      {#if menuOpen}
        <svg style="cursor: pointer" on:click={toggleMenu} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        {#if productAdded}
          <div class="cart-popup">
            <h2>Merci !</h2>
            <span>Ce produit à été ajouté au panier</span>
            <Btn
                href="/cart"
                onClick={() => {
              productAdded = false
            }}
                small
            >
              Voir mon panier
            </Btn>
            <Btn
                onClick={(e) => {
              e.preventDefault()
              productAdded = false
            }}
                small
                outline
                color="var(--black)"
            >
              Continuer mes achats
            </Btn>
          </div>
        {/if}
      {:else}
        <div class="header-right header-right-burger" style:color>
          <svg class="burger-icon" on:click={toggleMenu} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>

          <a href="/products">
            <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M16.3 22.5a1.7 1.7 0 1 0 0-3.5 1.7 1.7 0 0 0 0 3.5Zm-8 0a1.7 1.7 0 1 0 0-3.5 1.7 1.7 0 0 0 0 3.5ZM4.8 4l-.2 2.4c0 .5.4.8.8.8h15.3c.5 0 .8-.3.9-.7a3 3 0 0 0-3-3.2H6.3c-.1-.4-.3-.9-.6-1.2-.5-.5-1.2-.9-2-.9H2c-.4 0-.8.4-.8.8s.4.8.8.8h1.7c.3 0 .6 0 .8.3.3.2.4.5.3.8Zm15.7 4.8H5.2c-.4 0-.8.3-.8.7L4 13.8A3 3 0 0 0 7 17h11a3 3 0 0 0 3-2.7l.3-4.7c0-.5-.3-.8-.8-.8Z"
              />
            </svg>
            Produits
          </a>
          <a class="cart" href={productAdded ? null : "/cart"}>
            <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M20 9c-.7-.8-1.7-1.2-3.1-1.4V7a4.9 4.9 0 0 0-5.4-5 5.1 5.1 0 0 0-4.4 5v.6c-1.4.2-2.4.6-3 1.4-1 1-1 2.5-.9 3.5L4 18c.2 2 1 4 5.3 4h5.6c4.3 0 5-2 5.3-4l.7-5.5c.1-1 .1-2.5-.8-3.5Zm-8.3-5.6A3.5 3.5 0 0 1 15.5 7v.7h-7V7c0-1.8 1.5-3.5 3.2-3.7Zm-3.3 9.7a1 1 0 0 1-1-1 1 1 0 0 1 2 0c0 .6-.4 1-1 1Zm7 0a1 1 0 0 1-1-1 1 1 0 0 1 2 0c0 .6-.4 1-1 1Z"
              />
            </svg>
            Panier
            {#if $cart.reduce((acc, cur) => acc + cur.quantity, 0) > 0}
        <span class="cart-count">
          {$cart.reduce((acc, cur) => acc + cur.quantity, 0)}</span
        >
            {/if}
            {#if productAdded}
              <div class="cart-popup">
                <h2>Merci !</h2>
                <span>Ce produit à été ajouté au panier</span>
                <Btn
                    href="/cart"
                    onClick={() => {
              productAdded = false
            }}
                    small
                >
                  Voir mon panier
                </Btn>
                <Btn
                    onClick={(e) => {
              e.preventDefault()
              productAdded = false
            }}
                    small
                    outline
                    color="var(--black)"
                >
                  Continuer mes achats
                </Btn>
              </div>
            {/if}
          </a>
          <a href="/about">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 6 1-1 1 1v5l-1 1-1-1V8Zm2 8v1h-2v-2h2v1Z"/>
            </svg>
            À propos
          </a>
          {#if connected}
            <button class="account">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
              >
                <path
                    d="M12 2a4.8 4.8 0 0 0-.1 9.5h.2A4.7 4.7 0 0 0 12 2Zm5 12.1a10 10 0 0 0-10 0c-1.3.9-2 2-2 3.3 0 1.2.7 2.3 2 3.2 1.3 1 3.2 1.4 5 1.4 1.8 0 3.7-.5 5-1.4 1.3-.9 2-2 2-3.2 0-1.3-.7-2.4-2-3.3Z"
                />
              </svg>
              Mon compte
              <span class="account-popup">
          <Btn small width="100%" href="/account">Accéder à mon compte</Btn>
          <Btn
              outline
              small
              color="var(--primary)"
              onClick={() => {
              Cookies.remove("token")
              window.location.reload()
            }}
          >
            Deconnexion
          </Btn>
        </span>
            </button>
          {:else}
            <a href="/login">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
              >
                <path
                    d="M12 2a4.8 4.8 0 0 0-.1 9.5h.2A4.7 4.7 0 0 0 12 2Zm5 12.1a10 10 0 0 0-10 0c-1.3.9-2 2-2 3.3 0 1.2.7 2.3 2 3.2 1.3 1 3.2 1.4 5 1.4 1.8 0 3.7-.5 5-1.4 1.3-.9 2-2 2-3.2 0-1.3-.7-2.4-2-3.3Z"
                />
              </svg>
              Connexion
            </a>
          {/if}
        </div>
      {/if}

    {:else}
      <div class="header-right" style:color>
        <a href="/products">
          <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M16.3 22.5a1.7 1.7 0 1 0 0-3.5 1.7 1.7 0 0 0 0 3.5Zm-8 0a1.7 1.7 0 1 0 0-3.5 1.7 1.7 0 0 0 0 3.5ZM4.8 4l-.2 2.4c0 .5.4.8.8.8h15.3c.5 0 .8-.3.9-.7a3 3 0 0 0-3-3.2H6.3c-.1-.4-.3-.9-.6-1.2-.5-.5-1.2-.9-2-.9H2c-.4 0-.8.4-.8.8s.4.8.8.8h1.7c.3 0 .6 0 .8.3.3.2.4.5.3.8Zm15.7 4.8H5.2c-.4 0-.8.3-.8.7L4 13.8A3 3 0 0 0 7 17h11a3 3 0 0 0 3-2.7l.3-4.7c0-.5-.3-.8-.8-.8Z"
            />
          </svg>
          Produits
        </a>
        <a class="cart" href={productAdded ? null : "/cart"}>
          <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M20 9c-.7-.8-1.7-1.2-3.1-1.4V7a4.9 4.9 0 0 0-5.4-5 5.1 5.1 0 0 0-4.4 5v.6c-1.4.2-2.4.6-3 1.4-1 1-1 2.5-.9 3.5L4 18c.2 2 1 4 5.3 4h5.6c4.3 0 5-2 5.3-4l.7-5.5c.1-1 .1-2.5-.8-3.5Zm-8.3-5.6A3.5 3.5 0 0 1 15.5 7v.7h-7V7c0-1.8 1.5-3.5 3.2-3.7Zm-3.3 9.7a1 1 0 0 1-1-1 1 1 0 0 1 2 0c0 .6-.4 1-1 1Zm7 0a1 1 0 0 1-1-1 1 1 0 0 1 2 0c0 .6-.4 1-1 1Z"
            />
          </svg>
          Panier
          {#if $cart.reduce((acc, cur) => acc + cur.quantity, 0) > 0}
        <span class="cart-count">
          {$cart.reduce((acc, cur) => acc + cur.quantity, 0)}</span
        >
          {/if}
          {#if productAdded}
            <div class="cart-popup">
              <h2>Merci !</h2>
              <span>Ce produit à été ajouté au panier</span>
              <Btn
                  href="/cart"
                  onClick={() => {
              productAdded = false
            }}
                  small
              >
                Voir mon panier
              </Btn>
              <Btn
                  onClick={(e) => {
              e.preventDefault()
              productAdded = false
            }}
                  small
                  outline
                  color="var(--black)"
              >
                Continuer mes achats
              </Btn>
            </div>
          {/if}
        </a>
        {#if connected}
          <button class="account">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path
                  d="M12 2a4.8 4.8 0 0 0-.1 9.5h.2A4.7 4.7 0 0 0 12 2Zm5 12.1a10 10 0 0 0-10 0c-1.3.9-2 2-2 3.3 0 1.2.7 2.3 2 3.2 1.3 1 3.2 1.4 5 1.4 1.8 0 3.7-.5 5-1.4 1.3-.9 2-2 2-3.2 0-1.3-.7-2.4-2-3.3Z"
              />
            </svg>
            Mon compte
            <span class="account-popup">
          <Btn small width="100%" href="/account">Accéder à mon compte</Btn>
          <Btn
              outline
              small
              color="var(--primary)"
              onClick={() => {
              Cookies.remove("token")
              window.location.reload()
            }}
          >
            Deconnexion
          </Btn>
        </span>
          </button>
        {:else}
          <a href="/login">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path
                  d="M12 2a4.8 4.8 0 0 0-.1 9.5h.2A4.7 4.7 0 0 0 12 2Zm5 12.1a10 10 0 0 0-10 0c-1.3.9-2 2-2 3.3 0 1.2.7 2.3 2 3.2 1.3 1 3.2 1.4 5 1.4 1.8 0 3.7-.5 5-1.4 1.3-.9 2-2 2-3.2 0-1.3-.7-2.4-2-3.3Z"
              />
            </svg>
            Connexion
          </a>
        {/if}
        <a href="/about">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path
                d="M17 2.4H7c-3 0-5 2-5 5v6c0 3 2 5 5 5v2.2a1 1 0 0 0 1.6.8l4.4-3h4c3 0 5-2 5-5v-6c0-3-2-5-5-5Zm-5 12.2a.7.7 0 1 1 0-1.5.7.7 0 0 1 0 1.5Zm1.3-4.2c-.4.3-.6.5-.6.8v.2c0 .4-.3.7-.7.7a.8.8 0 0 1-.8-.7v-.2c0-1.2.9-1.8 1.2-2 .4-.2.5-.4.5-.7 0-.5-.4-.9-.9-.9a1 1 0 0 0-1 1c0 .3-.3.7-.7.7a.8.8 0 0 1-.7-.8 2.4 2.4 0 0 1 4.8 0c0 1.2-.8 1.7-1.1 2Z"/>
          </svg>
          À propos
        </a>
      </div>
    {/if}
  </header>
{/key}

<style lang="scss">
  .burger-icon {
    align-self: flex-end;
    cursor: pointer;
  }

  header {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    z-index: 10;
    color: var(--primary);

    @media (max-width: 768px) {
      padding: 1rem;
    }
  }

  .cart {
    position: relative;
  }

  .cart-count {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    color: white;
    font-size: 0.5rem;
    padding: 0.25rem 0.4rem;
    border-radius: 50%;
    background: var(--black);
  }

  .header-left {
    display: flex;
    align-items: baseline;
    color: inherit;
    font-family: var(--title-font);
    font-size: 1.5rem;
    gap: 0.5rem;

    img {
      height: 1.25rem;
    }
  }

  .header-right {
    display: flex;
    gap: 3rem;

    svg {
      height: 1.5rem;
    }

    > * {
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: inherit;
      border-color: inherit;

    }
  }

  .header-right-burger {
    flex-direction: column;
    gap: 1rem;
    background-color: var(--background-color);
    padding: 1rem;
    border-radius: 0.5rem;
    color: var(--black) !important;
    outline: var(--black) 1px solid;
    position: fixed;
    top: 1rem;
    right: 1rem;
  }

  .account {
    position: relative;

    &:focus,
    &:hover,
    &:focus-within {
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
    background-color: #efecea;
    padding: 1rem;
    border-radius: 0.25rem;
    flex-direction: column;
    gap: 1rem;
    border: var(--black) solid 1px;
  }

  .cart-popup {
    z-index: 10;
    display: flex;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #efecea;
    padding: 1rem;
    border-radius: 0.25rem;
    border: var(--black) solid 1px;
    flex-direction: column;
    gap: 1rem;
    animation: fadeIn 0.5s;

    span {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
</style>
