export default function parse(element, { document }) {
  // Step 1: Extract the background image URL
  const imgElement = element.querySelector('.c01__background picture img');
  const backgroundImageSrc = imgElement ? imgElement.src : null;

  // Step 2: Extract the headline text
  const headlineElement = element.querySelector('h1.c01__headline');
  const headlineText = headlineElement ? headlineElement.textContent.trim() : '';

  // Step 3: Extract the subheading text
  const subheadingElement = element.querySelector('p.c01__subtitle');
  const subheadingText = subheadingElement ? subheadingElement.textContent.trim() : '';

  // Step 4: Create the header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Step 5: Create the content row
  const contentRow = [];

  if (backgroundImageSrc) {
    const img = document.createElement('img');
    img.src = backgroundImageSrc;
    contentRow.push(img);
  }

  if (headlineText) {
    const heading = document.createElement('h1');
    heading.textContent = headlineText;
    contentRow.push(heading);
  }

  if (subheadingText) {
    const subheading = document.createElement('p');
    subheading.textContent = subheadingText;
    contentRow.push(subheading);
  }

  // Step 6: Construct the final table data
  const cells = [
    headerRow, // First row: header
    [contentRow], // Second row: content
  ];

  // Step 7: Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Step 8: Replace the original element with the created block table
  element.replaceWith(blockTable);
}