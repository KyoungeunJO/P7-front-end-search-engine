import Recipies from '../components/Recipies.js'

async function getRecipes() {
    return fetch("./data/recipes.json")
        .then(data => data.json())
}

async function displayData(recipes) {
    const recipesSection = document.querySelector("#recipes-container");

    recipes.forEach((recipe) => {
        const recipesModel = Recipies(recipe);
        const userCardDOM = recipesModel.render();
        recipesSection.appendChild(userCardDOM);
    });
};



async function init() {
    // Récupère les données des recettes
    const { recipes } = await getRecipes();
    displayData(recipes);
};

init();





