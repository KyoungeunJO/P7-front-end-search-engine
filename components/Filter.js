/**
 * Create an instance of Filter component
 * @author Kyoungeun Jo
 * @param {Array} data List of recipes in json
 * @returns {string} Rendering of component in HTML
 */
export default function Filter(data) {
    const { title, elements, type } = data;

    function displayFilterContainer() {
        document.querySelector('#container-${title}').style.display = 'block'
    }

    function render() {
        return `
        <div class="${title.toLowerCase()} filter-summary" data-filter onclick="document.querySelector('#container-${title}').style.display = 'block'">
            <p data-filter> ${title} </p>
        </div>

        <div id="container-${title}" class="filter ${title.toLowerCase()}" data-filter>
            <input data-filter type="text" name="search-elements" id="search-elements" placeholder="Rechercher un ${title.toLowerCase()}"/>
            <div class="element-list" data-filter>
                <ul>
                    ${elements.map(el => `<li data-filter data-type="${type}">${el}</li>`).join(' ')}
                </ul>
            </div>
        </div>
        `
    }

    return { render }
}