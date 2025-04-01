export default function parse(element, { document }) {
    const cells = [];

    // Add header row
    const headerRow = ['Columns'];
    cells.push(headerRow);

    const columns = Array.from(element.querySelectorAll('.c04__item')).map(item => {
        const image = item.querySelector('img');
        const title = item.querySelector('.b23__text-title');
        const subtitle = item.querySelector('.b23__text-subtitle');
        const link = item.querySelector('.b23__cta-link');

        // Create content elements for the column
        const columnContent = [];

        if (image) {
            columnContent.push(image);
        }

        if (title) {
            const titleElement = document.createElement('h2');
            titleElement.textContent = title.textContent;
            columnContent.push(titleElement);
        }

        if (subtitle) {
            const subtitleElement = document.createElement('p');
            subtitleElement.textContent = subtitle.textContent;
            columnContent.push(subtitleElement);
        } else {
            // Handle missing subtitle with a placeholder
            const placeholderElement = document.createElement('p');
            placeholderElement.textContent = 'Subtitle not available';
            columnContent.push(placeholderElement);
        }

        if (link) {
            const linkElement = document.createElement('a');
            linkElement.href = link.href;
            linkElement.textContent = link.textContent;
            columnContent.push(linkElement);
        }

        return columnContent;
    });

    // Create a row for the columns
    cells.push(columns);

    // Create the table block
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(blockTable);
}