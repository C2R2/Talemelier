import adapter from "@sveltejs/adapter-auto"
import preprocessor from "svelte-preprocess"
import path from 'path'

/** @type {import("@sveltejs/kit").Config} */
const config = {
    preprocess: preprocessor(), kit: {
        adapter: adapter(), vite: {
            resolve: {
                alias: {
                    "$functions": path.resolve("./src/functions"),
                    "$lib": path.resolve("./src/lib"),
                    "$routes": path.resolve("./src/routes"),
                }
            }
        }
    }
}

export default config
