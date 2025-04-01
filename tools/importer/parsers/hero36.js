export default function parse(element, { document }) { 
  // Helper function to create a table block
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract the title
  const headline = element.querySelector('.b01__headline');
  const titleElement = document.createElement('h1');
  titleElement.textContent = headline ? headline.textContent.trim() : '';

  // Extract author info
  const authorName = element.querySelector('.btc11__author-name');
  const authorElement = document.createElement('p');
  authorElement.textContent = authorName ? authorName.textContent.trim() : '';

  // Extract additional label info
  const label = element.querySelector('.Label');
  const labelElement = document.createElement('span');
  labelElement.textContent = label ? label.textContent.trim() : '';

  // Construct the content for the second row of the table
  const content = document.createElement('div');
  content.append(titleElement);
  content.append(authorElement);
  content.append(labelElement);

  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Create the rows of the table
  const rows = [
    headerRow,
    [content],
  ];

  // Create the block table
  const blockTable = createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}