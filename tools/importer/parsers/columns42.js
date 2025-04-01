export default function parse(element, { document }) {
    // Correct header row to match example
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns block';
    const headerRow = [headerCell];

    // Extract content for second row
    const contentCells = [];

    // Extract 'Follow @XBusiness' button
    const followButton = element.querySelector("a[data-text='Follow @XBusiness']")?.cloneNode(true);
    if (followButton) {
        contentCells.push(followButton);
    }

    // Extract 'Subscribe to our newsletter' button
    const subscribeButton = element.querySelector("a[data-text='Subscribe to our newsletter']")?.cloneNode(true);
    if (subscribeButton) {
        contentCells.push(subscribeButton);
    }

    // Construct table rows
    const cells = [headerRow, contentCells];

    // Create table using WebImporter.DOMUtils.createTable
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with the new table
    element.replaceWith(table);
}