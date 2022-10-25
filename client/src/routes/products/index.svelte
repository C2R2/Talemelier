<script>
	import ProductCard from "$lib/ProductCard/ProductCard.svelte"
	import Select from "$lib/Select.svelte"
	import { products } from "../../stores.js"

	let productsLimit = 10
	let totalPages = Math.ceil($products.length / productsLimit)
	let currentPage = 1
	let filteredProducts = $products.slice(currentPage * productsLimit - productsLimit, currentPage * productsLimit)
	let filterTerm = ""
	let searchTerm = ""
	let searchInput = null

	function handleSearch (event) {
		searchTerm = event.target.value
		if (searchTerm.length > 0) {
			searchInput.classList.remove("search-input")
		} else {
      searchInput.classList.add("search-input")
    }
		filteredProducts = $products.filter(product => {
			return product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.ref.toLowerCase().includes(searchTerm.toLowerCase())
		})
		totalPages = Math.ceil(filteredProducts.length / productsLimit)
		currentPage = 1
		filteredProducts = filteredProducts.slice(currentPage * productsLimit - productsLimit, currentPage * productsLimit)
	}

	function handleFilter (event) {
		filterTerm = event.target.value.trim()
		switch (filterTerm) {
			case "A-Z":
				filteredProducts = $products.sort((a, b) => {
					return a.title.localeCompare(b.title)
				})
				break
			case "Z-A":
				filteredProducts = $products.sort((a, b) => {
					return b.title.localeCompare(a.title)
				})
				break
			case "Prix croissant":
				filteredProducts = $products.sort((a, b) => {
					return a.price - b.price
				})
				break
			case "Prix décroissant":
				filteredProducts = $products.sort((a, b) => {
					return b.price - a.price
				})
				break
		}

		if (searchTerm) {
			filteredProducts = filteredProducts.filter(product => {
				return product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
					product.ref.toLowerCase().includes(searchTerm.toLowerCase())
			})
		}

		totalPages = Math.ceil(filteredProducts.length / productsLimit)
		currentPage = 1
		filteredProducts = filteredProducts.slice(currentPage * productsLimit - productsLimit, currentPage * productsLimit)
	}

	function handlePage () {
		filteredProducts = $products.slice(currentPage * productsLimit - productsLimit, currentPage * productsLimit)
	}


</script>

<svelte:head>
  <title>Produits - L'Atelier du Talemelier</title>
</svelte:head>

<section class="head">
  <h1>Nos produits</h1>
  <div class="filters">
    <div bind:this={searchInput} class="search-input">
      <input on:input={handleSearch} placeholder="Que souhaitez-vous commander ?" type="search">
    </div>
    <Select onChange={handleFilter}>
      <option selected>Trier par</option>
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
  </div>
</section>
<!-- -->
<section class="all-products">
  <div class="products">
    {#if filteredProducts.length > 0}
      {#each filteredProducts as product}
        <ProductCard {product}/>
      {/each}
    {:else}
      {#if searchTerm.length > 0 || filterTerm.length > 0}
        <p>Aucun produit ne correspond à votre recherche</p>
      {:else}
        <div class="loader"></div>
      {/if}
    {/if}
  </div>

  {#if filteredProducts.length > 0}
    <div class="pagination">
      <span class="left" on:click={()=>{
        currentPage > 1
       currentPage--
      handlePage()
      }}>←</span>
      {#each Array(totalPages) as _, index}
        <span class:current={index +1 === currentPage} on:click={(event) => {
           event.target.classList.add("current")
          currentPage = index + 1
          handlePage()
        }}>{index + 1}</span>
      {/each}
      <span class="right" on:click={()=>{
        currentPage < totalPages
       currentPage++
      handlePage()
      }}>→</span>
    </div>
  {/if}
</section>

<style lang="scss">
  h1 {
    font-family: var(--body-font);
    font-weight: 400;
  }

  .head {
    width: 90%;
    margin: 6rem auto 4rem auto;
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .filters {
    display: flex;
    gap: 1rem;
    align-items: center;
    @media (max-width: 768px) {
      margin-top: 2rem;
      flex-direction: column;
      align-items: flex-start;
    }

    input {
      background: var(--white);
      width: 16rem;
      padding: 1rem;
    }

    .search-input {
      position: relative;
      display: flex;
      align-items: center;
      &::after {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 21 20'%3E%3Cpath d='M10 0a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Zm0 11.8H7a.8.8 0 0 1-.8-.8c0-.4.4-.8.8-.8h3c.4 0 .8.4.8.8s-.4.8-.8.8Zm3-3H7a.8.8 0 0 1-.8-.8c0-.4.4-.8.8-.8h6c.4 0 .8.4.8.8s-.4.8-.8.8ZM19.8 20c-.2 0-.4 0-.5-.2l-1.8-1.9a.7.7 0 0 1 0-1c.2-.2.7-.2 1 0l1.8 2c.3.2.3.6 0 .9l-.5.2Z'/%3E%3C/svg%3E");
        position: absolute;
        right: 1rem;
        width: 1rem;
      }
    }
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


    .products {
      gap: 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      justify-items: center;
      //@media (max-width: 768px) {
      //  grid-template-columns: repeat(1, 1fr);
      //}
      //@media (min-width: 992px) {
      //  grid-template-columns: repeat(3, 1fr);
      //}
      //@media (min-width: 1024px) {
      //  grid-template-columns: repeat(4, 1fr);
      //}
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