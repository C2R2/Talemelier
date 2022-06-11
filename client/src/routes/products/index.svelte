<script>
    import ProductCard from "$lib/ProductCard/ProductCard.svelte"
    import Select from "$lib/Select.svelte"
    import { products } from "../../stores.js"

    let filterTerm = ""
    let searchTerm = ""
    let filteredProducts = $products

    $:console.log(filteredProducts)

    function handleSearch (event) {
        searchTerm = event.target.value
        filteredProducts = $products.filter(product => {
            return product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.ref.toLowerCase().includes(searchTerm.toLowerCase())
        })
    }

    function handleFilter (event) {
        filterTerm = event.target.value.trim()
        switch (filterTerm) {
            case "A-Z":
                filteredProducts = filteredProducts.sort((a, b) => {
                    return a.title.localeCompare(b.title)
                })
                break
            case "Z-A":
                filteredProducts = filteredProducts.sort((a, b) => {
                    return b.title.localeCompare(a.title)
                })
                break
            case "Prix croissant":
                filteredProducts = filteredProducts.sort((a, b) => {
                    return a.price - b.price
                })
                break
            case "Prix décroissant":
                filteredProducts = filteredProducts.sort((a, b) => {
                    return b.price - a.price
                })
                break
        }
    }


</script>

<svelte:head>
  <title>Produits - L'Atelier du Talemelier</title>
</svelte:head>

<section class="head">
  <h1>Les produits</h1>

  <p class="instruction">
    Passez votre commande puis venez récupérer vos produits sur les différents marchés.
  </p>
</section>
<!-- -->
<section class="all-products">
  <h2>Tous nos produits</h2>
  <div class="filters">
    <Select onChange={handleFilter}>
      <option selected>Trier</option>
      <option>
        A-Z
      </option>
      <option>
        Z-A
      </option>
      <option>
        Prix croissant
      </option>
      <option>
        Prix décroissant
      </option>
    </Select>
    <input on:input={handleSearch} placeholder="Rechercher un produit" type="search">
  </div>

  <div class="products">
    {#if filteredProducts.length > 0}
      {#each filteredProducts as product}
        <ProductCard {product}/>
      {/each}
    {:else}
      <div class="loader"></div>
    {/if}
  </div>

  <div class="pagination">
    <span class="left">←</span>
    <span class="current">1</span>
    <span>2</span>
    <span>3</span>
    <span class="right">→</span>
  </div>
</section>

<style lang="scss">
  .head {
    width: 90%;
    margin: 6rem auto 2rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .instruction {
    font-weight: 600;
    padding: 1.5rem;
    background-color: #D4CAC4;
  }

  .all-products {
    margin: 2rem auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .filters {
      display: flex;
      gap: 1rem;

      input {
        background: transparent;
        width: 16rem;
      }
    }

    .products {
      gap: 2rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      justify-items: center;
      @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
      }
      @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (min-width: 1440px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: center;
    gap: 2rem;

    @media (max-width: 425px) {
      gap: 1rem;
    }

    > * {
      cursor: pointer;
      border-radius: 0.25rem;
      border: 1px solid var(--black);
      height: 3rem;
      width: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .left, .right {
      height: 2rem;
    }

    .current {
      font-weight: 600;
      border-width: 2px;

    }
  }
</style>