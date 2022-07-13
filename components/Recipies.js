/**
 * Create an instance of Recipes component
 * @author Kyoungeun Jo
 * @param {Array} data List of recipes in json
 * @returns {string} Rendering of component in HTML
 */
export default function Recipies(data) {
    const { name, ingredients, time, description } = data;

    function stringifyIngredients(ingredients) {
        let string = ''
        ingredients.forEach(ingredient => {
            string += `${ingredient.ingredient}: ${ingredient?.quantity || ''}${ingredient?.unit || ''}<br>`
        })

        return string
    }

    function render() {
        return `
        <a href="#" class="decoration-none">
            <article>
                <div id="recipe">    
                    <img class="recipe-img">
                    <div class="recipe-text">
                        <h2>${name}</h2>
                        <p class="fas fa-clock" aria-hidden="true">${time} min</p>
                        <p>${stringifyIngredients(ingredients)}</p>

                        <p>${description}</p>
                    </div>
                </div>
            </article>
        </a>
        `
    }

    return { render }
}