<script>
    export let columns
    export let data

</script>

<div class="grid-container">
  <table>
    <thead>
    <tr>
      {#each columns as column}
        <th style:width={column.width ? column.width : "auto"}>{column.label}</th>
      {/each}
    </tr>
    </thead>
    <tbody>
    {#each data as row}
      <tr>
        {#each columns as column}
          {#if column.render}
            <td>
              {#each column.render as element}
                <svelte:component this={element.component} {...element?.props}
                                  href={element.props?.href && element.props.href(row)}/>
              {/each}
            </td>
          {:else }
            <td title={row[column.name]}>{!!row[column.name] ? row[column.name] : "" }</td>
          {/if}
        {/each}
      </tr>
    {/each}
    </tbody>
  </table>
</div>

<style>
  .grid-container {
    position: relative;
    display: block;
    overflow: auto;
    width: 100%;
    border-color: #e5e7eb;
    border-top-width: 1px;
  }

  table {
    width: 100%;
    min-width: 650px;
    table-layout: fixed;
  }

  th {
    font-weight: 600;
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgb(81, 81, 81);
  }

  td {
    overflow: hidden;
    flex-direction: row-reverse;
    padding: 1rem;
    text-overflow: ellipsis;
    border-bottom: 1px solid rgb(81, 81, 81);
  }


</style>