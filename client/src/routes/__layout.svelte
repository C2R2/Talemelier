<script>
  import Header from "$lib/Header.svelte"
  import Footer from "$lib/Footer.svelte"
  import { page } from "$app/stores";

</script>

<Header color={$page.url.pathname === "/" && "var(--white)"}  />
<slot />
{#if !($page.url.pathname === "/")}
  <Footer />
{/if}
