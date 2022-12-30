<svelte:head>
  <title>
    Commandes - Talemelier
  </title>
</svelte:head>
<script>
	import Cookies from "js-cookie"
	import Grid from "$lib/Grid.svelte"
	import Btn from "$lib/Btn.svelte"
	import Modal from "$lib/Modal.svelte"

	let orders = []
	let printModalOpen = false
	let totalOrders = 0

	const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`

	fetch(import.meta.env.VITE_SERVER_URL + "/orders", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + Cookies.get("token")
		}
	}).then(response => response.json()).then(data => {
		totalOrders = data.length
		data.map(order => {
			fetch(import.meta.env.VITE_SERVER_URL + "/users/" + order.user, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + Cookies.get("token")
				}
			}).then(response => response.json()).then(data => {
				order.user = data
				orders.push(order)
				orders = orders
			})
		})
	})

	function handlePrint (event) {
		const beforeDate = new Date(event.target.beforeDate.value)
		const afterDate = new Date(event.target.afterDate.value)

		const ordersToPrint = orders.filter(order => {
			const orderYear = order.date.includes("Janvier") ? new Date().getFullYear() + 1 : new Date().getFullYear()
			console.log(order)
			const orderDate = new Date(order.date.split("à")[0] + " " +  orderYear)
			return orderDate >= afterDate && orderDate <= beforeDate
		})
		console.log(ordersToPrint)
		if (ordersToPrint.length === 0) {
			alert("Aucune commande à imprimer")
			return
		}

		printModalOpen = false

	}

	async function handleDelete (id) {
		totalOrders--
		return await fetch(`${import.meta.env.VITE_SERVER_URL}/orders/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + Cookies.get("token")
			}
		})
	}
</script>

<Btn onClick={()=> printModalOpen = true } small>Imprimer</Btn>
<Btn small>Supprimer</Btn>

{#if printModalOpen}
  <Modal onClickCross={()=> printModalOpen = false }>
    <div class="modal">
      <h3>Imprimer</h3>
      <form on:submit|preventDefault={handlePrint}>
        <label>
          Commandes du
          <br>
          <input type="date" name="beforeDate" required/>
          au
          <input type="date" name="afterDate" required/>
        </label>
        <Btn type="submit" small>Imprimer</Btn>
      </form>
    </div>
  </Modal>
{/if}

<h1>Liste des commandes</h1>
{#if totalOrders === orders.length}
  {#key orders}
    <Grid
        data={orders}
        filteredFields={["_id", "date", "place", "user", "cart"]}
        title="Commandes"
        columns={[
    { name: "_id", label: "id", width: "100px" },
    { label: "Utilisateur",
    render: [
			{
				element: "button",
				props: row => ({
          children: row.user.firstName + " " + row.user.lastName,
          title: `${row.user.firstName} ${row.user.lastName} (${row.user.email} - ${row.user.tel}) ${row.user._id}`,
          "data-tooltip": `${row.user.firstName} ${row.user.lastName} (${row.user.email} - ${row.user.tel}) ${row.user._id}`,
        })
			}
    ]
     },
    { name: "place", label: "Lieu" },
    { name: "date", label: "Date" },
    { label: "Panier",
    render: [
			{
				element: "button",
				props: row => ({
          children: `${row.cart.reduce((acc, item) => acc + item.quantity, 0)} articles`,
          "data-tooltip": row.cart.map(item => `${item.quantity} x ${item.title} (${item.ref})`).join("\n"),
        })
				}
			]
     },
     {
         label: "Actions",
         render: [{
             component: Btn,
             props: row => ({
                 children: deleteIcon,
                 onClick: () => { confirm("Supprimer la commande ?") && handleDelete(row._id).then(() => orders = orders.filter((order) => order._id !== row._id)) },
                 small: true,
             })
         }]
     }
]}
    />
  {/key}

{:else}
  <p>Chargement...</p>
{/if}

<style>
  .modal {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .modal form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>