export default async function getUsers () {
  const response = await fetch("http://localhost:3001/users")
  if (response.ok) {
    return await response.json()
  } else {
    throw new Error("Error fetching users")
  }
}