<script>
    import Cookies from "js-cookie"

    let usersList

    fetch("https://talemelier.herokuapp.com/users",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get("token")
            }
        }
    ).then(response => response.json())
        .then(data => {
            console.log(data)
        })

</script>

<br><br><br><br><br><br><br><br>
<h1>Vous pouvez accéder à ce contenu</h1>