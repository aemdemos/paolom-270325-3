export default function parse(element, { document }) {
  // Create the header row indicating the type of block
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];

  // Extract the quote text from the input placeholder dynamically
  const inputField = element.querySelector('input.f04__field');
  const quoteText = inputField ? inputField.placeholder : '';

  const quoteElement = document.createElement('p');
  quoteElement.textContent = quoteText;
  const quoteRow = [quoteElement];

  // Add attribution row (empty in this case as no attribution is provided)
  const attributionElement = document.createElement('em');
  attributionElement.textContent = 'Attribution, Source';
  const attributionRow = [attributionElement];

  // Create the table using createTable helper function
  const tableData = [headerRow, quoteRow, attributionRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table, no return statement needed
  element.replaceWith(blockTable);
}