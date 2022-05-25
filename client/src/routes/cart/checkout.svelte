<script>
    import Btn from "$lib/Btn.svelte"
    import Modal from "$lib/Modal.svelte"

    let success = false

</script>

<svelte:head>
  <title>Validation de la commande - Talemelier</title>
</svelte:head>

{#if success}
  <Modal>
    <div class="modal">
      <h1>Merci !</h1>
      <p>Votre commande a bien été validée. Vous aller bientôt recevoir une confirmation de votre commande par mail.</p>
      <Btn href="/">Retour à l'accueil</Btn>
    </div>
  </Modal>
{/if}

<section class="confirm">
  <h1>Validation</h1>

  <div class="article-container">
    <span class="header">
      3 articles
    </span>
    <ul>
      <li>
        Baguette <b class="price">3,20€</b>
      </li>
      <li>
        Baguette <b class="price">3,20€</b>
      </li>
      <li>
        Baguette <b class="price">3,20€</b>
      </li>
    </ul>
    <span class="footer">
      Total: <b class="price">3,20€</b>
    </span>
  </div>
</section>

<section class="client">
  <div>
    <span>Nom Prénom</span>
    <span>adresse@mail.fr</span>
    <span>07 84 56 38 19</span>
  </div>
  <div>
    <span class="title">Lieu de récupération</span>
    <p>Marché d'Auch - Centre ville Auch 32000</p>
  </div>
  <div>
    <span class="title">Date de récupération</span>
    <p>
      Lundi 12 janvier 2022 à 12h00
    </p>
  </div>
  <Btn onClick={()=>success = true}>Valider</Btn>
</section>

<style lang="scss">
  .modal {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p {
      padding: 1rem;
      background: #D4CAC4;
    }
  }

  .confirm {
    margin: 6rem auto 2rem auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .article-container {
    display: flex;
    flex-direction: column;
    padding: 2rem 1.5rem;
    background-color: #D4CAC4;
    gap: 1rem;

    span {
      font-weight: 600;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--black);
  }

  .footer {
    display: flex;
    justify-content: space-between;

    b {
      font-weight: 600;
    }
  }

  .client {
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 90%;

    > * {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .title {
      font-weight: 600;
    }
  }
</style>