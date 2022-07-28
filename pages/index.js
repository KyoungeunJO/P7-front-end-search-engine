import Recipies from '../components/Recipies.js'
import Filter from '../components/Filter.js'
import Tag from '../components/Tag.js'
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
            elements: Array.from(ingredientsSet),
            type: "ingredients"
        },

        {
            title: "Appareils",
            elements: Array.from(appareilsSet),
            type: "appliances"
        },

        {
            title: "Ustensiles",
            elements: Array.from(ustensilsSet),
            type: "ustensils"
        },
    ]

    filters.forEach(filter => {
        const filterModel = Filter(filter);
        const filterCardDOM = filterModel.render();
        filterSection.innerHTML += filterCardDOM;
    })

    const filterElements = document.querySelectorAll('.element-list li');
    filterElements.forEach(element => element.addEventListener('click', (e) => {
        // Add tag on page
        const type = element.getAttribute('data-type')
        const tagValue = e.target.innerText
        let tag = Tag({text: tagValue, type: type})
        const tagSection = document.querySelector(".tag-container")
        tagSection.innerHTML += tag.render()
        
        // Filter recipes
        userResearch[type].push(tagValue)
        updateFromSearch(userResearch)
    }) 
    )
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
    let filteredRecipes = []

    // return immediately if no keywords
    if (userResearch.keywords.length == 0) {
        filteredRecipes = [...recipes]
    } else {
        filteredRecipes = recipes.filter(recipe => {
            // filter by keywords
            const RecipeIngredients = recipe.ingredients.reduce((acc, val) =>  { 
                acc.push(val.ingredient)
                return acc
            } , [])

            return (
            recipe.name.includes(userResearch.keywords[0]) || 
            RecipeIngredients.includes(userResearch.keywords[0]) || 
            recipe.description.includes(userResearch.keywords[0])   
            )
        })
    }

    // filter by tag ingredients
    filteredRecipes = filteredRecipes.filter(recipe => {
        const RecipeIngredients = recipe.ingredients.reduce((acc, val) =>  { 
            acc.push(val.ingredient)
            return acc
        } , [])

        let shouldKeep = userResearch.ingredients.some(ingredient => RecipeIngredients.includes(ingredient))
        return (shouldKeep)
    })


    return filteredRecipes
}

window.addEventListener('click', (e) => {
    const filtersCls = [...document.querySelectorAll('.filter')]
    let shouldHide = !('data-filter' in e.target.attributes)
    if (shouldHide) {
        filtersCls.forEach(filter => filter.style.display = 'none')
    }
})