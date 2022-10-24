<section class="display">
  <div class="title">
    <h1>À propos</h1>
    <p>
      Le Talemelier en quelques explications
    </p>
  </div>
</section>

<style lang="scss">
  .display {
    height: 100vh;
    background: linear-gradient(black, black),
    url("/img/display.webp") no-repeat center center;
    background-blend-mode: saturation;
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