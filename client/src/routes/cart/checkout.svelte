<script>
    import Btn from "$lib/Btn.svelte"
    import Modal from "$lib/Modal.svelte"
    import { cart, collectData, products } from "../../stores.js"
    import { onMount } from "svelte"
    import Cookies from "js-cookie"

    let success = false
    let nextDate = null
    let userInfos = {}

    let cartList = $cart.map(cartItem => ({
        ...$products.find(product => product._id === cartItem._id),
        quantity: cartItem.quantity
    }))
    const priceFormatter = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2
    })
    $: totalPrice = Math.round((cartList.reduce((acc, item) => acc + item.price * item.quantity, 0) + Number.EPSILON) * 100) / 100

    onMount(() => {
        const parseDay = () => {
            switch ($collectData.day) {
                case "Lundi":
                    return 1
                case "Mardi":
                    return 2
                case "Mercredi":
                    return 3
                case "Jeudi":
                    return 4
                case "Vendredi":
                    return 5
                case "Samedi":
                    return 6
                case "Dimanche":
                    return 7
            }
        }
        const date = new Date()
        date.setDate(date.getDate() + (parseDay() + 7 - date.getDay()) % 7)

        nextDate = new Intl.DateTimeFormat("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long"
        }).format(date)
        nextDate = nextDate.charAt(0).toUpperCase() + nextDate.slice(1)
    })

    fetch("https://talemelier.herokuapp.com/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("token")
        }
    }).then(res => res.json()).then(res => {
        userInfos = res
    })


</script>

<svelte:head>
  <title>Validation de la commande - Talemelier</title>
</svelte:head>

{#if success}
  <Modal>
    <div class="modal">
      <h1>Merci !</h1>
      <p>Votre commande a bien été validée. Vous aller bientôt recevoir une confirmation de votre commande par mail.</p>
      <Btn href="/">Retour à l'accueil</Btn>
    </div>
  </Modal>
{/if}

<section class="confirm">
  <h1>Validation</h1>

  <div class="article-container">
    <span class="header">
      {cartList.length} articles
    </span>
    <ul>
      {#each cartList as cartItem}
        <li>
          <img src={cartItem.image} alt={cartItem.title}>
          {cartItem.title} <b class="price">{priceFormatter.format(cartItem.price)} x {cartItem.quantity}</b>
        </li>
      {/each}
    </ul>
    <span class="footer">
      Total: <b class="price">{priceFormatter.format(totalPrice)}</b>
    </span>
  </div>
</section>

<section class="client">
  <div class="user-infos">
    {#if userInfos.firstName}
      <span>{userInfos.firstName} {userInfos.lastName}</span>
    {:else}
      <div class="inputs-container">
        <label>
          <span class="title">Prénom et nom</span>
          <div>
            <input type="text" placeholder="Prénom">
            <input type="text" placeholder="Nom">
          </div>
        </label>
      </div>
    {/if}
    <span>{userInfos.email}</span>
    {#if userInfos.phone}
      <span>{userInfos.phone}</span>
    {:else}
      <label>
        <span class="title">Téléphone</span>
        <input required type="tel" maxlength="10" placeholder="Téléphone">
      </label>
    {/if}
  </div>
  <div>
    <span class="title">Lieu de récupération</span>
    <p>{$collectData.place}</p>
  </div>
  <div>
    <span class="title">Date de récupération</span>
    <p>
      {nextDate} à {$collectData.hour}00
    </p>
  </div>
  <Btn onClick={()=>success = true}>Valider</Btn>
</section>

<style lang="scss">
  .modal {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p {
      padding: 1rem;
      background: #D4CAC4;
    }
  }

  .confirm {
    margin: 6rem auto 2rem auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .article-container {
    display: flex;
    flex-direction: column;
    padding: 2rem 1.5rem;
    background-color: #D4CAC4;
    gap: 1rem;

    span {
      font-weight: 600;
    }
  }

  input {
    width: 12rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .inputs-container {
    display: flex;
    gap: 1rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--black);
    align-items: center;
  }

  img {
    width: 6rem;
    height: 3rem;
    border-radius: 0.5rem;
    object-fit: cover;
  }

  .footer {
    display: flex;
    justify-content: space-between;

    b {
      font-weight: 600;
    }
  }

  .client {
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 90%;

    > * {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .title {
      font-weight: 600;
    }
  }
</style>