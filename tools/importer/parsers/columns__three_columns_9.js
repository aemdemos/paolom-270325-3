export default function parse(element, { document }) {
  // Extract all columns from the element
  const columns = Array.from(element.querySelectorAll('.ct01__column'));

  // Map through each column to extract meaningful content dynamically
  const columnContents = columns.map((col, index) => {
    const wrapper = col.querySelector('.ct01__wrapper');
    if (!wrapper) return document.createTextNode('');

    // Dynamically attempt to extract content based on known structure
    let content = wrapper.querySelector('.b02__rich-text');

    // Special handling for the second column (index 1) to ensure extraction
    if (!content && index === 1) {
      content = wrapper.querySelector('.ct09__wrapper') || wrapper.querySelector('.b16-statistic');
    }

    if (!content) return document.createTextNode('');

    // Convert content to an element dynamically
    const cell = document.createElement('div');
    cell.innerHTML = content.outerHTML.trim();

    return cell;
  });

  // Prepare table header row based on example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Create content rows dynamically
  const contentRow = columnContents;

  // Create table using helper function
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}