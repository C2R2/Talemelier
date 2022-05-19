<script></script>

<footer>
  <hr/>
  <div class="links">
    <ul>
      <li class="title">
        À propos
      </li>
      <li><a class="underline" href="/infos">Infos pratiques</a></li>
      <li><a class="underline" href="/contact">Partenariat</a></li>
      <li><a class="underline" href="/contact">Un problème rencontré ?</a></li>
      <li><a class="underline" href="/legals">Mentions légales</a></li>
    </ul>

  </div>
  <div class="copyright">
    <img alt="logo Talemelier" src="/logo.svg">
  </div>
</footer>

<style lang="scss">
  footer {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    @media (max-width: 768px) {
      padding: 1rem;
    }
  }

  hr {
    width: 100%;
    border-color: var(--black);
  }

  .links {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;

    ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .title {
        font-weight: 600;
      }
    }
  }


  .copyright {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;

    img {
      width: 6rem;
    }
  }
</style>