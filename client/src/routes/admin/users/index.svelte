<script>
    import Cookies from "js-cookie"
    import Grid from "$lib/Grid.svelte"
    import Btn from "$lib/Btn.svelte"

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
  <Grid data={users} search sort fixedHeader resizable columns={[{
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
    label: "Rôle"
  }, {
      label: "Actions",
      render: [{
          component: Btn,
        props: {
          href: (row)=> `/admin/users/${row._id}`,
          children: "Modifier",
        }},
        {
          component: Btn,
        props: {
          onClick: () => console.log("delete"),
          children: "Supprimer"
          }}]

      //render: (row) => `<Btn href="/admin/users/${row._id}">
      //                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      //                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      //                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      //                    </svg>
      //                  </Btn>
      //                  <button>
      //                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      //                      <polyline points="3 6 5 6 21 6"></polyline>
      //                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      //                    </svg>
      //                  </button>`
  }]}/>
{:catch error}
  <p>Erreur : {error}</p>
{/await}

<style>
</style>