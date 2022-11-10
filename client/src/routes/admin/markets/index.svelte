<script>
    import Cookies from "js-cookie"
    import Grid from "$lib/Grid.svelte"
    import Btn from "$lib/Btn.svelte"

    const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`
    const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`

    const marketsPromise = fetch("https://talemelier.herokuapp.com/markets", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("token")
        }
    }).then(response => response.json())

    async function handleDelete (id) {
        return await fetch(`https://talemelier.herokuapp.com/markets/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get("token")
            }
        })
    }
</script>
<Btn href="/admin/markets/add" small>Ajouter un marché</Btn>

<svelte:head>
  <title>Marchés - Talemelier</title>
</svelte:head>

<h1>Liste des marchés</h1>

{#await marketsPromise}
  <h1>Chargement...</h1>
{:then markets}
  {#key markets}
    <Grid
        data={markets}
        filteredFields={["_id", "place", "days", "hours" ]}
        title="Marchés"
        columns={[
          { name: "_id", label: "id", width: "75px"},
          { name: "place", label: "Lieu" },
          { name: "days", label: "Jours"},
          { name: "hours", label: "Heures" },
          { label: "Actions",
           render: [{
                    component: Btn,
                  props: row => ({
                    children: editIcon,
                    href: `/admin/markets/${row._id}`,
                    small: true,
                    })},{
                   component: Btn,
              props: row => ({
                children: deleteIcon,
                onClick: () => { confirm("Supprimer le marché ?") && handleDelete(row._id).then(() => markets = markets.filter((product)=> product._id !== row._id)) },
                small: true,
                })}]}
          ]}
    />
  {/key}
{:catch error}
  <h1>Erreur</h1>
  <p>{error.message}</p>
{/await}