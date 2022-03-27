<script>
    import Btn from "$lib/Btn.svelte"
</script>

<div class="display">
  <div class="title">
    <h1>L'Atelier du Talemelier</h1>
    <h2>Artisan Boulanger</h2>
  </div>
  <Btn width="20rem" href="products">
    Découvrir les produits
  </Btn>
</div>

<style lang="scss">
  .display {
    height: 100vh;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 10)), url("/img/display.webp") no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;

    .title {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      > * {
        color: white;
      }
    }
  }

  .cta {
    margin-top: 2rem;
  }
</style>