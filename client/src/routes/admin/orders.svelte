<svelte:head>
  <title>
    Commandes - Talemelier
  </title>
</svelte:head>
<script>
    import Cookies from "js-cookie"
    import Grid from "$lib/Grid.svelte"
    import Btn from "$lib/Btn.svelte"

    let orders = []

    const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`

    fetch("https://talemelier.herokuapp.com/orders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("token")
        }
    }).then(response => response.json()).then(data => orders = data)

    async function handleDelete (id) {
        return await fetch(`https://talemelier.herokuapp.com/orders/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get("token")
            }
        })
    }
</script>

<h1>Liste des commandes</h1>
{#if orders.length > 0}
  {#key orders}
    <Grid
        data={orders}
        filteredFields={["_id"]}
        title="Commandes"
        columns={[
    { name: "_id", label: "id" },
    { name: "user", label: "Utilisateur" },
    { name: "place", label: "Lieu" },
    { name: "date", label: "Date" },
    { name: "cart", label: "Panier" },
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