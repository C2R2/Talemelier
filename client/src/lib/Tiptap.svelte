<script>
    import { onMount, onDestroy } from "svelte"
    import { Editor } from "@tiptap/core"
    import StarterKit from "@tiptap/starter-kit"
    import Btn from "$lib/Btn.svelte"

    export let value
    let element
    let editor

    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [
                StarterKit
            ],
            content: value,
            onUpdate: () => {
                value = editor.getHTML()
            }
        })
    })

    onDestroy(() => {
        if (editor) {
            editor.destroy()
        }
    })
</script>

<div class="editor">
  {#if editor}
    <div>
      <Btn small onClick={() => editor.chain().focus().toggleBold().run()}>
        Bold
      </Btn>
      <Btn small onClick={() => editor.chain().focus().toggleItalic().run()}>
        Italic
      </Btn>
    </div>
  {/if}

  <div bind:this={element} class="tiptap"></div>
</div>

<style lang="scss">
  .tiptap {
    padding: 0.5rem 1rem;
    border: 1px solid var(--black);
    border-radius: 0.25rem;
    transition: transform 0.1s ease-in-out;
    box-sizing: border-box;
    background: white;

    &:focus-within {
      outline: 1px solid var(--black);
    }

    :global( > div:focus-visible) {
      outline: 0;
    }
  }

  .editor {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>