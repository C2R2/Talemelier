<script>
	import Header from "$lib/Header.svelte"
	import Footer from "$lib/Footer.svelte"
	import { page } from "$app/stores"
</script>

<Header color={$page.url.pathname === "/" || $page.url.pathname === "/about" ? "var(--white)": null}/>
<slot/>
{#if !($page.url.pathname === "/")}
  <Footer/>
{/if}
