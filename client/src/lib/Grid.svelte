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
               <svelte:component this={element.component} {...element.props}
                                 value={element.props?.value && element.props.value(row)}/>
             </span>
            {/each}
          {:else }
            <span title={row[column.name]}>{row[column.name] ? row[column.name] : ""}</span>
          {/if}
        {/each}
      </div>
    {/each}

  </div>


  <!--  <table>-->
  <!--    <thead>-->
  <!--    <tr>-->
  <!--      {#each columns as column}-->
  <!--        <th style:width={column.width}>{column.label}</th>-->
  <!--      {/each}-->
  <!--    </tr>-->
  <!--    </thead>-->
  <!--    <tbody>-->
  <!--    {#each data as row}-->
  <!--      <tr>-->
  <!--        {#each columns as column}-->
  <!--          {#if column.render}-->
  <!--            <td>-->
  <!--              {#each column.render as element}-->
  <!--                <svelte:component this={element.component} {...element.props}-->
  <!--                                  href={element.props?.href && element.props.href(row)}/>-->
  <!--              {/each}-->
  <!--            </td>-->
  <!--          {:else }-->
  <!--            <td title={row[column.name]}>{!!row[column.name] ? row[column.name] : "" }</td>-->
  <!--          {/if}-->
  <!--        {/each}-->
  <!--      </tr>-->
  <!--    {/each}-->
  <!--    </tbody>-->
  <!--  </table>-->
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

  /*.grid-container {*/
  /*  position: relative;*/
  /*  display: block;*/
  /*  overflow: auto;*/
  /*  width: 100%;*/
  /*  border-color: #e5e7eb;*/
  /*  border-top-width: 1px;*/
  /*}*/

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
    padding: 1rem;
    text-overflow: ellipsis;
    border-bottom: 1px solid rgb(81, 81, 81);
    width: auto;
  }


</style>