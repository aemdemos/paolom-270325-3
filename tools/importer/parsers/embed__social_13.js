export default function parse(element, { document }) {
  // Step 1: Extract content dynamically from the input element
  const links = [...element.querySelectorAll('a.chirp-btn')].map((link) => link.href);

  // Step 2: Validate that links were correctly extracted
  if (!links.length) {
    console.warn('No valid links found in the provided element');
    return;
  }

  // Step 3: Organize content into a table structure matching the example
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed';

  // Step 4: Prepare table rows with extracted links
  const rows = links.map((link) => [`<a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a>`]);

  // Step 5: Create the block table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Step 6: Replace the original element with the new block table
  element.replaceWith(block);
}