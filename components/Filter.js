/**
 * Create an instance of Filter component
 * @author Kyoungeun Jo
 * @param {Array} data List of recipes in json
 * @returns {string} Rendering of component in HTML
 */
export default function Filter(data) {
    const { title, elements } = data;


    function render() {
        return `
        <details class="filter ${title.toLowerCase()}">
            <summary>
                ${title}
            </summary>
            <input type="text" name="search-elements" id="search-elements" placeholder="${title.toLowerCase()}"/>
            <ul>
                ${elements.map(el => `<li>${el}</li>`).join(' ')}
            </ul>
        </details>
        `
    }

    return { render }
}