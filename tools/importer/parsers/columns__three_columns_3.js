export default function parse(element, { document }) {
  const columns = Array.from(element.querySelectorAll('.ct01__column'));

  // Header row, dynamically created to match "Columns" block description
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Extract content from each column for the table creation
  const columnData = columns.map((column) => {
    const headerElement = column.querySelector('h1');
    const subHeaderElement = column.querySelector('h5');

    // Dynamically generate elements for each cell
    const header = document.createElement('h1');
    header.textContent = headerElement ? headerElement.textContent.trim() : '';

    const subHeader = document.createElement('h5');
    subHeader.textContent = subHeaderElement ? subHeaderElement.textContent.trim() : '';

    return [header, subHeader];
  });

  // Construct the block table
  const cells = [headerRow, ...columnData];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured block
  element.replaceWith(block);
}