export default function parse(element, { document }) {
  // Create header row with exact header text
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract content dynamically from element
  const contentRow = [];

  // Dynamically extract breadcrumbs
  const breadcrumbElement = element.querySelector('.u11__breadcrumbs-list');
  if (breadcrumbElement) {
    const breadcrumbs = breadcrumbElement.cloneNode(true); // Clone to preserve structure
    contentRow.push(breadcrumbs);
  }

  // Dynamically extract heading
  const headingElement = element.querySelector('h1, h2, h3, h4, h5, h6');
  if (headingElement) {
    const heading = document.createElement('h1');
    heading.textContent = headingElement.textContent.trim();
    contentRow.push(heading);
  }

  // Dynamically extract image
  const imgElement = element.querySelector('img');
  if (imgElement) {
    const image = document.createElement('img');
    image.src = imgElement.src;
    contentRow.push(image);
  }

  // Combine content into a single cell
  const combinedCell = document.createElement('div');
  contentRow.forEach((content) => combinedCell.appendChild(content));

  const contentRowFinal = [combinedCell];

  // Generate table
  const tableData = [headerRow, contentRowFinal];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with new table
  element.replaceWith(blockTable);
}