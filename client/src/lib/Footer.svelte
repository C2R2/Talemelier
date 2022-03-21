<script></script>

<footer>
  <hr/>
  <div class="links">
    <ul>
      <li class="title">
        Contact
      </li>
      <li><a href="/">Partenariat</a></li>
      <li><a href="/">Un problème rencontré ?</a></li>
    </ul>
    <ul>
      <li class="title">
        À propos
      </li>
      <li><a href="/">Conditions générales de ventes</a></li>
      <li><a href="/">Mentions légales</a></li>
    </ul>
    <ul>
      <li class="title">
        Commande et livraison
      </li>
      <li><a href="/">Infos pratiques</a></li>
      <li><a href="/">Suivi des commandes</a></li>
    </ul>

  </div>
  <div class="copyright">
    <img alt="logo Talemelier" src="/logo.svg">
    Tous droits réservés
  </div>
</footer>

<style lang="scss">
  footer {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
  }

  hr {
    width: 100%;
    border-color: var(--black);
  }

  .links {
    display: flex;
    justify-content: space-between;

    ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .title {
        font-size: 1.125rem;
      }
    }
  }

  .copyright {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>