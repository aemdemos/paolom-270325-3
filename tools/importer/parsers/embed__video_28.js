export default function parse(element, { document }) {
  // Extract content dynamically from the element
  const image = element.querySelector('img');
  const link = element.querySelector('a');

  // Ensure all necessary content exists before proceeding
  if (!link || !link.href) {
    console.error('Link URL is missing');
    return;
  }

  // Create header row dynamically
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed';

  // Create content row dynamically
  const contentRow = [document.createElement('div')];
  if (image) {
    contentRow[0].appendChild(image.cloneNode(true)); // Clone image if exists
    contentRow[0].appendChild(document.createElement('br')); // Add line break
  }
  const linkElement = document.createElement('a');
  linkElement.href = link.href;
  linkElement.textContent = link.href;
  contentRow[0].appendChild(linkElement);

  // Construct the table
  const tableData = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}