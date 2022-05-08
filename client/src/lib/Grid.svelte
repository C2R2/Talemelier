<script>
    export let columns
    export let data

</script>

<div class="grid-container">
  <div class="table">

    {#each columns as column}
      <div class="column">
        {column.label}
      </div>
    {/each}

    {#each data as row}
      <div class="row">
        {#each columns as column}
          {#if column.render}
            {#each column.render as element}
             <span style="padding: 0; display: flex; align-items: center; justify-content: space-around">
               <svelte:component this={element.component} {...element.props(row)}/>
             </span>
            {/each}
          {:else }
            <span title={row[column.name]}>{row[column.name] ? row[column.name] : ""}</span>
          {/if}
        {/each}
      </div>
    {/each}

  </div>
</div>

<style lang="scss">
  .grid-container {
    overflow: auto;
    width: 100%;
  }

  .table {
    display: grid;

  }

  .column {
    font-weight: 600;
    grid-row: 1;
    padding: 1rem;
    border-bottom: 1px solid rgb(81, 81, 81);
  }

  .row {
    display: contents;
    text-overflow: ellipsis;

    > span {
      border-bottom: 1px solid rgb(81, 81, 81);
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 1rem;
    }
  }
</style>