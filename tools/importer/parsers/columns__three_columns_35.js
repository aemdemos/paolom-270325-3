export default function parse(element, { document }) {
  const columns = Array.from(element.querySelectorAll('.src__Column-kRPWVl'));

  // Prepare header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Prepare content row
  const contentRow = columns.map((column) => {
    const columnContent = document.createElement('div');

    // Extract column header
    const columnHeader = document.createElement('h2');
    columnHeader.textContent = column.querySelector('h2')?.textContent || 'No Title';
    columnContent.appendChild(columnHeader);

    // Extract links
    const links = Array.from(column.querySelectorAll('a')).map((link) => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent;
      return anchor;
    });
    links.forEach((link) => columnContent.appendChild(link));

    return columnContent;
  });

  // Create table
  const tableData = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(blockTable);
}