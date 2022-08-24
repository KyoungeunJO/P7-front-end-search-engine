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
        Array.from(tagSection.children).map(t => t.addEventListener('click', handleTagDelete))
        
        // Filter recipes
        console.log(userResearch);
        userResearch[type].push(tagValue)
        updateFromSearch(userResearch)
    }) 
    )
};

function handleTagDelete(event) {
    const tagNode = event.target.parentNode
    // récupères le type du tag
    const type = tagNode.getAttribute('data-type'); 
    const value = event.target.previousElementSibling.innerText

    userResearch[type] = userResearch[type].filter(word => word != value)
    event.target.parentNode.remove()

    updateFromSearch(userResearch)
}


// INIT
// Get recipes' data
const { recipes } = await getRecipes();
displayBtn(recipes);
displayRecipes(recipes);
initMainSearch();

// object represents what the user is searching
let userResearch = {
    keywords: [],
    ingredients: [],
    appliances: [],
    ustensils: [],
}


function initMainSearch() {
    // Listen event from search bar
    const inputSearch = document.querySelector("#search-recipe")
    inputSearch.addEventListener("input", (event) => {
        // reset keywords
        userResearch.keywords = []

        const words = event.target.value.split(' ')
        words.forEach(word => {
            if(word.length >= 3) {
                userResearch.keywords.push(word)
            }
        })

        // update even if value < 3 to handle deletion
        updateFromSearch(userResearch)
    })
}

function updateFromSearch(userResearch) {
    const filteredRecipes = filterRecipes(userResearch)
    displayBtn(filteredRecipes)
    displayRecipes(filteredRecipes)
}

function filterRecipes(userResearch) {
    const start = performance.now()
    let filteredRecipes = [...recipes]
    console.time("filter recipes")

    if (userResearch.keywords.length > 0) {
        let keepedRecipes = []
        for (let i = 0; i < filteredRecipes.length; i++) {
            const recipe = filteredRecipes[i]
            const recipeIngredients = recipe.ingredients.reduce((acc, val) =>  { 
                acc.push(val.ingredient)
                return acc
            } , [])

            if(userResearch.keywords.every(word => recipe.name.includes(word)) ||
                userResearch.keywords.every(word => recipeIngredients.includes(word)) ||
                userResearch.keywords.every(word => recipe.description.includes(word))) {
                
                keepedRecipes.push(recipe)
            }
        }
        filteredRecipes = keepedRecipes
    }

    // filter by tag ingredients
    if (userResearch.ingredients.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            const recipeIngredients = recipe.ingredients.reduce((acc, val) =>  { 
                acc.push(val.ingredient)
                return acc
            } , [])

            let shouldKeep = userResearch.ingredients.every(ingredient => recipeIngredients.includes(ingredient))
            return (shouldKeep)
        })
    }

    //filter by tag appliances
    if (userResearch.appliances.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            let shouldKeep = userResearch.appliances.every(appliance => {
                return recipe.appliance.includes(appliance)
            })
            return shouldKeep
        })
    }

    //filter by tag ustensils
    if (userResearch.ustensils.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            let shouldKeep = userResearch.ustensils.every(ustensil => {
                return recipe.ustensils.includes(ustensil)
            })
            return shouldKeep
        })
    }

    const end = performance.now()
    const timeSpent = end - start
    console.log(`Recipes filtered in ${timeSpent}ms \n
    Recipes left: ${filteredRecipes.length}`);
    return filteredRecipes
}

window.addEventListener('click', (e) => {
    const filtersCls = [...document.querySelectorAll('.filter')]
    let shouldHide = !('data-filter' in e.target.attributes)
    if (shouldHide) {
        filtersCls.forEach(filter => filter.style.display = 'none')
    }
})