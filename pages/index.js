import Recipies from '../components/Recipies.js'
import Filter from '../components/Filter.js'
import getRecipes from '../utils/recipesAPI.js'

async function displayData(recipes) {
    const recipesSection = document.querySelector("#recipes-container");
    const filterSection = document.querySelector(".filter-container");

    recipes.forEach((recipe) => {
        const recipesModel = Recipies(recipe);
        const recipeCardDOM = recipesModel.render();
        recipesSection.innerHTML += recipeCardDOM;
    });

    const ingredientsSet = new Set()
    recipes.map(recipe => recipe.ingredients.forEach(ing => ingredientsSet.add(ing.ingredient)))

    const appareilsSet = new Set()
    recipes.map(recipe => appareilsSet.add(recipe.appliance))

    const ustensilsSet = new Set()
    recipes.map(recipe => recipe.ustensils.forEach(ust => ustensilsSet.add(ust))) 

    const filters = [
        {
            title: "Ingredients",
            elements: Array.from(ingredientsSet)
        },

        {
            title: "Appareils",
            elements: Array.from(appareilsSet)
        },

        {
            title: "Ustensiles",
            elements: Array.from(ustensilsSet)
        },
    ]

    filters.forEach(filter => {
        const filterModel = Filter(filter);
        const filterCardDOM = filterModel.render();
        filterSection.innerHTML += filterCardDOM;
    })

};



async function init() {
    // Récupère les données des recettes
    const { recipes } = await getRecipes();
    displayData(recipes);
};

init();





