/**
 * Create an instance of Tag component
 * @author Kyoungeun Jo
 * @param {Array} data List of recipes in json
 * @returns {string} Rendering of component in HTML
 */

export default function Tag(data) {

    let { text, type } = data

    function render() {
        return `
        <div class="tag type-${type}" data-type="${type}">
            <p>${text}</p>
            <i class="far fa-times-circle" ></i>
        </div>
        `
    }

    return {render}
}