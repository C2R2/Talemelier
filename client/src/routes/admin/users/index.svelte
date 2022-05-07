<script>
    import Cookies from "js-cookie"
    import Grid from "$lib/Grid.svelte"
    import Btn from "$lib/Btn.svelte"
    import Select from "$lib/Select.svelte"

    const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`

    // const serverURL = process.env.SERVER_URL

    const usersPromise = fetch("https://talemelier.herokuapp.com/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("token")
        }
    }).then(response => response.json())


</script>

<svelte:head>
  <title>Utilisateurs - Talemelier</title>
</svelte:head>

<h1>Utilisateurs</h1>

{#await usersPromise}
  Chargement ...
{:then users}
  <h2>Liste des utilisateurs</h2>
  <Grid data={users} columns={[{
    name: "_id",
    label: "ID",
    width: "100px"
  }, {
    name: "email",
    label: "Email",
  }, {
    name: "password",
    label: "Mot de passe",
    width: "200px",
  }, {
    name: "role",
    label: "Rôle",
    render: [{
        component: Select,
        props: {
            value: (row)=> row.role,
            onChange: ( event) => { console.log(event.target.value) },
            options: [{
                value: "admin",
                label: "Administrateur"
            },
            {
                value: "client",
                label: "Client"
            },
            {
                value: "user",
                label: "Utilisateur"
            }],
            },
    }]
  }, {
      label: "Supprimer",
      render: [{
          component: Btn,
        props: {
          onClick: () => console.log("delete"),
          children: deleteIcon,
          small: true,
          }}]
  }]}/>
{:catch error}
  <p>Erreur : {error}</p>
{/await}

<style>
</style>