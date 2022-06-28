<script>
    import QuantityControl from "$lib/QuantityControl.svelte"
    import Btn from "$lib/Btn.svelte"
    import ProductCardCarrousel from "$lib/ProductCard/ProductCardCarrousel.svelte"
    import ProductCard from "$lib/ProductCard/ProductCard.svelte"
    import { cart, collectData, products } from "../../stores.js"
    import Select from "$lib/Select.svelte"
    import shuffle from "$functions/shuffle.js"
    import formatter from "$functions/formatter.js"

    let markets = []

    let placeSelect = $collectData.place
    let daySelect = $collectData.day
    let hourSelect = $collectData.hour
    let cartList = $cart.map(cartItem => ({
        ...$products.find(product => product._id === cartItem._id),
        quantity: cartItem.quantity
    }))
    $: totalPrice = Math.round((cartList.reduce((acc, item) => acc + item.price * item.quantity, 0) + Number.EPSILON) * 100) / 100

    function handleDelete (_id) {
        cart.update(cartItem => cartItem.filter(item => item._id !== _id))
        cartList = cartList.filter(item => item._id !== _id)
    }

    function handleSubmit () {
        cart.set(cartList.map(item => ({
            _id: item._id,
            quantity: item.quantity
        })))
        collectData.set({
            place: placeSelect,
            day: daySelect,
            hour: hourSelect
        })
        window.location.href = "/cart/checkout"
    }

    fetch("https://talemelier.herokuapp.com/markets", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(res => {
        markets = res
        if (!placeSelect || !daySelect || !hourSelect) {
            placeSelect = res[0].place
            daySelect = res[0].days[0]
            hourSelect = res[0].hours[0]
        }
    })

</script>

<svelte:head>
  <title>Panier - Talemelier</title>
</svelte:head>

<section class="cart">
  <div class="cart__recap">
    <h1>Récapitulatif</h1>
    <ul>
      {#each cartList as cartItem}
        <li>
          <a href={"/products/" + cartItem._id}>
            <img alt={cartItem.title} src={cartItem.image}>
          </a>
          <span>{cartItem.title}</span>
          <div class="left">
            <div class="price">
              <QuantityControl bind:productQuantity={cartItem.quantity}/>
              Prix unitaire: {formatter(cartItem.price)}
            </div>
            <Btn small onClick={()=>handleDelete(cartItem._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </Btn>
          </div>
        </li>
      {:else}
        <li>Panier vide</li>
      {/each}
      <div class="bottom">
        <hr>
        <div class="total">
          Total: <b>{formatter(totalPrice)}</b>
        </div>
      </div>
    </ul>
  </div>
  <div class="collect">
    <h2>Lieu et horaire de collecte</h2>
    <form class="input-container">
      <label for="place">Lieu de retrait :</label>
      <Select allsize bind:value={placeSelect} id="place">
        {#each markets as market}
          <option selected={market.place === placeSelect} value={market.place}>{market.place}</option>
        {/each}
      </Select>
      <label for="when">Jour et heure :</label>
      {#key placeSelect}
        <div>
          <Select allsize bind:value={daySelect} id="when">
            {#if markets.find(market => market.place === placeSelect)}
              {#each markets.find(market => market.place === placeSelect).days as day}
                <option selected={day === daySelect} value={day}>{day}</option>
              {/each}
            {/if}
          </Select>
          <Select allsize bind:value={hourSelect}>
            {#if markets.find(market => market.place === placeSelect)}
              {#each markets.find(market => market.place === placeSelect).hours as hour}
                <option selected={hour === hourSelect} value={hour}>{hour}</option>
              {/each}
            {/if}
          </Select>
        </div>
      {/key}
    </form>
    <Btn disabled={!$cart.length} onClick={handleSubmit} small>Valider la commande</Btn>
  </div>
</section>

<section class="other">
  <h2>Autres produits</h2>
  <ProductCardCarrousel>
    {#if $products.length}
      {#each shuffle($products) as product}
        <ProductCard {product}/>
      {/each}
    {:else}
      <div class="loader"></div>
    {/if}
  </ProductCardCarrousel>
</section>

<style lang="scss">
  .cart {
    width: 90%;
    margin: 6rem auto 4rem auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    @media (min-width: 1100px) {
      flex-direction: row;
      > * {
        flex: 1;
      }
    }
  }

  .cart__recap{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h1 {
    font-size: 3rem;
    font-weight: 400;
  }

  ul {
    padding: 2rem 1.5rem;
    border-radius: 0.25rem;
    background-color: #D4CAC4;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .left {
    display: flex;
    gap: 0.5rem;
  }

  .price {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  img {
    width: 8rem;
    height: 4rem;
    border-radius: 0.25rem;
    object-fit: cover;
  }

  hr {
    border-color: var(--black);
    width: 100%;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .total {
    display: flex;
    justify-content: space-between;
    font-weight: 600;

    > * {
      font-weight: 600;
    }

  }

  .other {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      width: 90%;
      margin: 0 auto;
    }
  }

  .collect {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    background-color: #D4CAC4;
    gap: 1rem;
    padding: 2rem 1.5rem;
    border-radius: 0.25rem;

    div {
      display: flex;
      gap: 1rem;
    }
  }

  label {
    font-weight: 600;
  }


</style>