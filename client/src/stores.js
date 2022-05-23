import { writable } from "svelte/store"
import { browser } from "$app/env"

export const cart = writable(browser && JSON.parse(localStorage.cart) || [])
export const products = writable(browser && JSON.parse(localStorage.products) || [], (set) => {
    fetch("https://talemelier.herokuapp.com/products").then(res => res.json()).then(res => {set(res)})
})

if (browser) {
    cart.subscribe((value) => {
        localStorage.cart = JSON.stringify(value)
    })
    products.subscribe((value) => {
        localStorage.products = JSON.stringify(value)
    })
}
