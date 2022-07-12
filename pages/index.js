import Recipies from '../components/Recipies.js'
import getRecipes from '../utils/recipesAPI.js'

async function displayData(recipes) {
    const recipesSection = document.querySelector("#recipes-container");

    recipes.forEach((recipe) => {
        const recipesModel = Recipies(recipe);
        const recipeCardDOM = recipesModel.render();
        recipesSection.innerHTML += recipeCardDOM;
    });
};



async function init() {
    // Récupère les données des recettes
    const { recipes } = await getRecipes();
    displayData(recipes);
};

init();





