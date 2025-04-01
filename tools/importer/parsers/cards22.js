export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';

  // Extract rows dynamically
  const rows = Array.from(element.querySelectorAll('.btc13-event')).map(event => {
    // Dynamically extract image (if available)
    const imageElement = event.querySelector('img');
    const imagePlaceholder = imageElement ? imageElement : document.createElement('span');
    imagePlaceholder.textContent = 'No Image Available'; // Edge case for missing images

    // Extract and structure text content
    const title = event.querySelector('h3')?.textContent || 'Untitled'; // Edge case for missing titles
    const descriptionElements = Array.from(event.querySelectorAll('p'));
    const description = descriptionElements.map(p => p.textContent).join(' ') || 'No description available'; // Edge case for missing descriptions

    const textContent = document.createElement('div');
    const titleElement = document.createElement('strong');
    titleElement.textContent = title;
    textContent.appendChild(titleElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    textContent.appendChild(descriptionElement);

    return [imagePlaceholder, textContent];
  });

  const cells = [headerRow, ...rows];
  const block = createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}