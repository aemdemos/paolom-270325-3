export default function parse(element, { document }) {
  // Create the header row dynamically
  const header = document.createElement('strong');
  header.textContent = 'Accordion';

  const rows = [];

  // Extract title of accordion dynamically
  const titleElement = element.querySelector('.ct05__headline h3');
  const titleCell = document.createElement('p');
  titleCell.textContent = titleElement ? titleElement.textContent.trim() : '';

  // Extract content of accordion dynamically
  const contentElement = element.querySelector('.ct05__content_inner .b02__rich-text');
  const contentCell = document.createElement('div');
  if (contentElement) {
    const paragraphs = contentElement.querySelectorAll('p');
    paragraphs.forEach((p) => {
      const clonedParagraph = p.cloneNode(true);
      contentCell.appendChild(clonedParagraph);
    });
  }

  rows.push([titleCell, contentCell]);

  // Create block table
  const cells = [[header], ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table dynamically
  element.replaceWith(table);
}