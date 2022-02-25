export default async function getUsers () {
    const response = await fetch("http://localhost:3001/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json", "Authorization": "Bearer " + document.cookie.split("=")[1]
        }
    })
    if (response.ok) {
        return await response.json()
    } else {
        throw new Error("Error fetching users")
    }
}