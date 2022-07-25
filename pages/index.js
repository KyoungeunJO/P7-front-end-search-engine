import Recipies from '../components/Recipies.js'
import Filter from '../components/Filter.js'
import getRecipes from '../utils/recipesAPI.js'

async function displayRecipes(recipes) {
    const recipesSection = document.querySelector("#recipes-container");
    
    recipesSection.innerHTML = ''
    recipes.forEach((recipe) => {
        const recipesModel = Recipies(recipe);
        const recipeCardDOM = recipesModel.render();
        recipesSection.innerHTML += recipeCardDOM;
    });

    if(recipes.length == 0) {
        recipesSection.innerHTML = `<p>Aucune recette ne correspond à votre critère… vous pouvez
        chercher « tarte aux pommes », « poisson », etc.</p>`
    }
    
};


function displayBtn(recipes) {
    const filterSection = document.querySelector(".filter-container");
    filterSection.innerHTML = ''

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


// INIT
// Get recipes' data
const { recipes } = await getRecipes();
displayBtn(recipes);
displayRecipes(recipes);
handleMainSearch();


let userResearch = {
    keywords: [],
    ingredients: [],
    appliances: [],
    ustensils: [],
}


function handleMainSearch() {
    // Listen event from search bar
    const inputSearch = document.querySelector("#search-recipe")
    inputSearch.addEventListener("input", (event) => {
        // reset keywords
        userResearch.keywords = []
        if(event.target.value.length >= 3) {
            // add keywords in userResearch object
            userResearch.keywords.push(event.target.value)
        }
        updateFromSearch(userResearch)
    })
}

function updateFromSearch(userResearch) {
    const filteredRecipes = filterRecipes(userResearch)
    displayBtn(filteredRecipes)
    displayRecipes(filteredRecipes)
}

function filterRecipes(userResearch) {
    // return immediately if no keywords
    if (userResearch.keywords.length == 0) {
        return recipes
    }
    
    // filter by keywords
    let filteredRecipes = recipes.filter(recipe => {
        return (
        recipe.name.includes(userResearch.keywords[0]) || 
        // recipes.ingredients.includes(userResearch.keywords) || 
        recipe.description.includes(userResearch.keywords[0])
        )
    })
    return filteredRecipes
}

