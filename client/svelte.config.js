import adapter from "@sveltejs/adapter-auto"
import preprocessor from "svelte-preprocess"
import path from 'path'

/** @type {import("@sveltejs/kit").Config} */
const config = {
    preprocess: preprocessor(), kit: {
        adapter: adapter(), vite: {
            resolve: {
                alias: {
                    "$functions": path.resolve("./src/functions")
                }
            }
        }
    }
}

export default config
