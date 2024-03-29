import { writable } from "svelte/store";
import { browser } from "$app/env";

export const cart = writable(
  (browser && sessionStorage.cart && JSON.parse(sessionStorage.cart)) || []
);
export const products = writable(
  (browser && sessionStorage.products && JSON.parse(sessionStorage.products)) ||
    [],
  (set) => {
    fetch(import.meta.env.VITE_SERVER_URL + "/products")
      .then((res) => res.json())
      .then((res) => {
        set(res);
      });
  }
);
export const collectData = writable(
  (browser &&
    sessionStorage.collectData &&
    JSON.parse(sessionStorage.collectData)) ||
    []
);

if (browser) {
  cart.subscribe((value) => {
    sessionStorage.cart = JSON.stringify(value);
  });
  products.subscribe((value) => {
    sessionStorage.products = JSON.stringify(value);
  });
  collectData.subscribe((value) => {
    sessionStorage.collectData = JSON.stringify(value);
  });
}
