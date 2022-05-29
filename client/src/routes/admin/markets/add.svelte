<script>
    import Cookies from "js-cookie"
    import MarketForm from "$lib/admin/MarketForm.svelte"

    let submit = false

    let market = {}

    function handleSubmit () {
        submit = true
        fetch("https://talemelier.herokuapp.com/markets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get("token")
            },
            body: JSON.stringify(market)
        }).then(() => {window.location = "/admin/products"}).catch(error => {
            console.error(error)
            submit = false
        })
    }

</script>

<svelte:head>
  <title>Ajouter un marché - Talemelier</title>
</svelte:head>

<MarketForm {submit} onSubmit={handleSubmit} market={market}/>