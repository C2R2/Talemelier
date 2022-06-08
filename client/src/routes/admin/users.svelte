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

    async function handleDelete (id) {
        return await fetch(`https://talemelier.herokuapp.com/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get("token")
            }
        })
    }

    async function handleChange (event, _id) {
        return await fetch(`https://talemelier.herokuapp.com/users/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get("token")
            },
            body: JSON.stringify({
                role: event.target.value
            })
        })
    }

</script>

<svelte:head>
  <title>Utilisateurs - Talemelier</title>
</svelte:head>

<h1>Liste des utilisateurs</h1>

{#await usersPromise}
  Chargement...
{:then users}
  {#key users}
    <Grid data={users}
          filteredFields={["_id", "email", "role"]}
          title="Utilisateurs"
          columns={[{
    name: "_id",
    label: "ID",
  }, {
    name: "email",
    label: "Email",
  }, {
    name: "password",
    label: "Mot de passe",
  }, {
    name: "role",
    label: "Rôle",
    render: [{
        component: Select,
        props: row =>( {
            value: row.role,
            onChange: (event) => handleChange(event, row._id).then((res)=> res.status > 300 && alert("Erreur lors de la modification de l'utilisateur") ).catch(()=>alert("Erreur lors de la modification de l'utilisateur")),
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
            }),
    }]
    }, {
        name: "tel",
        label: "Téléphone",
    }, {
        name: "firstName",
        label: "Prénom",
    }, {
        name: "lastName",
        label: "Nom",
    }, {
      label: "Supprimer",
      render: [{
          component: Btn,
        props: row => ({
          onClick: () => { confirm("Supprimer l'utilisateur ?") && handleDelete( row._id).then(()=>users = users.filter((user)=> user._id !== row._id)) },
          children: deleteIcon,
          small: true,
          })}]
  }]}/>
  {/key}
{:catch error}
  <p>Erreur : {error}</p>
{/await}