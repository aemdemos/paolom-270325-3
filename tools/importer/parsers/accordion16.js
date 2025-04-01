export default function parse(element, { document }) {
  const rows = [];

  // Add header row dynamically
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Accordion'; // Ensure header label matches example
  rows.push(headerRow);

  // Find all dropdown items within the element
  const dropdownItems = element.querySelectorAll('.ct05-content-dropdown');

  dropdownItems.forEach((dropdown) => {
    const titleButton = dropdown.querySelector('.ct05__wrapper');
    const contentDiv = dropdown.querySelector('.ct05__content_inner');

    // Handle missing or empty title
    const titleCell = document.createElement('span');
    titleCell.textContent = titleButton?.textContent?.trim() || ''; // Removing placeholder fallback

    // Handle content dynamically without adding placeholder fallback
    const contentCell = document.createElement('div');
    if (contentDiv && contentDiv.innerHTML.trim()) {
      contentCell.innerHTML = contentDiv.innerHTML;
    }

    // Add the row for the current dropdown item
    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}