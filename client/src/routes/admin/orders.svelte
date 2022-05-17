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
{#if orders}
  <Grid
      data={orders}
      filteredFields={["_id", "title", "price", "description", "ref"]}
      title="Commandes"
      columns={[
    {
        label: "Image", render: [{
            element: "img",
            props: row => ({
                width: "100",
                src: row.image,
                alt: row.title,
            })
        }]
    },
    { name: "_id", label: "id" },
    { name: "title", label: "Titre" },
    { name: "description", label: "Description" },
    { name: "price", label: "Prix" },
    { name: "ref", label: "Référence" },
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