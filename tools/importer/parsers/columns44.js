export default function parse(element, { document }) {
  // Helper function to create header row
  function createHeaderRow(headerText) {
    const headerCell = document.createElement('strong');
    headerCell.textContent = headerText;
    return [headerCell];
  }

  // Extract content from the HTML
  const paragraphs = element.querySelectorAll('p');
  const list = element.querySelector('ul');

  // Ensure paragraphs exist and extract their content
  const paragraphElements = Array.from(paragraphs).map((p) => {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = p.innerHTML; // Extract content dynamically
    return paragraph;
  });

  // Ensure list exists and extract its items
  let listElement = null;
  if (list) {
    listElement = document.createElement('ul');
    Array.from(list.querySelectorAll('li')).forEach((li) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = li.innerHTML; // Extract content dynamically
      listElement.appendChild(listItem);
    });
  }

  // Assemble cells for the table
  const cells = [
    createHeaderRow('Columns'), // Header row
    paragraphElements.map((paragraph) => [paragraph]), // Row for each paragraph
    listElement ? [listElement] : [] // Single row for list if exists
  ];

  // Use WebImporter.DOMUtils.createTable to create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(blockTable);
}