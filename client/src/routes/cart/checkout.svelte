<script>
	import Btn from "$lib/Btn.svelte"
	import Modal from "$lib/Modal.svelte"
	import { cart, collectData, products } from "../../stores.js"
	import { onMount } from "svelte"
	import Cookies from "js-cookie"
	import formatter from "$functions/formatter.js"

	let success = false
	let redirect = false
	let submit = false
	let nextDate = null
	let userInfos = {}
	let firstName = ""
	let lastName = ""
	let tel = ""

	let checkoutForm = null

	$: redirect && (location.href = "/login")

	let cartList = $cart.map(cartItem => ({
		...$products.find(product => product._id === cartItem._id),
		quantity: cartItem.quantity
	}))

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
		if (date <= new Date()) {
			date.setDate(date.getDate() + 7)
		}

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
	}).then(res => {
		if (res.status === 200) {
			return res.json()
		} else {
			redirect = true
		}
	}).then(res => {
		userInfos = res
	})

	function handleSubmit (e) {
		e.preventDefault()
		submit = true
		const order = {
			cart: $cart,
			place: $collectData.place,
			date: nextDate,
			user: userInfos._id
		}

		if (firstName || lastName || tel) {
			fetch("https://talemelier.herokuapp.com/user", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + Cookies.get("token")
				},
				body: JSON.stringify({
					firstName,
					lastName,
					tel
				})
			}).then(res => {
				cart.set([])
				success = res.ok
			})
				.catch(err => {
					console.error(err)
					submit = false
				})
		}

		fetch("https://talemelier.herokuapp.com/orders", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(order)
		}).then(res => {
			success = res.ok
			cart.set([])
			//TODO : send email to user
		}).catch(err => {
			console.error(err)
			success = false
		})
	}
</script>

<svelte:head>
  <title>Validation de la commande - Talemelier</title>
</svelte:head>

{#if success}
  <Modal>
    <div class="modal">
      <h1>Merci !</h1>
      <p>Votre commande a bien été validée. Vous aller bientôt recevoir une confirmation de votre commande par mail.</p>
      <Btn  href="/">Retour à l'accueil</Btn>
    </div>
  </Modal>
{/if}

<main>
  <div>
    <h1>Validation</h1>
    <p>Récapitulatif de votre commande</p>
  </div>
  <div class="oui">
    <section class="confirm">
      <div class="article-container">
    <span class="header">
      {cartList.reduce(
	      (acc, item) => acc + item.quantity,
	      0
      )} article{cartList.reduce(
	    (acc, item) => acc + item.quantity,
	    0
    ) > 1 ? "s" : ""}
    </span>
        <ul>
          {#each cartList as cartItem}
            <li>
              <!--            <img src={cartItem.image} alt={cartItem.title}>-->
              {cartItem.title} <b class="price">{formatter(cartItem.price)} x {cartItem.quantity}</b>
            </li>
          {/each}
        </ul>
        <span class="footer">
      Total: <b class="price">{formatter(totalPrice)}</b>
    </span>
      </div>
      <Btn onClick={handleSubmit} type="submit">{submit ? "Chargement..." : "Valider la commande"}</Btn>
    </section>
    <form bind:this={checkoutForm} class="client" on:submit={handleSubmit}>
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
      <div>
        <span class="title">Infos client</span>
        <span class="helper">Pour mettre à jour les informations, veuillez vous rendre sur la page <a class="underlinee"
                                                                                                      href="/account">"Mon compte"</a>.</span>
      </div>
      <div>
        {#if userInfos.firstName}
          <div>
            <span>{userInfos.firstName + " " + userInfos.lastName } </span>
            <input value={userInfos.firstName + " " + userInfos.lastName } disabled type="hidden" required placeholder="Prénom">
          </div>
        {:else}
          <div class="inputs-container">
            <span id="name" class="title">Prénom et nom</span>
            <label for="name">
              <input bind:value={firstName} type="text" required placeholder="Prénom">
              <input bind:value={lastName} type="text" required placeholder="Nom">
            </label>
          </div>
        {/if}
        <div>
          <span>{userInfos.email}</span>
          <input disabled placeholder="Prénom" required type="hidden" value={userInfos.email }>
        </div>
        {#if userInfos.tel}
          <div>
            <span>{userInfos.tel}</span>
            <input value={userInfos.tel} disabled type="hidden" required placeholder="0600000000">
          </div>
        {:else}
          <div class="inputs-container">
            <span id="tel" class="title">Téléphone</span>
            <label for="tel">
              <input required bind:value={tel} pattern={`[0-9]{10}`} type="tel" maxlength="10" placeholder="0600000000">
            </label>
          </div>
        {/if}
      </div>
    </form>
  </div>
</main>

<style lang="scss">
  h1 {
    font-family: var(--body-font);
    font-weight: 400;
  }

  .underlinee {
    text-decoration: underline;
  }

  .helper {
    font-size: 0.8rem;
    color: var(--grey);
  }

  .modal {
    display: flex;
    flex-direction: column;
    gap: 1rem;

  }

  main {

    margin: 6rem auto 2rem auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  main > div.oui {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    > * {
      flex: 1;
    }

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  .confirm {
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
    gap: 0.5rem;
  }

  .inputs-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
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
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    > div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .title {
      font-weight: 600;
    }
  }
</style>