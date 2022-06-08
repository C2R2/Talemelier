<svelte:head>
  <title>
    Commandes - Talemelier
  </title>
</svelte:head>
<script>
    import Cookies from "js-cookie"
    import Grid from "$lib/Grid.svelte"

    let orders = []

    fetch("https://talemelier.herokuapp.com/orders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("token")
        }
    }).then(response => response.json()).then(data => orders = data)
    $:console.log(orders)
</script>

<h1>Liste des commandes</h1>
{#if orders.length > 0}
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
    // {
    //     label: "Actions",
    //     render: [{
    //         component: Btn,
    //         props: row => ({
    //             children: deleteIcon,
    //             onClick: () => { confirm("Supprimer le produits ?") && handleDelete(row._id).then(() => products = products.filter((product) => product._id !== row._id)) },
    //             small: true,
    //         })
    //     }]
    // }
]}
  />

{:else}
  <p>Chargement...</p>
{/if}