<script>
    import Cookies from "js-cookie"
    import { onMount } from "svelte"
    import Btn from "$lib/Btn.svelte"

    let loaded = false

    onMount(() => {
        fetch("https://talemelier.herokuapp.com/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get("token")
            }
        }).then(res => {
            res.status !== 200 ? document.location = "/login" : null
            loaded = true
        })
    })
</script>


{#if loaded}
  <div class="admin-panel">
    <div class="sidebar">
      <a href="/"><img src="/logo.svg" alt="Talemelier"/></a>
      <Btn width="100%" href="/admin/markets">Marchés</Btn>
      <Btn width="100%" href="/admin/orders">Commandes</Btn>
      <Btn width="100%" href="/admin/products">Produits</Btn>
      <Btn width="100%" href="/admin/users">Utilisateurs</Btn>
    </div>
    <div class="content">
      <Btn onClick={()=>  window.history.back() } small>← Retour</Btn>
      <slot/>
    </div>
  </div>
{:else}
  <h1>Chargement...</h1>
{/if}


<style>
  .admin-panel {
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template-columns: 15% 1fr;
  }

  .sidebar {
    border-right: solid 1px var(--black);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #D4CAC4;
    gap: 2rem;
  }

  .content {
    overflow-y: auto;
    padding: 1rem;
  }
</style>