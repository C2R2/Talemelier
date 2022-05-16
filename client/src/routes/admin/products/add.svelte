<script>
    import Cookies from "js-cookie"
    import ProductForm from "$lib/ProductForm.svelte"

    let submit = false

    let product = {}

    function handleSubmit () {
        submit = true
        fetch("https://talemelier.herokuapp.com/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get("token")
            },
            body: JSON.stringify(product)
        }).then(() => {window.location = "/admin/products"}).catch(error => {
            console.error(error)
            submit = false
        })
    }

</script>

<ProductForm {submit} onSubmit={handleSubmit} product={product}/>