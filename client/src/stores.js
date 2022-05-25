import { writable } from "svelte/store"
import { browser } from "$app/env"

export const cart = writable((browser && sessionStorage.cart && JSON.parse(sessionStorage.cart)) || [])
export const products = writable((browser && sessionStorage.products && JSON.parse(sessionStorage.products)) || [], (set) => {
    fetch("https://talemelier.herokuapp.com/products").then(res => res.json()).then(res => {set(res)})
})

if (browser) {
    cart.subscribe((value) => {
        sessionStorage.cart = JSON.stringify(value)
    })
    products.subscribe((value) => {
        sessionStorage.products = JSON.stringify(value)
    })
}
