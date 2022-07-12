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
        const a = document.createElement( 'a' );
        a.setAttribute("href", `recipes.html?name=${name}`);
        const article = document.createElement( 'article' );
        const span = document.createElement( 'span' );
        const div = document.createElement( 'div' );
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const pTime = document.createElement ( 'p' );
        pTime.setAttribute("class", "fas fa-clock");
        pTime.textContent = time;
        const pIngredients = document.createElement( 'p' );
        pIngredients.innerHTML = stringifyIngredients(ingredients);
        const pDescription = document.createElement ( 'p' );
        pDescription.textContent = `${description}`;
        a.appendChild(article);
        article.appendChild(span);
        article.appendChild(div);
        div.appendChild(h2);
        div.appendChild(pTime);
        div.appendChild(pIngredients);
        div.appendChild(pDescription);

        return a;
    }

    return { render }
}