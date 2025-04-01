export default function parse(element, { document }) {
  const rows = [];

  // Add the header row for the Accordion block
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Get the fieldsets from the element
  const fieldsets = element.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    const legend = fieldset.querySelector('legend');
    const title = legend ? legend.textContent.trim() : '';

    const contentDiv = fieldset.querySelector('.sp05__filter-tag-wrap');
    const tagLabels = contentDiv ? contentDiv.querySelectorAll('.sp05__filter-tags-label') : [];
    const content = Array.from(tagLabels).map((label) => {
      const span = document.createElement('span');
      span.textContent = label.textContent.trim();
      return span;
    });

    // Ensure both title and content exist before adding to rows
    if (title && content.length > 0) {
      rows.push([title, content]);
    }
  });

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}