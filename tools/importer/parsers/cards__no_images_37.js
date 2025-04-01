export default function parse(element, { document }) {
  // Create an array to store table rows
  const rows = [];

  // Add the header row with the block name
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards (no images)';
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Extract card content and structure rows
  const cards = element.querySelectorAll('.src__TypographyStyle-giQheX.src__HeadlineText-bnjbyk');
  cards.forEach((card) => {
    const title = card.textContent.trim();
    const descriptionElement = card.nextElementSibling;
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';

    // Combine title and description into one cell
    const cellContent = [];

    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title;
      cellContent.push(titleElement);
    }

    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      cellContent.push(descriptionElement);
    }

    rows.push([cellContent]);
  });

  // Create the table using WebImporter.DOMUtils.createTable()
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the newly created table
  element.replaceWith(table);
}