import Tag from './Tag.js'
import { handleFilterClick } from '../pages/index.js';

/**
 * Create an instance of Filter component
 * @author Kyoungeun Jo
 * @param {Array} data List of recipes in json
 * @returns {string} Rendering of component in HTML
 */
export default function Filter(data) {
    const { title, elements, type } = data;

    let filter = document.createElement('div')
    filter.classList.add('filter-btn-container')
    renderContent(elements)

    function renderContent(newElements) {
        filter.innerHTML = `
            <div class="${title.toLowerCase()} filter-summary" data-filter onclick="document.querySelector('#container-${title}').style.display = 'block'">
                <p data-filter> ${title} </p>
            </div>

            <div id="container-${title}" class="filter ${title.toLowerCase()}" data-filter>
                <input data-filter type="text" name="search-elements" id="search-elements" placeholder="Rechercher un ${title.toLowerCase()}"/>
                <div class="element-list" data-filter>
                    <ul>
                        ${newElements.map(el => `<li data-filter data-type="${type}">${el}</li>`).join(' ')}
                    </ul>
                </div>
            </div>
            `
    }

    // event to filter tags
    filter.addEventListener('input', e => {
        let text = e.target.value.toLowerCase()
        let filteredElements = elements.filter(el => el.toLowerCase().includes(text))
        let ul = filter.getElementsByTagName('ul')[0]

        const liChildren = filteredElements.map(el => {
            let li = document.createElement('li')
            li.setAttribute('data-filter', '')
            li.setAttribute('data-type', type)
            li.textContent = el

            li.addEventListener('click', handleFilterClick)
                return li
        })
        ul.replaceChildren(...liChildren)
    })

    return filter
}