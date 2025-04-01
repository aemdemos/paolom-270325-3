export default function parse(element, { document }) {
  // Extract the image element
  const imgElement = element.querySelector('img');

  if (!imgElement) {
    console.warn('No image found within the element.');
    return;
  }

  // Create an image element using the extracted src
  const image = document.createElement('img');
  image.src = imgElement.getAttribute('src');
  image.alt = imgElement.getAttribute('alt') || '';
  image.style.width = imgElement.style.width;
  image.style.height = imgElement.style.height;

  // Create the heading element
  const heading = document.createElement('h1');
  heading.textContent = 'Heading in Block'; // Placeholder heading text

  // Create the header row with <strong>
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Combine image and heading into one cell for the content row
  const contentCell = document.createElement('div');
  contentCell.appendChild(image);
  contentCell.appendChild(heading);

  // Construct the table rows
  const tableData = [
    headerRow, // Header row
    [contentCell], // Single cell in content row
  ];

  // Generate the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly created block table
  element.replaceWith(blockTable);
}