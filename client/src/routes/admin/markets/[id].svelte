<script>
    import { page } from "$app/stores"
    import Cookies from "js-cookie"
    import MarketForm from "$lib/admin/MarketForm.svelte"

    const marketID = $page.params.id
    let market
    let submit = false

    fetch("https://talemelier.herokuapp.com/markets/" + marketID, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("token")
        }
    }).then(response => response.json()).then(data => market = data)

    function handleSubmit () {
        submit = true
        fetch("https://talemelier.herokuapp.com/markets/" + marketID, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get("token")
            },
            body: JSON.stringify(market)
        }).then(() => window.location = "/admin/markets").catch(error => {
            console.error(error)
            submit = false
        })
    }

</script>

<div class="products-container">
  <p>Marché: {marketID}</p>

  {#if market}
    <MarketForm market={market} onSubmit={handleSubmit}/>
  {:else}
    <p>Chargement...</p>
  {/if}
</div>

<style lang="scss">
  .products-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: start;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    span {
      font-weight: 600;
    }
  }
</style>