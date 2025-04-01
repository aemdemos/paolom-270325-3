export default function parse(element, { document }) {
  // Helper function to extract text content
  const extractText = (el) => el.textContent.trim();

  // Extract data dynamically from the provided element
  const formFields = [...element.querySelectorAll('.FormField')];

  const rows = formFields.map((field) => {
    const label = field.querySelector('.FormField-labelText');
    if (!label) return [];

    const selectElement = field.querySelector('select');
    if (!selectElement) return [];

    const options = [...selectElement.options]
      .filter((option) => option.value) // Filter out placeholder values
      .map((option) => option.textContent.trim());

    return [extractText(label), options.join(', ')];
  });

  // Remove empty rows
  const validRows = rows.filter((row) => row.length > 0);

  // Create header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Embed';
  const headerRow = [headerCell];

  // Structure table data
  const tableData = [
    headerRow,
    ...validRows.map(([header, content]) => [
      `${header}: ${content}`
    ])
  ];

  // Create table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}