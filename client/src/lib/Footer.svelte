<script></script>

<footer>
  <hr/>
  <div class="links">
    <ul>
      <li class="title">
        À propos
      </li>
      <li><a class="underline" href="/about">Infos pratiques</a></li>
      <li>
        <a class="underline"
           href="mailto:atelier.du.talemelier@gmail.com?subject=Partenariat&body=Bonjour,%0D%0A%0D%0AJe suis intéressé par un partenariat avec votre site.%0D%0A%0D%0ACordialement.">
          Partenariat
        </a>
      </li>
      <li><a class="underline" href="/legals">Mentions légales</a></li>
    </ul>

  </div>
  <a href="/" class="copyright">
    <img alt="logo Talemelier" src="/logo.svg"> © Talemelier
  </a>
</footer>

<style lang="scss">
  footer {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 8rem 2rem 2rem 2rem;
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
    align-items: flex-end;
    font-family: var(--title-font);
    gap: 0.5rem;

    img {
      width: 6rem;
    }
  }
</style>