<script>

	export let columns = []
	export let data = []
	export let filteredFields = []
	export let searchTerm = ""
	export let title = ""

	let filteredData = data

	function handleInputSearch () {
		filteredData = data.filter((row) => (
			filteredFields.some((field) => (
				JSON.stringify(row[field]).toLowerCase().includes(searchTerm.toLowerCase())
			))
		))
	}
</script>

<div class="grid-container">
<span class="count">
  {filteredData.length} {filteredData.length > 1 ? title.toLowerCase() : title.toLowerCase().slice(0, -1)}
</span>
  <div class="search">
    <input bind:value={searchTerm}
           on:input={handleInputSearch}
           placeholder="Search"
           type="search"
    />
  </div>
  <div class="table" style:grid-template-columns={columns.map((column) => column.width || 'auto').join(" ")}>
    {#each columns as column}
      <div class="column sortable" on:click={()=> {
          filteredData = filteredData.sort((a, b) => (a[column] > b[column]) ? 1 : -1)
      }}>
        {column.label}
      </div>
    {/each}
    {#each filteredData as row}
      <div class="row">
        {#each columns as column}
          {#if column.render}
             <span class="actions-column">
            {#each column.render as element}
              {#if element.component}
                <svelte:component this={element.component} {...element.props(row)}/>
              {:else}
                <svelte:element this={element.element} {...element.props(row)}>
                  {element.props(row).children}
                </svelte:element>
              {/if}
            {/each}
             </span>
          {:else }
            <span title={row[column.name]}>{@html row[column.name] ? row[column.name] : ""}</span>
          {/if}
        {/each}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .grid-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .table {
    display: grid;
    overflow: auto;
    position: relative;
  }

  :global(button[data-tooltip]) {
    cursor: pointer;
    text-decoration: underline;
  }

  :global(button[data-tooltip]):hover:before, :global(button[data-tooltip]):focus:before {
    content: attr(data-tooltip);
    position: absolute;
    top: 0;
    left: 0;
    background: var(--background-color);
    border: 1px solid var(--black);
    color: var(--black);
    padding: 0.5rem;
    border-radius: 0.5rem;
    z-index: 100;
    user-select: all;
  }

  .column {
    font-weight: 600;
    grid-row: 1;
    padding: 1rem;
    border-bottom: 1px solid rgb(81, 81, 81);
    cursor: pointer;
    position: relative;
  }

  .sortable:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-top-color: rgb(81, 81, 81);
  }

  .row {
    display: contents;
    text-overflow: ellipsis;

    > span {
      border-bottom: 1px solid rgb(81, 81, 81);
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0.5rem;
    }
  }

  .actions-column {
    padding: 0 !important;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .actions-column:has(> *[data-tooltip]) {
    overflow: unset;
  }
</style>