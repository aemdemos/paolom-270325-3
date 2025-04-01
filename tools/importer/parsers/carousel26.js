export default function parse(element, { document }) {
  // Extract data from the element
  const breadcrumbsJson = JSON.parse(
    element.querySelector('[data-breadcrumbs-json]').getAttribute('data-breadcrumbs-json')
  );

  // Create rows for the breadcrumbs table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Breadcrumbs';

  const rows = breadcrumbsJson.map((breadcrumb) => {
    const link = document.createElement('a');
    link.href = breadcrumb.path;
    link.textContent = breadcrumb.title;
    return [link];
  });

  // Combine header and rows
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(blockTable);
}