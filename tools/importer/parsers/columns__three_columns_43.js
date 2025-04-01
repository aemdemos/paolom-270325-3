export default function parse(element, { document }) {
  const columns = [];

  // Select the column elements
  const columnElements = element.querySelectorAll('.ct01__column');

  columnElements.forEach((columnElement) => {
    const content = [];

    // Extract headline
    const headlineElement = columnElement.querySelector('.b01__headline');
    if (headlineElement) {
      const headline = document.createElement('h2');
      headline.textContent = headlineElement.textContent.trim();
      content.push(headline);
    }

    // Extract description
    const descriptionElement = columnElement.querySelector('.b02__rich-text p');
    if (descriptionElement) {
      const description = document.createElement('p');
      description.textContent = descriptionElement.textContent.trim();
      content.push(description);
    }

    if (content.length > 0) {
      columns.push(content);
    }
  });

  // Add table header
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  const tableData = [headerRow, columns];

  // Ensure each column is unique and not duplicated
  const uniqueColumns = columns.filter((column, index, self) => 
    self.findIndex((c) => c[0]?.textContent === column[0]?.textContent && c[1]?.textContent === column[1]?.textContent) === index
  );

  const flattenedColumns = uniqueColumns.map((column) => [column]);

  // Create table
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...flattenedColumns], document);

  // Replace element with the table
  element.replaceWith(blockTable);
}