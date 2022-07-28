export default async function getRecipes() {
    return fetch("/data/recipes.json")
        .then(data => data.json())
}