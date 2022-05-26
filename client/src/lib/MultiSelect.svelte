<script>
    import { onMount } from "svelte"
    import { fly } from "svelte/transition"

    export let id = ""
    export let value = []
    export let readonly = false
    export let placeholder = ""
    export let required = false

    let input,
        inputValue,
        options = [],
        activeOption,
        showOptions = false,
        selected = {},
        first = true,
        slot
    const iconClearPath = "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"

    onMount(() => {
        slot.querySelectorAll("option").forEach(o => {
            o.selected && !value.includes(o.value) && (value = [...value, o.value])
            options = [...options, { value: o.value, name: o.textContent }]
        })
        value && (selected = options.reduce((obj, op) => value.includes(op.value) ? {
            ...obj,
            [op.value]: op
        } : obj, {}))
        first = false
    })

    $: if (!first) value = Object.values(selected).map(o => o.value)
    $: filtered = options.filter(o => inputValue ? o.name.toLowerCase().includes(inputValue.toLowerCase()) : o)
    $: if (activeOption && !filtered.includes(activeOption) || !activeOption && inputValue) activeOption = filtered[0]

    function add (token) {
        if (!readonly) selected[token.value] = token
    }

    function remove (value) {
        if (!readonly) {
            const { [value]: val, ...rest } = selected
            selected = rest
        }
    }

    function optionsVisibility (show) {
        if (readonly) return
        if (typeof show === "boolean") {
            showOptions = show
            show && input.focus()
        } else {
            showOptions = !showOptions
        }
        if (!showOptions) {
            activeOption = undefined
        }
    }

    function handleKeyup (e) {
        if (e.keyCode === 13) {
            Object.keys(selected).includes(activeOption.value) ? remove(activeOption.value) : add(activeOption)
            inputValue = ""
        }
        if ([38, 40].includes(e.keyCode)) { // up and down arrows
            const increment = e.keyCode === 38 ? -1 : 1
            const calcIndex = filtered.indexOf(activeOption) + increment
            activeOption = calcIndex < 0 ? filtered[filtered.length - 1]
                : calcIndex === filtered.length ? filtered[0]
                    : filtered[calcIndex]
        }
    }

    function handleBlur () {
        optionsVisibility(false)
    }

    function handleTokenClick (e) {
        if (e.target.closest(".token-remove")) {
            e.stopPropagation()
            remove(e.target.closest(".token").dataset.id)
        } else if (e.target.closest(".remove-all")) {
            selected = []
            inputValue = ""
        } else {
            optionsVisibility(true)
        }
    }

    function handleOptionMousedown (e) {
        const value = e.target.dataset.value
        if (selected[value]) {
            remove(value)
        } else {
            add(options.filter(o => o.value === value)[0])
            input.focus()
        }
    }
</script>

<style>
  .multiselect {
    position: relative;
    background-color: white;
    border-radius: 0.25rem;
    border: 1px solid var(--black);
  }

  .tokens {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.5rem 1rem;
  }

  .tokens::after {
    position: absolute;
    bottom: -1px;
    left: 50%;
    display: block;
    width: 0;
    height: 2px;
    content: "";
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    background: none repeat scroll 0 0 hsl(45, 100%, 51%);
  }

  .tokens.showOptions::after {
    left: 0;
    width: 100%;
  }

  .token {
    display: flex;
    align-items: center;
    margin: .25rem .5rem .25rem 0;
    padding: .25rem .5rem .25rem .5rem;
    transition: background-color .3s;
    white-space: nowrap;
    border-radius: 1.25rem;
    background-color: hsl(214, 17%, 92%);
  }

  .token:hover {
    background-color: hsl(214, 15%, 88%);
  }

  .readonly .token {
    color: hsl(0, 0%, 40%);
  }

  .token-remove, .remove-all {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 1.25rem;
    height: 1.25rem;
    margin-left: .25rem;
    color: hsl(214, 17%, 92%);
    border-radius: 50%;
    background-color: var(--black);
  }

  .token-remove:hover, .remove-all:hover {
    cursor: pointer;
    background-color: hsl(215, 21%, 43%);
  }

  .actions {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 15rem;
  }

  input {
    font-size: 1.5rem;
    line-height: 1.5rem;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
  }

  .dropdown-arrow path {
    fill: hsl(0, 0%, 70%);
  }

  .multiselect:hover .dropdown-arrow path {
    fill: hsl(0, 0%, 50%);
  }

  .icon-clear path {
    fill: white;
  }

  .options {
    position: absolute;
    z-index: 1;
    top: calc(100% + 1px);
    left: 0;
    overflow: auto;
    width: 100%;
    max-height: 70vh;
    list-style: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 -2px 4px rgba(0, 0, 0, .1);
    margin-block-end: 0;
    margin-block-start: 0;
    padding-inline-start: 0;
  }

  li {
    padding: .5rem;
    cursor: pointer;
    background-color: white;
  }

  li:last-child {
    border-bottom-right-radius: .2rem;
    border-bottom-left-radius: .2rem;
  }

  li:not(.selected):hover {
    background-color: hsl(214, 17%, 92%);
  }

  li.selected {
    color: var(--black);
    background-color:var(--background-color);
  }

  li.selected:nth-child(even) {
    color: var(--black);
    background-color: var(--background-color);
  }

  li.active {
    background-color: hsl(214, 17%, 88%);
  }

  li.selected.active, li.selected:hover {
    background-color: var(--background-color);
  }

  .hidden {
    display: none;
  }
</style>

<div class="multiselect" class:readonly>
  <div class="tokens" class:showOptions on:click={handleTokenClick}>
    {#each Object.values(selected) as s}
      <div class="token" data-id="{s.value}">
        <span>{s.name}</span>
        {#if !readonly}
          <div class="token-remove" title="Remove {s.name}">
            <svg class="icon-clear" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path d="{iconClearPath}"/>
            </svg>
          </div>
        {/if}
      </div>
    {/each}
    <div class="actions">
      {#if !readonly}
        <input id={id} autocomplete="off" bind:value={inputValue} bind:this={input} on:keyup={handleKeyup}
               on:blur={handleBlur} placeholder={placeholder}/>
        <div class="remove-all" title="Remove All" class:hidden={!Object.keys(selected).length}>
          <svg class="icon-clear" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path d={iconClearPath}/>
          </svg>
        </div>
        <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M5 8l4 4 4-4z"></path>
        </svg>
      {/if}
    </div>
  </div>

  <select bind:this={slot} class="hidden" multiple required={required}>
    <slot></slot>
  </select>

  {#if showOptions}
    <ul class="options" transition:fly="{{duration: 200, y: 5}}" on:mousedown|preventDefault={handleOptionMousedown}>
      {#each filtered as option}
        <li class:selected={selected[option.value]} class:active={activeOption === option}
            data-value="{option.value}">{option.name}</li>
      {/each}
    </ul>
  {/if}
</div>