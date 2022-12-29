<script>
  import Btn from "$lib/Btn.svelte"
</script>

<svelte:head>
  <title>Talemelier</title>
</svelte:head>

<section class="display">
  <div class="title">
    <h1>Le Talemelier</h1>
    <p>
      Passez votre commande sur le site puis venez récupérer vos produits sur
      les différents marchés.
    </p>
    <Btn href="/products">Découvrir nos produits</Btn>
  </div>
</section>

<style lang="scss">
  .cta {
    display: flex;

    gap: 1rem;
  }
  b {
    font-weight: 600;
  }
  .display {
    height: 100vh;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 10)),
      url("/img/display.webp") no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;

    .title {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      > * {
        color: var(--white);
      }
      p {
        max-width: 500px;
      }
    }

    @media (max-width: 425px) {
      h1 {
        font-size: 4rem;
      }
      h2 {
        font-size: 2rem;
      }
    }
  }


</style>
