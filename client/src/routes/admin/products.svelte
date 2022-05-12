<script>
    import Cookies from "js-cookie"
    import Grid from "$lib/Grid.svelte"
    import Btn from "$lib/Btn.svelte"

    const productsPromise = fetch("https://talemelier.herokuapp.com/products", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("token")
        }
    }).then(response => response.json())
</script>

<svelte:head>
  <title>Produits - Talemelier</title>
</svelte:head>

<h1>Liste des produits</h1>

{#await productsPromise}
  <h1>Chargement...</h1>
{:then products}
  <Grid
      data={products}
      filteredFields={["name", "price"]}
      title="Produits"
      columns={[
          { name: "_id", label: "id" },
          { name: "title", label: "Titre" },
          { name: "description", label: "Description"},
          { name: "price", label: "Prix" },
          { name: "ref", label: "Référence" },
          { label: "Actions",
           render: [{
              component: Btn,
              props: row => ({
                children: "Supprimer",
                small: true,
                })}]}
          ]}

  />
{:catch error}
  <h1>Erreur</h1>
  <p>{error.message}</p>
{/await}