<script>
    import Btn from "$lib/Btn.svelte"
</script>

<section class="display">
  <div class="title">
    <h1>L'Atelier du Talemelier</h1>
    <h2>Artisan Boulanger</h2>
  </div>
  <Btn href="products" width="20rem">
    Découvrir les produits
  </Btn>
</section>
<section class="about">
  <img alt="L'atelier du talemelier" src="/img/production.webp">
  <div class="text">
    <h3>Une entreprise artisanale</h3>
    <p>
      L’Atelier du Talemelier est une entreprise artisanale productrice de produits de boulangerie, pâtisserie et
      traiteur depuis plus de 35 ans.
    </p>
  </div>
</section>


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

  .about {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    width: 90%;
    margin: 2rem auto;

    img {
      width: 100%;
    }
  }
</style>