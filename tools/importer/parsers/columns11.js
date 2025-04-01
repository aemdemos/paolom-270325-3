export default function parse(element, { document }) {
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    // Extract relevant content and structure it
    const headline = element.querySelector('.b01__headline');
    const button = element.querySelector('.b03__button');

    const headlineText = document.createElement('p');
    headlineText.textContent = headline ? headline.textContent.trim() : '';

    const buttonLink = document.createElement('a');
    if (button) {
        buttonLink.href = button.href;
        buttonLink.textContent = button.textContent.trim();
        buttonLink.target = button.target;
        buttonLink.rel = button.rel;
    }

    const contentRow = [headlineText, buttonLink];

    // Create the block table
    const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

    // Replace the original element with the new block table
    element.replaceWith(table);
}